import React from "react";
import { ChevronDown, MenuIcon } from "lucide-react";
import "./nav.css";
import Image from "next/image";

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
export const Nav = ({ className }: NavProps) => {
  return (
    <div className={`nav ${className}`}>
      {/* Left Section */}
      <div className="left">
        {/* Link to Home */}
        <div className="item">
          <a href={"/"}>Home</a>
        </div>
        {/* Link to Explore */}
        <div className="link">Explore</div>

        {/* Dropdown for NextAI */}
        <div className="dropdown dropdown-next">
          <a href={"/ai"}>NextAI</a>
          {/* ChevronDown icon */}
          <ChevronDown size={20} />
        </div>
      </div>
      {/* Middle Section */}
      <div className="mid">
        {/* Logo linking to homepage */}
        <a href="/">
          <Image src="/logoNav.svg" alt="Logo" width={30} height={30} />
        </a>
      </div>
      {/* Right Section */}
      <div className="right">
        {/* Link to Dashboard */}
        <div className="dropdown">
          <a href={"/dashboard"}>Dashboard</a>
        </div>
        {/* Link to Sign Up */}
        <div className="button">
          <a href={"/auth/signup"}>Sign Up</a>
        </div>
        {/* Menu icon */}
        <div className="item">
          <MenuIcon />
        </div>
      </div>
    </div>
  );
};
