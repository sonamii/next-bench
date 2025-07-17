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
  InteractiveDetails,
  Accordion,
  BarChart,
  LineChart,
  Grid,
  Scroller,
  User,
  UserMenu,
  Dialog,
  Table,
  Avatar,
  Kbd,
  Card,
  Carousel,
  Select,
  Spinner,
  RevealFx,
  Skeleton,
  SmartLink,
  Textarea,
  Chip,
} from "@once-ui-system/core";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase/client";
import {
  Lato,
  Montserrat,
  Montserrat_Alternates,
  Outfit,
  Unica_One,
  Work_Sans,
} from "next/font/google";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Cookie } from "../components/once-ui-pro/Cookie";

// Font setup
const dmsans = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700"],
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
});
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

// JSON Data

const avatarGroup1 = [{ value: "A" }, { value: "B" }, { value: "C" }];

// Header

// About Badge
function AboutBadge() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function getSessionAndProfile() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("uuid", session.user.id)
          .single();
        if (!error && data) {
          setProfile(data);
        }
      }
    }
    getSessionAndProfile();
  }, []);

  return (
    <Flex
      fillWidth
      height={4}
      minHeight={4}
      vertical="center"
      horizontal="start"
    >
      {session ? (
        <UserMenu
          name={profile?.profile_details?.personal_details.name}
          placement="right-end"
          selected={false}
          avatarProps={{ src: profile?.pfp }}
        />
      ) : (
        <Skeleton shape="circle" width="m" height="m"></Skeleton>
      )}
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
        <Tag>02</Tag>
        Search Institutions and Consultants
      </Badge>
    </Flex>
  );
}

// Hero Section
function HeroSection() {
  return (
    <Column
      id="herro"
      horizontal="center"
      vertical="center"
      fillWidth
      style={{ maxWidth: "100vw" }}
      fitHeight
      gap="40"
      wrap={true}
      paddingX="xl"
    >
      <Column
        fillWidth
        fitHeight
        vertical="center"
        horizontal="center"
        maxWidth={50}
        gap="12"
        paddingY="24"
      >
        {/* <Media
          src="https://imghost.online/ib/skwnw73hCCCOt3q_1751541353.png"
          unoptimized
          width={4.5}
          height={3.5}
          alt="A"
          className="logo"
        />{" "} */}
        <Text
          style={{
            color: "#181A1D",
            fontSize: "60px",
            lineHeight: "1em",
            fontWeight: "500",
            letterSpacing: ".3px",
          }}
          className={dmsans.className + " titleTexts"}
        >
          Next Bench by <span style={{ color: "#626F45" }}>Sonamii</span>
        </Text>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Find exactly who you're looking for, in seconds.{" "}
          <SmartLink href="#">See how it works.</SmartLink>
        </Text>
      </Column>
      <Column fillWidth>
        <Row horizontal="space-between" fillWidth>
          <Flex
            background="brand-medium"
            padding="8"
            paddingY="12"
            radius="s"
            border="brand-strong"
            borderWidth={1}
            borderStyle="solid"
            style={{
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
              borderBottomWidth: "0",
            }}
          >
            <Text
              onBackground="brand-medium"
              variant="body-default-m"
              className={dmsans.className}
            >
              <i className="ri-bard-fill"></i>&nbsp;&nbsp;What are you looking
              for?
            </Text>
          </Flex>

          <Flex fitWidth vertical="end">
            <Button
              variant="secondary"
              weight="default"
              size="l"
              radius="top-left"
              className={dmsans.className}
            >
              <Text onBackground="neutral-weak">
                <i className="ri-mic-2-ai-line"></i>&nbsp;&nbsp;Description
              </Text>
            </Button>
            <Button
              variant="secondary"
              weight="default"
              size="l"
              radius="none"
              className={dmsans.className}
            >
              <Text onBackground="neutral-weak">
                <i className="ri-functions"></i>&nbsp;&nbsp;Boolean
              </Text>
            </Button>
            <Button
              variant="secondary"
              weight="default"
              size="l"
              radius="top-right"
              className={dmsans.className}
            >
              <Text onBackground="neutral-weak">
                <i className="ri-hammer-line"></i>&nbsp;&nbsp;Select manually
              </Text>
            </Button>
          </Flex>
        </Row>
        <Row>
          <Textarea
            id=""
            style={{ borderRadius: "0px !important", padding: "20px" }}
            lines={2}
            radius="bottom"
            placeholder="Top 10 universities in India for B.Tech in Computer Science with a minimum rating of 4.5 and maximum fees of ₹2,00,000."
          />
          <Button
            style={{
              maxWidth: "40px",
              minWidth: "40px",
              maxHeight: "40px",
              minHeight: "40px",
              position: "absolute",
              right: "10px",
              top: "10px",
            }}
          >
            <i className="ri-send-plane-2-fill"></i>
          </Button>
        </Row>
        <Row wrap={true} paddingY="8" gap="8">
          <Chip label="" background="neutral-strong">
            <i className="ri-check-line"></i>&nbsp;Location
          </Chip>
          {/* <Chip label="" background="neutral-strong">
            <i className="ri-check-line"></i>&nbsp;Board
          </Chip> */}
          {/* <Chip label="" background="neutral-strong">
            <i className="ri-check-line"></i>&nbsp;Class
          </Chip> */}
          <Chip label="" background="neutral-strong">
            <i className="ri-check-line"></i>&nbsp;Type
          </Chip>
          <Chip label="" background="neutral-strong">
            <i className="ri-check-line"></i>&nbsp;Rating
          </Chip>
          <Chip label="" background="neutral-strong">
            <i className="ri-check-line"></i>&nbsp;Fees
          </Chip>
        </Row>
      </Column>
    </Column>
  );
}

// Main Page
export default function Home() {
  const router = useRouter();

  return (
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
      <Column style={{ maxWidth: "1550px" }} fillWidth fitHeight>
        <NavBar />
        <Flex height={7} minHeight={7}></Flex>
        <HeroSection />

        <Flex height={7} minHeight={7}></Flex>
        <Footer />
      </Column>
    </Column>
  );
}
