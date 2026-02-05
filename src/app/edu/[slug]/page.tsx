"use client";
import "@/resources/custom.css";
import { parseMDXToDynamicJSON } from "../../../../next-parser/parser";

import {
  Text,
  Column,
  Line,
  Flex,
  Row,

  HeadingNav,
  HeadingLink,

  SmartLink,
  LineChart,
  BarChart,
  LineBarChart,
  PieChart,
  Table,
  Chip,
  LinearGauge,
  DataPoint,
  Skeleton,
} from "@once-ui-system/core";
import React, { useState } from "react";
import { Navbar } from "@/app/components/(global)/navbar";
import supabase from "@/app/supabase/client";

import { useEffect } from "react";


// --- Types ---
type ContentItem = {
  type: string;
  value?: string;
  variant?: string;
  items?: any[];
  headers?: string[];
  rows?: any[];
  config?: any;
  data?: any;
  isCustom?: boolean;
};

type Section = {
  section: string;
  heading: { level: number; title: string; id: string };
  content: ContentItem[];
};

const renderStyledText = (text: string) => {
  if (!text || typeof text !== "string") return text;
  const parts = text.split(/(\[[^\]]+\]\([^\)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/\[([^\]]+)\]\(([^\)]+)\)/);
    if (match) {
      return (
        <SmartLink key={index} href={match[2]}>
          {match[1]}
        </SmartLink>
      );
    }
    return part;
  });
};

// --- Sub-Components ---

const RenderHeading = ({
  level,
  title,
  id,
}: {
  level: number;
  title: string;
  id: string;
}) => (
  <HeadingLink as={`h${level}` as any} id={id}>
    {renderStyledText(title)}
  </HeadingLink>
);

const RenderText = ({ value }: { value: string }) => (
  <Text
    variant="body-default-l"
    data-scaling="110"
    onBackground="neutral-weak"
    style={{ lineHeight: "2" }}
  >
    {renderStyledText(value)}
  </Text>
);

const RenderNextRating = ({ rows }: { rows: any[] }) => (
  <Column gap="16">
    {rows.map((row, i) => (
      <Column
        key={i}
        gap="32"
        style={{ display: "grid", gridTemplateColumns: "1fr 5fr" }}
      >
        <Column gap="20" vertical="center">
          <Text
            variant="body-default-s"
            data-scaling="110"
            onBackground="neutral-medium"
          >
            <SmartLink href="#">
              {row.key.replace(/\b\w/g, (match: any) => match.toUpperCase())}
            </SmartLink>
          </Text>
        </Column>
        <LinearGauge
          maxWidth={30}
          fillWidth
          height={12}
          maxHeight={3}
          value={parseInt(row.value)}
          labels={["Low", "Med", "High", "Max"]}
        />
      </Column>
    ))}
  </Column>
);

const RenderTable = ({ headers, rows }: { headers: any[]; rows: any[] }) => {
  // Apply link parser to table cells
  const formattedRows = rows.map((row) =>
    headers.map((h) => renderStyledText(row[h])),
  );
  const formattedHeaders = headers.map((h) => ({
    content: h,
    key: h,
    sortable: true,
  }));
  return <Table data={{ headers: formattedHeaders, rows: formattedRows }} />;
};
const RenderChart = ({
  variant,
  config,
  data,
}: {
  variant: string;
  config: any;
  data: any[];
}) => {
  const [inner, outer] = config.ring
    ? config.ring.split(",").map(Number)
    : [60, 70];
  const gradientArray = config.gradiant ? config.gradiant.split(",") : ["flat"];

  const seriesMap = new Map();
  data.forEach((item) => {
    const keyName = item.key || item.data;
    if (!seriesMap.has(keyName)) {
      seriesMap.set(keyName, {
        key: keyName,
        color: item.color,
      });
    }
  });
  const series = Array.from(seriesMap.values());

  const pivotData = () => {
    const hasGrouping = data.some(
      (item) => item.group !== undefined && item.group !== null,
    );

    if (!hasGrouping) {
      return data.map((item) => ({
        label: item.key || item.data,
        [item.key || item.data]: item.value,
      }));
    }

    const groups: any = {};
    data.forEach((item) => {
      const groupName = item.group;
      if (!groups[groupName]) {
        groups[groupName] = { label: groupName };
      }
      groups[groupName][item.key || item.data] = item.value;
    });
    return Object.values(groups);
  };

  const transformedData = pivotData();

  const commonProps = {
    title: config.title,
    description: config.description,
    legend: { display: true, position: config.legend },
    axis: config.axis,
    grid: config.grid,
    gradient: gradientArray,
    series: series,
    data: transformedData,
  };

  switch (variant) {
    case "pie":
      return (
        <PieChart
          {...commonProps}
          ring={{ inner, outer }}
          tooltip={config.tooltip === "true"}
          // Pie chart always uses a simple flat structure
          data={data.map((d) => ({ name: d.data || d.key, value: d.value }))}
        />
      );
    case "bar":
      return (
        <BarChart {...commonProps} data={transformedData as DataPoint[]} />
      );
    case "line":
      return (
        <LineChart {...commonProps} data={transformedData as DataPoint[]} />
      );
    case "linebar":
      return (
        <LineBarChart {...commonProps} data={transformedData as DataPoint[]} />
      );
    default:
      return null;
  }
};

