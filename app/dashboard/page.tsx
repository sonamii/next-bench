"use client";
import "./page.css";
import Image from "next/image";
import { ArrowRight, SquareSigmaIcon } from "lucide-react";
import { useVerificationStore } from "@/store/verificationStore";
import { Nav } from "@/custom-components/nav/nav";
import { toast } from "sonner";
import { useEffect } from "react";
import { useState } from "react";
import supabase from "@/services/supabase";
import Avvvatars from "avvvatars-react";
import { useAdminVerificationStore } from "@/store/adminVerificationStore";
import updateIsLoggedIn from "@/services/updateIsLoggedIn";

/**
 * The main dashboard page.
 *
 * This page is the main dashboard for users.
 *
 * @returns The dashboard page.
 */
export default function Callback() {
  const { isVerified, setIsVerified } = useVerificationStore();
  const { isAdminVerified, setIsAdminVerified } = useAdminVerificationStore();
  const [isVisible, setIsVisible] = useState(false);
  const [emailLocal, setEmailLocal] = useState("");

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);
  // Set the emailLocal state to the value of the email in local storage.
  useEffect(() => {
    setEmailLocal(localStorage.getItem("email") || "");
  }, []);

  // If the user is not verified, redirect them to the verification page.
  useEffect(() => {
    const isVerifiedButton = document.getElementById("isVerifiedButton");
    const verifiedContainer = document.getElementById("verifiedContainer");

    if (!isVerified) {
      // Show a toast message and redirect in 3 seconds.
      toast("Account not verified", {
        description: `Verify now`,
        action: {
          label: "Verify",
          onClick: () => (window.location.href = "/security/verify"),
        },
      });

      if (isVerifiedButton) {
        isVerifiedButton.style.display = "flex";
      }
      isVerifiedButton?.addEventListener("click", () => {
        window.location.href = "/security/verify";
      });
      // setTimeout(() => {
      //   window.location.href = "/security/verify";
      // }, 1700);
    } else {
      toast("Account verified", {
        description: `Verification successful`,
        action: {
          label: "Okay",
          onClick: () => console.log("Okay"),
        },
      });
      if (isVerifiedButton && verifiedContainer) {
        verifiedContainer.innerHTML = "You are verified";
        isVerifiedButton.style.backgroundColor = "#d4edda";
        isVerifiedButton.style.color = "#355734";
        isVerifiedButton.innerHTML = "";
        const infoIcon = document.createElement("div");
        infoIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>`;
        isVerifiedButton.appendChild(infoIcon);
      }
    }
  }, [isVerified]);

  const deleteSessionAndLogout = async () => {
    updateIsLoggedIn(false);

    // Sign out the user
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      return;
    }
    console.log("Signed out successfully");

    window.location.href = "/auth/login";
    // Clear the email from local storage
    localStorage.setItem("email", "");
    localStorage.setItem("security_id", "");
    setIsVerified(false);
    setIsAdminVerified(false);
  };

  return (
    <>
      {/* The navigation bar at the top of the page. */}
      <Nav />
      {/* The main container for the page. */}
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        <button
          style={{ cursor: "pointer" }}
          className="logo fade-item"
          onClick={() => (window.location.href = "/")}
        >
          <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
        </button>
        <div className="space-xs"></div>
        <div className="textTop fade-item">Dashboard</div>
        <div className="space-xxs"></div>
        <div className="members fade-item">
          <div className="pfp" style={{ marginTop: "1px" }}>
            {" "}
            <Avvvatars value={emailLocal.split("@")[0] || ""} size={23} />
          </div>
          <div id="verifiedContainer">You are not verified</div>
          <button className="buttonM" id="isVerifiedButton">
            <ArrowRight size={14} />
          </button>
        </div>
        <div className="space-xxs"></div>
        <div className="space-xxs"></div>
        <div className="buttonContainer fade-item">
          <button
            className="button "
            onClick={() => window.location.assign("/")}
          >
            Home
          </button>
          {isVerified && (
            <button className="button  " onClick={deleteSessionAndLogout}>
              Logout
            </button>
          )}
          <button
            className="buttonS"
            onClick={() => window.location.assign("/ai")}
          >
            Try NextAI
          </button>

          {isVisible && isAdminVerified && (
            <button
              className="buttonA"
              onClick={() => (window.location.href = "/admin/dashboard")}
            >
              Admin Dashboard
            </button>
          )}
        </div>
        <div className="space-xs"></div>
        {/* <div className="textBottom fade-item">{emailLocal}</div> */}

        <div className="releaseDate fade-item">
          <SquareSigmaIcon size={15} style={{ marginRight: "5px" }} />
          User dashboard
        </div>
      </div>
    </>
  );
}
