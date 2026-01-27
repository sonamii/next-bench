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

const geist = Geist({ subsets: ["latin"] });
const mono = DM_Mono({
  subsets: ["latin"],
  weight: "300",
});

const companyLogo =
  "https://media.licdn.com/dms/image/v2/D560BAQFyPNfJhr3kZw/company-logo_100_100/B56Zs1v9oTKIAM-/0/1766133325738?e=1770854400&v=beta&t=c7QJ4ZxcL1Q7BexaTjs_hyBo8SWCDgPMQA0BUDl5WlQ";
export default function Home() {
  const [user, setUser] = useState([
    {
      name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      country: "",
      goal: "",
      universities: [],
    },
  ]);



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
            <Text variant="heading-default-m">Account settings</Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              Manage account and your personal information.
            </Text>
          </Column>
          <Line fillWidth></Line>
        </Column>

        <Row fillWidth horizontal="between" vertical="start">
          <Column fillWidth paddingRight="32" gap="16">
            <HeadingLink as="h2" id="example-section" marginY="xs">
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
            <Line fillWidth marginTop="s" />
            <HeadingLink as="h2" id="example-section" marginY="xs">
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
                    variant="danger"
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
            <HeadingLink as="h2" id="example-section" marginY="xs">
              Goal
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
                    Submit us your goal, and we will guide you to achieve it.
                  </Text>
                </Column>
                <Column fillWidth gap="16">
                  <Textarea
                    id="goal"
                    placeholder="Describe your goal"
                    characterCount
                    maxLength={500}
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