// --- Content Router ---

const renderContent = (
  item: ContentItem,
  sectionId: string,
): React.ReactNode => {
  switch (item.type) {
    case "text":
      return <RenderText value={item.value || ""} />;
    case "chip":
      return (
        <Row fillWidth gap="12" wrap>
          {item.items?.map((label: string, i: number) => (
            <Chip
              key={i}
              // Title cases the label (e.g., "mountain" -> "Mountain")
              label={label.replace(/\b\w/g, (match: any) =>
                match.toUpperCase(),
              )}
              // Applies "selected" styling if the variant is "secondary"
              selected={item.variant != "secondary"}
            />
          ))}
        </Row>
      );

    case "list":
      return (
        <Column gap="8" as={item.variant === "ol" ? "ol" : "ul"}>
          {item.items?.map((li, i) => (
            <React.Fragment key={i}>
              <RenderText value={i + 1 + "." + " " + li.text || ""} />
              {li.children?.map((child: any, ci: number) => (
                <div key={ci} style={{ paddingLeft: "20px" }}>
                  <RenderText value={ci + 1 + "." + " " + child.text || ""} />
                </div>
              ))}
            </React.Fragment>
          ))}
        </Column>
      );

    case "table":
      if (sectionId === "next-rating")
        return <RenderNextRating rows={item.rows || []} />;
      return (
        <RenderTable headers={item.headers || []} rows={item.rows || []} />
      );

    case "chart":
      return (
        <RenderChart
          variant={item.variant || ""}
          config={item.config}
          data={item.data}
        />
      );

    case "row":
      return (
        <Row fillWidth gap="20">
          {item.items?.map((child, idx) => (
            <div key={idx} style={{ flex: 1 }}>
              {renderContent(child, sectionId)}
            </div>
          ))}
        </Row>
      );

    default:
      return null;
  }
};

const RenderMetadata: React.FC<{
  slug: string;
  updatedAt: string;
  name: string;
  type: string;
  isAdmin: boolean;
}> = ({ slug, updatedAt, name, type, isAdmin }) => (
  <Column fillWidth gap="12" id={slug} className={slug + "-metadata"}>
    <Text variant="body-default-m" onBackground="neutral-medium">
      {new Date(updatedAt || "").toLocaleDateString()}
    </Text>
    <Text variant="display-strong-m">{type || ""}</Text>
    <Text variant="body-default-l" onBackground="neutral-weak">
      {name || ""}
    </Text>
    <Row gap="20">
      <SmartLink href="/search">Back</SmartLink>
      {isAdmin ? <SmartLink href="/~/admin">Edit</SmartLink> : ""}
    </Row>
  </Column>
);
interface EduData {
  metadata: Record<string, any>;
  containers: Array<any>; 
}

