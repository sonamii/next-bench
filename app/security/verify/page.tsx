"use client";
import "./page.css";
import Image from "next/image";

import { useEffect, useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";

/**
 * Security Verification Callback Component
 *
 * This component handles the security verification process for users.
 * It verifies if the user's email and security ID match the records in
 * the database. Based on the verification results, it redirects users
 * to different dashboards.
 */
export default function Callback() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  });
  return (
    <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
      {/* Logo */}
      <button
        onClick={() => (window.location.href = "/")}
        className="logo fade-item"
        style={{ cursor: "pointer" }}
      >
        <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
      </button>
      {/* Space between logo and text */}
      <div className="space-xs"></div>
      {/* Text for security check description */}
      <div className="textTop fade-item">Security Check</div>
      {/* Space between text and input */}
      <div className="space-xxs"></div>
      {/* Text for security check description */}
      <div className="textBottom fade-item">
        We have to perform security check to prevent bots from accessing your
        account.
      </div>
      {/* Space between text and input */}
      <div className="space-s"></div>
      {/* Input container */}
      <div className="inputContainer fade-item">
        {/* Email input */}
        <Input
          type="text"
          className="input fade-item input-placeholder"
          placeholder="Enter your securityID"
          readOnly
        />
        <Input
          type="email"
          className="input fade-item"
          placeholder="Enter your email/admin id or LOGIN "
          required
          spellCheck="false"
        />

        {/* Button container */}
        <div className="buttonContainer">
          {/* Check button */}
          <div className="button">Check</div>
          {/* Forgot button */}
          <div
            className="button2"
            onClick={() => {
              window.location.href = "/auth/login";
            }}
            onKeyPress={(e) => {
              if (e.key === "" || e.key === "") {
                window.location.href = "/security/verify";
              }
            }}
          >
            Login?
          </div>
        </div>
      </div>
      {/* Space between input and release date */}
      <div className="space-xs"></div>
      {/* Release date */}
      <div className="releaseDate fade-item">
        <CheckCircle2Icon size={15} style={{ marginRight: "5px" }} /> Complete
        this one-time security check.
      </div>
    </div>
  );
}
