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
  Background,
  Flex,
  Media,
  AvatarGroup,
  Row,
  Icon,
  Tag,
  Kbd,
  IconButton,
} from "@once-ui-system/core";
import Image from "next/image";
import { Geist } from "next/font/google";
import { PricingCard } from "../components/(main)/PricingCard";

const geist = Geist({ subsets: ["latin"] });

const pricingPlans = [
  {
    icon: "userOutline",
    iconText: "Basic",
    popular: false,
    monthlyPrice: "Free",
    title: "Ideal for group of students",
    description: "Institutes searching, Application tracking, Personalized advice, Support, Career prospects, Admission updates",
    buttonText: "Get Started",
    originalPrice: "",
    buttonLink: "/",
  },
  {
    icon: "luggageOutline",
    iconText: "Pro",
    popular: true,
    monthlyPrice: "19",
    title: "Ideal for group of students",
    description: "All feautres of BASIC, Agentic AI automation, Priority call support, 24/7 support, Interview preparation, Outreach access, Admission updates, Career prospects, Counseling, Access to verified voting",
    buttonText: "Get Started",
    originalPrice: "49",
    buttonLink: "/",
  },
  {
    icon: "buildingOutline",
    iconText: "Exceptional",
    popular: false,
    monthlyPrice: "39",
    originalPrice: "99",
    title: "Ideal for group of students",
    description: "All feautres of PRO, Free counseling, Unlimited AI uses*, Unlimited outreach access*, Universitiy application tracking, NextAI access",
    buttonText: "Get Started",
    buttonLink: "/",
  },
];

const companyLogo =
  "https://media.licdn.com/dms/image/v2/D560BAQFyPNfJhr3kZw/company-logo_100_100/B56Zs1v9oTKIAM-/0/1766133325738?e=1770854400&v=beta&t=c7QJ4ZxcL1Q7BexaTjs_hyBo8SWCDgPMQA0BUDl5WlQ";
export default function Home() {
  return (
    <Column
      fillWidth
      vertical="start"
      horizontal="center"
      padding="m"
      style={{ minHeight: "100vh", backgroundColor: "#F9F9F9" }}
    >
      <Flex
        fillWidth
        fitHeight
        maxWidth={"m"}
        padding="0"
        horizontal="between"
        vertical="center"
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
              style={{ filter: "invert(1)", borderRadius: "30%" }}
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
        >
          <Flex
            fitWidth
            fitHeight
            horizontal="center"
            vertical="center"
            gap="8"
          >
            <Button variant="secondary" size="m">
              <Text variant="body-default-l">Login</Text>
            </Button>
            <Button variant="primary" size="m" suffixIcon="arrowRight">
              <Text variant="body-default-l">Get Access</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex height={"80"}></Flex>
      <Column
        fillWidth
        fitHeight
        maxWidth={"m"}
        horizontal="center"
        paddingY="xl"
        gap="m"
      >
        <Row gap="12">
          <AvatarGroup
            data-scaling="110"
            size="m"
            avatars={[
              { src: "https://randomuser.me/api/portraits/men/2.jpg" },
              { src: "https://randomuser.me/api/portraits/women/2.jpg" },
              { src: "https://randomuser.me/api/portraits/men/3.jpg" },
              { src: "https://randomuser.me/api/portraits/women/2.jpg" },
              { src: "https://randomuser.me/api/portraits/men/7.jpg" },
            ]}
          />
          <Column horizontal="start" vertical="between">
            <Row>
              <Icon name="star" size="s"></Icon>
              <Icon name="star" size="s"></Icon>
              <Icon name="star" size="s"></Icon>
              <Icon name="star" size="s"></Icon>
              <Icon name="star" size="s"></Icon>{" "}
            </Row>
            <Row>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {" "}
                180+ happy students
              </Text>
            </Row>
          </Column>
        </Row>
        <Column data-scaling="110" fitHeight gap={"s"} maxWidth={"s"}>
          <Text variant="display-default-m" align="center">
            {" "}
            Ready to{" "}
            <span
              style={{
                fontFamily: geist.className,
                fontStyle: "italic",
                fontWeight: "normal",
              }}
            >
              boost
            </span>{" "}
            your education by getting admission in top universities?{" "}
          </Text>
          <Text
            variant="body-default-xl"
            onBackground="neutral-weak"
            align="center"
          >
            If you’re looking for efficient, scalable ways to navigate the
            complex application process, you’re in the right place.
          </Text>
          <Row gap="16" center fillWidth>
            <Button variant="secondary">
              {" "}
              <Text variant="body-default-l">Try it now</Text>
            </Button>
            <Button suffixIcon="arrowTopRight">
              {" "}
              <Text variant="body-default-l">Search institutes</Text>
            </Button>
          </Row>
        </Column>
      </Column>{" "}
      <Flex height={"40"}></Flex>
      <Column fillWidth horizontal="center" vertical="start" gap="24">
        <Row>
          <Text variant="display-default-s">
            <span
              style={{
                fontFamily: geist.className,
                fontStyle: "italic",
                fontWeight: "normal",
              }}
            >
              Great
            </span>{" "}
            pricing
          </Text>
        </Row>
        <Row horizontal="even" fillWidth maxWidth={"m"}>
          <Flex data-scaling="100">
            <PricingCard {...pricingPlans[0]} />
          </Flex>
          <Flex data-scaling="110">
            {" "}
            <PricingCard {...pricingPlans[1]} />
          </Flex>
          <Flex data-scaling="100">
            {" "}
            <PricingCard {...pricingPlans[2]} />
          </Flex>
        </Row>
      </Column>
    </Column>
  );
}
