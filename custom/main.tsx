"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import "@/custom/styles/main.css";
// import { useGlitch } from "react-powerglitch";
// import { Txtrvl } from "txtrvl";

/* <Txtrvl
          text="Lorem ipsum dolor sit amet cons ectetlit."
          delayPerRow={200} // each row = +200ms delay
          duration={1500}
          onChange={(isVisible) => console.log(isVisible)}
          manualTrigger={{
            // optional config
            isVisible: true, // true | false
          }}
          scrollTrigger={{
            offsetY: 500,
            disabled: false, // true | undefined
            resetPolicy: "above", // "no-reset" | "both"
            threshold: 0.5, // % of visible txt
            delay: 0,
          }}
        /> */
export function Main() {
  return (
    <section className="mainSection" id="mainSection" style={{ width: "100%" }}>
      <div className="main">
        <div className="containerMain">
          <div className="a">
            <Image
              src={"./vector1.svg"}
              alt="v1"
              width={200}
              height={200}
              style={{ scale: "3.1" }}
            />
          </div>
          <div className="b">
            <Image
              src={"./vector3.svg"}
              alt="v1"
              width={200}
              height={200}
              style={{ scale: "1.1" }}
            />
          </div>
          <div className="c">
            <Image
              src={"./vector2.svg"}
              alt="v1"
              width={200}
              height={200}
              style={{ scale: "1.1" }}
            />
          </div>
          <div className="d">
            <Image
              src={"./vector4.svg"}
              alt="v1"
              width={200}
              height={200}
              style={{ scale: "1.8" }}
            />
          </div>
          <div className="textTop">
            Find the perfect&nbsp;
            <span>&nbsp;school&nbsp;</span>&nbsp;that fits your child.
          </div>
          <div className="textBottom">
            Finding the right school shouldn't be hard. Whether you're searching
            for the perfect K-12 school, the best college for your future, or
            the right graduate program to advance your career, we simplify the
            process.
          </div>{" "}
          <div className="input">
            {" "}
            <Input type="text" placeholder="Enter school's name/locality" />
            <Link href="#comingSoonSection">
              <Button type="submit">Search it</Button>
            </Link>{" "}
          </div>{" "}
          {/* <div className="line"></div> */}
          {/* DISPLAY IS SET TO NONE */}
          <div className="tile"></div>
          <div className="testimonial">
            Trusted by 300+ parents and students*
          </div>
        </div>{" "}
      </div>
    </section>
  );
}
