"use client";
import React from "react";
import { ChevronDown, MenuIcon } from "lucide-react";
import "./nav.css";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { useAdminVerificationStore } from "@/store/adminVerificationStore";
/**
 * Props for the Nav component.
 *
 * @property {string} [className] - The class name to apply to the root element.
 */
interface NavProps {
  className?: string;
}

/**
 * Nav component renders the navigation bar with links to various sections of the website.
 *
 * @param {NavProps} props - Props containing an optional className to apply custom styles.
 *
 * Structure:
 * - Left Section: Contains links to "Home", "Explore", and a dropdown for "NextAI".
 * - Middle Section: Contains a logo linking to the homepage.
 * - Right Section: Contains links to "Dashboard", "Sign Up", and a menu icon.
 */
export const Nav = ({ className = "" }: NavProps) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={`nav ${className}`}>
      {/* Left Section */}
      <div className="left">
        {/* Link to Home */}
        <a href={"/"}>
          {" "}
          <div className="item">Home</div>
        </a>
        {/* Link to Explore */}
        <div className="link">Explore</div>

        {/* Dropdown for NextAI */}
        <a
          href={"/ai"}
          onClick={() => track("NextAI Click", {}, { flags: ["true"] })}
        >
          {" "}
          <div className="dropdown dropdown-next">
            NextAI
            {/* ChevronDown icon */}
            <ChevronDown size={20} />
          </div>{" "}
        </a>
      </div>
      {/* Middle Section */}
      <a href="/">
        <div className="mid">
          {/* Logo linking to homepage */}
          <Image src="/logoNav.svg" alt="Logo" width={30} height={30} />
        </div>{" "}
      </a>

      {/* Right Section */}
      <div className="right">
        {/* Link to Dashboard */}
        <a href={"/dashboard"}>
          {" "}
          <div className="dropdown">Dashboard</div>
        </a>
        {/* Link to Sign Up */}
        <a href={"/auth/signup"}>
          <div className="button">Sign Up</div>
        </a>
        {/* Menu icon */}
        <div className="item">
          <MenuIcon />
        </div>
      </div>
    </div>
  );
};
