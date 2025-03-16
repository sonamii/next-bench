"use client";
import "./page.css";
import Image from "next/image";
import supabase from "@/services/supabase";
import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { toast } from "sonner";
import { useVerificationStore } from "@/store/verificationStore";
import updateIsLoggedIn from "@/services/updateIsLoggedIn";
import returnIsLoggedIn from "@/services/returnIsLoggedIn";

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
  const { setIsVerified } = useVerificationStore();
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Gets the current session from Supabase and checks if it is valid.
   *
   * If the session is valid, it sets the `isSessionPresent` state to true and
   * fetches the user's security ID from the database. The security ID is then
   * stored in the `securityID` state.
   */

  /**
   * Calls getSession() when the component mounts to check if the user has a valid
   * session and fetch their security ID from the database. The effect is run only
   * once when the component mounts, and it is not re-run on subsequent re-renders.
   */

  /**
   * Deletes the current session and logs the user out.
   *
   * This function is called when the user clicks the "Log out" button.
   */
  const deleteSessionAndLogout = async () => {
    updateIsLoggedIn(false);

    // Sign out the user
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      return;
    }
    console.log("Signed out successfully");

    // Redirect to login page or home page after logout
    window.location.href = "/auth/login";
    setIsVerified(false);
    setSecurityID("");
    // Clear the email from local storage
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("email", "");
      localStorage.setItem("security_id", "");
      toast.success("Logged out successfully");
    } else {
      console.error("localStorage is not available");
      toast.error("localStorage is not available");
    }
  };

  /**
   * After 100ms, set the visibility to true.
   *
   * This is done to prevent the page from "jumping" when it is first rendered.
   */
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    const storedSecurityID = localStorage.getItem("security_id");
    if (storedSecurityID) {
      setSecurityID(storedSecurityID);
    }
  }, []);

  useEffect(() => {
    const buttonCopyDown = document.getElementById("copyButtonDown");
    if (buttonCopyDown) {
      buttonCopyDown.addEventListener("click", () => {
        window.location.href = "/security/verify";
      });
    }
    return () => {
      if (buttonCopyDown) {
        buttonCopyDown.removeEventListener("click", () => {
          window.location.href = "/security/verify";
        });
      }
    };
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    returnIsLoggedIn().then((result) => {
      if (result !== null) {
        setIsLoggedIn(result);
      }
    });
  }, []);

  if (securityID && isLoggedIn) {
    return (
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        {/* The logo at the top of the page is a link to the homepage */}
        <button
          onClick={() => (window.location.href = "/")}
          className="logo fade-item"
          style={{ cursor: "pointer" }}
        >
          {/* The logo image is 25x25 pixels */}
          <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
        </button>
        <div className="space-xs"></div>
        {/* The text at the top of the page is the title of the page */}
        <div className="textTop fade-item">Callback Successful</div>
        <div className="space-xxs"></div>
        {/* The text at the bottom of the page is a description of the page */}
        <div className="textBottom fade-item">
          Your authentication callback was successful. You can now proceed to
          the next step.
        </div>
        <div className="space-s"></div>
        {/* The button container holds the code block and the logout button */}
        <div className="buttonContainer  fade-item">
          {/* The code block holds the security ID and the copy button */}
          <div className="codeBlock  fade-item">
            {/* The security ID is a string that is copied to the clipboard */}
            {securityID}{" "}
            {/* The copy button is a button that copies the security ID to the clipboard */}
            <div
              className="copyButton"
              onClick={() => (window.location.href = "/security/verify")}
              onKeyPress={(e) => {
                if (e.key === "" || e.key === "") {
                  window.location.href = "/security/verify";
                }
              }}
            >
              {/* The copy button icon is a Copy icon */}
              Click to verify
            </div>
          </div>
          {/* The logout button is a button that deletes the session and logs the user out */}

          <div className="button" onClick={deleteSessionAndLogout}>
            Logout
          </div>
          <div
            className="copyButtonDown"
            id="copyButtonDown"
            onClick={() => (window.location.href = "/security/verify")}
            onKeyPress={(e) => {
              if (e.key === "" || e.key === "") {
                window.location.href = "/security/verify";
              }
            }}
          >
            {/* The copy button icon is a Copy icon */}
            Click to verify
          </div>
        </div>
        <div className="space-xs"></div>

        {/* The release date is a string that is displayed at the bottom of the page */}
        <div className="releaseDate fade-item">
          {/* The release date icon is an Info icon */}
          <Info size={15} style={{ marginRight: "5px" }} /> Click to verify your
          account.
        </div>
      </div>
    );
  } else
    return (
      <div className="containerMain">
        {/* The logo at the top of the page is a link to the homepage */}
        <div className="logo fade-item">
          {/* The logo image is 25x25 pixels */}
          <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
        </div>
        {/* A space of 5px between the logo and the text. */}
        <div className="space-xs"></div>
        {/* The text at the top of the page is the title of the page */}
        <div className="textTop">Callback Unsuccessful</div>
        {/* A smaller space of 3px between the text and the bottom text. */}
        <div className="space-xxs"></div>
        {/* The text at the bottom of the page is a description of the page */}
        <div className="textBottom">
          Your authentication callback was not successful.
        </div>
        {/* A space of 16px between the bottom text and the button. */}
        <div className="space-s"></div>
        {/* The button container holds the button to log in */}
        <div className="buttonContainer">
          {/* The button is a link to the login page */}
          <div
            className="button"
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
