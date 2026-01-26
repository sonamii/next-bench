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
} from "@once-ui-system/core";
import Image from "next/image";
import { Geist, DM_Mono } from "next/font/google";
import React, { useState } from "react";
import { SearchCard } from "../components/(main)/searchCard";

const institutions = [
  {
    institutionName: "IIT Ashram",
    institutionLogo: "https://iitashram.com/upload/logo.png",
    institutionLocation: "Vadodara, Gujarat",
    institutionRating: 5,
    institutionDescription: "At IIT Ashram we provide the best for...",
    institutionPopularity: ["Popular", "Best", "Approoved"],
  },
  {
    institutionName: "Admirality Tuitions",
    institutionLogo:
      "https://www.moe.gov.sg/api/media/d3feaf9f-9d70-42de-9078-d201aea80c9b/admiralty-primary-school.png",
    institutionLocation: "New York, USA",
    institutionRating: 4,
    institutionDescription: "We are the best university...",
    institutionPopularity: ["Popular"],
  },
  {
    institutionName: "FIITJEE",
    institutionLogo:
"https://p.urbanpro.com/tv-prod/member/photo/11185892-large.jpg",    institutionLocation: "London, UK",
    institutionRating: 3,
    institutionDescription: "FIITJEE is the best school...",
    institutionPopularity: ["Best", "Approoved"],
  },
];

export const institutionsData = JSON.stringify(institutions);


const lenis = new Lenis({
  autoRaf: true,
});
const geist = Geist({ subsets: ["latin"] });
const mono = DM_Mono({
  subsets: ["latin"],
  weight: "300",
});

const companyLogo =
  "https://media.licdn.com/dms/image/v2/D560BAQFyPNfJhr3kZw/company-logo_100_100/B56Zs1v9oTKIAM-/0/1766133325738?e=1770854400&v=beta&t=c7QJ4ZxcL1Q7BexaTjs_hyBo8SWCDgPMQA0BUDl5WlQ";
