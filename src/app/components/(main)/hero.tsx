import {
  Text,
  Button,
  Column,
  Flex,
  AvatarGroup,
  Row,
  Icon,
  CountdownFx,
  Mask,
  MatrixFx,
} from "@once-ui-system/core";
import { geist } from "@/resources/next-bench.config";
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <Column
      fillWidth
      fitHeight
      maxWidth={"m"}
      horizontal="center"
      paddingY="xl"
      gap="m"
      style={{ flexWrap: "wrap" }}
    >
     
        <Mask
          fill
          height={24}
          x={50}
          y={50}
          radius={33}
          opacity={30} style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
        >
          <MatrixFx
            height={24}
            colors={["brand-solid-strong", "neutral-solid-strong"]}
            trigger="mount"
            flicker
            zIndex={10}
          />
        </Mask>
 
      
      <motion.div
        initial={{ opacity: 0, y: -40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      >
        <Row gap="12" vertical="center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <AvatarGroup
              data-scaling="110"
              size="m"
              avatars={[
                { src: "https://randomuser.me/api/portraits/men/2.jpg" },
                { src: "https://randomuser.me/api/portraits/women/2.jpg" },
                { src: "https://randomuser.me/api/portraits/men/3.jpg" },
                { src: "https://randomuser.me/api/portraits/women/2.jpg" },
                { src: "https://randomuser.me/api/portraits/men/7.jpg" },
              ]}
            />
          </motion.div>
          <Column horizontal="start" vertical="between">
      
              <Row fitHeight>
                <motion.div
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                >
                  <Icon name="star" size="s"></Icon>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
                >
                  <Icon name="star" size="s"></Icon>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                >
                  <Icon name="star" size="s"></Icon>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.55, ease: "easeOut" }}
                >
                  <Icon name="star" size="s"></Icon>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                >
                  <Icon name="star" size="s"></Icon>
                </motion.div>{" "}
              </Row>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{display: "flex", alignItems: "flex-end"}}

              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              <Text variant="body-default-s" onBackground="neutral-weak">
                180+ happy students
              </Text>
            </motion.div>
          </Column>
        </Row>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      >
        <Column data-scaling="110" fitHeight gap={"s"} maxWidth={"s"}>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Text variant="display-default-m" align="center">
              {" "}
              Ready to{" "}
              <span
              
                style={{
                  fontFamily: geist.className,
                  fontStyle: "italic",
                  fontWeight: "normal",
                  display: "inline-block"
                }}
              >
                <u>boost</u>
              </span>{" "}
              your education by getting admission in top universities?{" "}
            </Text>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Text
              variant="body-default-xl"
              onBackground="neutral-weak"
              align="center"
            >
              Looking for an efficient and convenient way to navigate the
              application process? Look no further!
            </Text>
          </motion.div>
          
          
            <Row gap="16" center fillWidth style={{ flexWrap: "wrap" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
              >
                <Button variant="secondary">
                  {" "}
                  <Text variant="body-default-l">Try it now</Text>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
              >
                <Button suffixIcon="arrowTopRight" href="/search">
                  {" "}
                  <Text variant="body-default-l">Search institutes</Text>
                </Button>
              </motion.div>
            </Row>
         
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.7, ease: "easeOut" }}
          >
            <Flex fillWidth center>
              
                <Text variant="body-default-s">Launching soon! </Text>
             &nbsp;
             
                <CountdownFx
                  onBackground="neutral-weak"
                  targetDate={new Date("July 1, 2026")}
                  variant="body-default-s"
                  format="DD:HH:MM:SS"
                />
             
            </Flex>
          </motion.div>
        </Column>
      </motion.div>
    </Column>
  );
}
