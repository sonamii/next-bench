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
  MatrixFx,
  Particle,
} from "@once-ui-system/core";
import Image from "next/image";
import { companyLogo } from "@/resources/next-bench.config";

export default function Auth() {
  const theme = localStorage.getItem("data-theme") as
    | "light"
    | "dark"
    | "system";
  return (
    <Column
      fillWidth
      fillHeight
      vertical="start"
      horizontal="center"
      padding="16"
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
            style={{ filter: theme === "dark" ? "invert(0)" : "invert(1)", borderRadius: "30%" }}
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
        <Button variant="primary" size="l" fillWidth data-border="conservative">
          <Row center gap="8">
            <Icon name="google" size="s" />
            <Text variant="body-default-l">Continue with Google</Text>
          </Row>
        </Button>
        <Text variant="body-default-m" onBackground="neutral-weak">
          By clicking continue, you agree to our{" "}
          <SmartLink href="#">Terms of Service</SmartLink> and{" "}
          <SmartLink href="#">Privacy Policy</SmartLink>.
        </Text>
      </Column>
    </Column>
  );
}
