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
        <NavIcon   isActive={isActive} 
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
          style={{ position: "absolute", top: "25px", right: "25px",minWidth:"fit-content",minHeight:"fit-content",zIndex:99999999999 } }
        >
          <ToggleButton fillWidth horizontal="start" size="l">
            Home
          </ToggleButton>
          <ToggleButton fillWidth horizontal="start" size="l">
            Consultants
          </ToggleButton>
          <ToggleButton fillWidth horizontal="start" size="l">
            Find
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
