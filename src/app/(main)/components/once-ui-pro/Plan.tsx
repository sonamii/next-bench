"use client";

import React from "react";
import {
  Background,
  Column,
  Row,
  Heading,
  Flex,
  Text,
  Icon,
  Button,
} from "@once-ui-system/core";

interface PlansProps extends React.ComponentProps<typeof Row> {}

const plans = {
  free: {
    name: "Free",
    href: " ",
    color: "neutral" as "neutral" | "brand" | "accent",
    gradient: false,
    price: {
      original: "0",
      discounted: "0",
    },
    features: ["Comprehensive variables", "Fluid component system"],
  },
  pro: {
    name: "Pro",
    href: " ",
    color: "brand" as "neutral" | "brand" | "accent",
    gradient: true,
    price: {
      original: "120",
      discounted: "80",
    },
    features: [
      "Comprehensive variables",
      "Fluid component system",
      "Landing page examples",
      "Marketing resources",
      "Data viz module",
      "Social module",
      "Regular updates",
    ],
  },
  team: {
    name: "Team",
    href: " ",
    color: "neutral" as "neutral" | "brand" | "accent",
    gradient: false,
    price: {
      original: "240",
      discounted: "160",
    },
    features: [
      "Comprehensive variables",
      "Fluid component system",
      "Landing page examples",
      "Marketing resources",
    ],
  },
};

interface PlanCardProps extends React.ComponentProps<typeof Row> {
  id: string;
  plan: (typeof plans)[keyof typeof plans];
}

const PlanCard: React.FC<PlanCardProps> = ({ id, plan, ...rest }) => {
  const borderColor = `${plan.color}-alpha-medium` as const;
  const textColor = `${plan.color}-medium` as const;
  const gradientColor = `${plan.color}-background-strong` as const;

  return (
    <Column
      id={plan.name}
      border={borderColor}
      fill
      background="surface"
      overflow="hidden"
      {...rest}
    >
      <Column fill padding="40" gap="8">
        {plan.gradient && (
          <>
            <Background
              top="0"
              left="0"
              position="absolute"
              gradient={{
                x: 50,
                y: 100,
                width: 60,
                height: 100,
                tilt: 30,
                opacity: 100,
                display: true,
                colorStart: gradientColor,
                colorEnd: "static-transparent",
              }}
            />
            <Background
              top="0"
              left="0"
              position="absolute"
              mask={{
                x: 50,
                y: 100,
                radius: 50,
              }}
              dots={{
                display: true,
                opacity: 100,
                size: "4",
                color: gradientColor,
              }}
            />
          </>
        )}
        <Column fill gap="4">
          <Column fillWidth gap="8" marginBottom="12">
            <Heading
              as="h3"
              align="left"
              onBackground={textColor}
              variant="heading-default-l"
            >
              {plan.name}
            </Heading>
            <Text align="left" variant="heading-default-xl">
              {plan.price.original !== plan.price.discounted && (
                <Text
                  onBackground="neutral-weak"
                  style={{ textDecoration: "line-through" }}
                >
                  ${plan.price.original}
                </Text>
              )}{" "}
              ${plan.price.discounted}{" "}
              <Text onBackground="neutral-strong" variant="body-default-s">
                / year
              </Text>
            </Text>
          </Column>
          <Column fillWidth gap="8" marginY="12">
            {plan.features.map((feature, index) => (
              <Row key={index} vertical="center" gap="12">
                <Icon name="check" size="s" onBackground="neutral-weak" />
                <Text
                  align="left"
                  onBackground="neutral-medium"
                  variant="body-default-s"
                >
                  {feature}
                </Text>
              </Row>
            ))}
          </Column>
        </Column>
      </Column>
      <Row
        borderTop={borderColor}
        fillWidth
        textVariant="body-default-s"
        onBackground={textColor}
        horizontal="center"
        align="center"
      >
        <Button
          style={{ border: "none" }}
          radius="none"
          id={id + "-button-3"}
          href={plan.href}
          variant={plan.color === "neutral" ? "tertiary" : "primary"}
          fillWidth
          arrowIcon
        >
          Get started
        </Button>
      </Row>
    </Column>
  );
};

const Plans3 = ({ ...rest }: PlansProps) => {
  return (
    <Row fillWidth gap="-1" overflowX="auto" {...rest}>
      <Flex fillWidth paddingTop="40" minWidth={20}>
        <PlanCard id="free" plan={plans.free} leftRadius="l" />
      </Flex>
      <Column fillWidth minWidth={20}>
        <Flex
          paddingX="16"
          minHeight="40"
          gap="8"
          center
          topRadius="m"
          onBackground="brand-strong"
          borderTop="brand-alpha-medium"
          borderLeft="brand-alpha-medium"
          borderRight="brand-alpha-medium"
          textVariant="label-default-m"
        >
          <Icon name="sparkle" size="s" onBackground="brand-medium" />
          Most popular
        </Flex>
        <PlanCard id="pro" plan={plans.pro} zIndex={1} />
      </Column>
      <Flex fillWidth paddingTop="40" minWidth={20}>
        <PlanCard id="team" plan={plans.team} rightRadius="l" />
      </Flex>
    </Row>
  );
};

export { Plans3 };
