const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

const parseTableLine = (line) =>
  line
    .split("|")
    .map((s) => s.trim())
    .filter((s, i, arr) => (i === 0 || i === arr.length - 1 ? s !== "" : true));

const parseNestedConfig = (str) => {
  if (!str || !str.includes(":")) return str;
  const obj = {};
  str.split(/[,;]/).forEach((pair) => {
    const [k, v] = pair.split(":").map((s) => s.trim());
    if (k && v) {
      if (v === "true") obj[k] = true;
      else if (v === "false") obj[k] = false;
      else if (!isNaN(v)) obj[k] = Number(v);
      else obj[k] = v;
    }
  });
  return obj;
};

const doParseMDXToDynamicJSON = (input) => {
  const lines = input.split("\n");
  const result = { metadata: {}, containers: [] };

  let currentSection = null;
  let activeDirective = null;
  let activeRow = null; // Persists between :start and :end explicitly
  let isParsingMetadata = true;
  let metadataKeys = null;
  let listStack = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed && !currentSection) return;

    // 1. Headings
    if (trimmed.match(/^(#{1,4})\s+(.+)$/)) {
      const match = trimmed.match(/^(#{1,4})\s+(.+)$/);
      isParsingMetadata = false;
      currentSection = {
        section: slugify(match[2]),
        heading: {
          level: match[1].length,
          title: match[2].trim(),
          id: slugify(match[2]),
        },
        content: [],
      };
      result.containers.push(currentSection);
      activeDirective = null;
      activeRow = null;
      return;
    }

    // 2. Directives (Row Start/End & Content Types)
    if (trimmed.startsWith(">")) {
      const clean = trimmed.replace(/>/g, "").trim();

      // Matches "chips primary", "chips secondary", etc.
      if (clean.startsWith("chips")) {
        const parts = clean.split(/\s+/);
        activeDirective = {
          type: "chip",
          variant: parts[1] || "primary",
        };
        return;
      }

      const rowMatch = clean.match(/row\(([^:]+):([^)]+)\)/);
      if (rowMatch) {
        const [_, rowName, action] = rowMatch;
        if (action === "start") {
          activeRow = { type: "row", name: rowName, items: [] };
          currentSection.content.push(activeRow);
        } else if (action === "end") {
          activeRow = null;
        }
        activeDirective = null;
        return;
      }

      // Content Directives
      if (clean.includes("list")) {
        const parts = clean.split(" ").filter(Boolean);
        activeDirective = { type: "list", variant: parts[1] || "ul" };
      } else if (clean.includes("chart")) {
        const parts = clean.split(" ").filter(Boolean);
        activeDirective = {
          type: "chart",
          variant: parts[1] || "bar",
          isDataTable: clean.includes("data-table"),
        };
      } else if (clean.includes("table")) {
        const customMatch = clean.match(/custom\(([^)]+)\)/);
        activeDirective = {
          type: "table",
          isCustom: !!customMatch,
          name: customMatch ? customMatch[1] : "default",
        };
      }
      listStack = [];
      return;
    }

    const getTarget = () =>
      activeRow ? activeRow.items : currentSection.content;

    // 3. Recursive Lists
    if (trimmed.startsWith("-") && activeDirective?.type === "list") {
      const target = getTarget();
      const match = trimmed.match(/^(-+)\s*(.*)/);
      const dashCount = match[1].length;
      const item = { text: match[2].trim(), children: [] };

      let listObj = target[target.length - 1];
      if (!listObj || listObj.type !== "list" || listObj.isClosed) {
        listObj = {
          type: "list",
          variant: activeDirective.variant,
          items: [],
          isClosed: false,
        };
        target.push(listObj);
        listStack = [{ level: dashCount, items: listObj.items }];
      }

      while (
        listStack.length > 1 &&
        dashCount < listStack[listStack.length - 1].level
      )
        listStack.pop();

      if (dashCount > listStack[listStack.length - 1].level) {
        const lastParent =
          listStack[listStack.length - 1].items[
            listStack[listStack.length - 1].items.length - 1
          ];
        if (lastParent) {
          lastParent.children.push(item);
          listStack.push({ level: dashCount, items: lastParent.children });
        }
      } else {
        listStack[listStack.length - 1].items.push(item);
      }
      return;
    }

   // 4. Chips Processing
if (activeDirective?.type === "chip" && trimmed !== "" && !trimmed.startsWith(">")) {
  const target = getTarget();

  const chipItems = trimmed
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "");

  if (chipItems.length > 0) {
    target.push({
      type: "chip",
      variant: activeDirective.variant,
      items: chipItems,
    });
  }

  // Reset immediately so the next line isn't forced into a chip
  activeDirective = null;
  return;
}

    // 5. Tables & Charts
    if (trimmed.startsWith("|")) {
      if (trimmed.includes("---")) return;
      const cells = parseTableLine(trimmed);

      if (isParsingMetadata) {
        if (!metadataKeys) metadataKeys = cells;
        else
          metadataKeys.forEach((key, i) => (result.metadata[key] = cells[i]));
        return;
      }

      if (currentSection && activeDirective) {
        const target = getTarget();
        let lastItem = target[target.length - 1];

        if (activeDirective.type === "chart") {
          // Find the chart in the current context (row or section)
          let targetChart = target.find(
            (c) =>
              c.type === "chart" &&
              c.variant === activeDirective.variant &&
              !c.isClosed,
          );

          if (activeDirective.isDataTable && targetChart) {
            if (!targetChart.dataHeaders) targetChart.dataHeaders = cells;
            else {
              const entry = {};
              targetChart.dataHeaders.forEach((h, i) => {
                const val = cells[i];
                entry[h] = isNaN(val) || val === "" ? val : Number(val);
              });
              targetChart.data.push(entry);
            }
          } else if (!activeDirective.isDataTable) {
            if (!targetChart) {
              targetChart = {
                type: "chart",
                variant: activeDirective.variant,
                config: {},
                data: [],
              };
              target.push(targetChart);
            }
            const key = cells[0],
              val = cells[1];
            if (key === "series")
              targetChart.config.series = [
                ...(targetChart.config.series || []),
                ...val.split(";").map((s) => parseNestedConfig(s.trim())),
              ];
            else targetChart.config[key] = parseNestedConfig(val);
          }
        } else if (activeDirective.type === "table") {
          if (!lastItem || lastItem.type !== "table" || lastItem.isClosed) {
            target.push({
              type: "table",
              isCustom: activeDirective.isCustom,
              tableName: activeDirective.name,
              headers: cells,
              rows: [],
            });
          } else {
            const row = {};
            lastItem.headers.forEach((h, i) => (row[h] = cells[i] || ""));
            lastItem.rows.push(row);
          }
        }
      }
      return;
    }

    // 5. Text Blocks
    if (
      trimmed !== "" &&
      currentSection &&
      !trimmed.startsWith("|") &&
      !trimmed.startsWith(">")
    ) {
      const target = getTarget();
      const last = target[target.length - 1];
      if (last) last.isClosed = true;
      target.push({ type: "text", value: trimmed });
      activeDirective = null;
      
    }
  });

  // Cleanup helper fields
  const cleanup = (items) => {
    items.forEach((item) => {
      delete item.isClosed;
      delete item.dataHeaders;
      if (item.type === "row") cleanup(item.items);
    });
  };
  result.containers.forEach((c) => cleanup(c.content));

  return result;
};


const parseMDXToDynamicJSON = (text) => {

  return doParseMDXToDynamicJSON(text);
};

module.exports = {
  parseMDXToDynamicJSON,
};

