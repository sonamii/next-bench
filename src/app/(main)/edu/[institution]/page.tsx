"use client";

import {
  Accordion,
  AvatarGroup,
  Button,
  Chip,
  Column,
  Flex,
  IconButton,
  InlineCode,
  Kbd,
  Line,
  Row,
  SegmentedControl,
  SmartLink,
  Table,
  Text,
  Input,
  Grid,
  Checkbox,
  Spinner,
} from "@once-ui-system/core";
import Navbar from "../../components/NavBar";

import { useRouter } from "next/navigation";
// Font setup
import { Outfit } from "next/font/google";
const dmsans = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase/client";
import { Textarea } from "@once-ui-system/core";

export default function Page() {
  const [activeTab, setActiveTab] = useState("about");
  const router = useRouter();

  const [tables, setTables] = useState([""]);
  const [basicInfo, setBasicInfo] = useState([""]);
  const [extraLinks, setExtraLinks] = useState([""]);
  const [faqs, setFAQS] = useState([""]);
  const [text, setText] = useState("");
  const [facilities, setFacilities] = useState([""]);
  const [motto, setMotto] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [logo, setLogo] = useState<string>("");
  const [reviews, setReviews] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [slug, setSlug] = useState("");
  useEffect(() => {
    // Get the slug from the URL (the [institution] param)
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      // path: /edu/[slug] or /edu/[slug]/...
      const match = path.match(/\/edu\/([^\/]+)/);
      if (match && match[1]) {
        setSlug(match[1]);
      }
    }
  }, []);

  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      if (!slug) return;
      const session = await supabase.auth.getSession();
      const userId = session.data?.session?.user?.id;
      if (!userId) return;
      const { data, error } = await supabase
        .from("edu_centers")
        .select(
          "uuid,is_published,logo,qna,reviews,tables,extra_links,facilities,texts,basic_info,motto,images"
        )
        .eq("edu_id", slug)
        .maybeSingle();
      if (data && data.uuid === userId) {
        setIsUser(true);
      }
      if (data) {
        setIsPublished(data.is_published);
        setLogo(data.logo);
        setTables(data.tables || []);
        setExtraLinks(data.extra_links || []);
        setFacilities(data.facilities || []);
        setText(data.texts || "");
        setBasicInfo(data.basic_info || []);
        setMotto(data.motto || "");
        setImages(data.images || []);
        setFAQS(data.qna || []);
        setReviews(data.reviews || []);
      }
    };
    checkUser();
    setIsDataLoaded(true);
  }, [slug]);

  useEffect(() => {
    console.log(
      isPublished,
      logo,
      tables,
      extraLinks,
      facilities,
      text,
      basicInfo,
      motto,
      images,
      faqs,
      reviews
    );
  }, []);

  if (isPublished === false) {
    return null;
  }

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
          {!isDataLoaded ? (
            <>
              <Spinner size="xl"></Spinner>
            </>
          ) : (
            <Column>
              <HeroSection
                isUser={isUser}
                logo={logo}
                basicInfo={basicInfo}
              ></HeroSection>

              <Flex fillWidth height={3}></Flex>

              <Flex fillWidth maxWidth={60} center>
                <SegmentedControl
                  buttons={[
                    { value: "about", label: "About" },
                    { value: "admission", label: "Admission & Fees" },
                    {
                      value: "facilities",
                      label: "Facilities & Infrastructure",
                    },
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
                    about: (
                      <AboutSchool
                        isUser={isUser}
                        motto={motto}
                        text={text}
                        basicInfo={basicInfo}
                      />
                    ),
                    admission: (
                      <Admission
                        isUser={isUser}
                        text={text}
                        extraLinks={extraLinks}
                        tables={tables}
                      />
                    ),
                    facilities: (
                      <Facilities isUser={isUser} facilities={facilities} />
                    ),
                    extra: <Extracurricular isUser={isUser} text={text} />,
                    academics: (
                      <Academics
                        isUser={isUser}
                        extraLinks={extraLinks}
                        tables={tables}
                      />
                    ),
                    reviews: <Reviews reviews={reviews} isUser={isUser}/>,
                    qna: <FAQs isUser={isUser} faqs={faqs} />,
                  }[activeTab]
                }
              </Column>
            </Column>
          )}

          <Footer />
        </Column>
      </Column>
    </>
  );
}

