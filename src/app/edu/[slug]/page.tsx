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
  HeadingNav,
  HeadingLink,
  NumberInput,
  Select,
  Textarea,
  useToast,
  Spinner,
  List,
  ListItem,
  SmartLink,
  LineChart,
  BarChart,
  LineBarChart,
  PieChart,
  Table,
  Chip,
  LinearGauge,
} from "@once-ui-system/core";
import { Geist, DM_Mono } from "next/font/google";
import React, { useState } from "react";
import { Navbar } from "@/app/components/(global)/navbar";
import supabase from "@/app/supabase/client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const geist = Geist({ subsets: ["latin"] });
const mono = DM_Mono({
  subsets: ["latin"],
  weight: "300",
});

const lenis = new Lenis({
  autoRaf: true,
});

const companyLogo =
  "https://media.licdn.com/dms/image/v2/D560BAQFyPNfJhr3kZw/company-logo_100_100/B56Zs1v9oTKIAM-/0/1766133325738?e=1770854400&v=beta&t=c7QJ4ZxcL1Q7BexaTjs_hyBo8SWCDgPMQA0BUDl5WlQ";

const eduData = {
  metadata: {
    updatedAt: "jan 29,2026",
    name: "IIT Hyderabad",
    type: "University",
    slug: "iit-hyderabad",
  },
  containers: [
    {
      section: "description",
      heading: {
        as: "h2",
        title: "Description",
        id: "description",
      },
      content: [
        {
          type: "text",
          value:
            "IIT Hyderabad (IITH) is a premier engineering institute in Telangana, India, renowned for its focus on research, innovation, and hands-on learning. It offers undergraduate and postgraduate programs in fields like AI, biotechnology, and design, while fostering entrepreneurship through startup incubators and global collaborations, especially with Japanese",
          isClosed: true,
        },
      ],
    },
    {
      section: "contact",
      heading: {
        as: "h2",
        title: "Contact",
        id: "contact",
      },
      content: [
        {
          type: "text",
          value:
            "Get in touch with us for any queries, suggestions, or feedback. Our team is always here to help you.",
          isClosed: true,
        },
        {
          type: "table",
          custom: false,
          tableName: "contact",
          headers: ["key", "value"],
          rows: [
            {
              key: "Email",
              value: "iith@iith.ac.in",
            },
            {
              key: "Phone",
              value: "+91-1234567890",
            },
            {
              key: "Fax",
              value: "+91-1234567890",
            },
            {
              key: "Landline",
              value: "+91-1234567890",
            },
            {
              key: "Website",
              value: "www.iith.ac.in",
            },
          ],
          isClosed: true,
        },
      ],
    },
    {
      section: "location",
      heading: {
        as: "h2",
        title: "Location",
        id: "location",
      },
      content: [
        {
          type: "text",
          value:
            "IIT Hyderabad is located in Hyderabad, Telangana, India. It is situated in the heart of the city, in the vicinity of the Hyderabad International Airport and the Hyderabad Railway Station.",
        },

        {
          type: "table",
          custom: false,
          tableName: "location",
          headers: ["key", "value"],
          rows: [
            {
              key: "map",
              value: "https://www.google.com/maps/place/IIT+Hyderabad",
            },
            {
              key: "railway",
              value: "Hyderabad Railway Station",
            },
            {
              key: "airport",
              value: "Hyderabad International Airport",
            },
          ],
          isClosed: true,
        },
      ],
    },
    {
      section: "facilities",
      heading: {
        as: "h2",
        title: "Facilities",
        id: "facilities",
      },
      content: [
        {
          type: "text",
          value:
            "IIT Hyderabad is equipped with state-of-the-art facilities to support its academic and research programs. Some of the facilities include:",
        },
      ],
    },
    {
      section: "next-rating",
      heading: {
        as: "h2",
        title: "Next Rating",
        id: "next-rating",
      },
      content: [
        {
          type: "text",
          value:
            "Our Agentic AI calculate the ratings based on the data of the institutions. Please check before applying.",
          isClosed: true,
        },
        {
          type: "table",
          custom: false,
          tableName: "next-rating",
          headers: ["key", "value"],
          rows: [
            {
              key: "overall",
              value: "78",
            },
            {
              key: "infrastructure",
              value: "96",
            },
            {
              key: "job placement rates",
              value: "85",
            },
            {
              key: "curriculum",
              value: "80",
            },
            {
              key: "ambiance",
              value: "75",
            },
          ],
          isClosed: true,
        },
      ],
    },
    {
      section: "courses-offered",
      heading: {
        as: "h2",
        title: "Courses Offered",
        id: "courses-offered",
      },
      content: [
        {
          type: "text",
          value:
            "We offer a wide range of courses at IIT Hyderabad, including undergraduate, postgraduate, and research programs.",
          isClosed: true,
        },
        {
          type: "table",
          custom: true,
          tableName: "courses",
          headers: ["Course Name", "Years Required", "Specialization"],
          rows: [
            {
              "Course Name": "Bachelor of Science in Computer Science",
              "Years Required": "4 years",
              Specialization: "AI, ML, Web Development",
            },
            {
              "Course Name": "Master of Science in Artificial Intelligence",
              "Years Required": "2 years",
              Specialization: "NLP, Robotics",
            },
            {
              "Course Name": "Bachelor of Science in Electrical Engineering",
              "Years Required": "4 years",
              Specialization: "Power Systems, Renewable Energy",
            },
            {
              "Course Name":
                "Master of Science in Materials Science and Engineering",
              "Years Required": "2 years",
              Specialization: "Nanotechnology, Composite Materials",
            },
            {
              "Course Name": "Bachelor of Science in Chemical Engineering",
              "Years Required": "4 years",
              Specialization: "Process Control, Environmental Engineering",
            },
            {
              "Course Name": "Master of Science in Machine Learning",
              "Years Required": "2 years",
              Specialization: "Recommendation Systems, Computer Vision",
            },
            {
              "Course Name": "Bachelor of Science in Biotechnology",
              "Years Required": "4 years",
              Specialization: "Molecular Biology, Bioinformatics",
            },
            {
              "Course Name": "Master of Science in Data Science",
              "Years Required": "2 years",
              Specialization: "Data Mining, Predictive Analytics",
            },
            {
              "Course Name": "Bachelor of Science in Civil Engineering",
              "Years Required": "4 years",
              Specialization:
                "Structural Engineering, Transportation Engineering",
            },
            {
              "Course Name": "Master of Science in Cybersecurity",
              "Years Required": "2 years",
              Specialization: "Network Security, Secure Coding",
            },
            {
              "Course Name": "Bachelor of Science in Mechanical Engineering",
              "Years Required": "4 years",
              Specialization: "Mechanical Design, Fluid Mechanics",
            },
          ],
          isClosed: true,
        },
      ],
    },
    {
      section: "admissions",
      heading: {
        as: "h2",
        title: "Admissions",
        id: "admissions",
      },
      content: [
        {
          type: "text",
          value:
            "Admission to IIT Hyderabad is a highly competitive process that evaluates candidates based on their academic merit and other factors.",
          isClosed: true,
        },
        {
          type: "table",
          custom: false,
          tableName: "admissions",
          headers: ["key", "link", "linkText"],
          rows: [
            {
              key: "Admission",
              link: "https://www.iith.ac.in/admissions",
              linkText: "Admission",
            },
            {
              key: "Process",
              link: "https://www.iith.ac.in/admissions/process",
              linkText: "Process",
            },
          ],
          isClosed: true,
        },
      ],
    },
    {
      section: "fee-structure",
      heading: {
        as: "h2",
        title: "Fee Structure",
        id: "fee-structure",
      },
      content: [
        {
          type: "text",
          value:
            "The fee structure for the courses offered by IIT Hyderabad is as follows:",
          isClosed: true,
        },
        {
          type: "table",
          custom: true,
          tableName: "classes",
          headers: ["Class", "Semester Fee (in INR)", "Annual Fee (in INR)"],
          rows: [
            {
              Class: "1",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000",
            },
            {
              Class: "2",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000",
            },
            {
              Class: "3",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000",
            },
            {
              Class: "4",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000",
            },
            {
              Class: "5",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000",
            },
            {
              Class: "6",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000",
            },
            {
              Class: "7",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000",
            },
            {
              Class: "8",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000",
            },
            {
              Class: "9",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000",
            },
            {
              Class: "10",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000",
            },
            {
              Class: "11",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000",
            },
            {
              Class: "12",
              "Semester Fee (in INR)": "9000",
              "Annual Fee (in INR)": "60000",
            },
          ],
          isClosed: true,
        },
      ],
    },
    {
      section: "population",
      heading: {
        as: "h2",
        title: "Population",
        id: "population",
      },
      content: [
        {
          type: "text",
          value:
            "The population of IIT Hyderabad currently stands at around 10,000 students, with a few hundred faculty members and staff.",
          isClosed: true,
        },
        {
          type: "chart",
          variant: "pie",
          config: {
            key: "value",
            title: "Student and Teacher Number",
            description: "Student and Teacher Number",
            legend: "bottom-center",
            ring: "inner: 60, outer: 70",
            series: "key: value",
            seriesCombined: "true",
          },
          isClosed: true,
          dataHeaders: ["data", "value"],
          data: [
            {
              data: "Students",
              value: "1000",
            },
            {
              data: "Teachers",
              value: "50",
            },
          ],
        },
        {
          type: "chart",
          variant: "bar",
          config: {
            key: "value",
            title: "Number of Students/Teachers",
            description: "Number of Students/Teachers",
            axis: "none",
            legend: "bottom-center",
            grid: "both",
            series: "key: Students, key:Values",
            seriesColor: "color: aqua,color:green",
            seriesCombined: "true",
            combined: "false",
            combinedLabel: "Number",
            date: "none",
          },
          isClosed: true,
          dataHeaders: ["dataPoint", "value", "color", "label"],
          data: [
            {
              dataPoint: "Student",
              value: "1000",
              color: "cyan",
              label: "Number of Students",
            },
            {
              dataPoint: "Teacher",
              value: "50",
              color: "aqua",
              label: "Number of Teachers",
            },
          ],
        },
      ],
    },
    {
      section: "placements",
      heading: {
        as: "h2",
        title: "Placements",
        id: "placements",
      },
      content: [
        {
          type: "text",
          value:
            "IIT Hyderabad boasts excellent placements with top companies recruiting across tech,",
        },
        {
          type: "text",
          value:
            "engineering, and research sectors. The process attracts leading firms offering diverse roles,",
        },
        {
          type: "text",
          value:
            "supported by a dedicated career services team. Students benefit from strong industry ties",
        },
        {
          type: "text",
          value: "and pre-placement offers from internships.",
          isClosed: true,
        },
        {
          type: "chart",
          variant: "line",
          config: {
            key: "value",
            title: "Number of Students/Teachers",
            description: "Number of Students/Teachers",
            axis: "x",
            curve: "step",
            legend: "bottom-center",
            variant: "gradient",
            grid: "both",
            series: "key: Students, key:Values",
            seriesColor: "color: aqua,color:green",
            seriesCombined: "false",
            combined: "false",
            combinedLabel: "Number",
            date: "none",
          },
          date: "new Date(),new Date(),new Date(),new Date()",
          value: "50,36,90,19,100",
          color: "yellow",
          label: "Number of Elon",
        },
        {
          dataPoint: "Hungary",
          date: "new Date()",
          value: "46",
          color: "cyan",
          label: "Total number",
        },
        {
          dataPoint: "Tesla",
          date: "new Date()",
          value: "33",
          color: "red",
          label: "Number of Tesla",
        },
      ],
    },
  ],
};
const Heading = ({
  as,
  id,
  children,
}: {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <HeadingLink as={as} id={id}>
      {children}
    </HeadingLink>
  );
};

