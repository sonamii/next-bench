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
export default function Home() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: 0,
    city: "",
    state: "",
    country: "",
    goal: "",
    university1: "",
    university2: "",
    university3: "",
  });
  const router = useRouter();
  const [user_id, setUser_Id] = useState("");
  const { addToast } = useToast();
  const [isUserDataAvailable, setIsUserDataAvailable] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        setUser_Id(session.user.id);
      }
    };
    fetchUserId();
  }, []);

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
      <Column fillWidth vertical="start" maxWidth={"l"} gap="56" >
        <Column fillWidth gap="20" horizontal="start">
          <Column gap="12">
            {" "}
            <Text variant="body-default-m" onBackground="neutral-medium">
              Jan 28, 2026
            </Text>
            <Text variant="display-strong-m">
              <>University</>
            </Text>
            <Text variant="body-default-l" onBackground="neutral-weak">
              Indian Institute of Information Technology
            </Text>
          </Column>
          {/* <Line fillWidth></Line> */}
        </Column>
        <Row fillWidth horizontal="between">
          <Column
            gap="48"
            fillWidth
            id="paddingRightContainerEdu"
          >
            <Line fillWidth />
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
