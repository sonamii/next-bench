"use client";

import {
  Accordion,
  AvatarGroup,
  Button,
  Carousel,
  Chip,
  Column,
  Flex,
  Grid,
  HeadingLink,
  IconButton,
  InlineCode,
  Kbd,
  Line,
  Row,
  SegmentedControl,
  SmartLink,
  Table,
  Text,
} from "@once-ui-system/core";
import Navbar from "../../components/NavBar";

import { useRouter } from "next/navigation";
// Font setup
const dmsans = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
import { Outfit } from "next/font/google";
import Footer from "../../components/Footer";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("about");
  const router = useRouter();
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
          style={{ maxWidth: "1550px" }}
          fillWidth
          fitHeight
          horizontal="center"
        >
          <Navbar />
          <Flex fillWidth height={7}></Flex>
          <Flex maxWidth={60}>
            {" "}
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
              <Column fillWidth fitHeight vertical="center" horizontal="start">
                <Button variant="secondary" weight="default" size="l" arrowIcon>
                  Back
                </Button>
                <Flex fillWidth height={0.5}></Flex>

                <Column>
                <a><u style={{  textDecorationColor:"#ccc"}}>
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
                    St. Patrick's Academy,
                    <span style={{ color: "#626F45" }}> School</span> <br />
                    in <span style={{ color: "#626F45" }}>India</span>.{" "}
                  </Text></u>
                  </a>
                </Column>
              </Column>
              <Column
                fitWidth
                fillHeight
                horizontal="start"
                vertical="space-between"
                maxWidth={27.5}
                maxHeight={13.2}
                gap="20"
              >
                <Row center fitWidth fitHeight gap="20">
                  <AvatarGroup
                    size="l"
                    avatars={[
                      {
                        src: "https://yt3.googleusercontent.com/ytc/AIdro_nHcwS0yKNZRaBSjEKQ6GE8po7Si6MtE4D8-rABvFLuAQ=s900-c-k-c0x00ffffff-no-rj",
                      },
                    ]}
                  />
                  <Line
                    vert
                    width={0.2}
                    height={4}
                    background="neutral-medium"
                  />
                  <Column horizontal="end" vertical="start" fitHeight>
                    <Text
                      style={{
                        color: "#181A1D",
                        fontSize: "41px",
                      }}
                      className={dmsans.className}
                    >
                      +3000
                    </Text>
                    <Text
                      onBackground="neutral-weak"
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      Students and Teachers
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
                      4.7/5
                    </Text>
                    <Text
                      onBackground="neutral-weak"
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      Average Rating
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
                    Welcome to St. Patrick's Academy, a premier educational
                    institution in India, dedicated to nurturing young minds and
                    fostering a love for learning. Our school offers a holistic
                    approach to education.
                  </Text>
                  <Row gap="20">
                    <Button
                      id="arrow-button-1"
                      arrowIcon
                      size="m"
                      weight="default"
                      href="#card-d"
                    >
                      Call Us
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
                      Email Us
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
                      <i className="ri-user-smile-line"></i>&nbsp;Connect with Students
                    </Button>
                  </Row>
                </Column>
              </Column>
            </Row>
          </Flex>

          <Flex fillWidth height={3}></Flex>

          <Flex fillWidth maxWidth={60} center>
            <SegmentedControl
              buttons={[
                { value: "about", label: "About" },
                { value: "admission", label: "Admission & Fees" },
                { value: "facilities", label: "Facilities & Infrastructure" },
                { value: "extra", label: "Extra Curricular" },
                { value: "academics", label: "Academics" },
                { value: "reviews", label: "Reviews" },
                { value: "qna", label: "Q&A" },
              ]}
              onToggle={(value) => setActiveTab(value)}
            />
          </Flex>
          <Flex fillWidth height={3}></Flex>
          <Column
            fillWidth
            maxWidth={60}
            horizontal="start"
            vertical="start"
            paddingY="16"
            gap="8"
          >
            {
              {
                about: <AboutSchool />,
                admission: <Admission />,
                facilities: <Facilities />,
                extra: <Extracurricular />,
                academics: <Academics />,
                reviews: <Reviews />,
                qna: <FAQs />,
              }[activeTab]
            }
          </Column>
          <Footer />
        </Column>
      </Column>
    </>
  );
}