const BodyText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      variant="body-default-l"
      data-scaling="110"
      onBackground="neutral-weak"
      style={{ lineHeight: "2" }}
    >
      {children}
    </Text>
  );
};

const Block: React.FC<{
  block: any;
  type: string;
}> = ({ block, type }) => {
  switch (type) {
    case "text":
      return <BodyText>{block.value}</BodyText>;
    case "table":
      if (block.tableName === "location" || block.tableName ==="contact") {
        // Handle custom table with specific structure
        return (
          <div>
            {block.rows.map((row: any, index: any) => (
              <Flex wrap key={index}>
                <Text
                  variant="body-default-l"
                  data-scaling="110"
                  onBackground="neutral-weak"
                  style={{ lineHeight: "2" }}
                >
                  {index + 1}.{" "}
                  {row.key?.charAt(0).toUpperCase() + row.key?.slice(1)}:{" "}
                  <SmartLink href="#">{row.value}</SmartLink>
                </Text>
                <br />
              </Flex>
            ))}
          </div>
        );
      }
  
      // Handle regular table
      return (
        <div>
          {block.rows.map((row: any, index: any) => (
            <Flex wrap key={index}>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                {index + 1}.{" "}
                {row.key?.charAt(0).toUpperCase() + row.key?.slice(1)}:{" "}
                <SmartLink href="#">{row.value}</SmartLink>
              </Text>
              <br />
            </Flex>
          ))}
        </div>
      );

    default:
      return <div>Unknown block type: {type}</div>;
  }
};

