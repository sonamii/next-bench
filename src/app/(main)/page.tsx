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
          fitHeight
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
            fitHeight
            horizontal="start"
            vertical="center"
            gap="16"
            style={{ maxWidth: "1600px" }}
            wrap={true}
          >
            <A></A> <B></B>
            <C></C> <D></D>
            {/* ================================================== */}
            <Flex height={3}></Flex>
            {/* <Flex fillWidth height={1}></Flex>
            <Flex center fillWidth fitHeight>
              <Line fillWidth maxWidth={5} height={0.1}></Line>
            </Flex>
            <Flex fillWidth height={1}></Flex>            */}
            <Column
              fillWidth
              horizontal="center"
              vertical="center"
              paddingY="12"
              gap="40"
              fitHeight
            >
              {" "}
              <Text
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                }}
                onBackground="neutral-medium"
                className={dmsans.className}
              >
                Trusted by 2000+ students and teachers worldwide.
              </Text>
              <Row center gap="64">
                <Logo
                  wordmark="https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2FtrustedBrands%2F1.png&w=256&q=75"
                  size="l"
                />
                <Logo
                  wordmark="https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2FtrustedBrands%2F2.png&w=256&q=75"
                  size="l"
                />
                <Logo
                  wordmark="https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2FtrustedBrands%2F3.png&w=256&q=75 "
                  size="l"
                />
                <Logo
                  wordmark="https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2FtrustedBrands%2F4.png&w=256&q=75"
                  size="l"
                />
                <Logo
                  wordmark="https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2FtrustedBrands%2F5.png&w=256&q=75"
                  size="l"
                />
                <Logo
                  wordmark="https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2FtrustedBrands%2F6.png&w=256&q=75"
                  size="l"
                />
              </Row>
            </Column>
            {/* ================================================= */}
           {/* <Flex height={1}></Flex>
            <Flex fillWidth height={1}></Flex>
            <Flex center fillWidth fitHeight>
              <Line fillWidth maxWidth={5} height={0.1}></Line>
            </Flex>
            <Flex fillWidth height={3}></Flex>
            <Flex center fillWidth>
              {" "}
              <Column fillWidth gap="16" maxWidth={70}>
                <Row fillWidth gap="16" mobileDirection="column">
                  <Media
                    flex="2"
                    src="https://img.freepik.com/premium-photo/immersive-learning-ultra-realistic-8k-ar-cinematic-photo-university-class-engrossed-i_1015980-32532.jpg"
                    aspectRatio={"4/3"}
                    unoptimized
                    radius="l"
                  />
                  <Media
                    flex="3"
                    src="https://images.squarespace-cdn.com/content/v1/6347f9c65754d300a941501c/34971c22-b2a5-40a2-b6c5-9e468d40858e/A015_A076_0617U8_001.R3D.11_04_58_11.Still001+3.jpg?format=750w"
                    aspectRatio={"8/3"}
                    unoptimized
                    
                    radius="l"
                  />
                </Row>
                <Row fillWidth gap="16" mobileDirection="column">
                  <Media
                    flex="3"
                    src="https://images.squarespace-cdn.com/content/v1/6347f9c65754d300a941501c/34971c22-b2a5-40a2-b6c5-9e468d40858e/A015_A076_0617U8_001.R3D.11_04_58_11.Still001+3.jpg?format=750w"
                    aspectRatio={"8/3"}
                    unoptimized
                    
                    radius="l"
                  />
                  <Media 
                  src="https://img.freepik.com/premium-photo/student-presenting-anthropology-project-class-o_1237301-4104.jpg"
                    flex="2"
                    aspectRatio={"4/3"}
                    radius="l"
                    unoptimized
                  />
                </Row>
              </Column>
            </Flex>
            <Flex fillWidth fitHeight center>
              <Flex
                maxWidth={70}
                padding="104"
                radius="l"
                style={{ backgroundColor: "#D7E1B3" }}
              >
                {" "}
                <Scroller fadeColor="transparent">
                  <Column fillWidth fillHeight center gap="32">
                    <Logo
                      wordmark="https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2Fcompany%2Fnovadex.png&w=256&q=75"
                      size="xl"
                    ></Logo>
                    <Text
                      onBackground="neutral-medium"
                      style={{
                        fontSize: "23px",
                        maxWidth: "50%",
                        textAlign: "center",
                      }}
                    >
                      Easy to use and intuitive platform for students which
                      always helps them to find the best schools and
                      universities.
                    </Text>
                    <Flex style={{ scale: "1" }} center fitWidth fitHeight>
                      {" "}
                      <UserMenu
                        name="Lorant One"
                        subline="Design Engineer"
                        placement="right-end"
                        avatarProps={{ value: "A" }}
                      />
                    </Flex>
                  </Column>
                </Scroller>
              </Flex>
            </Flex> */}
            {/* =================================================== */}
            {/* ================================================ */}
              <Flex height={2}></Flex>
            <Flex fillWidth height={1}></Flex>
            <Flex center fillWidth fitHeight>
              <Line fillWidth maxWidth={5} height={0.1}></Line>
            </Flex>
            <Flex fillWidth height={3}></Flex>
            {/* =================================================== */}
            <Column
              horizontal="center"
              vertical="center"
              fillWidth
              fitHeight
              paddingX="l"
            >
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
                Frequently Asked,&nbsp; Clearly Answered
              </Text>
              <Flex fillWidth height={1}></Flex>

              <Column fillWidth maxWidth={48} fitHeight>
                <Text
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    textAlign: "center",
                    maxWidth: "800px",
                  }}
                  onBackground="neutral-weak"
                  className={dmsans.className}
                >
                  Explore our comprehensive FAQ section to find answers to your
                  questions about our platform, services, and more. If you need
                  further assistance, feel free to reach out to our support
                  team.
                </Text>{" "}
                <Flex fillWidth height={4}></Flex>
                <Accordion title="What is Next Bench?" textSize="xl" size="l">
                  From the creator:
                  <Text onBackground="neutral-weak">
                    <Text variant="heading-default-xl"></Text>
                    Next Bench is a student-first platform designed to help
                    parents and students discover schools, compare options, and
                    map out personalized roadmaps to top universities. All in
                    one intuitive place.
                  </Text>
                </Accordion>
                <Accordion
                  title="How does the AI roadmap work?"
                  textSize="xl"
                  size="l"
                >
                  From the creators:
                  <Text onBackground="neutral-weak">
                    <Text variant="heading-default-xl"></Text>
                    Our AI looks at your academic journey, interests, and future
                    goals to build a clear roadmap — including course
                    suggestions, resume-building steps, and key milestones to
                    reach your dream university.
                  </Text>
                </Accordion>
                <Accordion
                  title="Can I apply to multiple schools at once?"
                  textSize="xl"
                  size="l"
                >
                  From platform functionality:
                  <Text onBackground="neutral-weak">
                    <Text variant="heading-default-xl"></Text>
                    Yes! Submit a single form and apply to multiple schools
                    instantly. Track your application statuses in real-time — no
                    repetitive paperwork or confusion.
                  </Text>
                </Accordion>
                <Accordion
                  title="Is Next Bench free to use?"
                  textSize="xl"
                  size="l"
                >
                  From the team:
                  <Text onBackground="neutral-weak">
                    <Text variant="heading-default-xl"></Text>
                    Absolutely. Core features like exploring schools and
                    building your AI roadmap are free. We may introduce premium
                    features (like personalized consultant help) later on.
                  </Text>
                </Accordion>
                <Accordion
                  title="Can I get personalized recommendations?"
                  textSize="xl"
                  size="l"
                >
                  Absolutely personalized:
                  <Text onBackground="neutral-weak">
                    <Text variant="heading-default-xl"></Text>
                    Our AI analyzes your interests, academic background, and
                    goals to suggest the best schools and learning paths
                    tailored just for you.
                  </Text>
                </Accordion>
                <Accordion
                  title="How accurate is the school data?"
                  textSize="xl"
                  size="l"
                >
                  From verified sources:
                  <Text onBackground="neutral-weak">
                    <Text variant="heading-default-xl"></Text>
                    We work directly with schools and certified consultants to
                    ensure all data — including admission criteria, fees, and
                    reviews — is current and trustworthy.
                  </Text>
                </Accordion>
                <Accordion
                  title="What are the pricing plans?"
                  textSize="xl"
                  size="l"
                >
                  Transparent and accessible:
                  <Text onBackground="neutral-weak">
                    <Text variant="heading-default-xl"></Text>
                    The core features of Next Bench are completely free. Premium
                    features like AI-guided roadmaps and consultant matchmaking
                    may include optional paid plans in the future.
                  </Text>
                </Accordion>
                <Accordion
                  title="Where is Next Bench available?"
                  textSize="xl"
                  size="l"
                >
                  Focused availability:
                  <Text onBackground="neutral-weak">
                    <Text variant="heading-default-xl"></Text>
                    We're currently active in key Indian regions — Uttarakhand,
                    Gujarat, and Delhi. More states and cities will be added as
                    we grow.
                  </Text>
                </Accordion>
                <Accordion
                  title="How fast is customer support?"
                  textSize="xl"
                  size="l"
                >
                  Quick and responsive:
                  <Text onBackground="neutral-weak">
                    <Text variant="heading-default-xl"></Text>
                    Our support team typically replies within 2 hours. We're
                    committed to helping parents and students without delays.
                  </Text>
                </Accordion>
                <Accordion
                  title="Are you hiring consultants?"
                  textSize="xl"
                  size="l"
                >
                  Yes, and students too!
                  <Text onBackground="neutral-weak">
                    <Text variant="heading-default-xl"></Text>
                    We are currently onboarding educational consultants and
                    student ambassadors. If you love helping students find their
                    path, we'd love to hear from you.
                  </Text>
                </Accordion>
              </Column>
            </Column>
            {/* ============================ */}
            <Flex height={3}></Flex>
            <Flex
              fillWidth
              fitHeight
              horizontal="center"
              vertical="center"
              style={{ maxWidth: "1600px" }}
              padding="20"
            >
              <Column
                fillWidth
                fillHeight
                style={{ backgroundColor: "#181A1D10" }}
                vertical="center"
                horizontal="center"
                gap="40"
                radius="xl"
                padding="32"
                paddingX="xl"
              >
                <Row fillWidth vertical="space-between" horizontal="center">
                  <Row flex={2} vertical="center">
                    <Input
                      id="a"
                      placeholder="Enter your email"
                      height="m"
                      hasPrefix={
                        <Text
                          onBackground="neutral-medium"
                          variant="heading-default-s"
                        >
                          <i className="ri-mail-line"></i>
                        </Text>
                      }
                    ></Input>
                    <IconButton
                      size="l"
                      style={{ position: "absolute", right: "5px" }}
                    >
                      <Text>
                        <i className="ri-send-plane-line"></i>
                      </Text>
                    </IconButton>
                  </Row>
                  <Row flex={5} vertical="center" horizontal="end">
                    <Text
                      style={{
                        color: "#181A1D",
                        fontSize: "50px",
                        lineHeight: "1em",
                        fontWeight: "400",
                        letterSpacing: ".3px",
                      }}
                      className={dmsans.className}
                    >
                      Let's talk!
                    </Text>
                  </Row>
                </Row>
                <Line fillWidth></Line>

                <Row horizontal="space-between" fillWidth height={9.5}>
                  <Row fillHeight fillWidth gap="64">
                    <Column gap="2">
                      {" "}
                      <Text
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={dmsans.className}
                      >
                        Contact Us
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={dmsans.className}
                      >
                        Privacy Policy
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={dmsans.className}
                      >
                        Help
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={dmsans.className}
                      >
                        Careers
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={dmsans.className}
                      >
                        Blog
                      </Text>
                    </Column>
                    <Column gap="2">
                      {" "}
                      <Text
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={dmsans.className}
                      >
                        Students
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={dmsans.className}
                      >
                        Teachers
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={dmsans.className}
                      >
                        Consultants
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={dmsans.className}
                      >
                        Institutions
                      </Text>
                      <Text
                        onBackground="neutral-weak"
                        variant="body-default-l"
                        className={dmsans.className}
                      >
                        Others
                      </Text>
                    </Column>
                  </Row>
                  <Column
                    horizontal="end"
                    vertical="space-between"
                    fillWidth
                    fillHeight
                  >
                    <Row fillWidth>&nbsp;</Row>
                    <Row gap="64">
                      <AvatarGroup
                        size="l"
                        // gap="20"
                        avatars={[
                          { value: "A" },
                          { value: "B" },
                          { value: "C" },
                          { value: "D" },
                          { value: "E" },
                        ]}
                      />
                      <Row fitWidth vertical="center" gap="12">
                        <IconButton
                          size="l"
                          variant="secondary"
                          style={{ borderColor: "black !important" }}
                        >
                          <i className="ri-arrow-up-line"></i>
                        </IconButton>
                        <Text
                          onBackground="neutral-weak"
                          variant="body-default-l"
                          className={dmsans.className}
                        >
                          Back To Top
                        </Text>
                      </Row>
                    </Row>
                  </Column>
                </Row>
                {/* <Row
                  fillWidth
                  vertical="space-between"
                  horizontal="start"
                  gap="64"
                >
                  <Row fitWidth vertical="center" gap="12">
                    <IconButton
                      size="l"
                      variant="secondary"
                      style={{ borderColor: "black !important" }}
                    >
                      <i className="ri-arrow-up-line"></i>
                    </IconButton>
                    <Text
                      onBackground="neutral-weak"
                      variant="body-default-l"
                      className={dmsans.className}
                    >
                      Back To Top
                    </Text>
                  </Row>
                  <Row>
                    {" "}
                    <AvatarGroup
                      size="l"
                      // gap="20"
                      avatars={[
                        { value: "A" },
                        { value: "B" },
                        { value: "C" },
                        { value: "D" },
                        { value: "E" },
                      ]}
                    />
                  </Row>
                </Row> */}
              </Column>
            </Flex>
          </Row>
        </Column>
      </Column>
    </>
  );
}