function AboutSchool() {
  return (
    <>
      {" "}
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          About School
        </Text>
        <Text
          style={{
            fontSize: "17px",
          }}
          onBackground="neutral-weak"
        >
          St. Patrick's Academy is a prestigious educational institution in
          India, renowned for its commitment to academic excellence and holistic
          development. With a rich history and a dedicated faculty, the school
          provides a nurturing environment that fosters creativity, critical
          thinking, and character building. Our state-of-the-art facilities and
          diverse extracurricular programs ensure that every student receives a
          well-rounded education, preparing them for success in an ever-changing
          world.
          <br></br>
          <br></br>
          We believe in the power of education to transform lives and empower
          individuals to reach their full potential. Our mission is to inspire a
          love for learning, instill values of integrity and respect, and
          cultivate a sense of social responsibility among our students. At St.
          Patrick's Academy, we are committed to shaping the leaders of
          tomorrow, equipping them with the knowledge, skills, and values needed
          to make a positive impact in their communities and beyond.
        </Text>
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Basic Information about School
        </Text>
        <Column fillWidth gap="8">
          <Row fillWidth horizontal="start" gap="12" vertical="center">
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "17px !important" }}
            >
              <Kbd
                background="neutral-medium"
                border="neutral-medium"
                onBackground="neutral-weak"
              >
                Year Estabilished :
              </Kbd>
            </Text>
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "16px" }}
              className={dmsans.className}
            >
              2014
            </Text>
          </Row>{" "}
          <Row fillWidth horizontal="start" gap="12" vertical="center">
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "17px !important" }}
            >
              <Kbd
                background="neutral-medium"
                border="neutral-medium"
                onBackground="neutral-weak"
              >
                School Type :
              </Kbd>
            </Text>
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "16px" }}
              className={dmsans.className}
            >
              Private
            </Text>
          </Row>
          <Row fillWidth horizontal="start" gap="12" vertical="center">
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "17px !important" }}
            >
              <Kbd
                background="neutral-medium"
                border="neutral-medium"
                onBackground="neutral-weak"
              >
                Gender :
              </Kbd>
            </Text>
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "16px" }}
              className={dmsans.className}
            >
              Co-Ed
            </Text>
          </Row>
          <Row fillWidth horizontal="start" gap="12" vertical="center">
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "17px !important" }}
            >
              <Kbd
                background="neutral-medium"
                border="neutral-medium"
                onBackground="neutral-weak"
              >
                Boarding type :
              </Kbd>
            </Text>
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "16px" }}
              className={dmsans.className}
            >
              Day boarding
            </Text>
          </Row>
          <Row fillWidth horizontal="start" gap="12" vertical="center">
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "17px !important" }}
            >
              <Kbd
                background="neutral-medium"
                border="neutral-medium"
                onBackground="neutral-weak"
              >
                Classes :
              </Kbd>
            </Text>
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "16px" }}
              className={dmsans.className}
            >
              LKG to 12th
            </Text>
          </Row>
          <Row fillWidth horizontal="start" gap="12" vertical="center">
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "17px !important" }}
            >
              <Kbd
                background="neutral-medium"
                border="neutral-medium"
                onBackground="neutral-weak"
              >
                Curriculum :
              </Kbd>
            </Text>
            <Text
              onBackground="neutral-weak"
              style={{ fontSize: "16px" }}
              className={dmsans.className}
            >
              ICSE/ISC
            </Text>
          </Row>
        </Column>
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          School Motto
        </Text>
        <Text
          style={{
            fontSize: "16px",
          }}
          onBackground="neutral-weak"
        >
          <InlineCode>"Seek the truth"</InlineCode>
        </Text>
      </Column>
    </>
  );
}

