"use client";
import "@/resources/custom.css";

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

export default function Home() {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  

  React.useEffect(() => {
    setMounted(true);
    
    const storedTheme = typeof window !== "undefined" 
      ? localStorage.getItem("data-theme") as
        | "light"
        | "dark"
        | "system"
        | null
      : null;
    
    const initialTheme = storedTheme === "system" && typeof window !== "undefined"
      ? (window as any).matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : (storedTheme === "light" || storedTheme === "dark") ? storedTheme : "light";
    
    setTheme(initialTheme);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
    const storedTheme = typeof window !== "undefined" 
      ? localStorage.getItem("data-theme") as
        | "light"
        | "dark"
        | "system"
        | null
      : null;
    
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "data-theme",
        storedTheme === "system" ? theme : storedTheme ?? "light",
      );
    }
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