function C() {
  return (
    <Flex
      radius="l"
      direction="column"
      flex={2}
      fillHeight
      padding="20"
      style={{
        backgroundColor: "#F0F1EC",
        minWidth: "385px",
        maxHeight: "480px",
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
          Hands on searching at your fingertips with AI surfing.
        </Text>
        <Text
          style={{
            fontSize: "15px",
            fontWeight: "400",
          }}
          onBackground="neutral-weak"
          className={dmsans.className}
        >
          Find tuitions and home tutors easily with our NLP tools which allow
          you to search instantly and get the best results for you.
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
            <i className="ri-home-smile-2-line"></i>&nbsp;&nbsp;Home tutor
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
  );
}

function B() {
  return (
    <Flex
      radius="l"
      direction="column"
      flex={2}
      fillHeight
      padding="20"
      style={{
        backgroundColor: "#F0F1EC",
        minWidth: "385px",
        maxHeight: "480px",
      }}
      horizontal="center"
      vertical="start"
    >
      <Row
        fillWidth
        style={{ backgroundColor: "#fff" }}
        height={0.3}
        radius="xl"
      >
        <Row
          width={7}
          style={{ backgroundColor: "#181A1D" }}
          height={0.3}
          radius="xl"
        ></Row>
      </Row>

      <Flex fillWidth height={3} minHeight={3}></Flex>
      <Row fillWidth horizontal="space-between" vertical="center">
        <Text variant="label-strong-s" className={dmsans.className}>
          GATEWAY TO KNOWLEDGE AND GROWTH
        </Text>

        <IconButton variant="secondary">
          <i
            className="ri-arrow-right-up-line"
            style={{ fontSize: "23px" }}
          ></i>
        </IconButton>
      </Row>
      <Column vertical="space-between" fillHeight>
        <Column fillWidth gap="8" paddingTop="32">
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
            Search for schools and universities with ease
          </Text>
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "400",
            }}
            onBackground="neutral-medium"
            className={dmsans.className}
          >
            Explore a wide range of educational institutions and find the
            perfect fit for your academic journey with our comprehensive search
            tool.
          </Text>
          <Row gap="12" paddingTop="8" horizontal="space-between">
            <Row
              padding="8"
              style={{ backgroundColor: "#fff" }}
              radius="m"
              paddingY="12"
              vertical="center"
              gap="16"
              flex={2}
            >
              <i className="ri-translate-ai" style={{ color: "#e9d38D" }}></i>
              <Text
                variant="label-default-xs"
                className={dmsans.className}
                style={{ fontSize: "14px" }}
              >
                NLP processing
              </Text>
            </Row>
            <Row
              padding="8"
              style={{ backgroundColor: "#fff" }}
              radius="m"
              paddingY="12"
              vertical="center"
              gap="16"
              flex={2}
            >
              <i className="ri-ai-generate" style={{ color: "#e9d38D" }}></i>
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
        <Column gap="12">
          <InteractiveDetails
            onClick={() => {}}
            description={
              <>
                <i className="ri-information-line"></i>Join our platform to
                connect with students.
              </>
            }
          />
        </Column>{" "}
      </Column>
    </Flex>
  );
}

