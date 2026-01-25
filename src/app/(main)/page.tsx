"use client";
import "@/resources/custom.css";
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
} from "@once-ui-system/core";
import Image from "next/image";
import { Geist, DM_Mono } from "next/font/google";
import { PricingCard } from "../components/(main)/PricingCard";

const geist = Geist({ subsets: ["latin"] });
const mono = DM_Mono({
  subsets: ["latin"],
  weight: "300",
});

const pricingPlans = [
  {
    icon: "userOutline",
    iconText: "Basic",
    popular: false,
    monthlyPrice: "Free",
    title: "Ideal for group of students",
    description:
      "Institutes searching, Application tracking, Personalized advice, Support, Career prospects, Admission updates",
    buttonText: "Get Started",
    originalPrice: "",
    buttonLink: "/",
  },
  {
    icon: "luggageOutline",
    iconText: "Pro",
    popular: true,
    monthlyPrice: "349",
    title: "Ideal for group of students",
    description:
      "All feautres of BASIC, Agentic AI automation, Priority call support, 24/7 support, Interview preparation, Outreach access, Admission updates, Career prospects, Counseling, Access to verified voting",
    buttonText: "Get Started",
    originalPrice: "749",
    buttonLink: "/",
  },
  {
    icon: "buildingOutline",
    iconText: "Exceptional",
    popular: false,
    monthlyPrice: "749",
    originalPrice: "1549",
    title: "Ideal for group of students",
    description:
      "All feautres of PRO, Free counseling, Unlimited AI uses*, Unlimited outreach access*, Universitiy application tracking, NextAI access",
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
            <Button
              variant="primary"
              size="m"
              suffixIcon="arrowRight"
              id="hiddenButtonNav"
            >
              <Text variant="body-default-l">Get Access</Text>
            </Button>
                        <IconButton icon="sun" size="l" variant="secondary" id="hiddenButtonNav"/>

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
            <IconButton icon="sun" size="l" variant="secondary" />
            <Button variant="secondary" size="m">
              <Text variant="body-default-l">Login</Text>
            </Button>
            <Button variant="primary" size="m" suffixIcon="arrowRight">
              <Text variant="body-default-l">Get Access</Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex height={"64"}></Flex>
      <Column
        fillWidth
        fitHeight
        maxWidth={"m"}
        horizontal="center"
        paddingY="xl"
        gap="m"          style={{ flexWrap: "wrap" }}

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
              <u>boost</u>
            </span>{" "}
            your education by getting admission in top universities?{" "}
          </Text>
          <Text
            variant="body-default-xl"
            onBackground="neutral-weak"
            align="center"
          >
            Looking for an efficient and convenient way to navigate the
            application process? Look no further!
          </Text>
          <Row gap="16" center fillWidth           style={{ flexWrap: "wrap" }}
> 
            <Button variant="secondary">
              {" "}
              <Text variant="body-default-l">Try it now</Text>
            </Button>
            <Button suffixIcon="arrowTopRight">
              {" "}
              <Text variant="body-default-l">Search institutes</Text>
            </Button>
          </Row>
          <Flex fillWidth center>
            <Text variant="body-default-s">Launching soon! </Text>&nbsp;
            <CountdownFx
              onBackground="neutral-weak"
              targetDate={new Date("July 1, 2026")}
              variant="body-default-s"
              format="DD:HH:MM:SS"
            />
          </Flex>
        </Column>
      </Column>{" "}
      <Flex height={"32"}></Flex>
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
        <Row
          horizontal="between"
          fillWidth
          maxWidth={"m"}
          style={{ flexWrap: "wrap" }}
          id="pricingGroup"
          gap="16"
        >
          <Flex data-scaling="100" id="pricingCard">
            <PricingCard {...pricingPlans[0]} />
          </Flex>
          <Flex data-scaling="100" id="pricingCard">
            {" "}
            <PricingCard {...pricingPlans[1]} />
          </Flex>
          <Flex data-scaling="100" id="pricingCard">
            {" "}
            <PricingCard {...pricingPlans[2]} />
          </Flex>
        </Row>
      </Column>
      <Flex height={"80"}></Flex>
      <Row fillWidth maxWidth={"m"} horizontal="between" id="cta">
        <Text variant="display-default-s" align="center">
          <b>
            Let your{" "}
            <span
              style={{
                fontFamily: geist.className,
                fontStyle: "italic",
                fontWeight: "normal",
              }}
            >
              <u>plans</u>
            </span>{" "}
            <TypeFx
              words={["shape the future.", "innovate with us."]}
              speed={80}
              hold={1000}
              trigger="instant"
            />
          </b>
        </Text>{" "}
        <Flex direction="row" gap="12">
          <Button size="l" variant="secondary" suffixIcon="arrowTopRight">
            <Text variant="body-default-l">Try it now</Text>
          </Button>
          <Button size="l">
            <Text variant="body-default-l">Contact Sales</Text>
          </Button>
        </Flex>
      </Row>
      <Flex height={"80"}></Flex>
      <Column fillWidth maxWidth={"m"}>
        <Row fillWidth padding="16" horizontal="between" id="footer">
          <Flex fitWidth direction="column" gap="12">
            {" "}
            <Row vertical="center" gap="12">
              <Image
                src={companyLogo}
                alt=""
                width={40}
                height={40}
                style={{ filter: "invert(0)", borderRadius: "30%" }}
              ></Image>
              <Text variant="body-default-xl" align="center">
                {" "}
                Next Bench
              </Text>
            </Row>
            <Flex maxWidth={20}>
              <Text
                variant="body-default-m"
                onBackground="neutral-weak"
                align="left"
                style={{ fontFamily: mono.style.fontFamily }}
              >
                A comprehensive tool for students.
              </Text>
            </Flex>
            <Row vertical="center" gap="12" data-border="conservative">
              <IconButton
                icon="facebook"
                variant="secondary"
                size="l"
              ></IconButton>
              <IconButton
                icon="instagram"
                variant="secondary"
                size="l"
              ></IconButton>
              <IconButton
                icon="twitter"
                variant="secondary"
                size="l"
              ></IconButton>
              <IconButton icon="mail" variant="secondary" size="l"></IconButton>
            </Row>
          </Flex>
          <Flex direction="row" horizontal="between" gap="20">
            <Column gap="4">
              <SmartLink>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Resources
                </Text>
              </SmartLink>
              <SmartLink href="#">Help center</SmartLink>
              <SmartLink href="#">Community</SmartLink>
              <SmartLink href="#">Contact Support</SmartLink>
              <SmartLink href="#">Security</SmartLink>
            </Column>
            <Column gap="4">
              <SmartLink>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Company
                </Text>
              </SmartLink>
              <SmartLink href="#">About Us</SmartLink>
              <SmartLink href="#">Careers</SmartLink>
              <SmartLink href="#">Brand Assets</SmartLink>
              <SmartLink href="#">Terms of Service</SmartLink>
            </Column>
          </Flex>
        </Row>
        <Column
          fillWidth
          horizontal="center"
          vertical="center"
          borderTop="neutral-alpha-medium"
          paddingTop="16"
        >
          <Text variant="body-default-s" onBackground="neutral-weak">
            © 2026 Next Bench. All rights reserved.
          </Text>
        </Column>
      </Column>
    </Column>
  );
}