interface HeroSectionProps {
  isUser: boolean;
  logo: string;
  basicInfo: string[];
}
function HeroSection({ isUser,logo,basicInfo }: HeroSectionProps) {
  const router = useRouter();
  return (
    <>
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
              <a>
                <u style={{ textDecorationColor: "#ccc" }}>
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
                  </Text>
                </u>
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
              <Line vert width={0.2} height={4} background="neutral-medium" />
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
                  Edit details
                </Button>
                <Button
                  id="arrow-button-1"
                  arrowIcon={!isUser}
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
                  <i className="ri-user-smile-line"></i>&nbsp;Connect with
                  Students
                </Button>
              </Row>
            </Column>
          </Column>
        </Row>
      </Flex>
    </>
  );
}

interface AboutSchoolProps {
  isUser: boolean;
  motto: string;
  text: string;
  basicInfo: string[];
}

function AboutSchool({ isUser,text,motto,basicInfo }: AboutSchoolProps) {
  const [motto, setMotto] = useState("believe in yourself");
  const [institutionAbout, setInstitutionAbout] = useState(
    "St. Patrick's Academy is a prestigious educational institution located in India, dedicated to providing quality education and holistic development to its students. Established in 2014, the school has grown to become a leading institution known for its commitment to academic excellence and character building."
  );
  const [yearEstabilished, setYearEstabilished] = useState("2014");
  const [schoolType, setSchoolType] = useState("Private");
  const [schoolGender, setSchoolGender] = useState("Co-Ed");
  const [boardingType, setBoardingType] = useState("Day boarding");
  const [classesOffered, setClassesOffered] = useState("LKG to 12th");
  const [affiliation, setAffiliation] = useState("ICSE/ISC");

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
        ></Text>
        {isUser ? (
          <Textarea
            id=""
            placeholder="Enter about school"
            resize="vertical"
            style={{ minHeight: "300px" }}
            value={institutionAbout}
            onChange={(e) => setInstitutionAbout(e.target.value)}
          />
        ) : (
          <Text
            style={{
              fontSize: "17px",
            }}
            onBackground="neutral-weak"
          >
            {institutionAbout}
          </Text>
        )}
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
          {/* Year Established */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    border="neutral-medium"
                    onBackground="neutral-weak"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  >
                    Year Established :
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <Input
                  id=""
                  placeholder="Enter year"
                  value={yearEstabilished}
                  onChange={(e) => setYearEstabilished(e.target.value)}
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  border="neutral-medium"
                  onBackground="neutral-weak"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                >
                  Year Established :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {yearEstabilished}
              </Text>
            </Row>
          )}

          {/* School Type */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    border="neutral-medium"
                    onBackground="neutral-weak"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  >
                    School Type :
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <Input
                  id=""
                  placeholder="Enter school type"
                  value={schoolType}
                  onChange={(e) => setSchoolType(e.target.value)}
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  border="neutral-medium"
                  onBackground="neutral-weak"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                >
                  School Type :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {schoolType}
              </Text>
            </Row>
          )}

          {/* Gender */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    border="neutral-medium"
                    onBackground="neutral-weak"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  >
                    Gender :
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <Input
                  id=""
                  placeholder="Enter gender"
                  value={schoolGender}
                  onChange={(e) => setSchoolGender(e.target.value)}
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  border="neutral-medium"
                  onBackground="neutral-weak"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                >
                  Gender :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {schoolGender}
              </Text>
            </Row>
          )}

          {/* Boarding Type */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    border="neutral-medium"
                    onBackground="neutral-weak"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  >
                    Boarding Type :
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <Input
                  id=""
                  placeholder="Enter boarding type"
                  value={boardingType}
                  onChange={(e) => setBoardingType(e.target.value)}
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  border="neutral-medium"
                  onBackground="neutral-weak"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                >
                  Boarding Type :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {boardingType}
              </Text>
            </Row>
          )}

          {/* Classes Offered */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    border="neutral-medium"
                    onBackground="neutral-weak"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  >
                    Classes :
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <Input
                  id=""
                  placeholder="Enter classes offered"
                  value={classesOffered}
                  onChange={(e) => setClassesOffered(e.target.value)}
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  border="neutral-medium"
                  onBackground="neutral-weak"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                >
                  Classes :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {classesOffered}
              </Text>
            </Row>
          )}

          {/* Affiliation */}
          {isUser ? (
            <Flex fillWidth horizontal="start">
              <Row flex={1}>
                <Text
                  onBackground="neutral-weak"
                  style={{ fontSize: "17px !important" }}
                >
                  <Kbd
                    background="neutral-medium"
                    style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                    border="neutral-medium"
                    onBackground="neutral-weak"
                  >
                    Affiliation :
                  </Kbd>
                </Text>
              </Row>
              <Row flex={3} fillWidth>
                <Input
                  id=""
                  placeholder="Enter affiliation"
                  value={affiliation}
                  disabled
                  onChange={(e) => setAffiliation(e.target.value)}
                  hasSuffix={
                    <Text onBackground="neutral-weak" variant="label-default-s">
                      HEADER
                    </Text>
                  }
                />
              </Row>
            </Flex>
          ) : (
            <Row fillWidth horizontal="start" gap="12" vertical="center">
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "17px !important" }}
              >
                <Kbd
                  background="neutral-medium"
                  style={{ minWidth: "fit-content", whiteSpace: "nowrap" }}
                  border="neutral-medium"
                  onBackground="neutral-weak"
                >
                  Affiliation :
                </Kbd>
              </Text>
              <Text
                onBackground="neutral-weak"
                style={{ fontSize: "16px" }}
                className={dmsans.className}
              >
                {affiliation}
              </Text>
            </Row>
          )}
        </Column>
      </Column>
      <Column
        fillWidth
        horizontal="start"
        vertical="start"
        paddingY="16"
        gap="12"
      >
        <>
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
          {isUser ? (
            <Textarea
              id=""
              placeholder="Enter school motto"
              resize="vertical"
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
            />
          ) : (
            <Text
              style={{
                fontSize: "16px",
              }}
              onBackground="neutral-weak"
            >
              <InlineCode>{motto || '"Seek the truth"'}</InlineCode>
            </Text>
          )}
        </>
        <Row fillWidth horizontal="end">
          {" "}
          <Button size="l"> Save All</Button>
        </Row>{" "}
      </Column>
    </>
  );
}

