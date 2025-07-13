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
  Option,
  Icon,
  Skeleton,
  RevealFx,
} from "@once-ui-system/core";
import { useEffect, useState } from "react";
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

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { Plans3 } from "./components/once-ui-pro/Plan";
import { Cookie } from "./components/once-ui-pro/Cookie";
import { supabase } from "../utils/supabase/client";
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

const trustedLogos = [
  "https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2FtrustedBrands%2F1.png&w=256&q=75",
  "https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2FtrustedBrands%2F2.png&w=256&q=75",
  "https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2FtrustedBrands%2F3.png&w=256&q=75 ",
  "https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2FtrustedBrands%2F4.png&w=256&q=75",
  "https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2FtrustedBrands%2F5.png&w=256&q=75",
  "https://optimize-nextjs.vercel.app/_next/image?url=%2Fimages%2FtrustedBrands%2F6.png&w=256&q=75",
];

const footerLinks = [
  ["Contact Us", "Privacy Policy", "Help", "Careers", "Blog"],
  ["Students", "Teachers", "Consultants", "Institutions", "Others"],
];

const avatarGroup1 = [{ value: "A" }, { value: "B" }, { value: "C" }];
const avatarGroup2 = [
  { value: "A" },
  { value: "B" },
  { value: "C" },
  { value: "D" },
  { value: "E" },
];

const faqList = [
  {
    title: "What is Next Bench?",
    content: (
      <>
        From the creator:
        <Text onBackground="neutral-weak">
          <Text variant="heading-default-xl"></Text>
          Next Bench is a student-first platform designed to help parents and
          students discover schools, compare options, and map out personalized
          roadmaps to top universities. All in one intuitive place.
        </Text>
      </>
    ),
  },
  {
    title: "How does the AI roadmap work?",
    content: (
      <>
        From the creators:
        <Text onBackground="neutral-weak">
          <Text variant="heading-default-xl"></Text>
          Our AI looks at your academic journey, interests, and future goals to
          build a clear roadmap — including course suggestions, resume-building
          steps, and key milestones to reach your dream university.
        </Text>
      </>
    ),
  },
  {
    title: "Can I apply to multiple schools at once?",
    content: (
      <>
        From platform functionality:
        <Text onBackground="neutral-weak">
          <Text variant="heading-default-xl"></Text>
          Yes! Submit a single form and apply to multiple schools instantly.
          Track your application statuses in real-time — no repetitive paperwork
          or confusion.
        </Text>
      </>
    ),
  },
  {
    title: "Is Next Bench free to use?",
    content: (
      <>
        From the team:
        <Text onBackground="neutral-weak">
          <Text variant="heading-default-xl"></Text>
          Absolutely. Core features like exploring schools and building your AI
          roadmap are free. We may introduce premium features (like personalized
          consultant help) later on.
        </Text>
      </>
    ),
  },
  {
    title: "Can I get personalized recommendations?",
    content: (
      <>
        Absolutely personalized:
        <Text onBackground="neutral-weak">
          <Text variant="heading-default-xl"></Text>
          Our AI analyzes your interests, academic background, and goals to
          suggest the best schools and learning paths tailored just for you.
        </Text>
      </>
    ),
  },
  {
    title: "How accurate is the school data?",
    content: (
      <>
        From verified sources:
        <Text onBackground="neutral-weak">
          <Text variant="heading-default-xl"></Text>
          We work directly with schools and certified consultants to ensure all
          data — including admission criteria, fees, and reviews — is current
          and trustworthy.
        </Text>
      </>
    ),
  },
  {
    title: "What are the pricing plans?",
    content: (
      <>
        Transparent and accessible:
        <Text onBackground="neutral-weak">
          <Text variant="heading-default-xl"></Text>
          The core features of Next Bench are completely free. Premium features
          like AI-guided roadmaps and consultant matchmaking may include
          optional paid plans in the future.
        </Text>
      </>
    ),
  },
  {
    title: "Where is Next Bench available?",
    content: (
      <>
        Focused availability:
        <Text onBackground="neutral-weak">
          <Text variant="heading-default-xl"></Text>
          We're currently active in key Indian regions — Uttarakhand, Gujarat,
          and Delhi. More states and cities will be added as we grow.
        </Text>
      </>
    ),
  },
  {
    title: "How fast is customer support?",
    content: (
      <>
        Quick and responsive:
        <Text onBackground="neutral-weak">
          <Text variant="heading-default-xl"></Text>
          Our support team typically replies within 2 hours. We're committed to
          helping parents and students without delays.
        </Text>
      </>
    ),
  },
  {
    title: "Are you hiring consultants?",
    content: (
      <>
        Yes, and students too!
        <Text onBackground="neutral-weak">
          <Text variant="heading-default-xl"></Text>
          We are currently onboarding educational consultants and student
          ambassadors. If you love helping students find their path, we'd love
          to hear from you.
        </Text>
      </>
    ),
  },
];

