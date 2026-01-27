import { Button, ThemeSwitcher,Flex,Text, Line } from "@once-ui-system/core";
import Image from "next/image";
import {companyLogo} from "@/resources/next-bench.config";
import "@/resources/custom.css";
import supabase from "@/app/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {

  const [isSession, setIsSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        setIsSession(true);
      } else {
        setIsSession(false);
      }
    };
    getSession();
  }, []);


  const handleLoginOrLogout = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session && session.user) {
      await supabase.auth.signOut();
      setIsSession(false);
      router.push("/");
    } else {
     router.push("/auth");
    }
  };

  return (
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
            onClick={() => window.location.href="/"}
            alt=""
            width={40}
            height={40}
            style={{  borderRadius: "30%",cursor:"pointer" }}
            
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
            suffixIcon={isSession ? "" : "arrowRight"}
            id="hiddenButtonNav"
            href={isSession ? "/me" : "/auth"}
          >
            <Text variant="body-default-l">{isSession ? "Dashboard" : "Get Access"}</Text>
          </Button>
          {/* <IconButton
            icon={theme === "dark" ? "sun" : "moon"}
            size="l"
            variant="secondary"
            id="hiddenButtonNav"
            onClick={toggleTheme}
          /> */}
          <ThemeSwitcher id="hiddenButtonNav"  />
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
          {/* <IconButton
            icon={theme === "dark" ? "sun" : "moon"}
            size="l"
            variant="secondary"
            onClick={toggleTheme}
          /> */}
          <ThemeSwitcher />
          <Button variant="secondary" size="m"  onClick={()  => handleLoginOrLogout()}>
            <Text variant="body-default-l">{isSession ? "Logout" : "Login"}</Text>
          </Button>
            <Button
            variant="primary"
            size="m"
            suffixIcon={isSession ? "" : "arrowRight"}
            href={isSession ? "/me" : "/auth"}
          >
            <Text variant="body-default-l">{isSession ? "Dashboard" : "Get Access"}</Text>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
