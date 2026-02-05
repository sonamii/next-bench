"use client";
import "@/resources/custom.css";
import Lenis from "lenis";

import {
  Text,
  Button,
  Column,

  Flex,
  
  Row,
  Icon,

  SmartLink,
 useToast,
  Particle,
  Spinner,
} from "@once-ui-system/core";
import Image from "next/image";
import { companyLogo } from "@/resources/next-bench.config";
import supabase from "../supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Auth() {
  const{addToast} = useToast()
  const [theme, setTheme] = useState<"light" | "dark" | "system" | null>(
    typeof window !== "undefined"
      ? localStorage.getItem("data-theme") as
        | "light"
        | "dark"
        | "system"
        | null
      : null
  );

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      // The user will be redirected to the callback page by Supabase
    } catch (error) {
      console.error("Error signing in with Google:", error);
      addToast({
        
        message: "Failed to sign in with Google",
        variant: "danger",
      });
    }
  };

  const [isSession, setIsSession] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        setIsSession(true);
        router.replace("/auth/callback");
      } else {
        setIsSession(false);
      }
    };
    getSession();
  }, []);

  const router = useRouter();

  return (
    <Column
      fillWidth
      fillHeight
      vertical="start"
      horizontal="center"
      padding="24"
      style={{ minHeight: "100svh", overflow: "hidden" }}
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
      <Flex horizontal="start" maxWidth={"m"}>
        {" "}
        <Button variant="tertiary" size="l" prefixIcon="arrowLeft" href="/">
          <Text variant="body-default-l">Home</Text>
        </Button>
      </Flex>

      <Column
        vertical="center"
        horizontal="start"
        fillHeight
        gap="20"
        style={{ maxWidth: "410px" }}
        fillWidth
      >
        <Row center gap="16">
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
          <Text variant="body-default-xl" align="center">
            {" "}
            Next Bench
          </Text>
        </Row>
        <Column gap="8">
          {" "}
          <Text variant="display-strong-xs">Sign In or Join Now!</Text>
          <Text variant="body-default-l" onBackground="neutral-weak">
            login or create your next bench account
          </Text>
        </Column>
        <Button
          variant="primary"
          size="l"
          fillWidth
          data-border="conservative"
          onClick={() => handleGoogleSignIn()}
        >
          <Row center gap="8">
            {isSession ? (
              <Row center gap="8">
                {" "}
                <Spinner size="s" />
                <Text variant="body-default-l">Brewing thing up for you...</Text>
              </Row>
            ) : (
              <Row center gap="8">
                {" "}
                <Icon name="google" size="s" />
                <Text variant="body-default-l">Continue with Google</Text>
              </Row>
            )}
          </Row>
        </Button>
        <Text variant="body-default-m" onBackground="neutral-weak">
          By clicking continue, you agree to our{" "}
          <SmartLink href="company/terms-of-service">
            Terms of Service
          </SmartLink>{" "}
          and{" "}
          <SmartLink href="company/privacy-policy">Privacy Policy</SmartLink>.
        </Text>
      </Column>
    </Column>
  );
}