interface AdmissionSchoolProps {
  isUser: boolean;
  text: string;
  extraLinks: string[];
  tables: string[];
}

function Admission({ isUser,text,extraLinks,tables }: AdmissionSchoolProps) {
  const [headerClasses, setHeaderClasses] = useState([
    { content: "Class", key: "class" },
    { content: "Minimum Age", key: "minAge", sortable: true },
    { content: "Maximum Age", key: "maxAge", sortable: true },
  ]);

  const [headerClassesRows, setHeaderClassesRows] = useState([
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
  ]);

  const [headerAdmission, setHeaderAdmission] = useState([
    { content: "Class", key: "class" },
    { content: "Particulars", key: "particulars" },
    { content: "Date", key: "date", sortable: true },
  ]);

  const [headerAdmissionRows, setHeaderAdmissionRows] = useState([
    ["LKG", "Application Form Release", "01/01/2024"],
    ["LKG", "Last Date for Application Submission", "15/01/2024"],
    ["LKG", "Entrance Exam Date", "20/01/2024"],
    ["LKG", "Interview Date", "25/01/2024"],
    ["UKG", "Application Form Release", "01/02/2024"],
    ["UKG", "Last Date for Application Submission", "15/02/2024"],
    ["UKG", "Entrance Exam Date", "20/02/2024"],
  ]);

  const [headerFees, setHeaderFees] = useState([
    { content: "Class", key: "class" },
    { content: "Admission Fee", key: "admissionFee", sortable: true },
    { content: "Tuition Fee (Monthly)", key: "tuitionFee", sortable: true },
    { content: "Total Annual Fee", key: "totalAnnualFee", sortable: true },
  ]);

  const [headerFeesRows, setHeaderFeesRows] = useState([
    ["LKG", "₹10,000", "₹2,000", "₹34,000"],
    ["UKG", "₹10,000", "₹2,200", "₹36,400"],
    ["1st", "₹10,000", "₹2,500", "₹40,000"],
    ["2nd", "₹10,000", "₹2,500", "₹40,000"],
    ["3rd", "₹10,000", "₹2,700", "₹44,400"],
    ["4th", "₹10,000", "₹2,700", "₹44,400"],
    ["5th", "₹10,000", "₹3,000", "₹50,000"],
    ["6th", "₹10,000", "₹3,200", "₹54,400"],
    ["7th", "₹10,000", "₹3,200", "₹54,400"],
    ["8th", "₹10,000", "₹3,500", "₹60,000"],
    ["9th", "₹10,000", "₹3,500", "₹60,000"],
    ["10th", "₹10,000", "₹4,000", "₹70,000"],
    ["11th", "₹15,000", "₹4,500", "₹80,000"],
    ["12th", "₹15,000", "₹4,500", "₹80,000"],
  ]);

  const [extraLinks, setExtraLinks] = useState({
    admission: [
      {
        label: "Admission process",
        url: "https://www.stpatricksacademy.com/admission-process",
        id: 1,
      },
      {
        label: "Fee structure",
        url: "https://www.stpatricksacademy.com/admission-process",
        id: 2,
      },
      {
        label: "Website",
        url: "https://www.stpatricksacademy.com/admission-process",
        id: 3,
      },
    ],
    academics: [
      {
        label: "Admission process",
        url: "https://www.stpatricksacademy.com/admission-process",
        id: 1,
      },
      {
        label: "Fee structure",
        url: "https://www.stpatricksacademy.com/admission-process",
        id: 2,
      },
      {
        label: "Website",
        url: "https://www.stpatricksacademy.com/admission-process",
        id: 3,
      },
    ],
  });
  const [admissionText, setAdmissionText] = useState(
    "This section provides an overview of the admission process at St. Patrick's Academy, including key steps and requirements for prospective students and their families. The admission process is designed to be transparent and straightforward, ensuring that all applicants have a clear understanding of what is expected."
  );
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
        {isUser ? (
          <Textarea
            style={{ minHeight: "200px" }}
            id="d"
            value={admissionText}
            onChange={(e) => setAdmissionText(e.target.value)}
          ></Textarea>
        ) : (
          <Text
            style={{
              fontSize: "17px",
            }}
            onBackground="neutral-weak"
          >
            {admissionText}
          </Text>
        )}
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
            headers: headerClasses,
            rows: headerClassesRows,
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
            headers: headerAdmission,
            rows: headerAdmissionRows,
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
            headers: headerFees,
            rows: headerFeesRows,
          }}
        />
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
            Extra links
          </Text>
          {isUser ? (
            <>
              <Column gap="12" fillWidth>
                {extraLinks.admission.map((link, idx) => (
                  <Row
                    key={link.id}
                    fillWidth
                    gap="12"
                    horizontal="start"
                    vertical="start"
                  >
                    <Text
                      variant="body-default-m"
                      onBackground="neutral-medium"
                    >
                      {link.id}
                    </Text>
                    <Flex flex={2}>
                      <Input
                        id=""
                        placeholder="Enter link text"
                        value={link.label}
                        onChange={(e) => {
                          setExtraLinks((prev) => ({
                            ...prev,
                            admission: prev.admission.map((l, i) =>
                              i === idx ? { ...l, label: e.target.value } : l
                            ),
                          }));
                        }}
                      />
                    </Flex>
                    <Flex flex={5}>
                      <Input
                        id=""
                        placeholder="Enter link"
                        value={link.url}
                        hasPrefix={
                          <Text
                            onBackground="neutral-weak"
                            variant="label-default-s"
                          >
                            <i className="ri-links-line"></i>
                          </Text>
                        }
                        onChange={(e) => {
                          setExtraLinks((prev) => ({
                            ...prev,
                            admission: prev.admission.map((l, i) =>
                              i === idx ? { ...l, url: e.target.value } : l
                            ),
                          }));
                        }}
                      />
                    </Flex>
                  </Row>
                ))}
              </Column>
              <Row fillWidth horizontal="end" gap="4">
                <Button
                  size="l"
                  onClick={() => {
                    setExtraLinks((prev) => ({
                      ...prev,
                      admission:
                        prev.admission.length > 1
                          ? prev.admission.slice(0, -1)
                          : prev.admission,
                    }));
                  }}
                  disabled={extraLinks.admission.length <= 1}
                >
                  Remove last
                </Button>
                <Button
                  size="l"
                  onClick={() => {
                    setExtraLinks((prev) => ({
                      ...prev,
                      admission: [
                        ...prev.admission,
                        {
                          id:
                            prev.admission.length > 0
                              ? prev.admission[prev.admission.length - 1].id + 1
                              : 1,
                          label: "",
                          url: "",
                        },
                      ],
                    }));
                  }}
                >
                  Add
                </Button>
              </Row>
            </>
          ) : (
            <Column fillWidth gap="8" style={{ marginTop: "16px" }}>
              {extraLinks.admission.map((link, idx) => (
                <SmartLink key={idx} href={link.url}>
                  <Text
                    style={{
                      fontSize: "16px",
                    }}
                    onBackground="accent-weak"
                  >
                    <InlineCode>{link.label}</InlineCode>
                  </Text>
                </SmartLink>
              ))}
            </Column>
          )}
        </Column>
        <Row fillWidth horizontal="end">
          {" "}
          <Button size="l"> Save All</Button>
        </Row>
      </Column>
    </>
  );
}

