import Image from "next/image";
import "./style.css";
import { MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="containerMax">
        <div className="nav">
          <div className="logoContainer">
            <div className="logo">NEXT BENCH</div>
            <div className="location">
              <MapPin
                size={13}
                color="#52525B"
                style={{ marginBottom: "4px" }}
              />
              Dehradun
            </div>
          </div>

          <div className="midCont">
            <div className="links">Admission Tracker</div>
            <div className="links">Comparison</div>
            <div className="links">Explore</div>
          </div>

          <div className="right">
            <div className="button">Shortlist</div>

            <div className="profile">
              <User size={20} />
            </div>
          </div>
        </div>

        {/*main start*/}
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
        <div className="footer">
          {/* <div className="footerStyle">
            <div className="info">
              <h1>NEXT BENCH</h1>
              <br />
              <h2>About Us</h2>
              <br />
              <p>Lorem Ipsum</p>
            </div>

            <div className="footerLinks">
              <div className="company">
                <h3>Company</h3>
                <br />
                <Link href="#">About</Link>
                <Link href="#">Admission Taker</Link>
                <Link href="#">Comparison</Link>
                <Link href="#">Shortlisted School</Link>
              </div>

              <div className="help">
                <h3>Help</h3>
                <br />
                <Link href="#">Customer Support</Link>
                <Link href="#">For teachers</Link>
                <Link href="#">Terms and Condition</Link>
                <Link href="#">Privacy Policy</Link>
              </div>

              <div className="resources">
                <h3>Resources</h3>
                <br />
                <Link href="#">Schools</Link>
                <Link href="#">College</Link>
                <Link href="#">Universities</Link>
                <Link href="#">Others</Link>
              </div>
            </div>
          </div> */}

          {/* <div className="socialLinks">
            <Link href="#">
              <Linkedin />
            </Link>
            <Link href="#">
              <Instagram />
            </Link>
          </div> */}

          <div className="left">
            <div className="top">
              <h1>NEXT BENCH</h1>
            </div>
            <div className="bottom">
              <h1>About us</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                dictum aliquet accumsan porta lectus ridiculus in mattis. Netus
                sodales in volutpat ullamcorper amet adipiscing fermentum.
              </p>
            </div>
          </div>
          <div className="right">
            <div className="item">
              <h1>Product</h1>
              <div className="p">
                <Link href="/">About</Link>
                <Link href="/">Admisison Tracker</Link>
                <Link href="/">Comparison</Link>
                <Link href="/">Shortlisted Schools</Link>
              </div>
            </div>
            <div className="item">
              <h1>Help</h1>
              <div className="p">
                <Link href="/">Customer Support</Link>
                <Link href="/">For Teachers</Link>
                <Link href="/">Terms and Conditions</Link>
                <Link href="/">Privacy Policy</Link>
              </div>
            </div>
            <div className="item">
              <h1>Resource</h1>
              <div className="p">
                <Link href="/">School</Link>
                <Link href="/">College</Link>
                <Link href="/">Universities</Link>
                <Link href="/">Others</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
