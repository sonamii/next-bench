"use client";
import "@/resources/custom.css";
import Lenis from "lenis";

import {
  
  Column,
  
  Flex,
  
} from "@once-ui-system/core";
import React from "react";
import { CallToAction } from "./components/(main)/cta";
import { Footer } from "./components/(global)/footer";
import { PricingSection } from "./components/(main)/pricing";
import { HeroSection } from "./components/(main)/hero";
import { Navbar } from "./components/(global)/navbar";


// eslint-disable-next-line -- ignore production build errors for lenis initialization
const lenis = new Lenis({
  autoRaf: true,
});

export default function Home() {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("data-theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    
    const initialTheme = storedTheme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : storedTheme ?? "light";
    
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    
    document.documentElement.setAttribute("data-theme", theme);
    const storedTheme = localStorage.getItem("data-theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    
    localStorage.setItem(
      "data-theme",
      storedTheme === "system" ? theme : storedTheme ?? "light",
    );
  }, [theme, mounted]);



  return (
    <Column
      fillWidth
      vertical="start"
      horizontal="center"
      padding="m"
    
      onBackground="neutral-strong"
    >
  
      <div style={{ zIndex: "99" }}>
        <Navbar />
        <Flex height={"64"}></Flex>
        <HeroSection />
        <Flex height={"32"}></Flex>
        <PricingSection />
        <Flex height={"80"}></Flex>
        <CallToAction />
        <Flex height={"80"}></Flex>
        <Footer />
      </div>
    </Column>
  );
}