function AboutBadge() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<{
    pfp?: string;
    profile_details?: any;
  } | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        setSession(data.session);
        const userId = data.session.user.id;
        supabase
          .from("user_profiles")
          .select("pfp, profile_details")
          .eq("uuid", userId)
          .single()
          .then(({ data: profileData }) => {
            setProfile(profileData);
          });
      } else {
        setSession(null);
        setProfile(null);
      }
    });
  }, []);
  return (
    <Flex
      fillWidth
      height={4}
      minHeight={4}
      vertical="center"
      horizontal="start"
      gap="4"
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
        className="aboutBadge"
      >
        <Tag>01</Tag>
        About Us
      </Badge>
    </Flex>
  );
}

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
        <Column><Text
              style={{
                color: "#181A1D",
                fontSize: "70px",
                lineHeight: "1em",
                fontWeight: "500",
                letterSpacing: ".3px",
              }}
              className={dmsans.className + " titleTexts"}
            >
         
            
              AI education center: where{" "}
              <span style={{ color: "#626F45" }}>innovation</span> <br />
              and <span style={{ color: "#626F45" }}>learning</span> converge
           
        </Text>
        </Column>
      </Column>
      <HeroStats />
    </Row>
  );
}

function HeroStats() {
  const router = useRouter();
  const [uuid, setUuid] = useState<string>("");
  // Get current session id from Supabase (if user is logged in)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session?.user?.id) {
        setUuid(data.session.user.id);
      }
    });
  }, [uuid]);

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
        <Column horizontal="end" vertical="start" fitHeight className="statsColumn">
          <Text
            style={{
              color: "#181A1D",
              fontSize: "41px",
            }}
            className={dmsans.className + " statsTexts"}
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
        <Column horizontal="end" vertical="start" fillHeight className="statsColumn">
          <Text
            style={{
              color: "#181A1D",
              fontSize: "41px",
            }}
            className={dmsans.className + " statsTexts"}
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
          Uncover the wonder of Artificial Intelligence with our immersive
          educational platform, led by most qualified mentors and experts in the
          field. Join us now.
        </Text>
        <Row gap="20">
          <Button
            id="arrow-button-1"
            arrowIcon
            size="m"
            weight="default"
            href="#card-d"
          >
            Start here
          </Button>

          {uuid ? (
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
              onClick={() => (window.location.href = `/profile/${uuid}`)}
            >
              Dashboard
            </Button>
          ) : (
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
              href="#card-d"
            >
              Dashboard
            </Button>
          )}
          <Button
            id="arrow-button-2"
            size="m"
            style={{ backgroundColor: "#F2F2EF" }}
            weight="default"
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
              (e.currentTarget.style.backgroundColor = "#E0E0DC")
            }
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
              (e.currentTarget.style.backgroundColor = "#F2F2EF")
            }
            variant="secondary"
            onClick={() => {
              supabase.auth.signOut().then(() => {
                window.location.reload();
              });
            }}
          >
            Log out
          </Button>
        </Row>
      </Column>
    </Column>
  );
}

function TrustedSection() {
  return (
    <Column
      fillWidth
      horizontal="center"
      vertical="center"
      paddingY="12"
      gap="40"
      fitHeight
      className="trustedSection"
    >
      <Text
       
        onBackground="neutral-medium"
        className={dmsans.className + " trustedText"}
      >
        Trusted by 2000+ students and teachers worldwide.
      </Text>
      <Row center gap="64" wrap={true}>
        {trustedLogos.map((logo, idx) => (
          <Logo key={idx} wordmark={logo}  />
        ))}
      </Row>
    </Column>
  );
}

function FAQSection() {
  return (
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
          textAlign: "center",
        }}
        className={dmsans.className + " titleTexts"}
      >
        <span style={{ color: "#626F45" }}>Frequently</span> Asked,&nbsp;
        <span style={{ color: "#626F45" }}>Clearly</span> Answered
      </Text>
      <Flex fillWidth height={1}></Flex>
      <Text
        style={{
          fontSize: "18px",
          fontWeight: "400",
          textAlign: "center",
          maxWidth: "800px",
        }}
        onBackground="neutral-weak"
        className={dmsans.className + " faqText"}
      >
        Explore our comprehensive FAQ section to find answers to your questions
        about our platform, services, and more. If you need further assistance,
        feel free to reach out to our support team.
      </Text>
      <Column fillWidth maxWidth={40} paddingTop="32">
        {faqList.map((faq, idx) => (
          <Accordion key={idx} title={faq.title} textSize="xl" size="l">
            {faq.content}
          </Accordion>
        ))}
      </Column>
    </Column>
  );
}