interface FacilitiesProps {
  isUser: boolean;
  facilities: string[];
}
function Facilities({ isUser,facilities }: FacilitiesProps) {
  // Helper to randomly assign true/false
  const randomBool = () => Math.random() < 0.5;

  // Memoize so random stays stable per render
  const [facilities, setFacilities] = useState(() => ({
    sports: [
      { label: "Badminton", isSet: randomBool() },
      { label: "Basketball", isSet: randomBool() },
      { label: "Football", isSet: randomBool() },
      { label: "Cricket", isSet: randomBool() },
      { label: "Table Tennis", isSet: randomBool() },
      { label: "Volleyball", isSet: randomBool() },
      { label: "Athletics", isSet: randomBool() },
      { label: "Swimming", isSet: randomBool() },
      { label: "Yoga", isSet: randomBool() },
      { label: "Martial Arts", isSet: randomBool() },
      { label: "Gymnastics", isSet: randomBool() },
      { label: "Chess", isSet: randomBool() },
    ],
    educational: [
      { label: "Library", isSet: randomBool() },
      { label: "Career Counseling", isSet: randomBool() },
      { label: "Test Center", isSet: randomBool() },
    ],
    classroom: [
      { label: "AV Classrooms", isSet: randomBool() },
      { label: "Air Purifiers", isSet: randomBool() },
    ],
    visualArts: [
      { label: "Art", isSet: randomBool() },
      { label: "Dance", isSet: randomBool() },
      { label: "Music", isSet: randomBool() },
      { label: "Drama", isSet: randomBool() },
      { label: "Music", isSet: randomBool() },
    ],
    laboratory: [
      { label: "Science Lab", isSet: randomBool() },
      { label: "Language Lab", isSet: randomBool() },
      { label: "Computer Lab", isSet: randomBool() },
    ],
    transport: [
      { label: "Transport Facility", isSet: randomBool() },
      { label: "AC Buses", isSet: randomBool() },
      { label: "Private Vans", isSet: randomBool() },
    ],
    boarding: [{ label: "Day Boarding", isSet: randomBool() }],
    digital: [
      { label: "AV Facilities", isSet: randomBool() },
      { label: "Interactive Boards", isSet: randomBool() },
      { label: "School App", isSet: randomBool() },
      { label: "Wi-Fi", isSet: randomBool() },
    ],
    food: [{ label: "Canteen", isSet: randomBool() }],
    safety: [
      { label: "CCTV", isSet: randomBool() },
      { label: "Fire Alarm", isSet: randomBool() },
      { label: "Fire Extinguisher", isSet: randomBool() },
      { label: "Security Guards", isSet: randomBool() },
      { label: "Boundary Wall", isSet: randomBool() },
      { label: "Fenced Boundary Wall", isSet: randomBool() },
      { label: "Speedometer In Bus", isSet: randomBool() },
      { label: "GPS In Bus", isSet: randomBool() },
      { label: "CCTV In Bus", isSet: randomBool() },
      { label: "Fire Extinguisher In Bus", isSet: randomBool() },
      { label: "School Bus Tracking App", isSet: randomBool() },
    ],
    medical: [
      { label: "Medical Facility", isSet: randomBool() },
      { label: "Medical Room or Clinic", isSet: randomBool() },
      { label: "Medical Staff", isSet: randomBool() },
    ],
    other: [
      { label: "Kids Play Area", isSet: randomBool() },
      { label: "Activity Center", isSet: randomBool() },
      { label: "Toy Room", isSet: randomBool() },
      { label: "Auditorium", isSet: randomBool() },
      { label: "Day Care", isSet: randomBool() },
      { label: "Lego Room", isSet: randomBool() },
    ],
  }));

  // Helper to filter only isSet === true
  const filterSet = (arr: { label: string; isSet: boolean }[]) =>
    arr.filter((f) => f.isSet);

  return (
    <>
      {/* Sports Facilities */}
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
            Sports Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            {filterSet(facilities.sports).length}/{facilities.sports.length}
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true} data-brand="yellow">
          {isUser ? (
            <>
              <Column gap="12">
                {facilities.sports.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        sports: prev.sports.map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            </>
          ) : (
            <>
              {filterSet(facilities.sports).map((facility, idx) => (
                <Chip
                  key={idx}
                  label={facility.label}
                  background="neutral-weak"
                />
              ))}
            </>
          )}
        </Row>
      </Column>

      {/* Educational Facilities */}
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
            Educational Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            {filterSet(facilities.educational).length}/
            {facilities.educational.length}
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true}>
          {isUser ? (
            <>
              <Column gap="12">
                {facilities.educational.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        educational: prev.educational.map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            </>
          ) : (
            <>
              {filterSet(facilities.educational).map((facility, idx) => (
                <Chip
                  key={idx}
                  label={facility.label}
                  background="neutral-weak"
                />
              ))}
            </>
          )}
        </Row>
      </Column>

      {/* Classroom Facilities */}
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
            {filterSet(facilities.classroom).length}/
            {facilities.classroom.length}
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true}>
          {isUser ? (
            <>
              <Column gap="12">
                {facilities.classroom.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        classroom: prev.classroom.map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            </>
          ) : (
            <>
              {filterSet(facilities.classroom).map((facility, idx) => (
                <Chip
                  key={idx}
                  label={facility.label}
                  background="neutral-weak"
                />
              ))}
            </>
          )}
        </Row>
      </Column>

      {/* Visual Arts Facilities */}
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
            Visual Arts Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            {filterSet(facilities.visualArts).length}/
            {facilities.visualArts.length}
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true}>
          {isUser ? (
            <>
              <Column gap="12">
                {facilities.visualArts.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        visualArts: prev.visualArts.map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            </>
          ) : (
            <>
              {filterSet(facilities.visualArts).map((facility, idx) => (
                <Chip
                  key={idx}
                  label={facility.label}
                  background="neutral-weak"
                />
              ))}
            </>
          )}
        </Row>
      </Column>

      {/* Laboratory Facilities */}
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
            {filterSet(facilities.laboratory).length}/
            {facilities.laboratory.length}
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true}>
          {isUser ? (
            <>
              <Column gap="12">
                {facilities.laboratory.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        laboratory: prev.laboratory.map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            </>
          ) : (
            <>
              {filterSet(facilities.laboratory).map((facility, idx) => (
                <Chip
                  key={idx}
                  label={facility.label}
                  background="neutral-weak"
                />
              ))}
            </>
          )}
        </Row>
      </Column>

      {/* Transport Facilities */}
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
            {filterSet(facilities.transport).length}/
            {facilities.transport.length}
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true}>
          {isUser ? (
            <>
              <Column gap="12">
                {facilities.transport.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        transport: prev.transport.map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            </>
          ) : (
            <>
              {filterSet(facilities.transport).map((facility, idx) => (
                <Chip
                  key={idx}
                  label={facility.label}
                  background="neutral-weak"
                />
              ))}
            </>
          )}
        </Row>
      </Column>

      {/* Boarding Facilities */}
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
            {filterSet(facilities.boarding).length}/{facilities.boarding.length}
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true}>
          {isUser ? (
            <>
              <Column gap="12">
                {facilities.boarding.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        boarding: prev.boarding.map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            </>
          ) : (
            <>
              {filterSet(facilities.boarding).map((facility, idx) => (
                <Chip
                  key={idx}
                  label={facility.label}
                  background="neutral-weak"
                />
              ))}
            </>
          )}
        </Row>
      </Column>

      {/* Digital Facilities */}
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
            Digital Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            {filterSet(facilities.digital).length}/{facilities.digital.length}
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true}>
          {isUser ? (
            <>
              <Column gap="12">
                {facilities.digital.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        digital: prev.digital.map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            </>
          ) : (
            <>
              {filterSet(facilities.digital).map((facility, idx) => (
                <Chip
                  key={idx}
                  label={facility.label}
                  background="neutral-weak"
                />
              ))}
            </>
          )}
        </Row>
      </Column>

      {/* Food Facilities */}
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
            Food Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            {filterSet(facilities.food).length}/{facilities.food.length}
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true}>
          {isUser ? (
            <>
              <Column gap="12">
                {facilities.food.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        food: prev.food.map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            </>
          ) : (
            <>
              {filterSet(facilities.food).map((facility, idx) => (
                <Chip
                  key={idx}
                  label={facility.label}
                  background="neutral-weak"
                />
              ))}
            </>
          )}
        </Row>
      </Column>

      {/* Safety Facilities */}
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
            Safety Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            {filterSet(facilities.safety).length}/{facilities.safety.length}
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true}>
          {isUser ? (
            <>
              <Column gap="12">
                {facilities.safety.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        safety: prev.safety.map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            </>
          ) : (
            <>
              {filterSet(facilities.safety).map((facility, idx) => (
                <Chip
                  key={idx}
                  label={facility.label}
                  background="neutral-weak"
                />
              ))}
            </>
          )}
        </Row>
      </Column>

      {/* Medical Facilities */}
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
            Medical Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            {filterSet(facilities.medical).length}/{facilities.medical.length}
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true}>
          {isUser ? (
            <>
              <Column gap="12">
                {facilities.medical.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        medical: prev.medical.map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            </>
          ) : (
            <>
              {filterSet(facilities.medical).map((facility, idx) => (
                <Chip
                  key={idx}
                  label={facility.label}
                  background="neutral-weak"
                />
              ))}
            </>
          )}
        </Row>
      </Column>

      {/* Other Facilities */}
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
            Other Facilities
          </Text>
          <Text onBackground="neutral-weak" variant="label-default-xs">
            {filterSet(facilities.other).length}/{facilities.other.length}
          </Text>
        </Row>
        <Row fillWidth gap="8" maxWidth={60} wrap={true}>
          {isUser ? (
            <>
              <Column gap="12">
                {facilities.other.map((facility, idx) => (
                  <Checkbox
                    key={idx}
                    label={
                      <Text
                        onBackground="neutral-medium"
                        variant="body-default-l"
                      >
                        {facility.label}
                      </Text>
                    }
                    isChecked={facility.isSet}
                    onToggle={() => {
                      setFacilities((prev) => ({
                        ...prev,
                        other: prev.other.map((f, i) =>
                          i === idx ? { ...f, isSet: !f.isSet } : f
                        ),
                      }));
                    }}
                  />
                ))}
              </Column>
            </>
          ) : (
            <>
              {filterSet(facilities.other).map((facility, idx) => (
                <Chip
                  key={idx}
                  label={facility.label}
                  background="neutral-weak"
                />
              ))}
            </>
          )}
        </Row>
      </Column>
      <Row fillWidth horizontal="end">
        {" "}
        <Button size="l"> Save All</Button>
      </Row>
    </>
  );
}

