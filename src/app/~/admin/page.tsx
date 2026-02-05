"use client";

import "@/resources/custom.css";

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
  useToast,
  Textarea,
  SmartLink,
  StatusIndicator,
  Option,
  DropdownWrapper,
  Dialog,
  TagInput,
  Spinner,
  Particle,
} from "@once-ui-system/core";

import { useState, useEffect } from "react";

import { Navbar } from "@/app/components/(global)/navbar";

import supabase from "@/app/supabase/client";

import { useRouter } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

export default function Admin() {
  const router = useRouter();

  const { addToast } = useToast();

  const [isAdmin, setIsAdmin] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // Move all other hooks to the top before any conditional logic

  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState("new");

  const [searchQuery, setSearchQuery] = useState("");

  const [eduAdminDetails, setEduAdminDetails] = useState<{
    slug: string;

    mdx: string;

    ratings: number;

    desc: string;

    name: string;

    id: string;

    tags: string[];

    city: string;

    state: string;
  }>({
    slug: "",

    mdx: "",

    ratings: 0,

    desc: "",

    name: "",

    id: uuidv4(),

    tags: ["TEMP"],

    city: "",

    state: "",
  });

  const [options, setOptions] = useState<
    { label: string; value: string; description?: string }[]
  >([]);

  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Check admin authentication on component mount

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session || !session.user) {
          router.replace("/not-found");

          return;
        }

        const { data, error } = await supabase

          .from("profiles")

          .select("is_admin")

          .eq("id", session.user.id)

          .single();

        if (error || !data?.is_admin) {
          console.error("Access denied: User is not an admin");

          router.replace("/not-found"); // Redirect to 404 page

          return;
        }

        setIsAdmin(true);
      } catch (error) {
        console.error("Error checking admin access:", error);

        router.replace("/not-found");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [router]);

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

        async (payload) => {
          // Fetch data again

          const { data, error } = await supabase

            .from("edu")

            .select("slug, mdx, ratings, desc,name,city,state,tags");

          if (error) {
            console.error("Error fetching data:", error);
          } else {
            const newOptions = data.map((option) => ({
              label: option.slug,

              value: option.slug,

              description: option.name,
            }));

            setOptions(newOptions);

            setOptions((prevOptions) => [
              {
                label: "add-new",

                value: "new",

                description: "Add a new institute",
              },

              ...newOptions,
            ]);

            console.log(newOptions);
          }
        },
      )

      .subscribe();

    // Clean up the subscription on unmount

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Show loading spinner while checking authentication

  if (isLoading) {
    return (
      <Column
        fillWidth
        fillHeight
        vertical="center"
        horizontal="center"
        style={{ minHeight: "100vh" }}
      >
        <Particle
          fill
          style={{
            width: "100vw",

            height: "100vh",

            position: "absolute",

            zIndex: -1,
          }}
          speed={2}
        />

        <Spinner size="xl" />
      </Column>
    );
  }

  // Don't render anything if not admin (will be redirected to 404)

  if (!isAdmin) {
    return null;
  }

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

        tags: [],

        city: "",

        state: "",
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

  const saveEduToSupabase = async () => {
    if (
      !eduAdminDetails.slug ||
      !eduAdminDetails.mdx ||
      !eduAdminDetails.desc ||
      !eduAdminDetails.name
    ) {
      addToast({
        message: "Please fill in all required fields",

        variant: "danger",
      });

      return;
    } else {
      try {
        const { data, error } = await supabase.from("edu").upsert([
          {
            id: eduAdminDetails.id,

            slug: eduAdminDetails.slug

              .trim()

              .toLowerCase()

              .replace(/\s+/g, "-"),

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

          addToast({
            message: "Failed to save education data",

            variant: "danger",
          });
        } else {
          console.log("Edu saved:", data);

          addToast({
            message: "Education data saved successfully",

            variant: "success",
          });
        }
      } catch (error) {
        console.error("Error saving edu:", error);

        addToast({
          message: "Failed to save education data",

          variant: "danger",
        });
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

        addToast({
          message: "Failed to delete education data",

          variant: "danger",
        });
      } else {
        console.log("Edu deleted:", data);

        addToast({
          message: "Education data deleted successfully",

          variant: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting edu:", error);

      addToast({
        message: "Failed to delete education data",

        variant: "danger",
      });
    }
  };

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

        <Column fillWidth vertical="start" maxWidth={"l"} gap="32">
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

            <SmartLink href="/me">Back</SmartLink>
          </Column>
          <Line fillWidth></Line>
          <Row fillWidth gap="32" id="adminRowEdit">
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
              <Row gap="20" id="nameSlugRatingContainer">
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
                <Row gap="20" id="slugRatingContainer" fillWidth>
                  {" "}
                  <Input
                    id="slug"
                    placeholder="Slug"
                    description="Short slug"
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
                  <Input
                    id="ratings"
                    placeholder="Ratings"
                    description="Approved rating"
                    value={eduAdminDetails.ratings?.toString() || ""}
                    spellCheck={false}
                    error={
                      eduAdminDetails.ratings === null ||
                      eduAdminDetails.ratings === undefined
                    }
                    onChange={(e) =>
                      setEduAdminDetails({
                        ...eduAdminDetails,

                        ratings: Number(e.target.value) || 0,
                      })
                    }
                    required
                    min={0}
                    max={5}
                  ></Input>
                </Row>
              </Row>
              <Row gap="20" id="cityStateContainer">
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
                ></Input>{" "}
                <Input
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
                onChange={(e) =>
                  setEduAdminDetails({ ...eduAdminDetails, tags: e })
                }
                description="Tags for this educational institute"
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
                description="A brief description of this educational institute"
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
                    id="eduDropButton"
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
        title="Confirm deletion?"
      >
        <Column fillWidth gap="16">
          <Text variant="body-default-m" onBackground="neutral-weak">
            Are you sure you want to delete this?
          </Text>

          <Row fillWidth vertical="center" gap="8" horizontal="start">
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
      >
        <Column fillWidth gap="16">
          <Text variant="body-default-m" onBackground="neutral-weak">
            Are you sure you want to save this?
          </Text>

          <Row fillWidth vertical="center" gap="8" horizontal="start">
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
