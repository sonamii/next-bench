import "../custom/Styles/nav.css";
import Link from "next/link";
import { MapPin, User } from "lucide-react";

export function Navbar() {
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
            <div className="links"><Link href="#comingSoonSection">Admission Tracker</Link></div>
            <div className="links"><Link href="#comingSoonSection">Comparison</Link></div>
            <div className="links"><Link href="#comingSoonSection">Explore</Link></div>
          </div>

          <div className="right">
            <Link href="#comingSoonSection">
              <div className="button">Shortlist</div>
            </Link>

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
