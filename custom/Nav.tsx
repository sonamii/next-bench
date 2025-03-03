import "@/custom/styles/nav.css";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function Navbar() {
  return (
    <div className="containerMax">
      <div className="nav">
        <div className="logoContainer">
          <div className="logo">
            <Image
              src="/logo.png"
              alt="logo"
              width={50}
              height={50}
              style={{ filter: "invert(1)", marginRight: "10px" }}
            />
            NEXT BENCH
          </div>
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
          <Link href={"#comingSoonSection"}>
            <div className="button2">
              <u>Try it now </u>&nbsp;
              <ArrowUpRight size={15} color="#212121" />
            </div>
          </Link>
          <Link href={"#comingSoonSection"}>
            {" "}
            <div className="button">Shortlisted</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
