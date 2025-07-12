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
function InstitutionCard({ data }: { data: any }) {
  // No fetching here, just render the UI
  const center = data;
  return (
    <Card
      key={center.name}
      background="transparent"
      radius="l"
      border="neutral-weak"
      padding="0"
      style={{ marginBottom: "32px" }}
      fillWidth
    >
      <Grid
        fillWidth
        className="findInstitutionGrid"
        padding="m"
        radius="l"
        background="transparent"
        columns={4}
        gap="32"
      >
        <Column flex={2}>
          <Row vertical="center" gap="16">
            <Media
              src={center.logo}
              objectFit="contain"
              width={3}
              height={3}
              alt={center.name}
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
                className={dmsans.className}
              >
                <Row gap="8">{center.name} </Row>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "14px", lineHeight: "1em" }}
                className={dmsans.className}
              >
                {center.type} at {center.location.city}
              </Text>
            </Column>
            <IconButton
              variant="secondary"
              size="m"
              onClick={() => {
                // Navigate to institution page
                window.open(`/edu/${center.edu_id}`, "_blank");
              }}
            >
              <Text onBackground="neutral-medium">
                {" "}
                <i
                  className="ri-arrow-right-up-line"
                  style={{ fontSize: "18px" }}
                ></i>
              </Text>
            </IconButton>
          </Row>
        </Column>
        <Column flex={2} gap="8">
          <Card
            gap="8"
            vertical="center"
            radius="s"
            paddingX="4"
            paddingY="2"
            background="transparent"
            border="transparent"
            onClick={() => {
              // Navigate to institution page
              window.open(`/profile/${center.uuid}`, "_blank");
            }}
          >
            <Media src={center.pfp} radius="s" width={1.8} height={1.8}></Media>{" "}
            <Text
              onBackground="neutral-medium"
              style={{ fontSize: "15px" }}
              className={dmsans.className}
            >
              {center.full_name}
            </Text>
          </Card>
          <InfoRow
            icon="ri-map-pin-2-line"
            text={`${center.location.city || "0"}, ${
              center.location.country || "0"
            }`}
          />
          <InfoRow
            icon="ri-artboard-2-line"
            text={
              Array.isArray(center.affiliation.boards)
                ? center.affiliation.boards.length > 0
                  ? center.affiliation.boards.join("/").toUpperCase()
                  : "Not provided"
                : (center.affiliation.boards || "Not provided").toUpperCase()
            }
          />
          <InfoRow
            icon="ri-user-smile-line"
            text={`${center.classes_offered.min || "-th"} to ${
              center.classes_offered.max || "-th"
            }`}
          />
          <InfoRow
            icon="ri-building-4-line"
            text={
              center.student_population
                ? center.student_population.toString() +
                  "+ students and teachers"
                : "0+ students and teachers"
            }
          />
          <InfoRow
            icon="ri-star-line"
            text={
              center.star_rating ? center.star_rating.toString() + "/5" : "0/5"
            }
          />
          <InfoRow
            icon="ri-store-2-line"
            text={center.facilities || "NOT PROVIDED"}
          />
        </Column>
        <Column flex={2} gap="8">
          <ContactRow
            label="Email"
            value={center.contact.email || "Not provided"}
            verified={center.verified}
          />
          <ContactRow
            label="Phone"
            value={center.contact.phone || "Not provided"}
            verified={center.verified}
          />
          <ContactRow
            label="Office"
            value={`${center.contact.office_hours?.start || "0000"} - ${
              center.contact.office_hours?.end || "0000"
            }`}
          />
          <ContactRow
            label="Fees"
            value={center.fees_structure || "Not provided"}
          />
        </Column>
        <Column flex={2} horizontal="start" vertical="start">
          <Carousel indicator="line" controls={false} items={center.images} />
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
  institutionData,
  loading,
}: {
  searchValue: string;
  setSearchValue: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  institutionData: any[];
  loading: boolean;
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
          disabled
          height="s"
          style={{ maxWidth: "250px" }}
          value={category}
          options={[
            { label: "Institutions", value: "institutions" },
            { label: "Consultants", value: "consultants" },
          ]}
          onSelect={setCategory}
        />
        <Button weight="default" variant="primary" size="l" disabled={true}>
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
        {loading ? (
          <Flex
            background="transparent"
            radius="l"
            border="transparent"
            padding="0"
            fillWidth
            center
          >
            <Spinner size="xl" />
          </Flex>
        ) : (
          institutionData.map((data) => (
            <RevealFx key={data.edu_id}>
              <InstitutionCard key={data.edu_url_name} data={data} />
            </RevealFx>
          ))
        )}
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

  // Institution data state
  const [institutionData, setInstitutionData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchEduCenters() {
      setLoading(true);
      const { data, error } = await supabase
        .from("edu_centers")
        .select("logo,basic_info,images,edu_id,edu_url_name,is_published");

      if (!error && data) {
        const mapped = data
          .filter((row: any) => row.is_published !== false)
          .map((row: any) => {
            const info = row.basic_info || {};
            return {
              name: info.name || "",
              logo: row.logo || "",
              type: info.type || "",
              gender: "",
              year_established: info.year_established || "",
              boarding_type: info.boarding_type || "",
              affiliation: info.affiliation || { boards: [], type: "" },
              classes_offered: info.classes_offered || { min: "", max: "" },
              student_population: info.student_population || "",
              star_rating: info.star_rating || "",
              location: info.location || { city: "", country: "" },
              contact: info.contact || {
                email: "",
                phone: "",
                office_hours: { start: "", end: "" },
              },
              facilities: info.facilities || "",
              fees_structure: info.fees_structure || "",
              images: row.images || [],
              verified: true,
              uuid: info.uuid || "",
              edu_id: row.edu_id || "",
              edu_url_name: row.edu_url_name || "",
            };
          });
        setInstitutionData(mapped);

        // Fetch user_profiles for each institution
        // Fetch user_profiles for each institution and merge pfp/full_name
        const uuids = mapped.map((inst: any) => inst.uuid).filter(Boolean);
        if (uuids.length > 0) {
          const { data: profiles, error: profileError } = await supabase
            .from("user_profiles")
            .select("uuid, pfp, profile_details")
            .in("uuid", uuids);

          if (!profileError && profiles) {
            const profileMap = new Map(
              profiles.map((p: any) => [
                p.uuid,
                {
                  pfp: p.pfp || "",
                  full_name:
                    p.profile_details?.personal_details?.full_name || "",
                },
              ])
            );
            setInstitutionData((prev) =>
              prev.map((inst) => ({
                ...inst,
                pfp: profileMap.get(inst.uuid)?.pfp || "",
                full_name: profileMap.get(inst.uuid)?.full_name || "",
              }))
            );
          }
        }
      }
      setLoading(false);
    }
    fetchEduCenters();
  }, []);

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
          institutionData={institutionData}
          loading={loading}
        />
        <Flex height={3} fillWidth></Flex>
        <Footer />
      </Column>
    </Column>
  );
}
