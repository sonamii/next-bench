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
} from "@once-ui-system/core";
import { useState } from "react";
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
const institutionData = [
  {
    id: "st patrick's academy",
    count: 1,
    name: "St. Patrick's Academy",
    logo: "https://yt3.googleusercontent.com/ytc/AIdro_nHcwS0yKNZRaBSjEKQ6GE8po7Si6MtE4D8-rABvFLuAQ=s900-c-k-c0x00ffffff-no-rj",
    type: "School in India",
    location: "Dehradun, Uttarakhand",
    board: "ICSE/ISC",
    classes: "UKG to 12th",
    population: "3000+ students and teachers",
    rating: "4.7/5",
    features:
      "Labs, Sports, Audorium, Library, Canteen, Transport, Infirmary, and more.",
    contact: {
      email: "spadehradun@gmail.com",
      phone: "+91 12345 67890",
      office: "8:00 a.m. to 5:00 p.m.",
    },
    verified: true,
    creator: {
      name: "Divyanshu Dhruv",
      avatar:
        "https://divyanshudhruv.is-a.dev/_next/image?url=%2Fme.png&w=384&q=95",
    },
    images: [
      {
        slide:
          "https://msmgurugram.com/wp-content/uploads/2022/12/St.-Patricks-Academy-Dehradun-Estd.-2014.jpg",
        alt: "Image 1",
      },
      {
        slide:
          "https://i.ytimg.com/vi/bXXd3ZOmKEM/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGH8gHSgTMA8=&rs=AOn4CLAFB1FRI9BDbRuDtoIzllLgtYCKoA",
        alt: "Image 2",
      },
    ],
  },
];

// Header

// About Badge
function AboutBadge() {
  return (
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
        <Tag>02</Tag>
        Search Institutions and Consultants
      </Badge>
    </Flex>
  );
}

// Hero Section
function HeroSection() {
  return (
    <Row
      id="herro"
      horizontal="space-between"
      vertical="start"
      fillWidth
      style={{ maxWidth: "100vw" }}
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
              fontWeight: "500",
              letterSpacing: ".3px",
            }}
            className={dmsans.className}
          >
            Discover, and search <br />
            the best <span style={{ color: "#626F45" }}>
              institutions
            </span> and <span style={{ color: "#626F45" }}>consultants</span>.
          </Text>
        </Column>
      </Column>
      <HeroStats />
    </Row>
  );
}

// Hero Stats
function HeroStats() {
  const router = useRouter();
  return (
    <Column
      fitWidth
      fillHeight
      horizontal="start"
      vertical="space-between"
      maxWidth={27.5}
      maxHeight={13.2}
    >
      <Row center fitWidth fitHeight gap="20">
        <AvatarGroup size="l" avatars={avatarGroup1} />
        <Line vert width={0.2} height={4} background="neutral-medium" />
        <Column horizontal="end" vertical="start" fitHeight>
          <Text
            style={{
              color: "#181A1D",
              fontSize: "41px",
            }}
            className={dmsans.className}
          >
            +50
          </Text>
          <Text
            onBackground="neutral-weak"
            style={{
              fontSize: "10px",
            }}
          >
            Verified consultants
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
            +240
          </Text>
          <Text
            onBackground="neutral-weak"
            style={{
              fontSize: "10px",
            }}
          >
            Verified institutions
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
          Find and compare the best schools, colleges, universities, and
          consultants faster than ever with MekoAI. Search manually or use
          AI-powered search—freemium users get the most out of both.
        </Text>
        <Row gap="20">
          <Button
            id="arrow-button-1"
            arrowIcon
            size="m"
            weight="default"
            href="#card-d"
          >
            Search
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
            onClick={() => router.push("/profile/a")}
          >
            AI Search
          </Button>
        </Row>
      </Column>
    </Column>
  );
}