function D() {
  return (
    <Flex
      radius="l"
      direction="column"
      flex={2}
      padding="20"
      fillHeight
      horizontal="center"
      style={{
        backgroundColor: "#D7E1B3",
        minWidth: "385px",
        maxHeight: "480px",
      }}
      vertical="start"
    >
      <Row
        fillWidth
        style={{ backgroundColor: "#fff" }}
        height={0.3}
        minHeight={0.3}
        overflow="hidden"
        radius="xl"
      >
        <Row
          width={21.55}
          style={{ backgroundColor: "#181A1D" }}
          height={0.3}
          radius="xl"
        ></Row>
      </Row>{" "}
      <Text
        style={{
          color: "#626f45",
          fontSize: "160px",
          lineHeight: "1em",
          fontWeight: "400",
          letterSpacing: ".3px",
          position: "absolute",
          top: "8%",
          opacity: 0.5,
        }}
        className={dmsans.className}
      >
        Sign
      </Text>
      <Flex
        fillWidth
        fitHeight
        style={{ marginTop: "200px", backgroundColor: "#D7E1B3" }}
        vertical="center"
      >
        <Column
          horizontal="center"
          vertical="start"
          fitHeight
          fillWidth
          gap="4"
        >
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
              textAlign: "left",
            }}
            className={dmsans.className}
          >
            Sign in to your account to start your journey
          </Text>
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "400",
              textAlign: "left",
            }}
            onBackground="neutral-weak"
            className={dmsans.className}
          >
            Sign in to your account to access exclusive features and
            personalized content tailored to your educational needs.
          </Text>
        </Column>
      </Flex>
      <Row fillWidth fillHeight paddingTop="20" horizontal="start">
        <Column
          flex={1}
          fillHeight
          // background=""
          radius="xl"
          // style={{ backgroundColor: "#D7E1B3" }}
          horizontal="center"
          vertical="end"
        >
          <Button size="l" weight="default" fillWidth>
            Sign in with Google
          </Button>
        </Column>
      </Row>
    </Flex>
  );
}

function A() {
  return (
    <Flex
      radius="l"
      flex={2}
      fillHeight
      style={{
        backgroundColor: "#F0F1EC",
        minWidth: "385px",
        maxHeight: "480px",
      }}
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
        <IconButton size="l" style={{ position: "absolute", right: "5px" }}>
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
          Latest insights and trends in the education sector to help you
          anytime.
        </Text>
      </Column>
      <Row fillWidth fillHeight paddingTop="20" horizontal="start">
        <Column
          flex={1}
          fillHeight
          // background=""
          radius="xl"
          // style={{ backgroundColor: "#D7E1B3" }}
          horizontal="center"
          vertical="end"
        >
          <Button size="l" weight="default" fillWidth>
            Join community
          </Button>
        </Column>
      </Row>
    </Flex>
  );
}
