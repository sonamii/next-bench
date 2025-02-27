import Image from "next/image";
import "./style.css";
import { Instagram, Linkedin, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
              Find <span>schools</span> that fits for your <br />
              child.
            </div>
            <div className="textBottom">
              Finding the right school shouldn't be hard. From K-12 to college
              to grad school, we make it School Search easy.
            </div>{" "}
            <div className="input">
              {" "}
              <Input type="text" placeholder="Enter school's name/locality" />
              <Button type="submit">Search</Button>{" "}
            </div>
            <div className="testimonial">
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
                <div
                  data-layer="Fact 2"
                  className="Fact2 h-16 justify-start items-center gap-4 inline-flex"
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
          </div>{" "}
        </div>
        <div className="footer">
          <div className="footerStyle">
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
                <a href="#">About</a>
                <a href="#">Admission Taker</a>
                <a href="#">Comparison</a>
                <a href="#">Shortlisted School</a>
              </div>

              <div className="help">
                <h3>Help</h3>
                <br />
                <a href="#">Customer Support</a>
                <a href="#">For teachers</a>
                <a href="#">Terms and Condition</a>
                <a href="#">Privacy Policy</a>
              </div>

              <div className="resources">
                <h3>Resources</h3>
                <br />
                <a href="#">Schools</a>
                <a href="#">College</a>
                <a href="#">Universities</a>
                <a href="#">Others</a>
              </div>
            </div>
          </div>

          <div className="socialLinks">
            <a href="#">
              <Linkedin />
            </a>
            <a href="#">
              <Instagram />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