// Card Data
const cardAProps = {
  bg: "#F0F1EC",
  label: "01",
  title: "Educational Insights",
  subtitle:
    "Latest insights and trends in the education sector to help you anytime.",
  inputPlaceholder: "Enter keyword",
  buttonText: "Join community",
  icon: <i className="ri-send-plane-line"></i>,
};

const cardBProps = {
  bg: "#F0F1EC",
  label: "GATEWAY TO KNOWLEDGE AND GROWTH",
  title: "Search for schools and universities with ease",
  subtitle:
    "Explore a wide range of educational institutions and find the perfect fit for your academic journey with our comprehensive search tool.",
  features: [
    {
      icon: <i className="ri-translate-ai" style={{ color: "#e9d38D" }}></i>,
      text: "NLP processing",
    },
    {
      icon: <i className="ri-ai-generate" style={{ color: "#e9d38D" }}></i>,
      text: "Fast search",
    },
    {
      icon: <i className="ri-robot-line" style={{ color: "#e9d38D" }}></i>,
      text: "AI-powered results",
    },
    {
      icon: <i className="ri-cloud-line" style={{ color: "#e9d38D" }}></i>,
      text: "Instant results",
    },
  ],
};

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

const cardDProps = {
  bg: "#D7E1B3",
  label: "Sign In",
  title: "Sign in to your account to start your journey",
  subtitle:
    "Sign in to your account to access exclusive features and personalized content tailored to your educational needs.",
  buttonText: "Sign in with Google",
  dialogTitle: "Sign Up",
  dialogDesc:
    "Sign up to access personalized content tailored to your educational needs.",
  dialogButton: "Continue with google",
  dialogIcon:
    "https://freelogopng.com/images/all_img/1657952440google-logo-png-transparent.png",
};

// Card Components
function CardA({
  bg,
  label,
  title,
  subtitle,
  inputPlaceholder,
  buttonText,
  icon,
}: typeof cardAProps) {
  const router = useRouter();

  return (
    <Flex
      radius="l"
      flex={2}
      fillHeight
      style={{
        backgroundColor: bg,
        
      }}
      className="cardPage"
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
        {label}
      </Text>
      <Flex
        fillWidth
        fitHeight
        paddingY="20"
        style={{ marginTop: "150px", backgroundColor: bg }}
        vertical="center"
      >
        <Input id="a" placeholder={inputPlaceholder} height="m" />
        <IconButton size="l" style={{ position: "absolute", right: "5px" }}>
          <Text>{icon}</Text>
        </IconButton>
      </Flex>
      <Column
        horizontal="start"
        vertical="start"
        fitHeight
        fillWidth
        gap="4"
        className="cardTextColumn"
      >
        <Text
          style={{
            color: "#181A1D",
            fontSize: "30px",
            fontWeight: "500",
          }}
          className={dmsans.className + " cardTextTitle"}
        >
          {title}
        </Text>
        <Text
          onBackground="neutral-weak"
          style={{
            fontSize: "15px",
          }}
          className={dmsans.className}
        >
          {subtitle}
        </Text>
      </Column>
      <Row fillWidth fillHeight paddingTop="20" horizontal="start">
        <Column
          flex={1}
          fillHeight
          radius="xl"
          horizontal="center"
          vertical="end"
        >
          <Button
            size="l"
            weight="default"
            fillWidth
            onClick={() => router.push("/find")}
          >
            {buttonText}
          </Button>
        </Column>
      </Row>
    </Flex>
  );
}

function CardB({ bg, label, title, subtitle, features }: typeof cardBProps) {
  const router = useRouter();
  return (
    <Flex
      radius="l"
      direction="column"
      flex={2}
      fillHeight      className="cardPage cardB"
      padding="20"
      style={{
        backgroundColor: bg,
       
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
        />
      </Row>
      <Flex fillWidth height={3} minHeight={3}></Flex>
      <Row fillWidth horizontal="space-between" vertical="center">
        <Text variant="label-strong-s" className={dmsans.className}>
          {label}
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
      <Column vertical="space-between" fillHeight>
        <Column fillWidth gap="8" paddingTop="32" >
          <Text
            variant="body-default-xl"
            style={{
              color: "#181A1D",
              fontSize: "25px",
              fontWeight: "500",
            }}
            className={dmsans.className + " cardTextTitle"}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "400",
            }}
            onBackground="neutral-medium"
            className={dmsans.className}
          >
            {subtitle}
          </Text>
          <Row gap="12" paddingTop="8" horizontal="space-between" wrap={true} className="cardBRow">
            {features.map((f, idx) => (
              <Row
                key={idx}
                padding="8"
                style={{ backgroundColor: "#fff" }}
                radius="m"
                paddingY="12"
                vertical="center"
                gap="16"
                flex={2}
                minWidth={10}
              >
                {f.icon}
                <Text
                  variant="label-default-xs"
                  className={dmsans.className}
                  style={{ fontSize: "14px" }}
                >
                  {f.text}
                </Text>
              </Row>
            ))}
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
        </Column>
      </Column>
    </Flex>
  );
}

