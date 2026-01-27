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
} from "@once-ui-system/core";
import { Geist, DM_Mono } from "next/font/google";
import React, { useState } from "react";
import { Navbar } from "../components/(global)/navbar";
import supabase from "../supabase/client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const geist = Geist({ subsets: ["latin"] });
const mono = DM_Mono({
  subsets: ["latin"],
  weight: "300",
});

const lenis = new Lenis({
  autoRaf: true,
});


const companyLogo =
  "https://media.licdn.com/dms/image/v2/D560BAQFyPNfJhr3kZw/company-logo_100_100/B56Zs1v9oTKIAM-/0/1766133325738?e=1770854400&v=beta&t=c7QJ4ZxcL1Q7BexaTjs_hyBo8SWCDgPMQA0BUDl5WlQ";
export default function Home() {
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
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        const { user } = session;
        setUser({
          name: (user?.user_metadata?.full_name || "") as string,
          email: (user?.email || "") as string,
          phone: (user?.user_metadata?.phone || "") as number,
          city: (user?.user_metadata?.city || "") as string,
          state: (user?.user_metadata?.state || "") as string,
          country: (user?.user_metadata?.country || "") as string,
          goal: "",
          university1: (user?.user_metadata?.university1 || "") as string,
          university2: (user?.user_metadata?.university2 || "") as string,
          university3: (user?.user_metadata?.university3 || "") as string,
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) {
        router.replace("/auth");
      }
    };
    checkSession();
  }, [router]);

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
          <Column gap="12">
            {" "}
            <Text variant="heading-default-m">Account dashboard</Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Manage account and your personal information.
            </Text>
          </Column>
          <Line fillWidth></Line>
        </Column>

        <Row fillWidth horizontal="between" vertical="start">
          <Column fillWidth paddingRight="32" gap="16">
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
                      <Icon
                        name="userOutline"
                        size="xs"
                        onBackground="neutral-weak"
                      />
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
                      <Icon name="at" size="xs" onBackground="neutral-weak" />
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
                    <NumberInput
                      id="phone"
                      placeholder="Enter your phone number"
                      hasPrefix={
                        <Icon
                          name="phone"
                          size="xs"
                          onBackground="neutral-weak"
                        />
                      }
                      characterCount
                      value={user.phone}
                      onChange={(e) => setUser({ ...user, phone: e })}
                      height="m"
                      spellCheck={false}
                    ></NumberInput>
                  </Row>
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
                      <Icon
                        name="location"
                        size="xs"
                        onBackground="neutral-weak"
                      />
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
                      <Icon
                        name="location"
                        size="xs"
                        onBackground="neutral-weak"
                      />
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
                      <Icon
                        name="location"
                        size="xs"
                        onBackground="neutral-weak"
                      />
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
              <Button size="l">
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
                        <Icon
                          name="school"
                          size="xs"
                          onBackground="neutral-weak"
                        />
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
                        <Icon
                          name="school"
                          size="xs"
                          onBackground="neutral-weak"
                        />
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
                        <Icon
                          name="school"
                          size="xs"
                          onBackground="neutral-weak"
                        />
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
              <Button size="l">
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
          </Column>
          <HeadingNav
            width={12}
            position="sticky"
            top="64"
            fitHeight
            data-scaling="110"
          />
        </Row>
      </Column>
    </Column>
  );
}
