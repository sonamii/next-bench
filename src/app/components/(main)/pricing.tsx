import { Column, Flex, Row, Text } from "@once-ui-system/core";
import { geist } from "@/resources/next-bench.config";
import { PricingCard } from "./PricingCard";
import {pricingPlans} from "@/resources/next-bench.config";




export function PricingSection() {
  return (
    <Column fillWidth horizontal="center" vertical="start" gap="24">
        <Row>
          <Text variant="display-default-s">
            <span
              style={{
                fontFamily: geist.className,
                fontStyle: "italic",
                fontWeight: "normal",
              }}
            >
              Great
            </span>{" "}
            pricings
          </Text>
        </Row>
        <Row
          horizontal="between"
          fillWidth
          maxWidth={"m"}
          style={{ flexWrap: "wrap" }}
          id="pricingGroup"
          gap="16"
        >
          <Flex data-scaling="100" id="pricingCard">
            <PricingCard {...pricingPlans[0]} />
          </Flex>
          <Flex data-scaling="10" id="pricingCard">
            {" "}
            <PricingCard {...pricingPlans[1]} />
          </Flex>
          <Flex data-scaling="100" id="pricingCard">
            {" "}
            <PricingCard {...pricingPlans[2]} />
          </Flex>
        </Row>
      </Column>
  );
}
