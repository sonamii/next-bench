import {
  Flex,
  Row,
  Column,
  Text,
  Media,
  MegaMenu,
  Input,
} from "@once-ui-system/core";

export default function Navbar() {
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
        />
        <Text variant="label-default-xl">Next Bench</Text>
      </Flex>
      <Flex>
        <MegaMenu
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
      </Flex>
    </Row>
  );
}
