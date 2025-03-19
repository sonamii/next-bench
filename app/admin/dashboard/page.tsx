"use client";
import "./page.css";
import Image from "next/image";
import Swal from "sweetalert2";
import { AppWindowMacIcon, ArrowRight, X } from "lucide-react";
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
        if (data.type === "ADMIN") {
          setIsAdminVerified(true);
        }
        toast.success("Successfully fetched verification status");
      }
    };
    if (userID) {
      fetchVerificationStatus();
    }
  }, [userID]);

  useEffect(() => {
    if (isVerified && isLoggedIn) {
      const verifiedContainer = document.getElementById("verifiedContainer");
      const isVerifiedButton = document.getElementById("isVerifiedButton");

      if (verifiedContainer && isVerifiedButton) {
        verifiedContainer.innerHTML = "You are verified as admin";
        isVerifiedButton.style.backgroundColor = "#d4edda";
        isVerifiedButton.style.color = "#355734";
        isVerifiedButton.innerHTML = "";
        const infoIcon = document.createElement("div");
        infoIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>`;
        isVerifiedButton.appendChild(infoIcon);
      }
    }
  }, [isVerified, isLoggedIn]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

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
      Swal.fire({
        icon: "success",
        title: "Logged out",
        text: "You have been successfully logged out",
        customClass: {
          container: "my-swal-container",
        },
      });

      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1500);
    }
  }

  async function showUserDataAsTable() {
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

  if (isAdminVerified && isLoggedIn && isVerified) {
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
            <div className="textTop fade-item">Admin Dashboard</div>
            <div className="space-xxs"></div>
            <div className="members fade-item">
              <div className="pfp" style={{ marginTop: "1px" }}>
                {" "}
                <Avvvatars value={emailID} size={23} />
              </div>
              <div id="verifiedContainer">
                You skipped the callback or are not verified
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
              <button className="button  " onClick={deleteSessionAndLogout}>
                Logout
              </button>
              <button className="buttonA" onClick={showUserDataAsTable}>
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
        <Nav />
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
              <Avvvatars value={emailID.split("@")[0] || ""} size={23} />
            </div>
            <div id="verifiedContainer">You are not verified as admin</div>
            <button
              className="buttonM"
              id="isVerifiedButton"
              style={{ paddingInline: "0px !important" }}
            >
              admin? click to verify
            </button>
          </div>
          <div className="space-xs"></div>
          <div className="buttonContainer fade-item">
            <button
              className="button "
              onClick={() => window.location.assign("/")}
            >
              Home
            </button>
          </div>
          <div className="space-xxs"></div>
          <div className="space-xxs"></div>

          <div className="releaseDate fade-item">
            😏 Why do you want to see the admin dashboard?
          </div>
        </div>
      </>
    );
  }
}
