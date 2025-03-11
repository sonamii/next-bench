"use client";
import "./page.css";
import Image from "next/image";
import { AppWindowMacIcon, ArrowRight } from "lucide-react";
import { useVerificationStore } from "@/store/verificationStore";
import { Nav } from "@/custom-components/nav/nav";
import { toast } from "sonner";
import { useEffect } from "react";
import { useState } from "react";
import supabase from "@/services/supabase";
import Avvvatars from "avvvatars-react";
import { useAdminVerificationStore } from "@/store/adminVerificationStore";
/**
 * The main dashboard page.
 *
 * This page is the main dashboard for users.
 *
 * @returns The dashboard page.
 */
export default function Callback() {
  const { isVerified, setIsVerified } = useVerificationStore();
  const [emailLocal, setEmailLocal] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { isAdminVerified } = useAdminVerificationStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  useEffect(() => {
    setEmailLocal(localStorage.getItem("email") || "");
  }, []);

  useEffect(() => {
    const isVerifiedButton = document.getElementById("isVerifiedButton");
    const verifiedContainer = document.getElementById("verifiedContainer");
    if (!isVerified) {
      // Show a toast message and redirect in 3 seconds.
      toast("Admin not verified", {
        description: `Verify now as admin`,
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
    } else {
      if (isAdminVerified) {
        if (!document.getElementById("verification-toast")) {
          toast("Account verified", {
            description: `Verification successful as admin`,
            action: {
              label: "Welcome",
              onClick: () => console.log("Welcome"),
            },
            id: "verification-toast",
          });
        }
      }
      if (isVerifiedButton && verifiedContainer) {
        verifiedContainer.innerHTML = "You are verified as admin";
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
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      return;
    }
    console.log("Signed out successfully");
    localStorage.setItem("email", "");
    localStorage.setItem("security_id", "");
    setIsVerified(false);
    window.location.href = "/auth/login";
  };

  async function showUserData() {
    const { data, error } = await supabase
      .from("users")
      .select("type, name, email")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching user data:", error);
      return;
    }

    const userDataTable = document.getElementById("UserDataTable");
    if (userDataTable) {
      const table = document.createElement("table");
      table.style.borderCollapse = "collapse";
      table.style.width = "100%";

      const headerRow = document.createElement("tr");
      ["Type", "Name", "Email"].forEach((headerText) => {
        const headerCell = document.createElement("th");
        headerCell.innerText = headerText;
        headerCell.style.border = "1px solid black";
        headerCell.style.padding = "8px";
        headerRow.appendChild(headerCell);
      });
      table.appendChild(headerRow);

      data.forEach((user: { type: string; name: string; email: string }) => {
        const row = document.createElement("tr");
        (["type", "name", "email"] as const).forEach((key) => {
          const cell = document.createElement("td");
          cell.innerText = user[key];
          cell.style.border = "1px solid black";
          cell.style.padding = "8px";
          row.appendChild(cell);
        });
        table.appendChild(row);
      });

      userDataTable.innerHTML = "";
      (
        document.querySelector(".containerMain") as HTMLElement
      ).style.paddingTop = "150px";
      userDataTable.style.marginTop = "50px";
      userDataTable.style.display = "block";
      userDataTable.appendChild(table);
      adjustTableHeight();
      window.addEventListener("resize", adjustTableHeight);
    }
  }

  function adjustTableHeight() {
    const container = document.getElementById("userDataTable");
    if (container) {
      const windowHeight = window.innerHeight;
      const topOffset = container.getBoundingClientRect().top;
      const availableHeight = windowHeight - topOffset - 20; // 20px for margin/padding
      container.style.maxHeight = availableHeight + "px";
    }
  }

  if (typeof window === "undefined") {
    return null;
  }

  if (isAdminVerified) {
    return (
      <>
        {/* The navigation bar at the top of the page. */}
        <Nav />
        {/* The main container for the page. */}
        <div className={`containerMain${isVisible ? " fade-in" : ""}`}>
          <div className="dashDetails">
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
                <Avvvatars value={emailLocal} size={23} />
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
              <button className="button  " onClick={deleteSessionAndLogout}>
                Logout
              </button>
              <button className="buttonA" onClick={showUserData}>
                View data analysis
              </button>
            </div>
            <div className="space-xs"></div>
            {/* <div className="textBottom fade-item">{emailLocal}</div> */}

            <div className="releaseDate fade-item">
              <AppWindowMacIcon size={15} style={{ marginRight: "5px" }} />
              Admin dashboard
            </div>
          </div>
          <div id="UserDataTable"></div>
        </div>
      </>
    );
  } else if (isVisible) {
    return (
      <>
        {" "}
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
          <div className="textTop fade-item">
            Authorization as admin unsuccessful
          </div>
          <div className="space-xxs"></div>
          <div className="members fade-item">
            <div className="pfp" style={{ marginTop: "1px" }}>
              {" "}
              <Avvvatars value={emailLocal.split("@")[0] || "U"} size={23} />
            </div>
            <div id="verifiedContainer">You are not verified</div>
            <button className="buttonM" id="isVerifiedButton">
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-xxs"></div>
          <div className="space-xxs"></div>

          <div className="releaseDate fade-item">
            <AppWindowMacIcon size={15} style={{ marginRight: "5px" }} />
            Admin dashboard
          </div>
        </div>
      </>
    );
  }
}
