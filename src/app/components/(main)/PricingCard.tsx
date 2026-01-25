"use client";

import {
  Text,
  Button,
  Column,
  Flex,
  Row,
  Icon,
  Kbd,
} from "@once-ui-system/core";

export function PricingCard({
  icon= "",
  iconText = "",
  popular = true,
  monthlyPrice = "29",
  originalPrice = "39",
  title = "Ideal for group of students",
  description = "Agentic AI automation, Priority call support, Application tracking, Personalized advice, 24/7 support, Career prospects, Admission updates, Interview preparation, Counseling",
  buttonText = "Get Started",
  buttonLink = "/",
}) {
  return (
    <Row>
      <Column
        padding="8"
        horizontal="center"
        vertical="start"
        border="neutral-alpha-medium"
        radius="l"
        // shadow="xs"
        minWidth={20}
        fitHeight
        maxHeight={40}
        minHeight={32}
        gap="m"
      >
        <Column
          background="neutral-alpha-weak"
          border="neutral-alpha-weak"
          radius="l"
          fillWidth
          padding="12"
          vertical="between"
        >
          <Row horizontal="between" marginBottom="l">
            <Flex center gap="4">
              <Icon
                name={icon}
                size="s"
                style={{ color: "#787878"}}
              ></Icon>
              <Text onBackground="neutral-weak" variant="body-default-s">
                {iconText}
              </Text>
            </Flex>
            {popular && <Kbd data-scaling="110">Popular</Kbd>}
          </Row>
          <Column fillWidth gap="8">
            <Row vertical="end" horizontal="between">
              <Flex horizontal="center" vertical="end">
                <Text variant="display-strong-xs">
                  {monthlyPrice === "Free" ? (
                    <b>{monthlyPrice}</b>
                  ) : (
                    <b>${monthlyPrice}</b>
                  )}
                  <Text onBackground="neutral-medium" variant="body-default-s">
                    /month
                  </Text>
                </Text>
              </Flex>
              {originalPrice && (
                <Text
                  onBackground="neutral-weak"
                  style={{ textDecoration: "line-through" }}
                >
                  <b>${originalPrice}</b>
                </Text>
              )}
            </Row>
            <Button href={buttonLink} fillWidth size="m">
              <Text variant="body-default-l">{buttonText}</Text>
            </Button>
          </Column>
        </Column>
        <Column horizontal="start" vertical="start" fillWidth paddingX="12">
          <Flex fillWidth horizontal="start">
            <Text
              variant="body-default-s"
              onBackground="neutral-weak"
              align="left"
            >
              {title}
            </Text>
          </Flex>
        </Column>{" "}
        <Column
          fillWidth
          horizontal="start"
          paddingX="12"
          vertical="start"
          gap="8"
        >
          {description.split(", ").map((desc) => (
            <Row vertical="center" gap="12" key={desc}>
              <Icon name="circleCheckOutline" size="s"></Icon>
              <Text
                variant="body-default-s"
                onBackground="neutral-weak"
                align="left"
              >
                {desc}
              </Text>
            </Row>
          ))}
          <Flex id="end-space" height={0}></Flex>
        </Column>
      </Column>
    </Row>
  );
}
