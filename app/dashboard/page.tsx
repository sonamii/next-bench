"use client";
import "./page.css";
import Swal from "sweetalert2";
import Image from "next/image";
import { SquareSigmaIcon } from "lucide-react";
import { Nav } from "@/custom-components/nav/nav";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import supabase from "@/services/supabase";
import Avvvatars from "avvvatars-react";

export default function Callback() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [emailID, setEmailID] = useState("");
  const [userID, setUserID] = useState("");
  const [isAdminVerified, setIsAdminVerified] = useState(false);

  useEffect(() => {});
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    const getSessionAndUserID = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const { user } = session;
        setUserID(user.id);
        setEmailID(user.email as string);
      } else {
        toast.error("No active session found");
      }
    };
    getSessionAndUserID();
  }, []);

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("isVerified,type,isLoggedIn")
        .eq("id", userID)
        .single();

      if (error) {
        toast.error("Failed to fetch verification status");
      } else {
        setIsVerified(data.isVerified);
        setIsLoggedIn(data.isLoggedIn);
        toast.success("Successfully fetched verification status");
        if (data.type === "ADMIN") {
          setIsAdminVerified(true);
        }
      }
    };

    if (userID) {
      fetchVerificationStatus();
    }
  }, [userID]);

  useEffect(() => {
    if (isLoggedIn && isVerified) {
      const verifiedContainer = document.getElementById("verifiedContainer");
      const isVerifiedButton = document.getElementById("isVerifiedButton");

      if (verifiedContainer) {
        verifiedContainer.innerHTML = "You are verified";
      }
      if (isVerifiedButton) {
        isVerifiedButton.style.backgroundColor = "#d4edda";
        isVerifiedButton.style.color = "#355734";
        isVerifiedButton.innerHTML = "";
        const infoIcon = document.createElement("div");
        infoIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>`;
        isVerifiedButton.appendChild(infoIcon);
      }
    }
  }, [isVerified, isLoggedIn]);

  async function deleteSessionAndLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      const { error: updateError } = await supabase
        .from("users")
        .update({ isLoggedIn: false, isVerified: false })
        .eq("id", userID);

      if (updateError) {
        toast.error("Failed to update login status");
      } else {
        toast.success("Login status updated");
      }
      toast.success("Successfully logged out");
      Swal.fire({
        icon: "success",
        title: "Logged out",
        text: "You have been successfully logged out.",
        customClass: {
          container: "my-swal-container",
        },
      });

      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 1500);
    }
  }

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
            <Avvvatars value={emailID.split("@")[0] || "🥲"} size={23} />
          </div>
          <div id="verifiedContainer">
            You skipped the callback or are not verified/logged in
          </div>
          <button
            className="buttonM"
            id="isVerifiedButton"
            onClick={() => {
              if (!isVerified) {
                window.location.href = "/auth/callback";
              } else if (!isLoggedIn) {
                window.location.href = "/auth/login";
              } else if (isVerified && isLoggedIn) {
                window.location.href = "#";
              }
            }}
          >
            click to verify
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
          <button
            className="button"
            onClick={() => window.location.assign("/explore")}
          >
            Explore
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

          {isVisible && isAdminVerified && isVerified && (
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