// Institution Card
function InstitutionCard({ data }: { data: (typeof institutionData)[0] }) {
  return (
    <Card background="transparent" radius="l" border="transparent" padding="0">
      <Grid
        fillWidth
        border="neutral-weak"
        padding="m"
        radius="l"
        background="transparent"
        columns={4}
        gap="32"
      >
        <Column flex={2}>
          <Row vertical="center" gap="16">
            <Media
              src={data.logo}
              objectFit="contain"
              width={3}
              height={3}
              alt="A"
              radius="full"
              borderWidth={2}
              border="neutral-weak"
            />
            <Column gap="0" marginTop="16">
              <Text
                onBackground="neutral-strong"
                style={{
                  fontSize: "18px",
                  marginBottom: "12px",
                  lineHeight: "1em",
                }}
              >
                <Row gap="8">
                  {" "}
                  {data.name} 
                </Row>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "14px", lineHeight: "0.5em" }}
              >
                {data.type}
              </Text>
            </Column>
          </Row>
        </Column>
        <Column flex={2} gap="8">
          <Row fillWidth horizontal="center" gap="12" vertical="center">
            <Row flex={1}>
              <Media
                src={data.creator.avatar}
                width={2}
                height={2}
                radius="s-4"
              />
            </Row>
            <Row flex={12}>
              <Text
                onBackground="neutral-medium"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {data.creator.name}
              </Text>
            </Row>
          </Row>
          <InfoRow icon="ri-map-pin-2-line" text={data.location} />
          <InfoRow icon="ri-artboard-2-line" text={data.board} />
          <InfoRow icon="ri-user-smile-line" text={data.classes} />
          <InfoRow icon="ri-building-4-line" text={data.population} />
          <InfoRow icon="ri-star-line" text={data.rating} />
          <InfoRow icon="ri-store-2-line" text={data.features} />
        </Column>
        <Column flex={2} gap="8">
          <ContactRow
            label="Email"
            value={data.contact.email}
            verified={data.verified}
          />
          <ContactRow
            label="Phone"
            value={data.contact.phone}
            verified={data.verified}
          />
          <ContactRow label="Office" value={data.contact.office} />
        </Column>
        <Column flex={2} horizontal="start" vertical="start">
          <Carousel indicator="line" controls={false} items={data.images} />
        </Column>
      </Grid>
    </Card>
  );
}

// Info Row
function InfoRow({ icon, text }: { icon: string; text: string }) {
  return (
    <Row fillWidth horizontal="center" gap="12" vertical="center">
      <Row flex={1}>
        <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
          <i className={icon}></i>
        </Text>
      </Row>
      <Row flex={12}>
        <Text
          onBackground="neutral-medium"
          style={{ fontSize: "14px" }}
          className={dmsans.className}
        >
          {text}
        </Text>
      </Row>
    </Row>
  );
}

// Contact Row
function ContactRow({
  label,
  value,
  verified,
}: {
  label: string;
  value: string;
  verified?: boolean;
}) {
  return (
    <Row fillWidth horizontal="center" gap="12" vertical="center">
      <Row flex={1}>
        <Text onBackground="neutral-weak" style={{ fontSize: "14px" }}>
          <Kbd
            background="neutral-medium"
            border="neutral-medium"
            onBackground="neutral-weak"
          >
            {label}
          </Kbd>
        </Text>
      </Row>
      <Row flex={12} gap="8">
        <Text
          onBackground="neutral-medium"
          style={{ fontSize: "14px" }}
          className={dmsans.className}
        >
          {value}
        </Text>
        {verified && (
          <Text onBackground="success-weak">
            <i className="ri-checkbox-circle-fill"></i>
          </Text>
        )}
      </Row>
    </Row>
  );
}

// Table Section
function TableSection({
  searchValue,
  setSearchValue,
  category,
  setCategory,
}: {
  searchValue: string;
  setSearchValue: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  // You can filter institutionData here based on searchValue/category if needed

  return (
    <>
      <Row fillWidth gap="4" paddingX="m">
        <Input
          id="input-1"
          placeholder="Search"
          height="m"
          value={searchValue}
          onChange={handleChange}
          hasPrefix={<i className="ri-search-line" />}
          hasSuffix={
            searchValue.length > 0 ? (
              <IconButton
                variant="ghost"
                icon="close"
                size="s"
                onClick={handleClear}
                aria-label="Clear search"
              />
            ) : null
          }
        />
        <Select
          id="searchable-select"
          label="Choose a category"
          height="s"
          style={{ maxWidth: "250px" }}
          value={category}
          options={[
            { label: "Institutions", value: "institutions" },
            { label: "Consultants", value: "consultants" },
          ]}
          onSelect={setCategory}
        />
        <Button weight="default" variant="primary" size="l">
          Filters
        </Button>
      </Row>
      <Flex fillWidth height={2}></Flex>
      <Column
        fillWidth
        horizontal="center"
        vertical="start"
        paddingX="m"
        gap="12"
      >
        {institutionData.map((data) => (
          <InstitutionCard key={data.id} data={data} />
        ))}
      </Column>
    </>
  );
}

// Main Page
export default function Home() {
  const router = useRouter();

  // Centralized state for all input/selection
  const [searchValue, setSearchValue] = useState<string>("");
  const [category, setCategory] = useState<string>("");

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
        <Flex height={3} minHeight={3}></Flex>
        <AboutBadge />
        <HeroSection />
        <Flex height={7}></Flex>
        <TableSection
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          category={category}
          setCategory={setCategory}
        />
        <Flex height={3} fillWidth></Flex>
        <Footer />
      </Column>
    </Column>
  );
}
