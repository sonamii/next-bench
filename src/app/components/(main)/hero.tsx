import {
  Heading,
  Text,
  Button,
  Column,
  
  Flex,
  AvatarGroup,
  Row,
  Icon,
  
  CountdownFx,
} from "@once-ui-system/core";
import { geist } from "@/resources/next-bench.config";

export function HeroSection() {
  return (
    <Column
      fillWidth
      fitHeight
      maxWidth={"m"}
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
              180+ happy students
            </Text>
          </Row>
        </Column>
      </Row>
      <Column data-scaling="110" fitHeight gap={"s"} maxWidth={"s"}>
        <Text variant="display-default-m" align="center">
          {" "}
          Ready to{" "}
          <span
            style={{
              fontFamily: geist.className,
              fontStyle: "italic",
              fontWeight: "normal",
            }}
          >
            <u>boost</u>
          </span>{" "}
          your education by getting admission in top universities?{" "}
        </Text>
        <Text
          variant="body-default-xl"
          onBackground="neutral-weak"
          align="center"
        >
          Looking for an efficient and convenient way to navigate the
          application process? Look no further!
        </Text>
        <Row gap="16" center fillWidth style={{ flexWrap: "wrap" }}>
          <Button variant="secondary">
            {" "}
            <Text variant="body-default-l">Try it now</Text>
          </Button>
          <Button suffixIcon="arrowTopRight">
            {" "}
            <Text variant="body-default-l">Search institutes</Text>
          </Button>
        </Row>
        <Flex fillWidth center>
          <Text variant="body-default-s">Launching soon! </Text>&nbsp;
          <CountdownFx
            onBackground="neutral-weak"
            targetDate={new Date("July 1, 2026")}
            variant="body-default-s"
            format="DD:HH:MM:SS"
          />
        </Flex>
      </Column>
    </Column>
  );
}
