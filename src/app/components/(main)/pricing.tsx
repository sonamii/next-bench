import { Column, Flex, Row, Text } from "@once-ui-system/core";
import { geist } from "@/resources/next-bench.config";
import { PricingCard } from "./PricingCard";
import { pricingPlans } from "@/resources/next-bench.config";
import { motion } from "framer-motion";

export function PricingSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Column fillWidth horizontal="center" vertical="start" gap="24">
        <Row>
          <Text variant="display-default-s">
            <u>
              <span
                style={{
                  fontFamily: geist.className,
                  fontStyle: "italic",
                  fontWeight: "normal",
                  display: "inline-block",
                }}
              >
                Great
              </span>
            </u>&nbsp;
            pricings
          </Text>
        </Row>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Row
            horizontal="between"
            fillWidth
            maxWidth={"m"}
            style={{ flexWrap: "wrap" }}
            id="pricingGroup"
            gap="16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Flex data-scaling="100" id="pricingCard">
                <PricingCard {...pricingPlans[0]} />
              </Flex>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Flex data-scaling="10" id="pricingCard">
                {" "}
                <PricingCard {...pricingPlans[1]} />
              </Flex>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Flex data-scaling="100" id="pricingCard">
                {" "}
                <PricingCard {...pricingPlans[2]} />
              </Flex>
            </motion.div>
          </Row>
        </motion.div>
      </Column>
    </motion.div>
  );
}
