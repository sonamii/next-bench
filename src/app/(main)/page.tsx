"use client";

import {
  Heading,
  Text,
  Button,
  Column,
  Badge,
  Logo,
  Line,
  LetterFx,
  Row,
  Flex,
  MegaMenu,
  Tag,
  AvatarGroup,
} from "@once-ui-system/core";

import {
  Lato,
  Montserrat,
  Montserrat_Alternates,
  Outfit,
  Unica_One,
  Work_Sans,
} from "next/font/google";
const dmsans = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400"],
});
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
import { Roboto } from "next/font/google";
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700"],
});
import { Open_Sans } from "next/font/google";
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
});

import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});
export default function Home() {
  return (
    <>
     
      <Column
        fillWidth
        padding="l"
        horizontal="center"
        vertical="start"
        style={{
          minHeight: "100vh",
          height: "fit-content",
          backgroundColor: "#FDFDF9",
        }}
      >
        <Column
          style={{ maxWidth: "1550px", minWidth: "fit-content" }}
          fillWidth
          fillHeight
        >
          <Row horizontal="space-between" fillWidth fitHeight vertical="center">
            <Flex>
              <Text variant="label-default-xl">Next Bench</Text>
            </Flex>
            <Flex>
              <MegaMenu
                menuGroups={[
                  {
                    id: "home",
                    label: "Home",
                    href: "/",
                  },
                  {
                    id: "consultants",
                    label: "Consultants",
                    suffixIcon: "chevronDown",

                    sections: [],
                  },
                  {
                    id: "find-school",
                    label: "Find",
                    suffixIcon: "chevronDown",
                    sections: [],
                  },
                  {
                    id: "dashboard",
                    label: "MekoAI",
                    href: "/mekoai",
                    suffixIcon: "chevronDown",
                    sections: [],
                  },
                ]}
              />
            </Flex>
          </Row>
          <Flex height={3} minHeight={3}></Flex>
          <Flex
            fillWidth
            height={4}
            minHeight={4}
            vertical="center"
            horizontal="start"
          >
            <Badge
              id="badge-6"
              paddingY="4"
              paddingLeft="4"
              paddingRight="8"
              gap="12"
              textVariant="label-default-s"
              border="neutral-medium"
              background="neutral-alpha-weak"
            >
              <Tag>01</Tag>
              About Us
            </Badge>
          </Flex>
          <Row
            id="herro"
            horizontal="space-between"
            vertical="start"
            fillWidth
            fitHeight
            gap="40"
            wrap={true}
          >
            <Column
              fillWidth
              fitHeight
              vertical="center"
              horizontal="start"
              maxWidth={50}
            >
              <Column>
                <Text
                  style={{
                    color: "#181A1D",
                    fontSize: "70px",
                    lineHeight: "1em",
                    fontWeight: "400",
                    letterSpacing: ".3px",
                  }}
                  className={dmsans.className}
                >
                  AI education center: where{" "}
                  <span style={{ color: "#626F45" }}>innovation</span> <br />
                  and <span style={{ color: "#626F45" }}>learning</span>{" "}
                  converge
                </Text>
              </Column>
            </Column>

            {/* =================================== */}
            <Column
              fitWidth
              fillHeight
              horizontal="start"
              vertical="space-between"
              maxWidth={27.5}
              maxHeight={13.2}
            >
              <Row center fitWidth fitHeight gap="20">
                <AvatarGroup
                  size="l"
                  avatars={[{ value: "A" }, { value: "B" }, { value: "C" }]}
                />
                <Line
                  vert
                  width={0.2}
                  height={4}
                  background="neutral-medium"
                ></Line>
                <Column horizontal="end" vertical="start" fitHeight>
                  <Text
                    style={{
                      color: "#181A1D",
                      fontSize: "41px",
                    }}
                    className={dmsans.className}
                  >
                    +250
                  </Text>
                  <Text
                    onBackground="neutral-weak"
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    Students enrolled/growing
                  </Text>
                </Column>
                <Column horizontal="end" vertical="start" fillHeight>
                  <Text
                    style={{
                      color: "#181A1D",
                      fontSize: "41px",
                    }}
                    className={dmsans.className}
                  >
                    1645
                  </Text>
                  <Text
                    onBackground="neutral-weak"
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    Institutions partnered
                  </Text>
                </Column>
              </Row>
              <Column gap="20" fillWidth>
                <Text
                  onBackground="neutral-weak"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  Uncover the wonder of Artificial Intelligence with our
                  immersive educational platform, led by most qualified mentors
                  and experts in the field. Join us now.
                </Text>
                <Row gap="20">
                  <Button
                    id="arrow-button-1"
                    arrowIcon
                    size="m"
                    weight="default"
                  >
                    Start here
                  </Button>
                  <Button
                    id="arrow-button-1"
                    size="m"
                    weight="default"
                    variant="secondary"
                    style={{ backgroundColor: "#F2F2EF" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
                      (e.currentTarget.style.backgroundColor = "#E0E0DC")
                    }
                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
                      (e.currentTarget.style.backgroundColor = "#F2F2EF")
                    }
                  >
                    Dashboard
                  </Button>
                </Row>
              </Column>
            </Column>
          </Row>

          {/* ======================================================= */}
          <Flex height={7}></Flex>

          {/* ================================================ */}
          <Row
            fillWidth
            fillHeight
            horizontal="space-between"
            vertical="center"
            gap="12"
            maxHeight={35}
            minHeight={35}
          >
            {/* ==== */}
            <Column radius="xl" flex={2} fillHeight>
              <Flex
                radius="xl"
                flex={1}
                fillHeight
                style={{ backgroundColor: "#F0F1EC" }}
              ></Flex>
            </Column>
            {/* === */}
            <Column radius="xl" flex={5} fillHeight overflow="hidden" gap="12">
              <Row fillWidth fillHeight flex={3} radius="xl" gap="12">
                <Column flex={1} gap="12">
                  <Flex
                    radius="xl"
                    background="brand-strong"
                    flex={1}
                    fillHeight
                    style={{ backgroundColor: "#F9E38D" }}
                  ></Flex>
                  <Flex
                    radius="xl"
                    background="brand-strong"
                    flex={2}
                    fillHeight
                    style={{ backgroundColor: "#D7E1B3" }}
                  ></Flex>
                </Column>
                {/* ====== */}
                <Column flex={1}>
                  <Flex
                    radius="xl"
                    background="brand-strong"
                    flex={1}
                    fillHeight
                    style={{ backgroundColor: "#F9E38D" }}
                  ></Flex>
                </Column>
              </Row>
              {/* ===== */}

              <Row fillWidth fillHeight flex={1} radius="xl">
                <Flex
                  background="brand-strong"
                  flex={1}
                  radius="xl"
                  style={{ backgroundColor: "#D7E1B3" }}
                ></Flex>
              </Row>
            </Column>
            {/* ===== */}
            <Column radius="xl" flex={2} fillHeight>
              <Flex
                radius="xl"
                background="brand-strong"
                flex={1}
                fillHeight
                style={{ backgroundColor: "#F0F1EC" }}
              ></Flex>
            </Column>
          </Row>
        </Column>
      </Column>
    </>
  );
}