function Admission() {
  return (
    <>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Admission procedure
        </Text>
        <Text
          style={{
            fontSize: "17px",
          }}
          onBackground="neutral-weak"
        >
          This section provides an overview of the admission process at St.
          Patrick's Academy, including key steps and requirements for
          prospective students and their families. The admission process is
          designed to be transparent and straightforward, ensuring that all
          applicants have a clear understanding of what is expected.
          <br />
          <br />
          We allow admissions for classes LKG to 12th, with a focus on
          maintaining a balanced and diverse student body. The admission process
          typically includes the following steps:
          <br></br>
          <br />
          <ul>
            <li>
              <strong>Application Form:</strong> Prospective students must
              complete and submit an application form, which can be obtained
              from the school's website or admission office.
            </li>
            <li>
              <strong>Entrance Exam:</strong> Depending on the class applied
              for, candidates may be required to take an entrance exam to assess
              their academic readiness.
            </li>
            <li>
              <strong>Interview:</strong> Shortlisted candidates may be invited
              for an interview with the school's admission committee.
            </li>
            <li>
              <strong>Document Verification:</strong> All necessary documents,
              including birth certificates, previous school records, and
              identity proofs, will be verified.
            </li>
            <li>
              <strong>Admission Offer:</strong> Successful candidates will
              receive an admission offer, which must be accepted within a
              specified timeframe.
            </li>
            <li>
              <strong>Fee Payment:</strong> Upon acceptance of the admission
              offer, parents/guardians must pay the required fees to secure the
              student's place in the school.
            </li>
          </ul>
        </Text>
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Age Requirements
        </Text>
        <Table
          background="transparent"
          data={{
            headers: [
              { content: "Class", key: "class" },
              { content: "Minimum Age", key: "minAge", sortable: true },
              { content: "Maximum Age", key: "maxAge", sortable: true },
            ],
            rows: [
              ["LKG", "3 years", "4 years"],
              ["UKG", "4 years", "5 years"],
              ["1st", "5 years", "6 years"],
              ["2nd", "6 years", "7 years"],
              ["3rd", "7 years", "8 years"],
              ["4th", "8 years", "9 years"],
              ["5th", "9 years", "10 years"],
              ["6th", "10 years", "11 years"],
              ["7th", "11 years", "12 years"],
              ["8th", "12 years", "13 years"],
              ["9th", "13 years", "14 years"],
              ["10th", "14 years", "15 years"],
              ["11th", "15 years", "16 years"],
              ["12th", "16 years", "17 years"],
            ],
          }}
        />
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Important Dates for Admission
        </Text>
        <Table
          background="transparent"
          data={{
            headers: [
              { content: "Class", key: "name" },
              { content: "Particulars", key: "role" },
              { content: "Date", key: "date", sortable: true },
            ],
            rows: [
              ["LKG", "Application Form Release", "01/01/2024"],
              ["LKG", "Last Date for Application Submission", "15/01/2024"],
              ["LKG", "Entrance Exam Date", "20/01/2024"],
              ["LKG", "Interview Date", "25/01/2024"],
              ["UKG", "Application Form Release", "01/02/2024"],
              ["UKG", "Last Date for Application Submission", "15/02/2024"],
              ["UKG", "Entrance Exam Date", "20/02/2024"],
              ["UKG", "Interview Date", "25/02/2024"],
              ["1st", "Application Form Release", "01/03/2024"],
              ["1st", "Last Date for Application Submission", "15/03/2024"],
              ["1st", "Entrance Exam Date", "20/03/2024"],
              ["1st", "Interview Date", "25/03/2024"],
              ["2nd", "Application Form Release", "01/04/2024"],
              ["2nd", "Last Date for Application Submission", "15/04/2024"],
              ["2nd", "Entrance Exam Date", "20/04/2024"],
              ["2nd", "Interview Date", "25/04/2024"],
              ["3rd", "Application Form Release", "01/05/2024"],
              ["3rd", "Last Date for Application Submission", "15/05/2024"],
              ["3rd", "Entrance Exam Date", "20/05/2024"],
              ["3rd", "Interview Date", "25/05/2024"],
              ["4th", "Application Form Release", "01/06/2024"],
              ["4th", "Last Date for Application Submission", "15/06/2024"],
              ["4th", "Entrance Exam Date", "20/06/2024"],
              ["4th", "Interview Date", "25/06/2024"],
              ["5th", "Application Form Release", "01/07/2024"],
              ["5th", "Last Date for Application Submission", "15/07/2024"],
              ["5th", "Entrance Exam Date", "20/07/2024"],
              ["5th", "Interview Date", "25/07/2024"],
              ["6th", "Application Form Release", "01/08/2024"],
              ["6th", "Last Date for Application Submission", "15/08/2024"],
              ["6th", "Entrance Exam Date", "20/08/2024"],
              ["6th", "Interview Date", "25/08/2024"],
              ["7th", "Application Form Release", "01/09/2024"],
              ["7th", "Last Date for Application Submission", "15/09/2024"],
              ["7th", "Entrance Exam Date", "20/09/2024"],
              ["7th", "Interview Date", "25/09/2024"],
              ["8th", "Application Form Release", "01/10/2024"],
              ["8th", "Last Date for Application Submission", "15/10/2024"],
              ["8th", "Entrance Exam Date", "20/10/2024"],
              ["8th", "Interview Date", "25/10/2024"],
              ["9th", "Application Form Release", "01/11/2024"],
              ["9th", "Last Date for Application Submission", "15/11/2024"],
              ["9th", "Entrance Exam Date", "20/11/2024"],
              ["9th", "Interview Date", "25/11/2024"],
              ["10th", "Application Form Release", "01/12/2024"],
              ["10th", "Last Date for Application Submission", "15/12/2024"],
              ["10th", "Entrance Exam Date", "20/12/2024"],
              ["10th", "Interview Date", "25/12/2024"],
              ["11th", "Application Form Release", "01/01/2025"],
              ["11th", "Last Date for Application Submission", "15/01/2025"],
              ["11th", "Entrance Exam Date", "20/01/2025"],
              ["11th", "Interview Date", "25/01/2025"],
              ["12th", "Application Form Release", "01/02/2025"],
              ["12th", "Last Date for Application Submission", "15/02/2025"],
              ["12th", "Entrance Exam Date", "20/02/2025"],
              ["12th", "Interview Date", "25/02/2025"],
            ],
          }}
        />
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Fee details and procedure
        </Text>
        <Table
          background="transparent"
          data={{
            headers: [
              { content: "Class", key: "name" },
              { content: "Admission Fee", key: "admissionFee", sortable: true },
              { content: "Tuition Fee", key: "tuitionFee", sortable: true },
              { content: "Annual Fee", key: "annualFee", sortable: true },
            ],
            rows: [
              ["LKG", "₹10,000", "₹5,000", "₹2,000"],
              ["UKG", "₹12,000", "₹6,000", "₹2,500"],
              ["1st", "₹15,000", "₹7,000", "₹3,000"],
              ["2nd", "₹15,000", "₹7,000", "₹3,000"],
              ["3rd", "₹15,000", "₹7,000", "₹3,000"],
              ["4th", "₹15,000", "₹7,000", "₹3,000"],
              ["5th", "₹15,000", "₹7,000", "₹3,000"],
              ["6th", "₹15,000", "₹7,000", "₹3,000"],
              ["7th", "₹15,000", "₹7,000", "₹3,000"],
              ["8th", "₹15,000", "₹7,000", "₹3,000"],
              ["9th", "₹20,000", "₹10,000", "₹4,000"],
              ["10th", "₹20,000", "₹10,000", "₹4,000"],
              ["11th", "₹25,000", "₹12,000", "₹5,000"],
              ["12th", "₹25,000", "₹12,000", "₹5,000"],
            ],
          }}
        />
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Important Links
        </Text>
        <Column fillWidth gap="8">
          {" "}
          <SmartLink href="https://www.stpatricksacademy.com/admission-process">
            {" "}
            <Text
              style={{
                fontSize: "16px",
              }}
              onBackground="accent-weak"
            >
              <InlineCode>Admission process</InlineCode>
            </Text>
          </SmartLink>
          <SmartLink href="https://www.stpatricksacademy.com/admission-process">
            {" "}
            <Text
              style={{
                fontSize: "16px",
              }}
              onBackground="accent-weak"
            >
              <InlineCode>Fee structure</InlineCode>
            </Text>
          </SmartLink>
          <SmartLink href="https://www.stpatricksacademy.com/admission-process">
            {" "}
            <Text
              style={{
                fontSize: "16px",
              }}
              onBackground="accent-weak"
            >
              <InlineCode>Website</InlineCode>
            </Text>
          </SmartLink>
        </Column>
      </Column>
    </>
  );
}
function Facilities() {
  return (
    <>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        {" "}
        <Row fillWidth horizontal="space-between">
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Sports Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            10/52
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          <Chip label="Badminton" background="neutral-weak" />
          <Chip label="Basketball" background="neutral-weak" />
          <Chip label="Football" background="neutral-weak" />
          <Chip label="Cricket" background="neutral-weak" />
          <Chip label="Table Tennis" background="neutral-weak" />
          <Chip label="Volleyball" background="neutral-weak" />
          <Chip label="Athletics" background="neutral-weak" />
          <Chip label="Swimming" background="neutral-weak" />
          <Chip label="Yoga" background="neutral-weak" />
          <Chip label="Martial Arts" background="neutral-weak" />
          <Chip label="Gymnastics" background="neutral-weak" />
          <Chip label="Chess" background="neutral-weak" />
        </Row>
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        {" "}
        <Row fillWidth horizontal="space-between">
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Educational Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            3/4
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          <Chip label="Library" background="neutral-weak" />
          <Chip label="Career Counseling" background="neutral-weak" />
          {/* <Chip label="Student Exchange Programs" background="neutral-weak" /> */}
          <Chip label="Test Center" background="neutral-weak" />
        </Row>
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Row fillWidth horizontal="space-between">
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Classroom Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            2/5
          </Text>{" "}
        </Row>

        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          <Chip label="AV Classrooms" background="neutral-weak" />
          <Chip label="Air Purifiers" background="neutral-weak" />
        </Row>
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Row fillWidth horizontal="space-between">
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Visual and Performing Arts Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            5/5
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          <Chip label="Art" background="neutral-weak" />
          <Chip label="Dance" background="neutral-weak" />
          <Chip label="Music" background="neutral-weak" />
          <Chip label="Drama" background="neutral-weak" />
          <Chip label="Music" background="neutral-weak" />
        </Row>
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Row fillWidth horizontal="space-between">
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Laboratory Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            3/6
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          <Chip label="Science Lab" background="neutral-weak" />
          <Chip label="Language Lab" background="neutral-weak" />
          {/* <Chip label="Maths Lab" background="neutral-weak" /> */}
          {/* <Chip label="Atal Tinkering Lab (ATL)" background="neutral-weak" /> */}
          <Chip label="Computer Lab" background="neutral-weak" />
          {/* <Chip label="Robotics Lab" background="neutral-weak" /> */}
        </Row>
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Row fillWidth horizontal="space-between">
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Transport Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            3/3
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          <Chip label="Transport Facility" background="neutral-weak" />
          <Chip label="AC Buses" background="neutral-weak" />
          <Chip label="Private Vans" background="neutral-weak" />
        </Row>
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Row fillWidth horizontal="space-between">
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Boarding Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            <>1/3</>
          </Text>
        </Row>

        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          {/* <Chip label="Hostel" background="neutral-weak" /> */}
          {/* <Chip label="AC Hostel" background="neutral-weak" /> */}
          <Chip label="Day Boarding" background="neutral-weak" />
        </Row>
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        {" "}
        <Row fillWidth horizontal="space-between">
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Digital Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            4/4
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          <Chip label="AV Facilities" background="neutral-weak" />
          <Chip label="Interactive Boards" background="neutral-weak" />
          <Chip label="School App" background="neutral-weak" />
          <Chip label="Wi-Fi" background="neutral-weak" />
        </Row>
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        {" "}
        <Row fillWidth horizontal="space-between">
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Food and Catering Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            1/2
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          <Chip label="Canteen" background="neutral-weak" />
          {/* <Chip label="Meal Served" background="neutral-weak" /> */}
          {/* <Chip label="Kitchen & Dining Hall" background="neutral-weak" /> */}
        </Row>
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Row fillWidth horizontal="space-between">
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Safety and Security Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            11/11
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          <Chip label="CCTV" background="neutral-weak" />
          <Chip label="Fire Alarm" background="neutral-weak" />
          <Chip label="Fire Extinguisher" background="neutral-weak" />
          <Chip label="Security Guards" background="neutral-weak" />
          <Chip label="Boundary Wall" background="neutral-weak" />
          <Chip label="Fenced Boundary Wall" background="neutral-weak" />
          <Chip label="Speedometer In Bus" background="neutral-weak" />
          <Chip label="GPS In Bus" background="neutral-weak" />
          <Chip label="CCTV In Bus" background="neutral-weak" />
          <Chip label="Fire Extinguisher In Bus" background="neutral-weak" />
          <Chip label="School Bus Tracking App" background="neutral-weak" />
        </Row>
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        {" "}
        <Row fillWidth horizontal="space-between">
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Medical Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            3/8
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          <Chip label="Medical Facility" background="neutral-weak" />
          <Chip label="Medical Room or Clinic" background="neutral-weak" />
          {/* <Chip label="Resident Doctor" background="neutral-weak" /> */}
          <Chip label="Medical Staff" background="neutral-weak" />
          {/* <Chip label="Isolation Room" background="neutral-weak" /> */}
          {/* <Chip label="ICU" background="neutral-weak" /> */}
          {/* <Chip label="Dedicated Ambulance" background="neutral-weak" /> */}
        </Row>
      </Column>
      <Column
        fillWidth
        maxWidth={60}
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        {" "}
        <Row fillWidth horizontal="space-between">
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className}
          >
            Other Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            6/7
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          <Chip label="Kids Play Area" background="neutral-weak" />
          <Chip label="Activity Center" background="neutral-weak" />
          <Chip label="Toy Room" background="neutral-weak" />
          {/* <Chip label="Amphitheatre" background="neutral-weak" /> */}
          <Chip label="Auditorium" background="neutral-weak" />
          <Chip label="Day Care" background="neutral-weak" />
          <Chip label="Lego Room" background="neutral-weak" />
        </Row>
      </Column>
    </>
  );
}
function Extracurricular() {
  return (
    <>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Extra Curricular Activities
        </Text>
        <Text
          style={{
            fontSize: "17px",
          }}
          onBackground="neutral-weak"
        >
          We offer a wide range of extracurricular activities to enhance the
          overall development of our students. These activities are designed to
          foster creativity, teamwork, and leadership skills. Some of the key
          extracurricular activities include:
          <br />
          <br />
          <ul>
            <li>
              <strong>Sports:</strong> Various sports such as football,
              basketball, cricket, and athletics are encouraged to promote
              physical fitness and teamwork.
            </li>
            <li>
              <strong>Arts and Crafts:</strong> Students can explore their
              creative side through painting, drawing, and other artistic
              activities.
            </li>
            <li>
              <strong>Music and Dance:</strong> We offer music and dance classes
              to nurture the artistic talents of our students.
            </li>
            <li>
              <strong>Debates and Public Speaking:</strong> These activities
              help students develop their communication skills and confidence.
            </li>
            <li>
              <strong>Environmental Clubs:</strong> Students can participate in
              clubs focused on environmental awareness and sustainability.
            </li>
            <li>
              <strong>Community Service:</strong> We encourage students to
              engage in community service projects to develop a sense of social
              responsibility.
            </li>
          </ul>
        </Text>
      </Column>
    </>
  );
}

