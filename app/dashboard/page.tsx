"use client";
import "./page.css";
import Image from "next/image";
import { Info } from "lucide-react";
import { useVerificationStore } from "@/store/verificationStore";
import { Nav } from "@/custom-components/nav/nav";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect } from "react";
import { useState } from "react";
/**
 * The main dashboard page.
 *
 * This page is the main dashboard for users.
 *
 * @returns The dashboard page.
 */
export default function Callback() {
  const { isVerified } = useVerificationStore();
  const [emailLocal, setEmailLocal] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);
  // Set the emailLocal state to the value of the email in local storage.
  useEffect(() => {
    setEmailLocal(localStorage.getItem("email") || "");
  }, []);

  // If the user is not verified, redirect them to the verification page.
  useEffect(() => {
    if (!isVerified) {
      // Show a toast message and redirect in 3 seconds.
      toast("Account not verified", {
        description: `Redirecting in 2 seconds`,
        action: {
          label: "Login",
          onClick: () => (window.location.href = "/auth/login"),
        },
      });

      setTimeout(() => {
        window.location.href = "/security/verify";
      }, 1700);
    }
  }, [isVerified]);

  return (
    <>
      {/* The navigation bar at the top of the page. */}
      <Nav></Nav>
      {/* The main container for the page. */}
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        {/* The logo of the application. */}
        <div className="logo fade-item">
          <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
        </div>
        {/* A space of 5px between the logo and the text. */}
        <div className="space-xs"></div>
        {/* The main text of the page. */}
        <div className="textTop fade-item">Dashboard</div>
        {/* A smaller space of 3px between the text and the bottom text. */}
        <div className="space-xxs"></div>
        {/* The bottom text of the page. */}
        <div className="textBottom fade-item">{emailLocal}</div>
        {/* A space of 5px between the bottom text and the button. */}
        <div className="space-xxs"></div>
        {/* The button to go back to the homepage. */}
        <div className="buttonContainer fade-item">
          {/* The button element itself. */}
            <Link href={"/"} onClick={() => window.location.assign("/")}>
            {/* The button text. */}
            <div className="button">Home</div>
            </Link>
        </div>
        {/* A space of 10px between the button and the release date. */}
        <div className="space-s"></div>
        {/* The release date of the application. */}
        <div className="releaseDate fade-item">
          {/* The info icon. */}
          <Info size={15} style={{ marginRight: "5px" }} />
          {/* The text of the release date. */}
          This is the dashboard for users.
        </div>
      </div>
    </>
  );
}
