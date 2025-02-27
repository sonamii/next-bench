import Image from "next/image";
import "./style.css";
import { brotliCompress } from "zlib";
import { Instagram, Linkedin, MapPin, User } from "lucide-react";
export default function Home() {
  return (
    <>
      <div className="containerMax">
        <div className="nav">
          <div className="logoContainer">
            <div className="logo">NEXTBENCH</div>
            <div className="location">
              <MapPin
                size={13}
                color="#52525B"
                style={{ marginBottom: "2.3px" }}
              />
              Dehradun
            </div>
          </div>

          <div className="midCont">
            <div className="links">Admission</div>
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
          <div className="textTop">Find <span>schools</span> that fits for your <br/>child.</div>
          <div className="textBottom">Finding the right school shouldn't be hard. From K-12 to college to grad school, we make it School Search easy.</div>
        </div>
        {/*main end*/}

        {/*Footer start*/}
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
              <Linkedin /> {/*LUCIDE REACT ICONS */}
            </a>
            <a href="#">
              <Instagram /> {/*LUCIDE REACT ICONS */}x
            </a>
          </div>
        </div>
        {/*Footer end*/}
        {/*containerMax end*/}
        {/*TRASH AREA 

        */}
      </div>
    </>
  );
}

//What extension are you using? mien are not working?
//auto-complete tag,error lens,prettier code formatter.
//ok

// for  prettier code formatter, you can try to install it and press shift+alt+f to format the code
//ok

// CURRENTLY WE WILL MAKE ONLY HOME > COMING SOON PAGE > FOOTER
//ok