function Academics() {
  return (
    <>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          School Timings
        </Text>
        <Table
          background="transparent"
          data={{
            headers: [
              { content: "Class", key: "class" },
              { content: "Start Time", key: "startTime", sortable: true },
              { content: "End Time", key: "endTime", sortable: true },
            ],
            rows: [
              ["LKG", "8:00 AM", "12:00 PM"],
              ["UKG", "8:00 AM", "12:00 PM"],
              ["1st", "8:00 AM", "1:00 PM"],
              ["2nd", "8:00 AM", "1:00 PM"],
              ["3rd", "8:00 AM", "1:00 PM"],
              ["4th", "8:00 AM", "1:00 PM"],
              ["5th", "8:00 AM", "1:00 PM"],
              ["6th", "8:00 AM", "2:30 PM"],
              ["7th", "8:00 AM", "2:30 PM"],
              ["8th", "8:00 AM", "2:30 PM"],
              ["9th", "8:00 AM", "3:30 PM"],
              ["10th", "8:00 AM", "3:30 PM"],
              ["11th", "8:00 AM", "3:30 PM"],
              ["12th", "8:00 AM", "3:30 PM"],
            ],
          }}
        />
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Vacation Schedule
        </Text>
        <Table
          background="transparent"
          data={{
            headers: [
              { content: "Vacation", key: "class" },
              { content: "Start Date", key: "startDate", sortable: true },
              { content: "End Date", key: "endDate", sortable: true },
              { content: "Total Days", key: "totalDays", sortable: true },
            ],
            rows: [
              ["Summer Vacation", "01/05/2024", "30/06/2024", "60"],
              ["Winter Vacation", "20/12/2024", "05/01/2025", "17"],
            ],
          }}
        />
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          School Levels and Classes
        </Text>
        <Table
          background="transparent"
          data={{
            headers: [
              { content: "Level", key: "class" },
              { content: "Classes", key: "startTime", sortable: true },
            ],
            rows: [
              ["Pre-Primary", "LKG, UKG"],
              ["Primary", "1st, 2nd, 3rd, 4th, 5th"],
              ["Middle School", "6th, 7th, 8th"],
              ["Secondary School", "9th, 10th"],
              ["Higher Secondary", "11th, 12th"],
            ],
          }}
        />
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          Academic Affiliation
        </Text>
        <Column fillWidth gap="8">
          {" "}
          <SmartLink href="https://www.stpatricksacademy.com/admission-process">
            {" "}
            <Text
              style={{
                fontSize: "16px",
              }}
              onBackground="accent-weak"
            >
              <InlineCode>
                International Council Of Senior Secondary Education
              </InlineCode>
            </Text>
          </SmartLink>
          <SmartLink href="https://www.stpatricksacademy.com/admission-process">
            {" "}
            <Text
              style={{
                fontSize: "16px",
              }}
              onBackground="accent-weak"
            >
              <InlineCode>International Secondary Council</InlineCode>
            </Text>
          </SmartLink>
        </Column>
      </Column>
    </>
  );
}
function Reviews() {
  return (
    <>
      <Flex center fillWidth>
        {" "}
        <Text
          style={{
            fontSize: "16px",
          }}
          onBackground="neutral-weak"
        >
          <i className="ri-information-line"></i>&nbsp;Nothing to show here
        </Text>
      </Flex>
    </>
  );
}
function FAQs() {
  return (
    <>
      <Accordion
        title="What is the admission process at St. Patrick's Academy?"
        size="l"
      >
        <Text
          style={{
            fontSize: "16px",
          }}
          onBackground="neutral-weak"
        >
          The admission process includes submitting an application form,
          appearing for an entrance exam (if required), attending an interview,
          document verification, receiving an admission offer, and fee payment.
        </Text>
      </Accordion>
      <Accordion
        title="What classes are available at St. Patrick's Academy?"
        size="l"
      >
        <Text
          style={{
            fontSize: "16px",
          }}
          onBackground="neutral-weak"
        >
          The school offers classes from LKG to 12th, covering pre-primary,
          primary, middle, secondary, and higher secondary levels.
        </Text>
      </Accordion>
      <Accordion title="What curriculum does the school follow?" size="l">
        <Text
          style={{
            fontSize: "16px",
          }}
          onBackground="neutral-weak"
        >
          St. Patrick's Academy follows the ICSE/ISC curriculum, providing a
          comprehensive and recognized academic framework.
        </Text>
      </Accordion>
      <Accordion title="Are there any transport facilities available?" size="l">
        <Text
          style={{
            fontSize: "16px",
          }}
          onBackground="neutral-weak"
        >
          Yes, the school provides transport facilities including AC buses and
          private vans for students.
        </Text>
      </Accordion>
      <Accordion title="What extracurricular activities are offered?" size="l">
        <Text
          style={{
            fontSize: "16px",
          }}
          onBackground="neutral-weak"
        >
          The school offers a wide range of extracurricular activities such as
          sports, arts, music, dance, drama, and more to support holistic
          development.
        </Text>
      </Accordion>
      <Accordion
        title="How can I contact the school for more information?"
        size="l"
      >
        <Text
          style={{
            fontSize: "16px",
          }}
          onBackground="neutral-weak"
        >
          You can contact the school via the "Call Us" or "Email Us" buttons on
          this page, or visit the official website for further details.
        </Text>
      </Accordion>
    </>
  );
}
const cardCProps = {
  bg: "#F0F1EC",
  title: "Hands on searching at your fingertips with AI surfing.",
  subtitle:
    "Find tuitions and home tutors easily with our NLP tools which allow you to search instantly and get the best results for you.",
  tags: [
    {
      icon: <i className="ri-home-smile-2-line"></i>,
      text: "Home tutor",
      highlight: false,
    },
    {
      icon: <i className="ri-money-rupee-circle-line"></i>,
      text: "Instant fees",
      highlight: true,
    },
    {
      icon: <i className="ri-building-line"></i>,
      text: "Institutions",
      highlight: true,
    },
    {
      icon: <i className="ri-corner-up-left-double-line"></i>,
      text: "",
      highlight: false,
    },
    { icon: <i className="ri-school-line"></i>, text: "", highlight: false },
    {
      icon: <i className="ri-pencil-line"></i>,
      text: "Interview",
      highlight: false,
    },
    {
      icon: <i className="ri-computer-line"></i>,
      text: "Admissions",
      highlight: true,
    },
  ],
};

