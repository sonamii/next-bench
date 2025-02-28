import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import "../custom/Styles/main.css"
export function  Main(){

    return(<>
     <section
              className="mainSection"
              id="mainSection"
              style={{ width: "100%" }}
            ><div className="main">
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
            college to graduation school, we make school search easy.
          </div>{" "}
          <div className="input">
            {" "}
            <Input type="text" placeholder="Enter school's name/locality" />
            <Link href="#comingSoonSection"><Button type="submit">Search</Button></Link>{" "}
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
                    30+*
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
                    8+*
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

      </>
      )
}