interface ExtracurricularProps {
  isUser: boolean;
  text: string;
}

function Extracurricular({ isUser,text }: ExtracurricularProps) {
  const [extraCurricular, setExtraCurricular] = useState(
    "St. Patrick's Academy offers a wide range of extracurricular activities to enhance the overall development of students. These activities include sports, arts, music, dance, drama, and various clubs that encourage creativity, teamwork, and leadership skills. The school believes in providing a holistic education that goes beyond academics, fostering a well-rounded personality in each student."
  );
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
        {isUser ? (
          <Textarea
            id=""
            placeholder="Enter about extra curricular activities"
            resize="vertical"
            style={{ minHeight: "300px" }}
            value={extraCurricular}
            onChange={(e) => setExtraCurricular(e.target.value)}
          />
        ) : (
          <Text
            style={{
              fontSize: "17px",
            }}
            onBackground="neutral-weak"
          >
            {extraCurricular}
          </Text>
        )}
      </Column>
      <Row fillWidth horizontal="end">
        {" "}
        <Button size="l"> Save All</Button>
      </Row>
    </>
  );
}

interface AcademicsProps {
  isUser: boolean;
  extraLinks: string[];
  tables: string[];
}

function Academics({ isUser,tables,extraLinks }: AcademicsProps) {
  const [extraLinks, setExtraLinks] = useState({
    admission: [
      {
        label: "Admission process",
        url: "https://www.stpatricksacademy.com/admission-process",
        id: 1,
      },
      {
        label: "Fee structure",
        url: "https://www.stpatricksacademy.com/admission-process",
        id: 2,
      },
      {
        label: "Website",
        url: "https://www.stpatricksacademy.com/admission-process",
        id: 3,
      },
    ],
    academics: [
      {
        label: "Admission process",
        url: "https://www.stpatricksacademy.com/admission-process",
        id: 1,
      },
      {
        label: "Fee structure",
        url: "https://www.stpatricksacademy.com/admission-process",
        id: 2,
      },
      {
        label: "Website",
        url: "https://www.stpatricksacademy.com/admission-process",
        id: 3,
      },
    ],
  });
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
        {isUser ? (
          <>
            <Column gap="12" fillWidth>
              {extraLinks.academics.map((link, idx) => (
                <Flex
                  key={link.id}
                  fillWidth
                  gap="12"
                  horizontal="start"
                  vertical="start"
                >
                  <Text variant="body-default-m" onBackground="neutral-medium">
                    {link.id}
                  </Text>
                  <Flex flex={2}>
                    <Input
                      id=""
                      placeholder="Enter the affiliation "
                      value={link.label}
                      onChange={(e) => {
                        setExtraLinks((prev) => ({
                          ...prev,
                          academics: prev.academics.map((l, i) =>
                            i === idx ? { ...l, label: e.target.value } : l
                          ),
                        }));
                      }}
                    />
                  </Flex>
                  <Flex flex={5}>
                    <Input
                      id=""
                      placeholder="Enter the official website link"
                      value={link.url}
                      hasPrefix={
                        <Text
                          onBackground="neutral-weak"
                          variant="label-default-s"
                        >
                          <i className="ri-links-line"></i>
                        </Text>
                      }
                      onChange={(e) => {
                        setExtraLinks((prev) => ({
                          ...prev,
                          academics: prev.academics.map((l, i) =>
                            i === idx ? { ...l, url: e.target.value } : l
                          ),
                        }));
                      }}
                    />
                  </Flex>
                </Flex>
              ))}
            </Column>

            <Row fillWidth horizontal="end" gap="4">
              <Button
                size="l"
                onClick={() => {
                  setExtraLinks((prev) => ({
                    ...prev,
                    academics:
                      prev.academics.length > 1
                        ? prev.academics.slice(0, -1)
                        : prev.academics,
                  }));
                }}
                disabled={extraLinks.academics.length <= 1}
              >
                Remove last
              </Button>
              <Button
                size="l"
                onClick={() => {
                  setExtraLinks((prev) => ({
                    ...prev,
                    academics: [
                      ...prev.academics,
                      {
                        id:
                          prev.academics.length > 0
                            ? prev.academics[prev.academics.length - 1].id + 1
                            : 1,
                        label: "",
                        url: "",
                      },
                    ],
                  }));
                }}
              >
                Add
              </Button>
            </Row>
          </>
        ) : (
          <Column fillWidth gap="8" style={{ marginTop: "16px" }}>
            {extraLinks.academics.map((link, idx) => (
              <SmartLink key={idx} href={link.url}>
                <Text
                  style={{
                    fontSize: "16px",
                  }}
                  onBackground="accent-weak"
                >
                  <InlineCode>{link.label}</InlineCode>
                </Text>
              </SmartLink>
            ))}
          </Column>
        )}
      </Column>
      <Row fillWidth horizontal="end">
        <Button size="l">Save All</Button>
      </Row>
    </>
  );
}

