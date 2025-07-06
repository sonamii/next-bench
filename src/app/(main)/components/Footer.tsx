import {
  Row,
  Column,
  Flex,
  Text,
  Input,
  IconButton,
  AvatarGroup,
  Line,
} from "@once-ui-system/core";
import { Outfit } from "next/font/google";
const dmsans = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
export default function Footer() {
  const footerLinks = [
    ["Contact Us", "Privacy Policy", "Help", "Careers", "Blog"],
    ["Students", "Teachers", "Consultants", "Institutions", "Others"],
  ];

  const avatarGroup2 = [
    { value: "A" },
    { value: "B" },
    { value: "C" },
    { value: "D" },
    { value: "E" },
  ];
  return (
    <Row
      fillWidth
      fitHeight
      horizontal="start"
      vertical="center"
      gap="16"
      style={{ maxWidth: "1600px", minWidth: "fit-content" }}
      wrap={true}
    >
      <FooterSection footerLinks={footerLinks} avatarGroup2={avatarGroup2} />
    </Row>
  );
}

// Footer Section
function FooterSection({
  footerLinks,
  avatarGroup2,
}: {
  footerLinks: string[][];
  avatarGroup2: { value: string }[];
}) {
  return (
    <Flex
      fillWidth
      fitHeight
      horizontal="center"
      vertical="center"
      style={{ maxWidth: "1600px" }}
      padding="20"
      paddingTop="32"
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
                <Text onBackground="neutral-medium" variant="heading-default-s">
                  <i className="ri-mail-line"></i>
                </Text>
              }
            />
            <IconButton size="l" style={{ position: "absolute", right: "5px" }}>
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
        <Line fillWidth />
        <Row horizontal="space-between" fillWidth height={9.5}>
          <Row fillHeight fillWidth gap="64">
            {footerLinks.map((group: string[], idx: number) => (
              <Column gap="2" key={idx}>
                {group.map((item: string, i: number) => (
                  <Text
                    key={i}
                    onBackground="neutral-weak"
                    variant="body-default-l"
                    className={dmsans.className}
                  >
                    <Flex
                      cursor="interactive"
                      fitHeight
                      style={{
                        transition: "color 0.2s",
                        color: "inherit",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "darksalmon")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "inherit")
                      }
                    >
                      {item}{" "}
                    </Flex>
                  </Text>
                ))}
              </Column>
            ))}
          </Row>
          <Column
            horizontal="end"
            vertical="space-between"
            fillWidth
            fillHeight
          >
            <Row fillWidth>&nbsp;</Row>
            <Row gap="64">
              <AvatarGroup size="l" avatars={avatarGroup2} />
              <Row fitWidth vertical="center" gap="12">
                <IconButton size="l" variant="secondary" href="#top">
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
      </Column>
    </Flex>
  );
}
