import React from "react";
import { ChevronDown, MenuIcon } from "lucide-react";
import "./nav.css";
import Image from "next/image";
interface NavProps {
  className?: string;
}

export const Nav = ({ className }: NavProps) => {
  React.useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector(".nav");
      if (nav && nav instanceof HTMLElement) {
        if (window.scrollY > 40) {
          nav.style.top = "20px";
        } else {
          nav.style.top = "70px";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`nav ${className}`}>
      <div className="left">
        <div className="item">
          <a href={"/"}>Home</a>
        </div>
        <div className="link">Explore</div>

        <div className="dropdown">
          <a href={"/ai"}>Next-AI</a>
          <ChevronDown size={20} />
        </div>
      </div>
      <div className="mid">
        <Image src="./logoNav.svg" alt="Logo" width={30} height={30} />
      </div>
      <div className="right">
        <div className="dropdown"><a href={"/dashboard"}>Dashboard</a></div>
        <div className="button">
          <a href={"/auth/signup"}>Sign Up</a>
        </div>
        <div className="item">
          <MenuIcon />
        </div>
      </div>
    </div>
  );
};
