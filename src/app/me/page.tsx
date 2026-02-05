"use client";
import "@/resources/custom.css";
import Lenis from "lenis";

import {
  Text,
  Button,
  Column,
  Line,
  Flex,
  Row,
  Icon,
  
  Input,
 
  HeadingNav,
  HeadingLink,

  Textarea,
  useToast,
  Spinner,
} from "@once-ui-system/core";
import  { useState } from "react";
import { Navbar } from "../components/(global)/navbar";
import supabase from "../supabase/client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";




export default function Me() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: 0,
    city: "",
    state: "",
    country: "",
    goal: "",
    university1: "",
    university2: "",
    university3: "",
    isAdmin: false,
  });
  const router = useRouter();
  const [user_id, setUser_Id] = useState("");
  const { addToast } = useToast();
  const [isUserDataAvailable, setIsUserDataAvailable] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        setUser_Id(session.user.id);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!user_id) return;
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session || !session.user) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      if (data) {
        setUser({
          name: (data?.name || "") as string,
          email: (data?.email || session.user.email || "") as string,
          phone: Number(data?.phone),
          city: (data?.city ||
            session.user.user_metadata?.city ||
            "") as string,
          state: (data?.state ||
            session.user.user_metadata?.state ||
            "") as string,
          country: (data?.country ||
            session.user.user_metadata?.country ||
            "") as string,
          goal: data?.goal || "",
          university1: (data?.universities?.[0] || "") as string,
          university2: (data?.universities?.[1] || "") as string,
          university3: (data?.universities?.[2] || "") as string,
          isAdmin: data?.is_admin || false,
        });
        setIsUserDataAvailable(true);
      }
      if (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [user_id]);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session || !session.user) {
        router.replace("/auth");
      }
    };
    checkSession();
  }, [router]);

  const savePersonalDetailsToSupabase = async () => {
    const { data, error } = await supabase.from("profiles").upsert([
      {
        id: user_id,
        name: user.name,
        email: user.email,
        city: user.city,
        state: user.state,
        country: user.country,
        phone: user.phone,
      },
    ]);
    if (error) {
      console.error("Error saving profile:", error);
      addToast({
        variant: "danger",
        message: "Profile was not saved",
      });
    } else {
      console.log("Profile saved:", data);
      addToast({
        variant: "success",
        message: "Profile was saved",
      });
    }
  };

  const saveGoalsToSupabase = async () => {
    const { data, error } = await supabase.from("profiles").upsert([
      {
        id: user_id,
        goal: user.goal,
        universities: [user.university1, user.university2, user.university3],
      },
    ]);
    if (error) {
      console.error("Error saving goals:", error);
      addToast({
        variant: "danger",
        message: "Goals were not saved",
      });
    } else {
      console.log("Goals saved:", data);
      addToast({
        variant: "success",
        message: "Goals were saved",
      });
    }
  };

  const handleLogOutFromSupabase = async () => {
    await supabase.auth.signOut();
    router.replace("/auth");
  };

  return (
    <Column
      fillWidth
      vertical="start"
      horizontal="center"
      padding="m"
      onBackground="neutral-strong"
    >
      <Navbar />
      <Flex height={"64"}></Flex>
      <Column fillWidth vertical="start" maxWidth={"l"} gap="20">
        <Column fillWidth gap="20" horizontal="start">
          <Column gap="4">
            {" "}
            <Text variant="heading-default-m">Account dashboard</Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Manage account and your personal information.
            </Text>
          </Column>
          <Line fillWidth></Line>
        </Column>

        <Row fillWidth horizontal="between" vertical="start">
          <Column fillWidth gap="16" id="paddingRightContainer">
            {user.isAdmin ? (
              <Column fillWidth gap="16">
                <HeadingLink as="h2" id="admin-panel" marginY="xs">
                  Admin Panel
                </HeadingLink>
                <Row padding="1" radius="l" border="neutral-weak" fillWidth>
                  <Row
                    fillWidth
                    vertical="center"
                    padding="40"
                    radius="l"
                    border="neutral-medium"
                    id="containerMe"
                  >
                    <Column gap="12" horizontal="start" fillWidth>
                      {" "}
                      <Text variant="heading-default-s">Admin Panel</Text>
                      <Text
                        variant="body-default-s"
                        onBackground="neutral-weak"
                      >
                        Edit, add, update or delete items from the database.
                      </Text>
                    </Column>
                    <Column fillWidth horizontal='end'>
                      <Button size="l" fillWidth onClick={() => router.push("/~/admin")}>
                        <Text variant="body-default-m">Go to Admin Panel</Text>
                      </Button>
                    </Column>
                  </Row>
                </Row>
              </Column>
            ) : null}
            <HeadingLink as="h2" id="personal-details" marginY="xs">
              Personal Details
            </HeadingLink>
            <Row padding="1" radius="l" border="neutral-weak" fillWidth>
              <Row
                fillWidth
                vertical="center"
                padding="40"
                radius="l"
                border="neutral-medium"
                id="containerMe"
              >
                <Column gap="12" horizontal="start" fillWidth>
                  {" "}
                  <Text variant="heading-default-s">Your Name</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Please enter a display name you are comfortable with.
                  </Text>
                </Column>
                <Column fillWidth>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    characterCount
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    maxLength={50}
                    hasPrefix={
                      isUserDataAvailable ? (
                        <Icon
                          name="userOutline"
                          size="xs"
                          onBackground="neutral-weak"
                        />
                      ) : (
                        <Spinner />
                      )
                    }
                    height="m"
                    spellCheck={false}
                  ></Input>
                </Column>
              </Row>
            </Row>
            {/*  */}
            <Row padding="1" radius="l" border="neutral-weak" fillWidth>
              <Row
                fillWidth
                vertical="center"
                padding="40"
                radius="l"
                id="containerMe"
                border="neutral-medium"
              >
                <Column gap="12" horizontal="start" fillWidth>
                  {" "}
                  <Text variant="heading-default-s">Your Email</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Please enter a valid email address.
                  </Text>
                </Column>
                <Column fillWidth>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    characterCount
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    hasPrefix={
                      isUserDataAvailable ? (
                        <Icon name="at" size="xs" onBackground="neutral-weak" />
                      ) : (
                        <Spinner />
                      )
                    }
                    maxLength={100}
                    height="m"
                    spellCheck={false}
                  ></Input>
                </Column>
              </Row>
            </Row>
            {/*  */}
            <Row padding="1" radius="l" border="neutral-weak" fillWidth>
              <Row
                fillWidth
                vertical="center"
                padding="40"
                id="containerMe"
                radius="l"
                border="neutral-medium"
              >
                <Column gap="12" horizontal="start" fillWidth>
                  {" "}
                  <Text variant="heading-default-s">
                    Your Phone Number (Optional)
                  </Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Please provide a valid phone number.
                  </Text>
                </Column>
                <Column fillWidth>
                  <Row>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      hasPrefix={
                        isUserDataAvailable ? (
                          <Icon
                            name="phone"
                            size="xs"
                            onBackground="neutral-weak"
                          />
                        ) : (
                          <Spinner />
                        )
                      }
                      characterCount
                      value={Number(user.phone)}
                      onChange={(e) =>
                        setUser({ ...user, phone: Number(e.target.value) })
                      }
                      height="m"
                      spellCheck={false}
                    ></Input>
                  </Row>
                </Column>
              </Row>
            </Row>
            {/*  */}
            <Row padding="1" radius="l" border="neutral-weak" fillWidth>
              <Row
                fillWidth
                vertical="center"
                id="containerMe"
                padding="40"
                radius="l"
                border="neutral-medium"
              >
                <Column gap="12" horizontal="start" fillWidth>
                  {" "}
                  <Text variant="heading-default-s">City</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Please enter your city.
                  </Text>
                </Column>
                <Column fillWidth>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    characterCount
                    maxLength={50}
                    value={user.city}
                    onChange={(e) => setUser({ ...user, city: e.target.value })}
                    hasPrefix={
                      isUserDataAvailable ? (
                        <Icon
                          name="location"
                          size="xs"
                          onBackground="neutral-weak"
                        />
                      ) : (
                        <Spinner />
                      )
                    }
                    height="m"
                    spellCheck={false}
                  ></Input>
                </Column>
              </Row>
            </Row>
            {/*  */}
            <Row padding="1" radius="l" border="neutral-weak" fillWidth>
              <Row
                fillWidth
                id="containerMe"
                vertical="center"
                padding="40"
                radius="l"
                border="neutral-medium"
              >
                <Column gap="12" horizontal="start" fillWidth>
                  {" "}
                  <Text variant="heading-default-s">State</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Please enter your state.
                  </Text>
                </Column>
                <Column fillWidth>
                  <Input
                    id="state"
                    placeholder="Enter your state"
                    value={user.state}
                    onChange={(e) =>
                      setUser({ ...user, state: e.target.value })
                    }
                    hasPrefix={
                      isUserDataAvailable ? (
                        <Icon
                          name="location"
                          size="xs"
                          onBackground="neutral-weak"
                        />
                      ) : (
                        <Spinner />
                      )
                    }
                    characterCount
                    maxLength={50}
                    height="m"
                    spellCheck={false}
                  ></Input>
                </Column>
              </Row>
            </Row>
            <Row padding="1" radius="l" border="neutral-weak" fillWidth>
              <Row
                fillWidth
                vertical="center"
                padding="40"
                id="containerMe"
                radius="l"
                border="neutral-medium"
              >
                <Column gap="12" horizontal="start" fillWidth>
                  {" "}
                  <Text variant="heading-default-s">Country</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Please enter your country.
                  </Text>
                </Column>
                <Column fillWidth>
                  <Input
                    id="country"
                    placeholder="Enter your country"
                    value={user.country}
                    onChange={(e) =>
                      setUser({ ...user, country: e.target.value })
                    }
                    hasPrefix={
                      isUserDataAvailable ? (
                        <Icon
                          name="location"
                          size="xs"
                          onBackground="neutral-weak"
                        />
                      ) : (
                        <Spinner />
                      )
                    }
                    characterCount
                    maxLength={50}
                    height="m"
                    spellCheck={false}
                  ></Input>
                </Column>
              </Row>
            </Row>
            <Row fillWidth horizontal="end">
              <Button size="l" onClick={savePersonalDetailsToSupabase}>
                <Text variant="body-default-m">Save Changes</Text>
              </Button>
            </Row>
            <Line fillWidth marginTop="s" />
            <HeadingLink as="h2" id="goals" marginY="xs">
              Goals
            </HeadingLink>
            <Row padding="1" radius="l" border="neutral-weak" fillWidth>
              <Row
                fillWidth
                vertical="start"
                id="containerMe"
                padding="40"
                radius="l"
                border="neutral-medium"
              >
                <Column gap="12" horizontal="start" fillWidth>
                  {" "}
                  <Text variant="heading-default-s">Your Goal</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Submit us your goals, and we will guide you to achieve it.
                  </Text>
                </Column>
                <Column fillWidth gap="16">
                  <Textarea
                    id="goal"
                    placeholder="Describe your goal"
                    characterCount
                    maxLength={500}
                    value={user.goal}
                    onChange={(e) => setUser({ ...user, goal: e.target.value })}
                    lines={"auto"}
                    spellCheck={false}
                    description="Enter your dream university below"
                  ></Textarea>

                  <Column fillWidth>
                    {" "}
                    <Input
                      id="uni1"
                      placeholder="University 1"
                      characterCount
                      value={user.university1}
                      onChange={(e) =>
                        setUser({ ...user, university1: e.target.value })
                      }
                      hasPrefix={
                        isUserDataAvailable ? (
                          <Icon
                            name="school"
                            size="xs"
                            onBackground="neutral-weak"
                          />
                        ) : (
                          <Spinner />
                        )
                      }
                      maxLength={100}
                      radius="top"
                      height="m"
                      spellCheck={false}
                    ></Input>{" "}
                    <Input
                      id="uni2"
                      placeholder="University 2"
                      characterCount
                      value={user.university2}
                      onChange={(e) =>
                        setUser({ ...user, university2: e.target.value })
                      }
                      radius="none"
                      hasPrefix={
                        isUserDataAvailable ? (
                          <Icon
                            name="school"
                            size="xs"
                            onBackground="neutral-weak"
                          />
                        ) : (
                          <Spinner />
                        )
                      }
                      maxLength={100}
                      height="m"
                      spellCheck={false}
                    ></Input>{" "}
                    <Input
                      id="uni3"
                      placeholder="University 3"
                      radius="bottom"
                      characterCount
                      value={user.university3}
                      onChange={(e) =>
                        setUser({ ...user, university3: e.target.value })
                      }
                      hasPrefix={
                        isUserDataAvailable ? (
                          <Icon
                            name="school"
                            size="xs"
                            onBackground="neutral-weak"
                          />
                        ) : (
                          <Spinner />
                        )
                      }
                      maxLength={100}
                      height="m"
                      spellCheck={false}
                    ></Input>
                  </Column>
                </Column>
              </Row>
            </Row>{" "}
            <Row fillWidth horizontal="end">
              <Button size="l" onClick={saveGoalsToSupabase}>
                <Text variant="body-default-m">Save Changes</Text>
              </Button>
            </Row>
            <Line fillWidth marginTop="s" />
            <HeadingLink as="h2" id="roadmaps" marginY="xs">
              Roadmaps
            </HeadingLink>
            <Row padding="1" radius="l" border="neutral-weak" fillWidth>
              <Row
                fillWidth
                vertical="start"
                padding="40"
                radius="l"
                id="containerMe"
                border="neutral-medium"
              >
                <Column gap="12" horizontal="start" fillWidth>
                  {" "}
                  <Text variant="heading-default-s">Generate Roadmap</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Create a personalized roadmap for your goals.
                  </Text>
                </Column>
                <Column fillWidth gap="12">
                  <Button
                    fillWidth
                    size="l"
                    disabled
                    variant="secondary"
                    style={{ opacity: "0.7" }}
                  >
                    <Text variant="body-default-m">
                      This feature is currently not available
                    </Text>
                  </Button>
                </Column>
              </Row>
            </Row>
            <Line fillWidth marginTop="s" />
            <HeadingLink as="h2" id="roadmaps" marginY="xs">
              Deletion
            </HeadingLink>
            <Row padding="1" radius="l" border="neutral-weak" fillWidth>
              <Row
                fillWidth
                vertical="center"
                id="containerMe"
                padding="40"
                radius="l"
                border="neutral-medium"
              >
                <Column gap="12" horizontal="start" fillWidth>
                  {" "}
                  <Text variant="heading-default-s">Logout</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    Click the button to logout safely.
                  </Text>
                </Column>
                <Column fillWidth horizontal="end">
                  <Button
                    size="l"
                    variant="danger"
                    onClick={handleLogOutFromSupabase}
                  >
                    <Text variant="body-default-m">Logout</Text>
                  </Button>
                </Column>
              </Row>
            </Row>
          </Column>
          <HeadingNav
            width={12}
            position="sticky"
            top="64"
            fitHeight
            id="headingNavMe"
            data-scaling="110"
          />
        </Row>
      </Column>
    </Column>
  );
}
