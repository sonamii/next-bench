import Image from "next/image";
import "./style.css";
import { MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import {Navbar} from './../custom/Nav';
import {Footer} from './../custom/footer';
export default function Home() {
  return (    
  <>
    <div className="containerMax">
        
      <Navbar/>

        {/*main start*/}
        <section className="mainSection" id="mainSection" style={{width: '100%'}}>
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
                Find <span>schools</span> that fits for your child.
              </div>
              <div className="textBottom">
                Finding the right school shouldn&apos;t be hard. From K-12 to
                college to grad school, we make it School Search easy.
              </div>{" "}
              <div className="input">
                {" "}
                <Input type="text" placeholder="Enter school's name/locality" />
                <Button type="submit">Search</Button>{" "}
              </div>
              <div className="testimonial" style={{ marginLeft: "10px" }}>
                <div className="testimonialExtra">
                  <div
                    data-layer="Frame 282"
                    className="Frame282 h-16 justify-start items-center gap-10 inline-flex"
                  >
                    <div
                      data-layer="Fact 1"
                      className="Fact1 h-16 justify-start items-center gap-0.5 inline-flex"
                    >
                      <div
                        data-layer="300+"
                        className="w-32 text-zinc-900 text-5xl font-medium font-['Plus_Jakarta_Sans'] leading-10"
                      >
                        300+
                      </div>
                      <div
                        data-layer="Happy Parents"
                        className="HappyParents w-20 text-zinc-900 text-xs font-normal font-['Plus_Jakarta_Sans'] leading-tight"
                      >
                        Happy <br />
                        Parents
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      data-layer="Fact 2"
                      className="Fact2 h-16 justify-start items-center gap-0 inline-flex"
                    >
                      <div
                        data-layer="80+"
                        className="w-24 text-right text-zinc-900 text-5xl font-medium font-['Plus_Jakarta_Sans'] leading-10"
                      >
                        80+
                      </div>
                      <div
                        data-layer="Applied Schools"
                        className="AppliedSchools w-20 text-zinc-900 text-xs font-normal font-['Plus_Jakarta_Sans'] leading-tight"
                      >
                        Applied
                        <br />
                        Schools
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </section>

        <section className="comingSoonSection" id="comingSoonSection">
          <div className="comingSoon">
            <h1>Coming Soon...</h1>

            <div className="email">
              <div className="emailHeading">
                <p>Enter your email below to be notified as soon as our website is fully complete and ready to use!</p>
              </div>
              <div className="emailInput">
                <div className="emailTextBox">
                  <Input type="email" placeholder="Email"></Input>
                </div>
                <div className="emailButton">
                  <Button type="submit">Submit</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

<Footer/>
        </div>
    </>
  );
}
