import "../custom/Styles/nav.css";
import Link from "next/link";
import { ArrowUpRight, MapPin, User } from "lucide-react";

export function Navbar() {
  return (
    <>
      <div className="containerMax">
        <div className="nav">
          <div className="logoContainer">
            <div className="logo">NEXT BENCH</div>
            {/* <div className="location">
              <MapPin
                size={13}
                color="#52525B"
                style={{ marginBottom: "4px" }}
              />
              Earth
            </div> */}
          </div>

          <div className="midCont">
            <div className="links">
              <Link href="#comingSoonSection">Admission Tracker</Link>
            </div>
            <div className="links">
              <Link href="#comingSoonSection">Comparison</Link>
            </div>
            <div className="links">
              <Link href="#comingSoonSection">Explore</Link>
            </div>
          </div>

          <div className="right">
            {" "}
            <div className="button2">
              <u>Try it now </u>&nbsp;
              <ArrowUpRight size={15} color="#212121" />
            </div>
            <div className="button">Shortlist</div>
            <Link href="#comingSoonSection">
              <div className="profile">
                <User size={20} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
