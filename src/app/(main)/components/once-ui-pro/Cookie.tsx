"use client";

import React, { useState } from "react";
import {
  Accordion,
  Button,
  Column,
  Dialog,
  Flex,
  Line,
  Row,
  SmartLink,
  Switch,
  Text,
} from "@once-ui-system/core";

interface props extends React.ComponentProps<typeof Flex> {}

export const Cookie: React.FC<props> = ({ ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [functional, setFunctional] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "20px", left: "20px", zIndex: 1000 }}>
      <Column
        padding="20"
        maxWidth={28}
        border="neutral-medium"
        radius="l"
        gap="8"
        style={{backgroundColor:"#FDFDF9"}}
        {...rest}
      >
        <Text variant="body-default-s" marginBottom="12">
          This site uses tracking technologies. You may opt in or opt out of the
          use of these technologies.
        </Text>
        <Row fillWidth horizontal="space-between" gap="24">
          <Row gap="8">
            <Button size="s" variant="secondary">
              Deny
            </Button>
            <Button size="s" variant="secondary">
              Accept all
            </Button>
          </Row>
          <Button size="s" onClick={() => setIsOpen(true)}>
            Customize
          </Button>
        </Row>
      </Column>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Cookie settings"
        description="This site uses tracking technologies. You may opt in or opt out of the use of these technologies."
        footer={
          <Row fillWidth horizontal="space-between">
            <Row gap="8">
              <Button variant="secondary">Deny</Button>
              <Button variant="secondary">Accept all</Button>
            </Row>
            <Button onClick={() => setIsOpen(false)}>Save</Button>
          </Row>
        }
      >
        <Column fillWidth gap="16">
          <Column fillWidth radius="m" border="neutral-medium">
            <Accordion
              title={
                <div onClick={(e) => e.stopPropagation()}>
                  <Switch
                    isChecked={marketing}
                    onToggle={() => setMarketing(!marketing)}
                    label="Marketing"
                  />
                </div>
              }
            >
              <Text onBackground="neutral-medium" variant="body-default-s">
                Marketing cookies and services are used to deliver personalized
                advertisements, promotions, and offers. These technologies
                enable targeted advertising and marketing campaigns by
                collecting information about users' interests, preferences, and
                online activities.
              </Text>
            </Accordion>
            <Line />
            <Accordion
              title={
                <div onClick={(e) => e.stopPropagation()}>
                  <Switch
                    isChecked={analytics}
                    onToggle={() => setAnalytics(!analytics)}
                    label="Analytics"
                  />
                </div>
              }
            >
              <Text onBackground="neutral-medium" variant="body-default-s">
                Analytics cookies and services are used for collecting
                statistical information about how visitors interact with a
                website. These technologies provide insights into website usage,
                visitor behavior, and site performance to understand and improve
                the site and enhance user experience.
              </Text>
            </Accordion>
            <Line />
            <Accordion
              title={
                <div onClick={(e) => e.stopPropagation()}>
                  <Switch
                    isChecked={functional}
                    onToggle={() => setFunctional(!functional)}
                    label="Functional"
                  />
                </div>
              }
            >
              <Text onBackground="neutral-medium" variant="body-default-s">
                Functional cookies and services are used to offer enhanced and
                personalized functionalities. These technologies provide
                additional features and improved user experiences, such as
                remembering your language preferences, font sizes, region
                selections, and customized layouts. Opting out of these cookies
                may render certain services or functionality of the website
                unavailable.
              </Text>
            </Accordion>
            <Line />
            <Accordion
              title={
                <div onClick={(e) => e.stopPropagation()}>
                  <Switch isChecked onToggle={() => {}} label="Essential" />
                </div>
              }
            >
              <Text onBackground="neutral-medium" variant="body-default-s">
                Essential cookies and services are used to enable core website
                features, such as ensuring the security of the website.
              </Text>
            </Accordion>
          </Column>
          <Text onBackground="neutral-weak" variant="body-default-s">
            Read how we handle your data in our{" "}
            <SmartLink href=" ">Privacy Policy</SmartLink>
          </Text>
        </Column>
      </Dialog>
    </div>
  );
};
