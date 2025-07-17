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
  Scroller,
} from "@once-ui-system/core";

const plans = {
  free: {
    name: "Freemium",
    href: "#",
    color: "neutral" as "neutral" | "brand" | "accent",
    gradient: false,
    price: {
      original: "300",
      discounted: "200",
    },
    features: [
      "30 credits per day",
      "Institution Discovery",
      "AI Search",
      "Basic support",
    ],
  },
  pro: {
    name: "Core",
    href: "#",
    color: "brand" as "neutral" | "brand" | "accent",
    gradient: true,
    price: {
      original: "500",
      discounted: "350",
    },
    features: [
      "100 credits per day",
      "Advanced AI Search",
      "Consultation with experts",
      "Priority support",
      "Personalized roadmaps",
      "Online payments",
      "All features of freemium plan",
    ],
  },
  team: {
    name: "Pro",
    href: "#",
    color: "neutral" as "neutral" | "brand" | "accent",
    gradient: false,
    price: {
      original: "1000",
      discounted: "700",
    },
    features: [
      "Unlimited credits",
      "Custom AI models",
      "Access to video consultations",
      "Collaboration tools",
      "All features of pro plan",
    ],
  },
};

interface PlanCardProps extends React.ComponentProps<typeof Row> {
  id: string;
  plan: (typeof plans)[keyof typeof plans];
}

const PlanCard: React.FC<PlanCardProps> = ({ id, plan, ...flex }) => {
  const borderColor = `${plan.color}-alpha-medium` as const;
  const textColor = `${plan.color}-medium` as const;
  const gradientColor = `${plan.color}-background-strong` as const;

  return (
    <Column
      id={plan.name}
      border={borderColor}
      fill
      overflow="hidden"
      {...flex}
    >
      <Column fill padding="16" gap="40">
        {plan.gradient && (
          <>
            <Background
              top="0"
              left="0"
              position="absolute"
              gradient={{
                x: 50,
                y: 30,
                width: 60,
                height: 100,
                tilt: 45,
                opacity: 100,
                display: true,
                colorStart: gradientColor,
                colorEnd: "static-transparent",
              }}
            />
          </>
        )}
        <Column fill gap="4" padding="24">
          <Column fillWidth gap="8" marginBottom="12">
            <Heading
              as="h3"
              align="left"
              onBackground={textColor}
              variant="heading-strong-xs"
            >
              {plan.name}
            </Heading>
            <Text align="left" variant="heading-default-xl">
              {plan.price.original !== plan.price.discounted && (
                <Text
                  onBackground="neutral-weak"
                  style={{ textDecoration: "line-through" }}
                >
                  ₹{plan.price.original}
                </Text>
              )}{" "}
              ₹{plan.price.discounted}{" "}
              <Text onBackground="neutral-strong" variant="body-default-s">
                / month
              </Text>
            </Text>
          </Column>
          <Column fillWidth gap="16" paddingTop="20" paddingBottom="12">
            {plan.features.map((feature, index) => (
              <Row key={index} vertical="center" gap="12">
                <Icon name="check" size="xs" onBackground={textColor} />
                <Text
                  align="left"
                  onBackground="neutral-medium"
                  variant="label-default-m"
                >
                  {feature}
                </Text>
              </Row>
            ))}
          </Column>
        </Column>
        <Button
          id={id + "-button-3"}
          href={plan.href}
          variant={plan.color === "neutral" ? "secondary" : "primary"}
          fillWidth
          arrowIcon
        >
          Get started
        </Button>
      </Column>
    </Column>
  );
};

const Plans3 = ({ ...flex }) => {
  return (
    <Scroller maxWidth="m">
      <Row gap="-1" {...flex}>
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
            🔥 Most popular 🔥
          </Flex>
          <PlanCard id="pro" plan={plans.pro} zIndex={1} />
        </Column>
        <Flex fillWidth paddingTop="40" minWidth={20}>
          <PlanCard id="team" plan={plans.team} rightRadius="l" />
        </Flex>
      </Row>
    </Scroller>
  );
};

export { Plans3 };
