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

const lenis = new Lenis({
  autoRaf: true,
});
const geist = Geist({ subsets: ["latin"] });
const mono = DM_Mono({
  subsets: ["latin"],
  weight: "300",
});

import supabase from "../supabase/client";
const companyLogo =
  "https://media.licdn.com/dms/image/v2/D560BAQFyPNfJhr3kZw/company-logo_100_100/B56Zs1v9oTKIAM-/0/1766133325738?e=1770854400&v=beta&t=c7QJ4ZxcL1Q7BexaTjs_hyBo8SWCDgPMQA0BUDl5WlQ";


type Institution = {
  institutionName: string;
  institutionLogo: string;
  institutionLocation: string;
  institutionRating: number;
  institutionDescription: string;
  institutionPopularity: string[];
  institutionSlug: string;
  institutionWebsite: string;
};



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

  const [institutions, setInstitutions] = React.useState<Institution[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('edu').select('id, slug, mdx, ratings, desc, name, city, state, tags');
      if (error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
      }
      const formattedData = data.map((item: any) => ({
        institutionName: item.name,
        institutionLogo: item.tags,
        institutionLocation: `${item.city}, ${item.state}`,
        institutionRating: item.ratings,
        institutionDescription: item.desc,
        institutionPopularity: item.tags.split(','),
        institutionWebsite: item.slug,
        institutionSlug: item.slug
      }));
      setInstitutions(formattedData);
    }

    fetchData();
  }, []);


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
