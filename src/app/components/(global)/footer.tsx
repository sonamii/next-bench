
import {
  Text,
  Flex,
  Row,
Column,
  IconButton,
  SmartLink,
} from "@once-ui-system/core";
import Image from "next/image";
import {companyLogo,mono} from "@/resources/next-bench.config";
import React from "react";


export function Footer() {
    const [theme, setTheme] = React.useState<"light" | "dark" | "system">(
      typeof window !== "undefined"
        ? localStorage.getItem("data-theme") as
            | "light"
            | "dark"
            | "system"
        : "light"
    );
  return (
    <Column fillWidth maxWidth={"m"}>
        <Row fillWidth padding="16" horizontal="between" id="footer">
          <Flex fitWidth direction="column" gap="12">
            {" "}
            <Row vertical="center" gap="12">
              <Image
                src={companyLogo}
                alt=""
                width={40}
                height={40}
            style={{ filter: theme === "dark" ? "invert(1)" : "invert(0)", borderRadius: "30%" }}
              ></Image>
              <Text variant="body-default-xl" align="center">
                {" "}
                Next Bench
              </Text>
            </Row>
            <Flex maxWidth={20}>
              <Text
                variant="body-default-m"
                onBackground="neutral-weak"
                align="left"
                style={{ fontFamily: mono.style.fontFamily }}
              >
                A comprehensive tool for students.
              </Text>
            </Flex>
            <Row vertical="center" gap="12" data-border="conservative">
              <IconButton
                icon="facebook"
                variant="secondary"
                size="l"
              ></IconButton>
              <IconButton
                icon="instagram"
                variant="secondary"
                size="l"
              ></IconButton>
              <IconButton
                icon="twitter"
                variant="secondary"
                size="l"
              ></IconButton>
              <IconButton icon="mail" variant="secondary" size="l"></IconButton>
            </Row>
          </Flex>
          <Flex direction="row" horizontal="between" gap="20">
            <Column gap="4">
              <SmartLink>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Resources
                </Text>
              </SmartLink>
              <SmartLink href="#">Help center</SmartLink>
              <SmartLink href="#">Community</SmartLink>
              <SmartLink href="#">Contact Support</SmartLink>
              <SmartLink href="#">Security</SmartLink>
            </Column>
            <Column gap="4">
              <SmartLink>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Company
                </Text>
              </SmartLink>
              <SmartLink href="#">About Us</SmartLink>
              <SmartLink href="#">Careers</SmartLink>
              <SmartLink href="#">Brand Assets</SmartLink>
              <SmartLink href="#">Terms of Service</SmartLink>
            </Column>
          </Flex>
        </Row>
        <Column
          fillWidth
          horizontal="center"
          vertical="center"
          borderTop="neutral-alpha-medium"
          paddingTop="16"
        >
          <Text variant="body-default-s" onBackground="neutral-weak">
            © 2026 Next Bench. All rights reserved.
          </Text>
        </Column>
      </Column>
  );
}

