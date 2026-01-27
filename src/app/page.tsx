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
import { Navbar } from "./components/(global)/navbar";
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
      // style={{
      //   minHeight: "100vh",

      //   backgroundColor:
      //     theme === "dark"
      //       ? "#111111"
      //       : theme === "light"
      //         ? "#F9F9F9"
      //         : "#F9F9F9",
      // }}
      onBackground="neutral-strong"
    >
   <Navbar/>
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