export default function Home() {
  const [pageMeta, setPageMeta] = useState<any>({});
  const [pageSections, setPageSections] = useState<any[]>([]);

  useEffect(() => {
    if (eduData) {
      // Extract metadata (updatedAt, name, type, etc.)
      setPageMeta(eduData.metadata);

      // Extract all containers for the body
      setPageSections(eduData.containers);
    }
  }, [eduData]);
  return (
    <Column
      fillWidth
      vertical="start"
      horizontal="center"
      padding="m"
      onBackground="neutral-strong"
    >
      <Navbar />
      <Flex height={"64"}></Flex>
      <Column fillWidth vertical="start" maxWidth={"l"} gap="56">
        <Column fillWidth gap="20" horizontal="start">
          <Column gap="12" id={pageMeta.slug}>
            {" "}
            <Text variant="body-default-m" onBackground="neutral-medium">
              {pageMeta.updatedAt}
            </Text>
            <Text variant="display-strong-m">{pageMeta.type}</Text>
            <Text variant="body-default-l" onBackground="neutral-weak">
              {pageMeta.name}
            </Text>
          </Column>
          {/* <Line fillWidth></Line> */}
        </Column>
        <Row fillWidth horizontal="between">
          <Column gap="48" fillWidth id="paddingRightContainerEdu">
            <Line fillWidth />
            {pageSections.map((sectionItem) => (
              <Column key={sectionItem.section} gap="20">
                <Heading as="h2" id={sectionItem.section}>
                  {sectionItem.heading.title}
                </Heading>
                {sectionItem.content.map((block: any, idx: any) => (
                  <Block
                    key={block + "-" + block.type + "-" + idx}
                    block={block}
                    type={block.type}
                  />
                ))}
              </Column>
            ))}
            <Column gap="20">
              <HeadingLink as="h2" id="description">
                Description
              </HeadingLink>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                {" "}
                IIT Hyderabad (IITH) is a premier engineering institute in
                Telangana, India, renowned for its focus on research,
                innovation, and hands-on learning. It offers undergraduate and
                postgraduate programs in fields like AI, biotechnology, and
                design, while fostering entrepreneurship through startup
                incubators and global collaborations, especially with Japanese
                universities.
              </Text>
            </Column>
            <Column gap="20">
              <HeadingLink as="h2" id="basic-details">
                Basic Details
              </HeadingLink>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                Some common details about the university/tuition/college are
                given below:
              </Text>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                1. Estabilishment Year: <SmartLink href="#">2008</SmartLink>
                <br />
                2. Language: <SmartLink href="#">English/Regional</SmartLink>
                <br />
                6. Board: <SmartLink href="#">CBSE/ICSE</SmartLink>
              </Text>
            </Column>

            <Column gap="20">
              <HeadingLink as="h2" id="population">
                Population
              </HeadingLink>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                The population of IIT Hyderabad currently stands at around
                10,000 students, with a few hundred faculty members and staff.
              </Text>

              <Row fillWidth gap="32" id="populationGraphContainer">
                <BarChart
                  title="Number of Students/Teachers"
                  axis="none"
                  legend={{
                    position: "bottom-center",
                  }}
                  series={[
                    { key: "Students", color: "aqua" },
                    { key: "Teachers", color: "yellow" },
                  ]}
                  data={[{ label: "Number", Students: 1000, Teachers: 50 }]}
                />

                <PieChart
                  title="Student and Teacher Number"
                  legend={{
                    display: true,
                    position: "bottom-center", // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
                  }}
                  ring={{ inner: 60, outer: 70 }}
                  series={{
                    key: "value",
                  }}
                  data={[
                    { name: "Students", value: 1000 },
                    { name: "Teachers", value: 50 },
                  ]}
                />
                <PieChart
                  title="Staff Number"
                  legend={{
                    display: true,
                    position: "bottom-center", // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
                  }}
                  ring={{ inner: 60, outer: 70 }}
                  series={{
                    key: "value",
                  }}
                  data={[
                    { name: "Faculty", value: 500 },
                    { name: "Staff", value: 50 },
                  ]}
                />
              </Row>
            </Column>
            <Column gap="20">
              <HeadingLink as="h2" id="reviews">
                Reviews
              </HeadingLink>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                Here are some reviews from the alumni of this university:
              </Text>
              <Row fillWidth gap="32" id="reviewsGraphContainer">
                <LineBarChart
                  fillHeight
                  title="CEO vs Employee Paycheck"
                  axis="both"
                  series={[
                    { key: "Screen Time (hrs)", color: "moss" },
                    { key: "Physical Activity (hrs)", color: "yellow" },
                  ]}
                  data={[
                    {
                      date: new Date("2015-01-01"),
                      "Screen Time (hrs)": 5.5,
                      "Physical Activity (hrs)": 1.0,
                    },
                    {
                      date: new Date("2020-01-01"),
                      "Screen Time (hrs)": 7.0,
                      "Physical Activity (hrs)": 0.8,
                    },
                  ]}
                />
                <PieChart
                  title="Carbon Emission by Country"
                  legend={{
                    display: true,
                    position: "bottom-center", // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
                  }}
                  ring={{ inner: 60, outer: 70 }}
                  series={{
                    key: "value",
                  }}
                  data={[
                    { name: "EU", value: 7 },
                    { name: "China", value: 28 },
                    { name: "United States", value: 14 },
                    { name: "Rest of the World", value: 51 },
                  ]}
                />
              </Row>
            </Column>

            <Column gap="20">
              <HeadingLink as="h2" id="contact">
                Contact
              </HeadingLink>

              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                Get in touch with us for any queries, suggestions, or feedback.
                Our team is always here to help you.
              </Text>

              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                1. Email:{" "}
                <SmartLink href="mailto:iith@iith.ac.in">
                  iith@iith.ac.in
                </SmartLink>
                <br />
                2. Phone:{" "}
                <SmartLink href="tel:+91-1234567890">+91-1234567890</SmartLink>
                <br />
                3. Fax:{" "}
                <SmartLink href="fax:+91-1234567890">+91-1234567890</SmartLink>
                <br />
                4. Landline:{" "}
                <SmartLink href="tel:+91-1234567890">+91-1234567890</SmartLink>
                <br />
                5. Website:{" "}
                <SmartLink href="https://www.iith.ac.in/">
                  www.iith.ac.in
                </SmartLink>
                <br />
              </Text>
            </Column>

            <Column gap="20">
              <HeadingLink as="h2" id="placements">
                Placements
              </HeadingLink>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                IIT Hyderabad boasts excellent placements with top companies
                recruiting across tech, engineering, and research sectors. The
                process attracts leading firms offering diverse roles, supported
                by a dedicated career services team. Students benefit from
                strong industry ties and pre-placement offers from internships.
              </Text>
              <LineChart
                data-viz-style="divergent" // categorical | divergent | sequential
                title="Tesla employee vs Elon Musk vs Hungary"
                description="Monthly compensation / state budget"
                axis="x"
                curve="step"
                date={{
                  format: "yyyy",
                }}
                series={[
                  { key: "Tesla Employee" },
                  { key: "Elon Musk" },
                  { key: "Hungary" },
                ]}
                data={[
                  {
                    date: "2000-01-01",
                    "Elon Musk": 5000,
                    "Tesla Employee": 3000,
                    Hungary: 2500000000,
                  },
                  {
                    date: "2005-01-01",
                    "Elon Musk": 5000,
                    "Tesla Employee": 4200,
                    Hungary: 4000000000,
                  },
                  {
                    date: "2010-01-01",
                    "Elon Musk": 0,
                    "Tesla Employee": 5500,
                    Hungary: 5000000000,
                  },
                  {
                    date: "2015-01-01",
                    "Elon Musk": 10000,
                    "Tesla Employee": 6300,
                    Hungary: 6000000000,
                  },
                  {
                    date: "2018-01-01",
                    "Elon Musk": 100000000,
                    "Tesla Employee": 7000,
                    Hungary: 6800000000,
                  },
                  {
                    date: "2020-01-01",
                    "Elon Musk": 2800000000,
                    "Tesla Employee": 7600,
                    Hungary: 7500000000,
                  },
                  {
                    date: "2023-01-01",
                    "Elon Musk": 4500000000,
                    "Tesla Employee": 8300,
                    Hungary: 7900000000,
                  },
                  {
                    date: "2025-01-01",
                    "Elon Musk": 5600000000,
                    "Tesla Employee": 8800,
                    Hungary: 8200000000,
                  },
                ]}
              />{" "}
              <PieChart
                title="Top 6 Companies for Placement"
                legend={{
                  display: true,
                  position: "bottom-center", // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
                }}
                ring={{ inner: 60, outer: 70 }}
                series={{
                  key: "value",
                }}
                data={[
                  { name: "Google", value: 10 },
                  { name: "Amazon", value: 18 },
                  { name: "Microsoft", value: 12 },
                  { name: "Facebook", value: 15 },
                  { name: "Apple", value: 17 },
                  { name: "Alibaba", value: 16 },
                ]}
              />
            </Column>
            <Column gap="20">
              <HeadingLink as="h2" id="fee-structure">
                Fee Structure
              </HeadingLink>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                The fee structure for the courses offered by IIT Hyderabad is as
                follows:
              </Text>

              <Table
                data={{
                  headers: [
                    { content: "Class", key: "class", sortable: true },
                    {
                      content: "Semester Fee (in INR)",
                      key: "semesterFee",
                      sortable: true,
                    },
                    {
                      content: "Annual Fee (in INR)",
                      key: "annualFee",
                      sortable: true,
                    },
                  ],
                  rows: [
                    ["1", "9000", "60000"],
                    ["2", "9000", "60000"],
                    ["3", "9000", "60000"],
                    ["4", "9000", "60000"],
                    ["5", "9000", "60000"],
                    ["6", "9000", "60000"],
                    ["7", "9000", "60000"],
                    ["8", "9000", "60000"],
                    ["9", "9000", "60000"],
                    ["10", "9000", "60000"],
                    ["11", "9000", "60000"],
                    ["12", "9000", "60000"],
                  ],
                }}
              />
            </Column>

            <Column gap="20">
              <HeadingLink as="h2" id="admissions">
                Admissions
              </HeadingLink>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                Admission to IIT Hyderabad is a highly competitive process that
                evaluates candidates based on their academic merit and other
                factors. <br />
              </Text>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                1. Admission Link:
                <SmartLink href="https://admissions.iith.ac.in/">
                  Here
                </SmartLink>
                <br />
                2. Admission Process:
                <SmartLink href="https://admissions.iith.ac.in/">
                  Here
                </SmartLink>
              </Text>
            </Column>

            <Column gap="20">
              <HeadingLink as="h2" id="courses-offered">
                Courses Offered
              </HeadingLink>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                We offer a wide range of courses at IIT Hyderabad, including
                undergraduate, postgraduate, and research programs.
              </Text>

              <Table
                data={{
                  headers: [
                    {
                      content: "Course Name",
                      key: "courseName",
                      sortable: true,
                    },
                    {
                      content: "Year Required",
                      key: "yearRequired",
                      sortable: true,
                    },
                    {
                      content: "Specialization",
                      key: "specialization",
                      sortable: true,
                    },
                  ],
                  rows: [
                    [
                      "Bachelor of Science in Computer Science",
                      "4 years",
                      "AI, ML, Web Development",
                    ],
                    [
                      "Master of Science in Artificial Intelligence",
                      "2 years",
                      "NLP, Robotics",
                    ],
                    [
                      "Bachelor of Science in Electrical Engineering",
                      "4 years",
                      "Power Systems, Renewable Energy",
                    ],
                    [
                      "Master of Science in Materials Science and Engineering",
                      "2 years",
                      "Nanotechnology, Composite Materials",
                    ],
                    [
                      "Bachelor of Science in Chemical Engineering",
                      "4 years",
                      "Process Control, Environmental Engineering",
                    ],
                    [
                      "Master of Science in Machine Learning",
                      "2 years",
                      "Recommendation Systems, Computer Vision",
                    ],
                    [
                      "Bachelor of Science in Biotechnology",
                      "4 years",
                      "Molecular Biology, Bioinformatics",
                    ],
                    [
                      "Master of Science in Data Science",
                      "2 years",
                      "Data Mining, Predictive Analytics",
                    ],
                    [
                      "Bachelor of Science in Civil Engineering",
                      "4 years",
                      "Structural Engineering, Transportation Engineering",
                    ],
                    [
                      "Master of Science in Cybersecurity",
                      "2 years",
                      "Network Security, Secure Coding",
                    ],
                    [
                      "Bachelor of Science in Mechanical Engineering",
                      "4 years",
                      "Mechanical Design, Fluid Mechanics",
                    ],
                  ],
                }}
              />
            </Column>
            <Column gap="20">
              <HeadingLink as="h2" id="facilities">
                Facilities
              </HeadingLink>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                IIT Hyderabad is equipped with state-of-the-art facilities to
                support its academic and research programs. Some of the
                facilities include:
              </Text>

              <Row fillWidth gap="12" wrap>
                <Chip label="Library"></Chip>
                <Chip label="Computer Laboratory"></Chip>
                <Chip label="Research Park"></Chip>
                <Chip label="Campus Recreation Center"></Chip>
                <Chip label="Sports Complex"></Chip>
                <Chip label="Auditorium"></Chip>
                <Chip label="Student Union"></Chip>
                <Chip label="Institute of Pharmaceutical Sciences"></Chip>
                <Chip label="Electronics and Communication Engineering"></Chip>
                <Chip label="School of Earth Sciences"></Chip>
                <Chip label="School of Humanities and Social Sciences"></Chip>
                <Chip label="School of Languages"></Chip>
                <Chip label="School of Life Sciences"></Chip>
                <Chip label="School of Nursing and Paramedical Sciences"></Chip>
                <Chip label="School of Pharmacy"></Chip>
                <Chip label="School of Veterinary and Animal Sciences"></Chip>
              </Row>
            </Column>
            <Column gap="20">
              <HeadingLink as="h2" id="next-rating">
                Next Rating
              </HeadingLink>
              <Text
                variant="body-default-l"
                data-scaling="110"
                onBackground="neutral-weak"
                style={{ lineHeight: "2" }}
              >
                {" "}
                Our Agentic AI calculate the ratings based on the data of the
                institutions. Please check before applying.
              </Text>
              <Column
                gap="32"
                style={{ display: "grid", gridTemplateColumns: "1fr 5fr" }}
              >
                <Column gap="20" vertical="center">
                  <Text
                    variant="body-default-s"
                    data-scaling="110"
                    onBackground="neutral-medium"
                  >
                    <SmartLink href="#">Overall</SmartLink>
                  </Text>
                  <Text
                    variant="body-default-s"
                    data-scaling="110"
                    onBackground="neutral-medium"
                    style={{ opacity: "0" }}
                  >
                    <SmartLink href="#">Overall</SmartLink>
                  </Text>
                </Column>
                <LinearGauge
                  maxWidth={30}
                  fillWidth
                  height={12}
                  maxHeight={3}
                  value={42}
                  labels={["Low", "Med", "High", "Max"]}
                />

                <Column gap="20" vertical="center">
                  <Text
                    variant="body-default-s"
                    data-scaling="110"
                    onBackground="neutral-medium"
                  >
                    <SmartLink href="#">Campus</SmartLink>
                  </Text>
                  <Text
                    variant="body-default-s"
                    data-scaling="110"
                    onBackground="neutral-medium"
                    style={{ opacity: "0" }}
                  >
                    <SmartLink href="#">Campus</SmartLink>
                  </Text>
                </Column>
                <LinearGauge
                  maxWidth={30}
                  fillWidth
                  height={12}
                  maxHeight={3}
                  value={10}
                  labels={["Low", "Med", "High", "Max"]}
                />

                <Column gap="20" vertical="center">
                  <Text
                    variant="body-default-s"
                    data-scaling="110"
                    onBackground="neutral-medium"
                  >
                    <SmartLink href="#">Placements</SmartLink>
                  </Text>
                  <Text
                    variant="body-default-s"
                    data-scaling="110"
                    onBackground="neutral-medium"
                    style={{ opacity: "0" }}
                  >
                    <SmartLink href="#">Placements</SmartLink>
                  </Text>
                </Column>
                <LinearGauge
                  maxWidth={30}
                  fillWidth
                  height={12}
                  maxHeight={3}
                  value={30}
                  labels={["Low", "Med", "High", "Max"]}
                />

                <Column gap="20" vertical="center">
                  <Text
                    variant="body-default-s"
                    data-scaling="110"
                    onBackground="neutral-medium"
                  >
                    <SmartLink href="#">Education</SmartLink>
                  </Text>
                  <Text
                    variant="body-default-s"
                    data-scaling="110"
                    onBackground="neutral-medium"
                    style={{ opacity: "0" }}
                  >
                    <SmartLink href="#">Education</SmartLink>
                  </Text>
                </Column>
                <LinearGauge
                  maxWidth={30}
                  fillWidth
                  height={12}
                  maxHeight={3}
                  value={70}
                  labels={["Low", "Med", "High", "Max"]}
                />

                <Column gap="20" vertical="center">
                  <Text
                    variant="body-default-s"
                    data-scaling="110"
                    onBackground="neutral-medium"
                  >
                    <SmartLink href="#">Hospitality</SmartLink>
                  </Text>
                  <Text
                    variant="body-default-s"
                    data-scaling="110"
                    onBackground="neutral-medium"
                    style={{ opacity: "0" }}
                  >
                    <SmartLink href="#">Hospitality</SmartLink>
                  </Text>
                </Column>
                <LinearGauge
                  maxWidth={30}
                  fillWidth
                  height={12}
                  maxHeight={3}
                  value={90}
                  labels={["Low", "Med", "High", "Max"]}
                />
              </Column>
            </Column>
          </Column>
          <HeadingNav
            width={12}
            position="sticky"
            top="64"
            fitHeight
            id="headingNavMe"
            data-scaling="110"
          />
        </Row>
      </Column>
      <Flex height={3} />
    </Column>
  );
}