export default function Home() {
  const storedTheme = localStorage.getItem("data-theme") as
    | "light"
    | "dark"
    | "system";
  const [theme, setTheme] = React.useState<"light" | "dark">(
    storedTheme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : storedTheme,
  );

  React.useEffect(() => {
    const resolvedTheme =
      storedTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : storedTheme;

    document.documentElement.setAttribute("data-theme", resolvedTheme);
    localStorage.setItem(
      "data-theme",
      storedTheme === "system" ? resolvedTheme : storedTheme,
    );
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(
      "data-theme",
      storedTheme === "system" ? theme : storedTheme,
    );
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme =
      storedTheme === "system"
        ? theme === "light"
          ? "dark"
          : "light"
        : storedTheme === "dark"
          ? "light"
          : "dark";
    setTheme(nextTheme);
  };

  const [selected, setSelected] = useState<boolean>(true);
  return (
    <Column
      fillWidth
      vertical="start"
      horizontal="center"
      padding="m"
      style={{
        minHeight: "100vh",

        backgroundColor:
          theme === "dark"
            ? "#111111"
            : theme === "light"
              ? "#ffffff"
              : "#F9F9F9",
      }}
    >
      <Flex
        fillWidth
        fitHeight
        maxWidth={"m"}
        padding="0"
        horizontal="between"
        vertical="center"
        id="nav"
      >
        <Flex
          fitWidth
          fitHeight
          padding="8"
          horizontal="center"
          vertical="center"
          gap="4"
          shadow="xs"
          radius="l"
          id="nav1"
        >
          <Flex
            fitWidth
            fitHeight
            horizontal="center"
            vertical="center"
            gap="8"
          >
            <Image
              src={companyLogo}
              alt=""
              width={40}
              height={40}
              style={{
                filter: theme === "dark" ? "invert(1)" : "invert(0)",
                borderRadius: "30%",
              }}
            ></Image>
            <Line vert height={1.5}></Line>

            <Input
              id="input-1"
              placeholder="Search"
              height="s"
              hasPrefix={
                <Icon
                  marginLeft="4"
                  onBackground="neutral-weak"
                  name="search"
                  size="xs"
                />
              }
              characterCount
              maxLength={100}
            />
            <Button
              variant="primary"
              size="m"
              suffixIcon="arrowRight"
              id="hiddenButtonNav"
              href="/auth"
            >
              <Text variant="body-default-l">Get Access</Text>
            </Button>
            <IconButton
              icon={theme === "dark" ? "sun" : "moon"}
              size="l"
              variant="secondary"
              id="hiddenButtonNav"
              onClick={toggleTheme}
            />
          </Flex>
        </Flex>

        <Flex
          fitWidth
          fitHeight
          padding="8"
          horizontal="center"
          vertical="center"
          gap="4"
          shadow="xs"
          radius="l"
          id="nav2"
        >
          <Flex
            fitWidth
            fitHeight
            horizontal="center"
            vertical="center"
            gap="8"
          >
            <IconButton
              icon={theme === "dark" ? "sun" : "moon"}
              size="l"
              variant="secondary"
              onClick={toggleTheme}
            />
            <Button variant="secondary" size="m">
              <Text variant="body-default-l">Login</Text>
            </Button>
            <Button
              variant="primary"
              size="m"
              suffixIcon="arrowRight"
              href="/auth"
            >
              <Text variant="body-default-l">Get Access</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex height={"64"}></Flex>

      <Column
        fillWidth
        fitHeight
        maxWidth={"xs"}
        horizontal="center"
        paddingY="xl"
        gap="m"
        style={{ flexWrap: "wrap" }}
      >
        <Column data-scaling="110" fitHeight gap={"s"} maxWidth={"s"}>
          <Text variant="display-default-m" align="center">
            {" "}
            Search for&nbsp;
            <span
              style={{
                fontFamily: geist.className,
                fontStyle: "italic",
                fontWeight: "normal",
              }}
            >
              <u>universities</u>
            </span>{" "}
            ,{" "}
            <span
              style={{
                fontFamily: geist.className,
                fontStyle: "italic",
                fontWeight: "normal",
              }}
            >
              <u>colleges</u>
            </span>{" "}
            and{" "}
            <span
              style={{
                fontFamily: geist.className,
                fontStyle: "italic",
                fontWeight: "normal",
              }}
            >
              <u>tuitions</u>
            </span>
            &nbsp; efficiently.
          </Text>
          <Flex height={"20"}></Flex>
          <Row gap="16" center fillWidth style={{ flexWrap: "wrap" }}>
            <Row radius="s" shadow="xs" padding="8" vertical="center" gap="8">
              <Row vertical="center" gap="2">
                <Icon name="sort" size="xs"></Icon>
                <Text variant="body-default-s">Sort</Text>
              </Row>
              <Line vert height={1} />
              <Kbd>All</Kbd>
            </Row>

            <Row radius="s" shadow="xs" padding="8" vertical="center" gap="8">
              <Row vertical="center" gap="2">
                <Icon name="earth" size="xs"></Icon>
                <Text variant="body-default-s">Location</Text>
              </Row>
              <Line vert height={1} />
              <Kbd>All</Kbd>
            </Row>

            <Row radius="s" shadow="xs" padding="8" vertical="center" gap="8">
              <Row vertical="center" gap="2">
                <Icon name="stethoscope" size="xs"></Icon>
                <Text variant="body-default-s">Speciality</Text>
              </Row>
              <Line vert height={1} />
              <Kbd>All</Kbd>
            </Row>

            <Row radius="s" shadow="xs" padding="8" vertical="center" gap="8">
              <Row vertical="center" gap="2">
                <Icon name="notepad" size="xs"></Icon>
                <Text variant="body-default-s">Category</Text>
              </Row>
              <Line vert height={1} />
              <Kbd>All</Kbd>
            </Row>
          </Row>
        </Column>
      </Column>
      <Row fillWidth  style={{ flexWrap: "wrap" }} gap="20" horizontal="center">
        {institutions.map((institution) => (
          <SearchCard {...institution} key={institution.institutionName}/>
        ))}
      </Row>
      <Flex height="40"/>
      <Button size="m" variant="secondary"><Text variant="body-default-l">Load More</Text></Button>
    </Column>
  );
}
