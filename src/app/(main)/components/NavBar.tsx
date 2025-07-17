'use client';
import {
  Flex,
  Row,
  Column,
  Text,
  Media,
  MegaMenu,
  Input,
  NavIcon,
  ToggleButton,
} from "@once-ui-system/core";
import { useState } from "react";

import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});


export default function Navbar() {
   const [isActive, setIsActive] = useState(false);
  
  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <Row horizontal="space-between" fillWidth fitHeight vertical="center" id="top">
      <Flex
        vertical="center"
        gap="8"
        onClick={() => (window.location.href = "/")}
        cursor="interactive"
      >
        <Media
          src="https://imghost.online/ib/skwnw73hCCCOt3q_1751541353.png"
          unoptimized
          width={4}
          height={3}
          alt="A"
          className="logo"
        />
        <Text variant="label-default-xl" className={"logoText" + " " +outfit.className }>Next Bench</Text>
      </Flex>
      <Flex>
        <MegaMenu
          hide="s"
          menuGroups={[
        { id: "home", label: "Home", href: "/" },
        {
          id: "consultants",
          label: "Consultants",
          suffixIcon: "chevronDown",
          sections: [
            {
          title: "Our Experts",
          links: [
            {
              label: "Meet Consultants",
              href: "/consultants",
              description: "Browse our education consultants",
            },
            {
              label: "Become a Consultant",
              href: "/consultants/join",
              description: "Apply to join our team",
            },
          ],
            },
          ],
        },
        {
          id: "find-school",
          label: "Find School",
          suffixIcon: "chevronDown",
          sections: [
            {
          title: "Search",
          links: [
            {
              label: "School Directory",
              href: "/schools",
              description: "Find schools by location or type",
            },
            {
              label: "Compare Schools",
              href: "/compare",
              description: "Compare schools side by side",
            },
          ],
            },
          ],
        },
        // {
        //   id: "resources",
        //   label: "Resources",
        //   suffixIcon: "chevronDown",
        //   sections: [
        //     {
        //   title: "Guides",
        //   links: [
        //     {
        //       label: "Admission Guide",
        //       href: "/guides/admission",
        //       description: "Step-by-step admission process",
        //     },
        //     {
        //       label: "Scholarships",
        //       href: "/guides/scholarships",
        //       description: "Find scholarship opportunities",
        //     },
        //   ],
        //     },
        //     {
        //   title: "Support",
        //   links: [
        //     {
        //       label: "Help Center",
        //       href: "/help",
        //       description: "Get answers to your questions",
        //     },
        //     {
        //       label: "Community",
        //       href: "/community",
        //       description: "Connect with other students",
        //     },
        //   ],
        //     },
        //   ],
        // },
        // {
        //   id: "about",
        //   label: "About",
        //   suffixIcon: "chevronDown",
        //   sections: [
        //     {
        //   title: "Company",
        //   links: [
        //     {
        //       label: "Our Story",
        //       href: "/about",
        //       description: "Learn about our mission",
        //     },
        //     {
        //       label: "Contact",
        //       href: "/contact",
        //       description: "Get in touch with us",
        //     },
        //   ],
        //     },
        //     {
        //   title: "Careers",
        //   links: [
        //     {
        //       label: "Join Us",
        //       href: "/careers",
        //       description: "Explore career opportunities",
        //     },
        //   ],
        //     },
        //   ],
        // },
        {
          id: "dashboard",
          label: "MekoAI",
          href: "/mekoai",
          suffixIcon: "chevronDown",
          sections: [

            {
              title: "AI Search",
              links: [
                {
                  label: "Search Schools",
                  href: "/ai-search",
                  description: "Find schools using AI",
                },
                {
                  label: "Search Consultants",
                  href: "/ai-search/consultants",
                  description: "Find consultants using AI",
                },
              ],
            },
          ],
        },
          ]}
        />
        <NavIcon
          isActive={isActive}
          onClick={handleClick}
          aria-label="Toggle navigation menu"
          aria-expanded={isActive}
          aria-controls="demo-nav"
          className="navIcon"
        />

        {isActive && (
          <Column
        id="demo-nav"
        padding="16"
        background="surface"
        border="surface"
        radius="l"
        marginTop="8"
        fillWidth
        gap="8"
        style={{
          position: "absolute",
          top: "25px",
          right: "25px",
          minWidth: "fit-content",
          minHeight: "fit-content",
          zIndex: 99999999999,
        }}
          >
        <ToggleButton fillWidth horizontal="start" size="l">
          Home
        </ToggleButton>
        <ToggleButton fillWidth horizontal="start" size="l">
          Consultants
        </ToggleButton>
        <ToggleButton fillWidth horizontal="start" size="l">
          Find School
        </ToggleButton>
        <ToggleButton fillWidth horizontal="start" size="l">
          Resources
        </ToggleButton>
        <ToggleButton fillWidth horizontal="start" size="l">
          About
        </ToggleButton>
        <ToggleButton fillWidth horizontal="start" size="l">
          MekoAI
        </ToggleButton>
          </Column>
        )}
      </Flex>
    </Row>
  );
}