function CardC({ bg, title, subtitle, tags }: typeof cardCProps) {
  const router = useRouter();
  return (
    <Flex
      radius="l"
      direction="column"
      flex={2}      className="cardPage"

      fillHeight
      padding="20"
      style={{
        backgroundColor: bg,
       
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
        <Text variant="body-default-s" className={"cardCLabelText" + " " + dmsans.className}>
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
      <Column fillWidth gap="8" className="cardCTextColumn">
        <Text
          variant="body-default-xl"
          style={{
            color: "#181A1D",
            fontSize: "25px",
            fontWeight: "500",
          }}
          className={dmsans.className +  " cardTextTitle"}
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

function CardD({
  bg,
  label,
  title,
  subtitle,
  buttonText,
  dialogTitle,
  dialogDesc,
  dialogButton,
  dialogIcon,
}: typeof cardDProps) {
  const [isOpen, setIsOpen] = useState(false);
  const supabaseLoginGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });
    if (error) {
      console.error("Error logging in with Google:", error);
    } else {
      console.log("Login successful:", data);
    }
  };
  return (
    <Flex fillWidth id="card-d" horizontal="center">
      <Flex
        radius="l"
        direction="column"
        flex={2}      className="cardPage"

        padding="20"
        fillHeight
        horizontal="center"
        style={{
          backgroundColor: bg,
        
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
          />
        </Row>
        <Text
         
          className={dmsans.className + " cardDLabelText"}
        >
          {label}
        </Text>
        <Flex
          fillWidth
          fitHeight
          style={{ marginTop: "200px", backgroundColor: bg }}
          vertical="center"
        >
          <Column
            horizontal="center"
            vertical="start"
            fitHeight
            fillWidth
            gap="4"
            className="cardTextColumn"
          >
            <Text
              variant="body-default-xl"
              style={{
                color: "#181A1D",
                fontSize: "25px",
                fontWeight: "500",
                textAlign: "left",
              }}
              className={dmsans.className + " cardTextTitle cardDTitleText"}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: "15px",
                fontWeight: "400",
                textAlign: "left",
              }}
              onBackground="neutral-weak"
              className={dmsans.className + " cardDSubtitleText"}
            >
              {subtitle}
            </Text>
          </Column>
        </Flex>
        <Row fillWidth fillHeight paddingTop="40" horizontal="start">
          <Column
            flex={1}
            fillHeight
            radius="xl"
            horizontal="center"
            vertical="end"
          >
            <Button
              size="l"
              fillWidth
              weight="default"
              onClick={() => setIsOpen(true)}
            >
              {buttonText}
            </Button>
          </Column>
        </Row>
      </Flex>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={dialogTitle}
        description={dialogDesc}
        maxWidth={35}
      >
        <Column fillWidth gap="16" marginTop="12">
          <Row fillWidth vertical="center" gap="8" horizontal="start">
            <Button
              variant="primary"
              weight="default"
              size="m"
              onClick={() => {
                setIsOpen(false);
                supabaseLoginGoogle();
              }}
            >
              <Flex center fillWidth fillHeight>
                <Media src={dialogIcon} unoptimized width={1.1} height={1.1} />
                &nbsp;&nbsp;&nbsp;{dialogButton}
              </Flex>
            </Button>
          </Row>
        </Column>
      </Dialog>
    </Flex>
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
        <Cookie />

        <NavBar />
        <Flex height={3} minHeight={3}></Flex>
        <AboutBadge />
        <HeroSection />
        <Flex height={7}></Flex>
        <Row
          fillWidth
          fitHeight
          horizontal="center"
          vertical="center"
          gap="16"
          style={{ maxWidth: "1600px"}}
          wrap={true}
          className="cardRow"
        >
          <CardA {...cardAProps} />
          <CardB {...cardBProps} />
          <CardC {...cardCProps} />
          <CardD {...cardDProps} />
          <Flex height={3}></Flex>
          <TrustedSection />
          <Flex height={2}></Flex>
          <Flex fillWidth height={1}></Flex>
          <Flex center fillWidth fitHeight>
            <Line fillWidth maxWidth={5} height={0.1}></Line>
          </Flex>
          <Flex fillWidth height={3}></Flex>
          <FAQSection />
          <Flex height={3}></Flex>
          <Footer />
        </Row>
      </Column>
    </Column>
  );
}