function CardC({ bg, title, subtitle, tags }: typeof cardCProps) {
  const router = useRouter();
  return (
    <Flex
      radius="l"
      direction="column"
      fillHeight
      flex={2}
      padding="20"
      style={{
        backgroundColor: bg,
        minWidth: "385px",
        maxHeight: "520px",
      }}
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
          width={14}
          style={{ backgroundColor: "#181A1D" }}
          height={0.3}
          radius="xl"
        />
      </Row>
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
          <i className="ri-graduation-cap-fill"></i>
        </Flex>
        <Text variant="body-default-s">
          Find tuitions and home tutors easily
        </Text>
        <IconButton
          variant="secondary"
          onClick={() => {
            router.push("/find");
          }}
        >
          <i
            className="ri-arrow-right-up-line"
            style={{ fontSize: "23px" }}
          ></i>
        </IconButton>
      </Row>
      <Column fillWidth gap="8">
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: "15px",
            fontWeight: "400",
          }}
          onBackground="neutral-weak"
          className={dmsans.className}
        >
          {subtitle}
        </Text>
      </Column>
      <Row wrap={true} horizontal="start" fillWidth gap="8">
        {tags.map((tag, idx) => (
          <Flex
            key={idx}
            radius="m"
            border="neutral-medium"
            borderStyle="solid"
            paddingX="12"
            paddingY="12"
            className={dmsans.className}
            style={
              tag.highlight
                ? { borderColor: "#D7E1B3", backgroundColor: "#D7E1B3" }
                : undefined
            }
          >
            <Text variant="body-default-s">
              {tag.icon}
              {tag.text && <>&nbsp;&nbsp;{tag.text}</>}
            </Text>
          </Flex>
        ))}
      </Row>
    </Flex>
  );
}