export default function EduPage() {
  const [pageSlug, setPageSlug] = useState("");
  const [eduData, setEduData] = useState<EduData | null>(null);
  // 1. Get the slug from the URL
  useEffect(() => {
    const pathName = window.location.pathname;
    const slug = pathName.split("/").pop();
    if (slug) setPageSlug(slug);
  }, []);

  // 2. Fetch data ONLY when pageSlug is ready
  useEffect(() => {
    if (!pageSlug) return; // Don't fetch if slug isn't set yet

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("edu")
        .select("mdx")
        .eq("slug", pageSlug)
        .maybeSingle();

      if (error) {
        console.error("Supabase Error:", error);
      } else if (data?.mdx) {
        // Parse the raw MDX string from DB into your JSON structure
        const parsed = parseMDXToDynamicJSON(data.mdx);
        setEduData(parsed);
        console.log(parsed);
      }
    };

    fetchData();
  }, [pageSlug]); // This ensures it runs as soon as pageSlug is updated

  function LoadingMetaData() {
    return (
      <>
        {" "}
        <Column gap="20">
          {" "}
          <Skeleton shape="line" delay="1" width="xs" height="xs" />
          <Skeleton
            shape="block"
            delay="3"
            width="s"
            maxWidth={32}
            minHeight="80"
          />{" "}
          <Skeleton shape="line" delay="2" width="m" height="s" />
          <Row gap="20" maxWidth={12}>
            {" "}
            <Skeleton shape="line" delay="3" width="xs" height="s" />
            <Skeleton shape="line" delay="1" width="xs" height="s" />
          </Row>
        </Column>
      </>
    );
  }

  function LoadingContent() {
    return (
      <>
        <Column gap="48">
          <Column gap="20" fillWidth>
            {" "}
            <Skeleton
              shape="block"
              delay="3"
              width="s"
              maxWidth={32}
              fillWidth
              minHeight="32"
            />{" "}
            <Skeleton shape="line" delay="1" fillWidth height="m" width="xl" />
            <Skeleton shape="line" delay="3" fillWidth height="m" width="xl" />
            <Skeleton shape="line" delay="2" fillWidth height="m" width="xl" />
            <Skeleton shape="line" delay="1" fillWidth height="m" width="xl" />
            <Skeleton shape="line" delay="3" fillWidth height="m" width="xl" />
          </Column>
          <Column gap="20" fillWidth>
            {" "}
            <Skeleton
              shape="block"
              delay="3"
              width="s"
              maxWidth={32}
              fillWidth
              minHeight="32"
            />
            <Row fillWidth wrap gap="20">
              {" "}
              {Array.from({ length: 10 }, (_, index) => (
                <Skeleton
                  key={index}
                  shape="line"
                  delay="2"
                  height="m"
                  width={"xs"}
                  maxWidth={Math.floor(Math.random() * 56) + 1}
                />
              ))}
            </Row>
          </Column>
        </Column>
      </>
    );
  }

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchSessionId = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", session.user.id)
          .single();
        if (data) {
          setIsAdmin(data.is_admin);
        }
        if (error) {
          console.error("Error fetching session id:", error);
        }
      }
    };
    fetchSessionId();
  }, []);

  return (
    <Column
      fillWidth
      vertical="start"
      horizontal="center"
      padding="m"
      onBackground="neutral-strong"
    >
      <Navbar />
      <Flex height={"64"} />

      <Column fillWidth vertical="start" maxWidth={"l"} gap="40">
        {eduData ? (
          <RenderMetadata
            slug={eduData.metadata.slug}
            updatedAt={eduData.metadata.updatedAt}
            name={eduData.metadata.name}
            type={eduData.metadata.type}
            isAdmin={isAdmin}
          />
        ) : (
          <LoadingMetaData />
        )}
        <Row fillWidth horizontal="between" gap="40">
          <Column gap="48" fillWidth id="paddingRightContainerEdu">
            <Line fillWidth />
            {eduData ? (
              <>
                {" "}
                {eduData.containers.map((container: Section) => (
                  <Column
                    key={container.section}
                    id={container.heading.id}
                    gap="20"
                  >
                    <RenderHeading {...container.heading} />
                    <Column gap="32" fillWidth>
                      {container.content.map((item, index) => (
                        <React.Fragment key={index}>
                          {renderContent(item, container.section)}
                        </React.Fragment>
                      ))}
                    </Column>
                  </Column>
                ))}
              </>
            ) : (
              <LoadingContent />
            )}
          </Column>
          {eduData?.containers ? (
            <HeadingNav
              width={12}
              position="sticky"
              top="64"
              fitHeight
              id="headingNavMe"
              data-scaling="110"
            />
          ) : (
            <></>
          )}

          {eduData ? (
            <></>
          ) : (
            <HeadingNav
              width={12}
              position="sticky"
              top="64"
              fitHeight
              id="headingNavMe"
              data-scaling="110"
              style={{ opacity: "0" }}
            />
          )}
        </Row>
      </Column>
      <Flex height={3} />
    </Column>
  );
}
