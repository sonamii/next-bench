"use client";
import "./page.css";
import Image from "next/image";
import Swal from "sweetalert2";
import supabase from "@/services/supabase";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { toast } from "sonner";

/**
 * The Callback component is a client-side only page that is used to handle
 * the authentication callback from the supabase auth provider.
 *
 * It will check if the user has a valid session and if so, it will display the
 * security ID of the user and a button to copy it to the clipboard. It will
 * also display a button to logout.
 *
 * If the user does not have a valid session, it will display a message
 * indicating that the callback was unsuccessful and a button to login.
 */
export default function Callback() {
  const [securityID, setSecurityID] = useState(
    "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userID, setUserID] = useState("");
  const [emailID, setEmailID] = useState("");

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
    const fetchSecurityID = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("security_id")
        .eq("id", userID)
        .single();
      if (data) {
        setSecurityID(data.security_id);
        setIsVisible(true);
        setIsLoggedIn(true);
        toast.success("Successfully fetched security ID and email");
      } else if (error) {
        toast.error("Failed to fetch security ID and email");
        console.log(securityID);
        console.log(userID);
      }
    };
    if (userID) {
      fetchSecurityID();
    }
  }, [userID, securityID]);

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
        window.location.href = "/auth/login";
      }, 1500);
    }
  }

  async function updateIsVerified() {
    const { error: updateError } = await supabase
      .from("users")
      .update({ isVerified: true })
      .eq("id", userID);

    if (updateError) {
      toast.error("Failed to update verification status");
    } else {
      toast.success("Verification status updated");
      Swal.fire({
        icon: "success",
        title: "Verified",
        text: "Your account has been successfully verified",
        customClass: {
          container: "my-swal-container",
        },
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    }
  }

  useEffect(() => {
    const checkGoogleLogin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const { user } = session;
        if (user.app_metadata.providers.includes("google")) {
          const { error: updateError } = await supabase
            .from("users")
            .update({ isVerified: true, isLoggedIn: true })
            .eq("id", userID);

          if (updateError) {
            toast.error("Failed to update verification and login status");
          } else {
            toast.success("Authenticated with Google");
          }
        }
      }
    };
    checkGoogleLogin();
  }, [userID]);

  if (isLoggedIn && isVisible) {
    return (
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        <button
          onClick={() => (window.location.href = "/")}
          className="logo fade-item"
          style={{ cursor: "pointer" }}
        >
          <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
        </button>
        <div className="space-xs"></div>
        <div className="textTop fade-item">Callback Successful</div>
        <div className="space-xxs"></div>
        <div className="textBottom fade-item">
          Your authentication callback was successful. You can now proceed to
          the next step.
        </div>
        <div className="space-s"></div>
        <div className="buttonContainer  fade-item">
          <div className="codeBlock  fade-item">
            {emailID}{" "}
            <button className="copyButton" disabled>
              Current email
            </button>
          </div>
          <div className="codeBlock  fade-item">
            {securityID}{" "}
            <div
              className="copyButton"
              onClick={updateIsVerified}
              onKeyPress={(e) => {
                if (e.key === "" || e.key === "") {
                  updateIsVerified();
                }
              }}
            >
              Click to verify
            </div>
          </div>

          <div className="button fade-item" onClick={deleteSessionAndLogout}>
            Logout
          </div>
          <div
            className="copyButtonDown"
            id="copyButtonDown"
            onClick={updateIsVerified}
            onKeyPress={(e) => {
              if (e.key === "" || e.key === "") {
                updateIsVerified();
              }
            }}
          >
            Click to verify
          </div>
        </div>
        <div className="space-xs"></div>

        <div className="releaseDate fade-item">
          <Info size={15} style={{ marginRight: "5px" }} /> Click to verify your
          account.
        </div>
      </div>
    );
  } else
    return (
      <div className="containerMain">
        <div className="logo fade-item">
          <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
        </div>
        <div className="space-xs"></div>
        <div className="textTop fade-item">Callback Unsuccessful</div>
        <div className="space-xxs"></div>
        <div className="textBottom fade-item">
          Your authentication callback was not successful.
          <br />
          <br />
        </div>
        <div className="space-s"></div>
        <div className="buttonContainer fade-item">
          <div
            className="button fade-item"
            onClick={() => (window.location.href = "/auth/login")}
            onKeyPress={(e) => {
              if (e.key === "" || e.key === "") {
                window.location.href = "/auth/login";
              }
            }}
          >
            LogIn
          </div>
        </div>
      </div>
    );
}