interface ReviewsProps {
  isUser: boolean;
  reviews: string[];
}

function Reviews({ isUser,reviews }: ReviewsProps) {
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

interface FAQsProps {
  isUser: boolean;
  faqs: string[];
}
function FAQs({ isUser,faqs }: FAQsProps) {
  const [faqs, setFAQS] = useState([
    {
      title: "What is the admission process at St. Patrick's Academy?",
      text: "The admission process includes submitting an application form, appearing for an entrance exam (if required), attending an interview, document verification, receiving an admission offer, and fee payment.",
      id: 1,
    },
    {
      title: "What classes are available at St. Patrick's Academy?",
      text: "The school offers classes from LKG to 12th, covering pre-primary, primary, middle, secondary, and higher secondary levels.",
      id: 2,
    },
    {
      title: "What curriculum does the school follow?",
      text: "St. Patrick's Academy follows the ICSE/ISC curriculum, providing a comprehensive and recognized academic framework.",
      id: 3,
    },
    {
      title: "Are there any transport facilities available?",
      text: "Yes, the school provides transport facilities including AC buses and private vans for students.",
      id: 4,
    },
    {
      title: "What extracurricular activities are offered?",
      text: "The school offers a wide range of extracurricular activities such as sports, arts, music, dance, drama, and more to support holistic development.",
      id: 5,
    },
    {
      title: "How can I contact the school for more information?",
      text: 'You can contact the school via the "Call Us" or "Email Us" buttons on this page, or visit the official website for further details.',
      id: 6,
    },
  ]);

  // Handlers for add and delete
  const handleAdd = () => {
    setFAQS((prev) => [
      ...prev,
      {
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1,
        title: "",
        text: "",
      },
    ]);
  };

  const handleDelete = () => {
    setFAQS((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleChange = (
    idx: number,
    field: "title" | "text",
    value: string
  ) => {
    setFAQS((prev) =>
      prev.map((faq, i) => (i === idx ? { ...faq, [field]: value } : faq))
    );
  };

  return (
    <>
      {isUser ? (
        <Column gap="12" fillWidth>
          {faqs.map((faq, idx) => (
            <Row
              key={faq.id}
              fillWidth
              vertical="start"
              horizontal="start"
              gap="12"
            >
              <Text variant="body-default-m" onBackground="neutral-strong">
                {faq.id}
              </Text>
              <Row flex={2}>
                <Input
                  id=""
                  placeholder="Enter the question"
                  value={faq.title}
                  onChange={(e) => handleChange(idx, "title", e.target.value)}
                />
              </Row>
              <Row flex={5}>
                <Textarea
                  id=""
                  placeholder="Enter the answer"
                  style={{ minHeight: "200px" }}
                  value={faq.text}
                  onChange={(e) => handleChange(idx, "text", e.target.value)}
                />
              </Row>
            </Row>
          ))}
          <Row fillWidth horizontal="end" gap="4" marginTop="16">
            <Button
              variant="primary"
              size="l"
              onClick={handleDelete}
              disabled={faqs.length <= 1}
            >
              Delete Last
            </Button>
            <Button size="l" onClick={handleAdd}>
              Add
            </Button>
            <Button size="l">Save All</Button>
          </Row>
        </Column>
      ) : (
        <>
          {faqs.map((faq, idx) => (
            <Accordion key={faq.id} title={faq.title} size="l">
              <Text
                style={{
                  fontSize: "16px",
                }}
                onBackground="neutral-weak"
              >
                {faq.text}
              </Text>
            </Accordion>
          ))}
        </>
      )}
    </>
  );
}
