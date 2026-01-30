"use client";
import "@/resources/custom.css";
import Lenis from "lenis";

import {
  Text,
  Button,
  Column,
  Line,
  Flex,
  Row,
  Icon,
  Kbd,
  IconButton,
  Input,
  ThemeSwitcher,
  AvatarGroup,
  Mask,
  MatrixFx,
} from "@once-ui-system/core";
import Image from "next/image";
import { Geist, DM_Mono } from "next/font/google";
import React, { useState } from "react";
import { SearchCard } from "../components/(main)/searchCard";
import { Navbar } from "../components/(global)/navbar";
import { Footer } from "../components/(global)/footer";

const institutions = [
  {
    institutionName: "IIT Ashram",
    institutionLogo: "https://iitashram.com/upload/logo.png",
    institutionLocation: "Vadodara, Gujarat",
    institutionRating: 5,
    institutionDescription: "At IIT Ashram we provide the best for...",
    institutionPopularity: ["Popular", "Best", "Approoved"],
  },
  {
    institutionName: "Admirality Tuitions",
    institutionLogo:
      "https://www.moe.gov.sg/api/media/d3feaf9f-9d70-42de-9078-d201aea80c9b/admiralty-primary-school.png",
    institutionLocation: "New York, USA",
    institutionRating: 4,
    institutionDescription: "We are the best university...",
    institutionPopularity: ["Popular"],
  },
  {
    institutionName: "FIITJEE",
    institutionLogo:
      "https://p.urbanpro.com/tv-prod/member/photo/11185892-large.jpg",
    institutionLocation: "London, UK",
    institutionRating: 3,
    institutionDescription: "FIITJEE is the best school...",
    institutionPopularity: ["Best", "Approoved"],
  },
  {
    "institutionName": "Allen Career Institute",
    "institutionLogo": "https://img.icons8.com/color/1200/allen-career-institute.jpg",
    "institutionLocation": "Kota, Rajasthan",
    "institutionRating": 5,
    "institutionDescription": "Premier coaching institute known for its rigorous system and producing top ranks in JEE and NEET.",
    "institutionPopularity": ["Top Rated", "Strict", "Kota Factory"],
    "institutionWebsite": "https://www.allen.ac.in/"
  },{
    "institutionName": "Aakash Institute (Aakash BYJU'S)",
    "institutionLogo": "https://static.businessworld.in/1625677838_JgWr4T_Aakash_Byju_s_logo.png",
    "institutionLocation": "New Delhi, Delhi",
    "institutionRating": 4,
    "institutionDescription": "One of India's largest coaching networks, highly specialized for Medical and Engineering entrance exams.",
    "institutionPopularity": ["Medical Specialist", "Pan-India Presence"],
    "institutionWebsite": "https://www.aakash.ac.in/"
  },{
    "institutionName": "Career Launcher (CL)",
    "institutionLogo": "https://pbs.twimg.com/profile_images/1412802196735885320/qPKJeUZe_400x400.jpg",
    "institutionLocation": "New Delhi, Delhi",
    "institutionRating": 4,
    "institutionDescription": "A market leader in aptitude test preparation, specifically famous for CLAT (Law) and CAT (MBA).",
    "institutionPopularity": ["Best for Law", "LST Program", "Aptitude Focus"],
    "institutionWebsite": "https://www.careerlauncher.com/"
  },{
    "institutionName": "Resonance Eduventures",
    "institutionLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCNTZFohfQgfW0SojMsbbWl0O-UiWP7mJkpw&s",
    "institutionLocation": "Kota, Rajasthan",
    "institutionRating": 4,
    "institutionDescription": "Renowned for its study material and systematic coaching for IIT-JEE, founded by R.K. Verma.",
    "institutionPopularity": ["High Success Rate", "Study Material"],
    "institutionWebsite": "https://www.resonance.ac.in/"
  },
  {
    "institutionName": "CLAT Possible",
    "institutionLogo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDJNy5lYf0ZoiZh5us_gGfKsg71KxRdocLgw&s",
    "institutionLocation": "Lucknow, UP",
    "institutionRating": 4,
    "institutionDescription": "A dedicated coaching institute for Law aspirants, known for personalized mentorship in CLAT and AILET.",
    "institutionPopularity": ["Law Dedicated", "Personalized"],
    "institutionWebsite": "https://www.clatpossible.com/"
  },{
    "institutionName": "Physics Wallah (Vidyapeeth)",
    "institutionLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Physics_wallah_logo.jpg/500px-Physics_wallah_logo.jpg",
    "institutionLocation": "Noida, UP",
    "institutionRating": 5,
    "institutionDescription": "Started as a YouTube channel, now a unicorn ed-tech giant offering affordable offline and online coaching.",
    "institutionPopularity": ["Affordable", "Student Favorite", "Hybrid Learning"],
    "institutionWebsite": "https://www.pw.live/"
  },{
    "institutionName": "BITS Pilani",
    "institutionLogo": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/250px-BITS_Pilani-Logo.svg.png",
    "institutionLocation": "Pilani, Rajasthan",
    "institutionRating": 5,
    "institutionDescription": "India's most prestigious private engineering institute, known for its 'zero attendance' policy and startup culture.",
    "institutionPopularity": ["Tier 1", "Engineering", "Startup Hub"],
    "institutionWebsite": "https://www.bits-pilani.ac.in/"
  },{
    "institutionName": "Manipal Academy of Higher Education (MAHE)",
    "institutionLogo": "https://www.manipal.edu/content/dam/manipal/mu/mcops-manipal/Images_new/mahe-header-color-final.png.transform/manipal-edu-transform-width-height-305px/image.png",
    "institutionLocation": "Manipal, Karnataka",
    "institutionRating": 5,
    "institutionDescription": "A massive university town known for world-class infrastructure in Engineering and Medicine.",
    "institutionPopularity": ["Global Exposure", "Campus Life", "Research"],
    "institutionWebsite": "https://www.manipal.edu/"
  },{
    "institutionName": "Vellore Institute of Technology (VIT)",
    "institutionLogo": "https://i.pinimg.com/474x/2d/1d/36/2d1d3632086bf8503d9d6fe8e44d8427.jpg",
    "institutionLocation": "Vellore, Tamil Nadu",
    "institutionRating": 4,
    "institutionDescription": "Famous for its massive intake and high placement records in IT and core engineering sectors.",
    "institutionPopularity": ["Placements", "Strict Academic Rigor"],
    "institutionWebsite": "https://www.vit.ac.in/"
  }

];

