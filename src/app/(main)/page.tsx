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
  Input,
  IconButton,
  Media,
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
  weight: ["400", "500", "600", "700"],
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
            <Flex vertical="center" gap="8">
              <Media
                src="https://imghost.online/ib/skwnw73hCCCOt3q_1751541353.png"
                unoptimized
                width={4}
                height={3}
                alt="A"
              ></Media>
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
            maxHeight={30}
            minHeight={30}
            style={{ maxWidth: "1600px" }}
          >
            {/* ==== */}
            <Column radius="l" flex={2} fillHeight>
              <Flex
                radius="l"
                flex={1}
                fillHeight
                style={{ backgroundColor: "#F0F1EC" }}
                horizontal="center"
                vertical="start"
                overflow="hidden"
                direction="column"
                gap="0"
                padding="20"
                paddingTop="0"
              >
                <Text
                  style={{
                    color: "#626f45",
                    fontSize: "190px",
                    lineHeight: "1em",
                    fontWeight: "400",
                    letterSpacing: ".3px",
                    position: "absolute",
                    top: "8%",
                    opacity: 0.5,
                  }}
                >
                  01
                </Text>
                <Flex
                  fillWidth
                  fitHeight
                  paddingY="20"
                  style={{ marginTop: "150px", backgroundColor: "#F0F1EC" }}
                  vertical="center"
                >
                  <Input id="a" placeholder="Enter keyword" height="m"></Input>
                  <IconButton
                    size="l"
                    style={{ position: "absolute", right: "5px" }}
                  >
                    <Text>
                      <i className="ri-send-plane-line"></i>
                    </Text>
                  </IconButton>
                </Flex>
                <Column
                  horizontal="start"
                  vertical="start"
                  fitHeight
                  fillWidth
                  paddingRight="32"
                  gap="4"
                >
                  <Text
                    style={{
                      color: "#181A1D",
                      fontSize: "30px",
                      fontWeight: "500",
                    }}
                    className={dmsans.className}
                  >
                    Educational Insights
                  </Text>
                  <Text
                    onBackground="neutral-weak"
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    Latest insights and trends in the education sector to help
                    you anytime.
                  </Text>
                </Column>
                <Row fillWidth fillHeight paddingTop="20" horizontal="start">
                  <Column
                    flex={1}
                    fillHeight
                    // background="brand-strong"
                    radius="xl"
                    // style={{ backgroundColor: "#D7E1B3" }}
                    horizontal="center"
                    vertical="end"
                  >
                    {/* <Column fillWidth horizontal="start" paddingLeft="4" gap="1">
                      <Text
                        onBackground="neutral-weak"
                        style={{
                          fontSize: "12px",
                        }}
                        className={dmsans.className}
                      >
                        We are on linkedin, twitter, and youtube.
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        style={{
                          fontSize: "17px",
                          color: "#181A1D",
                          fontWeight: "500",
                          textAlign: "center",
                          letterSpacing: "0.23px",
                        }}
                        className={dmsans.className}
                      >
                        Join us on social media
                      </Text>
                    </Column> */}
                    <Button size="l" weight="default" fillWidth>
                      Join community
                    </Button>
                  </Column>
                </Row>
              </Flex>
            </Column>
            {/* === */}
            <Column radius="l" flex={5} fillHeight overflow="hidden" gap="12">
              <Row fillWidth fillHeight flex={3} radius="l" gap="12">
                <Column flex={1} gap="12">
                  <Row
                    radius="l"
                    background="brand-strong"
                    flex={1}
                    fillHeight
                    style={{ backgroundColor: "#F9E38D" }}
                    padding="8"
                    paddingRight="16"
                    gap="16"
                    vertical="center"
                  >
                    <Column
                      style={{ backgroundColor: "#FEF7C3" }}
                      fillHeight
                      fitWidth
                      center
                      vertical="center"
                      horizontal="center"
                      paddingX="20"
                      radius="m"
                      minWidth={9}
                    >
                      <Text
                        style={{
                          color: "#181A1D",
                          fontSize: "30px",
                          fontWeight: "500",
                        }}
                        className={dmsans.className}
                      >
                        102
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        Available mentors
                      </Text>
                    </Column>
                    <Text
                      variant="label-default-m"
                      style={{ lineHeight: "1em" }}
                      className={dmsans.className}
                    >
                      Search or apply for a mentor to help you with your
                      learning journey.
                    </Text>
                  </Row>
                  <Flex
                    direction="column"
                    radius="l"
                    background="brand-strong"
                    flex={3}
                    fillHeight
                    style={{ backgroundColor: "#D7E1B3" }}
                    padding="20"
                  >
                    <Row fillWidth horizontal="space-between" vertical="center">
                      <Text
                        variant="label-strong-s"
                        className={dmsans.className}
                      >
                        GATEWAY TO KNOWLEDGE AND GROWTH
                      </Text>

                      <IconButton variant="secondary">
                        <i
                          className="ri-arrow-right-up-line"
                          style={{ fontSize: "23px" }}
                        ></i>
                      </IconButton>
                    </Row>
                    <Flex fillWidth height={1.5}></Flex>
                    <Column fillWidth gap="8">
                      {" "}
                      <Text
                        variant="body-default-xl"
                        style={{
                          color: "#181A1D",
                          fontSize: "25px",
                          fontWeight: "500",
                        }}
                        className={dmsans.className}
                      >
                        Search for schools and uni.
                      </Text>
                      <Text
                        style={{
                          fontSize: "15px",
                          fontWeight: "400",
                        }}
                        onBackground="neutral-medium"
                        className={dmsans.className}
                      >
                        Explore a wide range of educational institutions and
                        find the perfect fit for your academic journey with our
                        comprehensive search tool.
                      </Text>
                      <Row gap="12">
                        <Row
                          padding="8"
                          style={{ backgroundColor: "#fff" }}
                          radius="m"
                          paddingY="12"
                          vertical="center"
                          gap="16"
                        >
                          <i
                            className="ri-translate-ai"
                            style={{ color: "#e9d38D" }}
                          ></i>
                          <Text
                            variant="label-default-xs"
                            className={dmsans.className}
                            style={{ fontSize: "14px" }}
                          >
                            Natural language processing
                          </Text>
                        </Row>
                        <Row
                          padding="8"
                          style={{ backgroundColor: "#fff" }}
                          radius="m"
                          paddingY="12"
                          vertical="center"
                          gap="16"
                        >
                          <i
                            className="ri-ai-generate"
                            style={{ color: "#e9d38D" }}
                          ></i>
                          <Text
                            variant="label-default-xs"
                            className={dmsans.className}
                            style={{ fontSize: "14px" }}
                          >
                            Fast search
                          </Text>
                        </Row>{" "}
                      </Row>
                    </Column>
                  </Flex>
                </Column>
                {/* ====== */}
                <Column flex={1}>
                  <Flex
                    radius="l"
                    background="brand-strong"
                    flex={1}
                    fillHeight
                    center
                    style={{ backgroundColor: "#F9E38D" }}
                  >
                    <Media
                      src="https://i.ibb.co/5h57pcvq/image.png"
                      alt="a"
                      width={26}
                      height={20}
                      unoptimized
                    ></Media>
                  </Flex>
                </Column>
              </Row>
              {/* ===== */}

              <Row fillWidth fillHeight flex={1} radius="l">
                <Flex
                  flex={1}
                  radius="l"
                  style={{ backgroundColor: "#D7E1B3" }}
                  direction="row"
                  paddingX="l"
                  vertical="center"
                  horizontal="space-between"
                >
                  <Flex gap="32">
                    {" "}
                    <AvatarGroup
                      size="l"
                      avatars={[
                        { value: "A" },
                        { value: "B" },
                        { value: "C" },
                        { value: "D" },
                      ]}
                    />
                    <AvatarGroup size="l" avatars={[{ value: "A" }]} />
                  </Flex>
                  <Column fillHeight gap="4" vertical="center">
                    {/* <Text
                      onBackground="neutral-weak"
                      style={{
                        color: "#181A1D",
                        fontSize: "23px",
                        fontWeight: "500",
                      }}
                      className={dmsans.className}
                    >
                      MekoAI - coming very soon, sooner than you expect!
                    </Text> */}
                    <Button
                      fillWidth
                      variant="secondary"
                      size="l"
                      weight="default"
                    >
                      Try NextAI now
                    </Button>
                  </Column>
                </Flex>
              </Row>
            </Column>
            {/* ===== */}
            <Column radius="l" flex={2} fillHeight>
              <Flex
                radius="l"
                direction="column"
                background="brand-strong"
                flex={1}
                fillHeight
                padding="20"
                style={{ backgroundColor: "#F0F1EC" }}
                horizontal="center"
                vertical="start"
                gap="20"
              >
                <Row
                  fillWidth
                  style={{ backgroundColor: "#fff" }}
                  height={0.3}
                  radius="xl"
                >
                  <Row
                    width={2}
                    style={{ backgroundColor: "#181A1D" }}
                    height={0.3}
                    radius="xl"
                  ></Row>
                </Row>{" "}
                <Flex fillWidth fillHeight maxHeight={0}></Flex>
                <Row fillWidth paddingRight={"8"} gap="12" vertical="center">
                  <Flex
                    radius="full"
                    style={{ backgroundColor: "#fff" }}
                    center
                    width={3}
                    minWidth={3}
                    height={3}
                    minHeight={3}
                  >
                    <i className="ri-graduation-cap-fill"></i>{" "}
                  </Flex>
                  <Text variant="body-default-s">
                    Find tuitions and home tutors easily
                  </Text>
                  <IconButton variant="secondary">
                    <i
                      className="ri-arrow-right-up-line"
                      style={{ fontSize: "23px" }}
                    ></i>
                  </IconButton>
                </Row>
                <Column fillWidth gap="8">
                  {" "}
                  <Text
                    variant="body-default-xl"
                    style={{
                      color: "#181A1D",
                      fontSize: "25px",
                      fontWeight: "500",
                    }}
                    className={dmsans.className}
                  >
                    Hands on searching at your fingertips and AI surfing.
                  </Text>
                  <Text
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                    }}
                    onBackground="neutral-weak"
                    className={dmsans.className}
                  >
                    Find tuitions and home tutors easily with our NLP tools
                    which allow you to search instantly and get the best results
                    for you.
                  </Text>
                </Column>
                <Row wrap={true} horizontal="start" fillWidth gap="8">
                  <Flex
                    radius="m"
                    border="neutral-medium"
                    borderStyle="solid"
                    paddingX="12"
                    paddingY="12"
                    className={dmsans.className}
                  >
                    <Text variant="body-default-s">
                      <i className="ri-home-smile-2-line"></i>&nbsp;&nbsp;Home
                      tutor
                    </Text>
                  </Flex>
                  <Flex
                    radius="m"
                    border="neutral-medium"
                    borderStyle="solid"
                    paddingX="12"
                    style={{
                      borderColor: "#D7E1B3",
                      backgroundColor: "#D7E1B3",
                    }}
                    paddingY="12"
                    className={dmsans.className}
                  >
                    <Text variant="body-default-s">
                      <i className="ri-money-rupee-circle-line"></i>
                      &nbsp;&nbsp;Instant fees
                    </Text>
                  </Flex>

                  <Flex
                    radius="m"
                    border="neutral-medium"
                    borderStyle="solid"
                    paddingX="12"
                    style={{
                      borderColor: "#D7E1B3",
                      backgroundColor: "#D7E1B3",
                    }}
                    paddingY="12"
                    className={dmsans.className}
                  >
                    <Text variant="body-default-s">
                      <i className="ri-building-line"></i>
                      &nbsp;&nbsp;Institutions
                    </Text>
                  </Flex>
                  <Flex
                    radius="m"
                    border="neutral-medium"
                    borderStyle="solid"
                    paddingX="12"
                    paddingY="12"
                    className={dmsans.className}
                  >
                    <Text variant="body-default-s">
                      &nbsp;<i className="ri-corner-up-left-double-line"></i>
                      &nbsp;{" "}
                    </Text>
                  </Flex>
                  <Flex
                    radius="m"
                    border="neutral-medium"
                    borderStyle="solid"
                    paddingX="12"
                    paddingY="12"
                    className={dmsans.className}
                  >
                    <Text variant="body-default-s">
                      &nbsp;<i className="ri-school-line"></i>&nbsp;
                    </Text>
                  </Flex>
                  <Flex
                    radius="m"
                    border="neutral-medium"
                    borderStyle="solid"
                    paddingX="12"
                    paddingY="12"
                    className={dmsans.className}
                  >
                    <Text variant="body-default-s">
                      <i className="ri-pencil-line"></i>
                      &nbsp;&nbsp;Interview
                    </Text>
                  </Flex>
                  <Flex
                    radius="m"
                    border="neutral-medium"
                    borderStyle="solid"
                    paddingX="12"
                    style={{
                      borderColor: "#D7E1B3",
                      backgroundColor: "#D7E1B3",
                    }}
                    paddingY="12"
                    className={dmsans.className}
                  >
                    <Text variant="body-default-s">
                      <i className="ri-computer-line"></i>
                      &nbsp;&nbsp;Admissions
                    </Text>
                  </Flex>
                </Row>
              </Flex>
            </Column>
          </Row>
        </Column>
      </Column>
    </>
  );
}
