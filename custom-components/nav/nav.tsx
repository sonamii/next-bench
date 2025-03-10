import React from "react";
import { ChevronDown, MenuIcon } from "lucide-react";
import "./nav.css";
import Image from "next/image";

interface NavProps {
  className?: string;
}

export const Nav = ({ className }: NavProps) => {
  return (
    <div className={`nav ${className}`}>
      <div className="left">
        <div className="item">
          <a href={"/"}>Home</a>
        </div>
        <div className="link">Explore</div>

        <div className="dropdown dropdown-next">
          <a href={"/ai"}>NextAI</a>
          <ChevronDown size={20} />
        </div>
      </div>
      <div className="mid">
        <a href="/">
          <Image src="/logoNav.svg" alt="Logo" width={30} height={30} />
        </a>
      </div>
      <div className="right">
        <div className="dropdown">
          <a href={"/dashboard"}>Dashboard</a>
        </div>
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
