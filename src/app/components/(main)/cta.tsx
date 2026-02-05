import {
  Text,
  Button,
  
  Flex,
  Row,
  TypeFx,

} from "@once-ui-system/core";
import { Geist } from "next/font/google";
import React, { useEffect, useRef } from "react";

const geist = Geist({ subsets: ["latin"] });

export function CallToAction() {
  const triggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Trigger the animation after component mounts
    if (triggerRef.current) {
      setTimeout(() => {
        const triggerFn = triggerRef.current;
        if (typeof triggerFn === "function") {
          triggerFn();
        }
      }, 1000);
    }
  }, []);

  return (
    <Row fillWidth maxWidth={"m"} horizontal="between" id="cta">
      <Text variant="display-default-s" align="center">
        <b>
          Let your{" "}
          <span
            style={{
              fontFamily: geist.className,
              fontStyle: "italic",
              fontWeight: "normal",
            }}
          >
            <u>plans</u>
          </span>{" "}
          <TypeFx
            words={["shape the future.", "innovate with us."]}
            
            speed={80}
            hold={1000} 
            trigger="custom"
            ref = {triggerRef}
            delay={500}
            style={{ display: 'inline-block', verticalAlign: 'baseline' }}
            onTrigger={(triggerFn) => {
              triggerRef.current = triggerFn;
            }}
          />
        </b>
      </Text>{" "}
      <Flex direction="row" gap="12">
        <Button size="l" variant="secondary" suffixIcon="arrowTopRight" href="/search">
          <Text variant="body-default-l">Try it now</Text>
        </Button>
        <Button size="l" href="#">
          <Text variant="body-default-l">Contact Sales</Text>
        </Button>
      </Flex>
    </Row>
  );
}