export const institutionsData = JSON.stringify(institutions);

const lenis = new Lenis({
  autoRaf: true,
});
const geist = Geist({ subsets: ["latin"] });
const mono = DM_Mono({
  subsets: ["latin"],
  weight: "300",
});

const companyLogo =
  "https://media.licdn.com/dms/image/v2/D560BAQFyPNfJhr3kZw/company-logo_100_100/B56Zs1v9oTKIAM-/0/1766133325738?e=1770854400&v=beta&t=c7QJ4ZxcL1Q7BexaTjs_hyBo8SWCDgPMQA0BUDl5WlQ";
export default function Home() {
  const storedTheme = localStorage.getItem("data-theme") as
    | "light"
    | "dark"
    | "system";
  const [theme, setTheme] = React.useState<"light" | "dark">(
    storedTheme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : storedTheme,
  );

  React.useEffect(() => {
    const resolvedTheme =
      storedTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : storedTheme;

    document.documentElement.setAttribute("data-theme", resolvedTheme);
    localStorage.setItem(
      "data-theme",
      storedTheme === "system" ? resolvedTheme : storedTheme,
    );
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(
      "data-theme",
      storedTheme === "system" ? theme : storedTheme,
    );
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme =
      storedTheme === "system"
        ? theme === "light"
          ? "dark"
          : "light"
        : storedTheme === "dark"
          ? "light"
          : "dark";
    setTheme(nextTheme);
  };

  const [selected, setSelected] = useState<boolean>(true);
  return (
    <Column
      fillWidth
      vertical="start"
      horizontal="center"
      padding="m"
      // style={{
      //   minHeight: "100vh",

      //   backgroundColor:
      //     theme === "dark"
      //       ? "#111111"
      //       : theme === "light"
      //         ? "#F9F9F9"
      //         : "#F9F9F9",
      // }}
      onBackground="neutral-strong"
    >
 <Navbar/>
      <Flex height={"64"}></Flex>

      <Column
        fillWidth
        fitHeight
        maxWidth={"xs"}
        horizontal="center"
        paddingY="xl"
        gap="m"
        style={{ flexWrap: "wrap" }}
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
                1025+ institutes indexed
              </Text>
            </Row>
          </Column>
        </Row>
        <Column data-scaling="110" fitHeight gap={"s"} maxWidth={"s"}>
          <Text variant="display-default-m" align="center">
            {" "}
            Search for&nbsp;
            <span
              style={{
                fontFamily: geist.className,
                fontStyle: "italic",
                fontWeight: "normal",
              }}
            >
              <u>universities</u>
            </span>{" "}
            ,{" "}
            <span
              style={{
                fontFamily: geist.className,
                fontStyle: "italic",
                fontWeight: "normal",
              }}
            >
              <u>colleges</u>
            </span>{" "}
            and{" "}
            <span
              style={{
                fontFamily: geist.className,
                fontStyle: "italic",
                fontWeight: "normal",
              }}
            >
              <u>tuitions</u>
            </span>
            &nbsp; efficiently. 
          </Text>
           <Text
          variant="body-default-xl"
          onBackground="neutral-weak"
          align="center"
        >
          Search among thousands of schools and find the best that suits your needs efficiently.
        </Text>
          <Flex height={"20"}></Flex>
          <Row gap="16" center fillWidth style={{ flexWrap: "wrap" }}>
            <Row radius="s" shadow="xs" padding="8" vertical="center" gap="8">
              <Row vertical="center" gap="2">
                <Icon name="sort" size="xs"></Icon>
                <Text variant="body-default-s">Sort</Text>
              </Row>
              <Line vert height={1} />
              <Kbd>All</Kbd>
            </Row>

            <Row radius="s" shadow="xs" padding="8" vertical="center" gap="8">
              <Row vertical="center" gap="2">
                <Icon name="earth" size="xs"></Icon>
                <Text variant="body-default-s">Location</Text>
              </Row>
              <Line vert height={1} />
              <Kbd>All</Kbd>
            </Row>

            <Row radius="s" shadow="xs" padding="8" vertical="center" gap="8">
              <Row vertical="center" gap="2">
                <Icon name="stethoscope" size="xs"></Icon>
                <Text variant="body-default-s">Speciality</Text>
              </Row>
              <Line vert height={1} />
              <Kbd>All</Kbd>
            </Row>

            <Row radius="s" shadow="xs" padding="8" vertical="center" gap="8">
              <Row vertical="center" gap="2">
                <Icon name="notepad" size="xs"></Icon>
                <Text variant="body-default-s">Category</Text>
              </Row>
              <Line vert height={1} />
              <Kbd>All</Kbd>
            </Row>
          </Row>
        </Column>
         <Mask
        fill
        height={24}
        x={50}
        y={50}
        radius={23}
        opacity={30}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      >
        <MatrixFx
          height={24}
          colors={["brand-solid-strong", "neutral-solid-strong"]}
          trigger="mount"
          flicker
        />
      </Mask>
      </Column>
      <Row fillWidth maxWidth={"xl"} style={{ flexWrap: "wrap" }} gap="32" horizontal="center">
        {institutions.map((institution) => (
          <SearchCard {...institution} key={institution.institutionName} />
        ))}
      </Row>
      <Flex height="40" />
      <Button size="m" variant="secondary">
        <Text variant="body-default-l">Load More</Text>
      </Button>
      <Flex height={4}/>
      <Footer/>
    </Column>
  );
}
