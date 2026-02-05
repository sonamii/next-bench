"use client";
import "@/resources/custom.css";
import Lenis from "lenis";
import { parseMDXToDynamicJSON } from "../../../../../next-parser/parser.js";

import {
  Text,
  Button,
  Column,
  Line,
  Flex,
  Row,
  Icon,
  Kbd,
  IconButton,
  Input,
  ThemeSwitcher,
  AvatarGroup,
  HeadingNav,
  HeadingLink,
  NumberInput,
  Select,
  Textarea,
  useToast,
  Spinner,
  List,
  ListItem,
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
  StatusIndicator,
  Option,
  DropdownWrapper,
  Dialog,
  TagInput,
} from "@once-ui-system/core";
import { Geist, DM_Mono } from "next/font/google";
import React, { useState } from "react";
import { Navbar } from "@/app/components/(global)/navbar";
import supabase from "@/app/supabase/client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "@/app/components/(global)/footer";
import { v4 as uuidv4 } from "uuid";

const geist = Geist({ subsets: ["latin"] });
const mono = DM_Mono({
  subsets: ["latin"],
  weight: "300",
});

const lenis = new Lenis({
  autoRaf: true,
});

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [eduAdminDetails, setEduAdminDetails] = useState<{
    slug: string;
    mdx: string;
    ratings: number;
    desc: string;
    name: string;
    id: string;
    tags:string[],
    city:string,
    state:string
  }>({
    slug: "",
    mdx: "",
    ratings: 0,
    desc: "",
    name: "",
    id: uuidv4(),
    tags:["best"],
    city:"",
    state:""
  });

  const [options, setOptions] = useState<
    { label: string; value: string; description?: string }[]
  >([]);

  useEffect(() => {
    supabase
      .from("edu")
      .select("slug, mdx, ratings, desc,name")
      .then(({ data }) => {
        if (data) {
          setOptions(
            data.map((item) => ({
              label: item.slug,
              value: item.slug,
              description: item.name,
            })),
          );
          setOptions((prevOptions) => [
            {
              label: "add-new",
              value: "new",
              description: "Add a new institute",
            },
            ...prevOptions.filter((option) => option.value !== "new"),
          ]);
        }
      });
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    console.log(value);

    if (value === "new") {
      setEduAdminDetails({
        slug: "",
        mdx: "",
        ratings: 0,
        desc: "",
        name: "",
        id: uuidv4(),
        tags:[],
        city:"",
        state:""
      });
    } else {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("edu")
          .select("slug, mdx, ratings, desc,name,id,city,state,tags")
          .eq("slug", value)
          .single();
        if (error) {
          console.error("Error fetching details:", error);
        } else if (data) {
          const tags = data.tags.split(",");
          setEduAdminDetails({
            ...data,
            tags,
          });
        }
      };
      fetchData();
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatMDX = () => {
    console.log("Formatting started");
  };

  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const saveEduToSupabase = async () => {
    if (
      !eduAdminDetails.slug ||
      !eduAdminDetails.mdx ||
      !eduAdminDetails.desc ||
      !eduAdminDetails.name
    ) {
      console.error("Error saving edu: One or more fields are empty");
    } else {
      try {
        const { data, error } = await supabase.from("edu").upsert([
          {
            id: eduAdminDetails.id,
            slug: eduAdminDetails.slug,
            mdx: eduAdminDetails.mdx,
            ratings: eduAdminDetails.ratings,
            desc: eduAdminDetails.desc,
            name: eduAdminDetails.name,
            tags: eduAdminDetails.tags.join(","),
            city: eduAdminDetails.city,
            state: eduAdminDetails.state,
          },
        ]);
        if (error) {
          console.error("Error saving edu:", error);
        } else {
          console.log("Edu saved:", data);
        }
      } catch (error) {
        console.error("Error saving edu:", error);
      }
    }
  };

  const deleteEduFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from("edu")
        .delete()
        .eq("id", eduAdminDetails.id);
      if (error) {
        console.error("Error deleting edu:", error);
      } else {
        console.log("Edu deleted:", data);
      }
    } catch (error) {
      console.error("Error deleting edu:", error);
    }
  };

  useEffect(() => {
    const subscription = supabase
      .channel("edu-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "edu",
        },
        (payload) => {
          if (
            payload.eventType === "INSERT" &&
            payload.new &&
            typeof payload.new === "object" &&
            "name" in payload.new &&
            "description" in payload.new
          ) {
            // Handle new item insertion
            const newOptions = options.concat({
              label: payload.new.slug || payload.new.name,
              value: payload.new.slug || payload.new.name,
              description: payload.new.name,
            });
            setOptions(newOptions);
          } else if (
            payload.eventType === "DELETE" &&
            payload.old &&
            typeof payload.old === "object" &&
            "slug" in payload.old
          ) {
            // Handle item deletion
            setOptions((prevOptions) =>
              prevOptions.filter((option) => option.value !== payload.old.slug),
            );
          } else if (
            payload.eventType === "UPDATE" &&
            payload.new &&
            typeof payload.new === "object" &&
            "name" in payload.new &&
            "description" in payload.new
          ) {
            // Handle item update
            setOptions((prevOptions) =>
              prevOptions.map((option) =>
                option.value === (payload.new.slug || payload.new.name)
                  ? {
                      label: payload.new.slug || payload.new.name,
                      value: payload.new.slug || payload.new.name,
                      description: payload.new.name,
                    }
                  : option,
              ),
            );
          }
        },
      )
      .subscribe();

    // Clean up the subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [options]);

  return (
    <>
      <Column
        fillWidth
        vertical="start"
        horizontal="center"
        padding="m"
        onBackground="neutral-strong"
      >
        <Navbar />
        <Flex height={"64"} />

        <Column fillWidth vertical="start" maxWidth={"l"} gap="56">
          <Column fillWidth gap="12" id={"slug"}>
            <Text variant="body-default-m" onBackground="neutral-medium">
              Admin Panel
            </Text>
            <Text variant="display-strong-m">Active</Text>
            <Row gap="12" vertical="center">
              <Text variant="body-default-l" onBackground="neutral-weak">
                All systems operational
              </Text>
              <StatusIndicator size="m" color="green" />
            </Row>
          </Column>
          <Line fillWidth></Line>
          <Row fillWidth gap="32">
            <Column fillWidth gap="20">
              <Input
                id="id"
                placeholder="ID (generated automatically)"
                value={eduAdminDetails.id || ""}
                description="Unique ID of the university"
                disabled
                spellCheck={false}
                error={eduAdminDetails.id === ""}
                onChange={(e) =>
                  setEduAdminDetails({ ...eduAdminDetails, id: e.target.value })
                }
                required
              ></Input>{" "}
              <Row gap="20">
                {" "}
                <Input
                  id="name"
                  placeholder="Name"
                  description="The name of the university"
                  value={eduAdminDetails.name}
                  spellCheck={false}
                  error={eduAdminDetails.name === ""}
                  required
                  onChange={(e) =>
                    setEduAdminDetails({
                      ...eduAdminDetails,
                      name: e.target.value,
                    })
                  }
                ></Input>{" "}
                <Input
                  id="slug"
                  placeholder="Slug"
                  description="A short memorizable name for this educational university"
                  value={eduAdminDetails.slug}
                  spellCheck={false}
                  error={eduAdminDetails.slug === ""}
                  onChange={(e) =>
                    setEduAdminDetails({
                      ...eduAdminDetails,
                      slug: e.target.value,
                    })
                  }
                  required
                ></Input>
                <NumberInput
                  id="ratings"
                  placeholder="Ratings"
                  description="Approved rating"
                  max={5}
                  value={eduAdminDetails.ratings}
                  spellCheck={false}
                  error={eduAdminDetails.ratings === null}
                  onChange={(e) =>
                    setEduAdminDetails({
                      ...eduAdminDetails,
                      ratings: Number(e),
                    })
                  }
                  required
                  style={{ maxWidth: "140px" }}
                ></NumberInput>
              </Row>
              <Row gap="20">
  <Input
                  id="city"
                  placeholder="City"
                  description="City in which the university is located"
                  value={eduAdminDetails.city}
                  spellCheck={false}
                  
                  error={eduAdminDetails.city === ""}
                  onChange={(e) =>
                    setEduAdminDetails({
                      ...eduAdminDetails,
                      city: e.target.value,
                    })
                  }
                  required
                ></Input>  <Input
                  id="state"
                  placeholder="State"
                  description="State in which the university is located"
                  value={eduAdminDetails.state}
                  spellCheck={false}
                  error={eduAdminDetails.state === ""}
                  onChange={(e) =>
                    setEduAdminDetails({
                      ...eduAdminDetails,
                      state: e.target.value,
                    })
                  }
                  required
                ></Input>

              </Row>
              <TagInput
                id="tags"
                value={eduAdminDetails.tags}
                onChange={(e) => setEduAdminDetails({ ...eduAdminDetails, tags: e })}
                description="Tags for this educational university"
                max={3}
                placeholder="Add tags"
                hasSuffix={
                  <Kbd position="absolute" top="12" right="12">
                    Enter
                  </Kbd>
                }
              />
              <Textarea
                id="description"
                placeholder="Description"
                description="A brief description of this educational university"
                value={eduAdminDetails.desc}
                lines={"auto"}
                spellCheck={false}
                onChange={(e) =>
                  setEduAdminDetails({
                    ...eduAdminDetails,
                    desc: e.target.value,
                  })
                }
                error={eduAdminDetails.desc === ""}
                required
              ></Textarea>
              <Textarea
                id="mdx"
                lines={"auto"}
                placeholder="MDX Content"
                description="The MDX content for this educational university"
                value={eduAdminDetails.mdx}
                spellCheck={false}
                error={eduAdminDetails.mdx === ""}
                onChange={(e) =>
                  setEduAdminDetails({
                    ...eduAdminDetails,
                    mdx: e.target.value,
                  })
                }
                required
                style={{ overflow: "hidden" }}
              >
                <IconButton
                  icon={"sparklesOutline"}
                  style={{ position: "absolute", top: "5.5px", right: "5px" }}
                  onClick={formatMDX}
                  size="l"
                ></IconButton>
              </Textarea>
              {!eduAdminDetails || selected !== "add-new" ? (
                <Row fillWidth horizontal="end" gap="20">
                  <Button
                    size="l"
                    variant="danger"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Row gap="8" center>
                      <Text variant="body-default-m">Delete</Text>
                      <Icon name="cross" size="s" />
                    </Row>
                  </Button>
                  <Button
                    size="l"
                    variant="primary"
                    onClick={() => setIsSaveDialogOpen(true)}
                  >
                    <Row gap="8" center>
                      <Text variant="body-default-m">Save</Text>
                      <Icon name="arrowTopRight" size="s" />
                    </Row>
                  </Button>
                </Row>
              ) : (
                ""
              )}
            </Column>
            <Row data-scaling="110" style={{ zIndex: "9999" }} fitHeight>
              <DropdownWrapper
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                minHeight={200}
                trigger={
                  <Button
                    variant="primary"
                    size="l"
                    suffixIcon="chevronDown"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <Text variant="body-default-m">
                      {/* 172px */}
                      {selected
                        ? options
                            .find((opt) => opt.value === selected)
                            ?.label.slice(0, 12)
                            .concat(selected.length > 12 ? "..." : "")
                        : "Search items"}
                    </Text>
                  </Button>
                }
                dropdown={
                  <Column fillWidth minWidth={12} maxWidth={20}>
                    <Column
                      padding="4"
                      fillWidth
                      position="sticky"
                      top="0"
                      background="surface"
                      zIndex={1}
                    >
                      <Input
                        height="s"
                        id="search-dropdown"
                        placeholder="Search"
                        hasPrefix={<Icon name="search" size="xs" />}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Column>
                    <Column fillWidth gap="2" padding="4">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                          <Option
                            key={option.value}
                            label={option.label}
                            value={option.value}
                            description={option.description}
                            selected={option.value === selected}
                            onClick={handleSelect}
                          />
                        ))
                      ) : (
                        <Flex fillWidth center paddingX="16" paddingY="32">
                          <Text>No results found</Text>
                        </Flex>
                      )}
                    </Column>
                  </Column>
                }
              />
            </Row>
          </Row>{" "}
          {/* <Footer /> */}
        </Column>
      </Column>

      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        title="Confirm save?"
        description="Are you sure you want to delete this?"
      >
        <Column fillWidth gap="16" marginTop="12">
          <Row fillWidth vertical="center" gap="8" horizontal="end">
            <Button
              variant="danger"
              size="l"
              onClick={() => {
                deleteEduFromSupabase();
                setIsDeleteDialogOpen(false);
              }}
            >
              <Text variant="body-default-m">Delete</Text>
            </Button>
          </Row>
        </Column>
      </Dialog>

      <Dialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        title="Confirm save?"
        description="Are you sure you want to save this?"
      >
        <Column fillWidth gap="16" marginTop="12">
          <Row fillWidth vertical="center" gap="8" horizontal="end">
            <Button
              variant="primary"
              size="l"
              onClick={() => {
                saveEduToSupabase();
                setIsSaveDialogOpen(false);
              }}
            >
              <Text variant="body-default-m">Save</Text>
            </Button>
          </Row>
        </Column>
      </Dialog>
    </>
  );
}
