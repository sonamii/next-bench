"use client";
import "@/resources/custom.css";
import Lenis from "lenis";

import {
  Heading,
  Text,
  Button,
  Column,
  Badge,
  Logo,
  Line,
  LetterFx,
  Background,
  Flex,
  Media,
  AvatarGroup,
  Row,
  Icon,
  Tag,
  Kbd,
  IconButton,
  SmartLink,
  TypeFx,
  CountdownFx,
  ThemeSwitcher,
} from "@once-ui-system/core";
import Image from "next/image";
import { Geist, DM_Mono } from "next/font/google";
import { PricingCard } from "./components/(main)/PricingCard";
import React from "react";
import { CallToAction } from "./components/(main)/cta";
import { Footer } from "./components/(global)/footer";
import { PricingSection } from "./components/(main)/pricing";
import { HeroSection } from "./components/(main)/hero";
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

            <Button variant="tertiary" size="m" suffixIcon="chevronDown">
              <Text variant="body-default-l">Product</Text>
            </Button>
            <Button variant="tertiary" size="m" suffixIcon="chevronDown">
              <Text variant="body-default-l">Resources</Text>
            </Button>
            <Button variant="tertiary" size="m">
              <Text variant="body-default-l">Agentic AI</Text>
            </Button>
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
      <HeroSection />
      <Flex height={"32"}></Flex>
      <PricingSection />
      <Flex height={"80"}></Flex>
      <CallToAction />
      <Flex height={"80"}></Flex>
      <Footer />
    </Column>
  );
}
