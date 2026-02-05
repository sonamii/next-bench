"use client";
import "@/resources/custom.css";

import {
  Text,
  Button,
  Column,
  Flex,
  Row,
  Icon,
  SmartLink,
  Particle,
} from "@once-ui-system/core";
import Image from "next/image";
import { companyLogo } from "@/resources/next-bench.config";

export default function NotFound() {
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
              filter: "invert(1)",
              borderRadius: "30%",
            }}
          />
          <Text variant="body-default-xl" align="center">
            Next Bench
          </Text>
        </Row>
        <Column gap="8">
          <Text variant="display-strong-xs">404 - Page Not Found</Text>
          <Text variant="body-default-l" onBackground="neutral-weak">
            The page you're looking for doesn't exist or has been moved.
          </Text>
        </Column>
        <Button
          variant="primary"
          size="l"
          fillWidth
          data-border="conservative"
          href="/"
        >
          <Row center gap="8">
            <Icon name="arrowLeft" size="s" />
            <Text variant="body-default-l">Home</Text>
          </Row>
        </Button>
        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
          Or you can{" "}
          <SmartLink href="/search" style={{ textDecoration: "underline" }}>
            browse universities
          </SmartLink>{" "}
          instead.
        </Text>
      </Column>
    </Column>
  );
}
