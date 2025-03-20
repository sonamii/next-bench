"use client";
import React, { useEffect } from "react";
import { ChevronDown, MenuIcon } from "lucide-react";
import "./nav.css";
import Image from "next/image";
import { track } from "@vercel/analytics";
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

  useEffect(() => {
    const updateElements = () => {
      const dashboardElement = document.getElementById("dashboard");
      const signupElement = document.getElementById("signup");

      if (window.innerWidth < 600) {
        if (dashboardElement) {
          dashboardElement.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grid"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>';
        }
        if (signupElement) {
          signupElement.style.padding = "10px 10px";
          signupElement.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" x2="20" y1="8" y2="14" /><line x1="23" x2="17" y1="11" y2="11" /></svg>';
        }
      } else {
        if (dashboardElement) dashboardElement.innerHTML = "Dashboard";
        if (signupElement) signupElement.innerHTML = "Sign Up";
      }
    };

    updateElements();
    window.addEventListener("resize", updateElements);

    return () => {
      window.removeEventListener("resize", updateElements);
    };
  }, [isClient]);

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
        <div
          className="link  dropdown-next"
          onClick={() => (window.location.href = "/explore")}
        >
          Explore
        </div>

        {/* Dropdown for NextAI */}
        <a
          href={"/ai"}
          onClick={() => track("NextAI Click", {}, { flags: ["true"] })}
        >
          {" "}
          <div className="dropdown">
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
          <div className="dropdown" id="dashboard">
            Dashboard
          </div>
        </a>
        {/* Link to Sign Up */}
        <a href={"/auth/signup"}>
          <div className="button" id="signup">
            Sign Up
          </div>
        </a>
        {/* Menu icon */}
        <div className="item">
          <MenuIcon />
        </div>
      </div>
    </div>
  );
};
