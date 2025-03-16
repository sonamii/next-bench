"use client";
import "./page.css";
import Image from "next/image";
import supabase from "@/services/supabase";
import { useEffect } from "react";
import { useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useVerificationStore } from "@/store/verificationStore";
import { useAdminVerificationStore } from "@/store/adminVerificationStore";
import returnIsLoggedIn from "@/services/returnIsLoggedIn";

/**
 * Security Verification Callback Component
 *
 * This component handles the security verification process for users.
 * It verifies if the user's email and security ID match the records in
 * the database. Based on the verification results, it redirects users
 * to different dashboards.
 */
export default function Callback() {
  // State hooks for email, security ID, user ID from database, verification status, and visibility
  const [email, setEmail] = useState("");
  const [securityId, setSecurityId] = useState(
    "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  );
  const [uidDatabase, setUidDatabase] = useState("");
  const { isVerified, setIsVerified } = useVerificationStore();
  const { setIsAdminVerified } = useAdminVerificationStore();

  const [isVisible, setIsVisible] = useState(false);
  const [isVerificationSuccessDone, setIsVerificationSuccessDone] =
    useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    returnIsLoggedIn().then((result) => {
      if (result !== null) {
        setIsLoggedIn(result);
      }
    });
  }, []); // Only run once on mount

  useEffect(() => {
    if (isLoggedIn === null) return; // Ensure it only runs when isLoggedIn is fully set

    if (isLoggedIn) {
      if (typeof window !== "undefined") {
        const securityIdLocalStorage = localStorage.getItem(
          "security_id"
        ) as string;
        if (securityIdLocalStorage) {
          setSecurityId(securityIdLocalStorage);
        }
      }
    }
  }, [isLoggedIn]);

  // Effect to set visibility after 100ms for fade-in animation
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("security_id") === "") {
      toast("No Session Found", {
        description: `Login first`,
        action: {
          label: "Login",
          onClick: () => (window.location.href = "/auth/login"),
        },
      });
    } else {
      if (isVerified) {
        alert(
          `You are already verified as ${localStorage.getItem(
        "email"
          )}. Redirecting to dashboard...`
        );
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 200);
        setIsVerificationSuccessDone(true);
        console.log(isVerificationSuccessDone);
      }
        alert(
          `You are already verified as ${localStorage.getItem(
            "email"
          )}. Redirecting to dashboard...`
        );
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 200);
        setIsVerificationSuccessDone(true);
        console.log(isVerificationSuccessDone);
      }
    } ,[]);

  // Effect to get user ID from session
  /**
   * This effect is used to get the user ID from the session.
   * If the session is valid, the user ID is stored in the `uidDatabase` state.
   * If the session is invalid, an error message is logged to the console.
   */
  useEffect(() => {
    const getUserIdFromSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      } else {
        if (data.session) {
          setUidDatabase(data.session.user.id);
        }
      }
    };

    getUserIdFromSession();
  }, []);

  // Function to handle security check
  /**
   * Function to handle security check.
   * @param {React.MouseEvent<HTMLDivElement>} e The click event.
   */
  const handleSecurityCheck = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    console.log("Security id:", securityId);
    console.log("Email:", email);

    if (!email || !securityId) return;

    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, type")
        .eq("security_id", securityId)
        .eq("email", email)
        .single();

      if (error) {
        toast.error("Invalid securityID or email");
        return;
      }

      if (data.id === process.env.NEXT_PUBLIC_ADMIN_UID) {
        handleAdminVerification();
      } else {
        handleUserVerification(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdminVerification = () => {
    setIsVerified(true);
    setIsAdminVerified(true);
    toast("Admin Verified", {
      description: `Redirecting to admin dashboard in 1.5 seconds`,
      action: { label: "Roger!", onClick: () => console.log("Okay") },
    });
    setTimeout(() => {
      window.location.href = "/admin/dashboard";
    }, 2500);
  };

  const handleUserVerification = (data: { id: string; type: string }) => {
    if (uidDatabase === data.id && data.type) {
      setIsVerified(true);
      if (data.type === "ADMIN") {
        setIsAdminVerified(true);
      }
      toast("Account Verified", {
        description: `Redirecting in 1.5 seconds`,
        action: { label: "Okay", onClick: () => console.log("Okay") },
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } else {
      toast.error("Invalid securityID or email");
    }
  };

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
          value={securityId}
          readOnly
        />
        <Input
          type="email"
          className="input fade-item"
          placeholder="Enter your email/admin id or LOGIN "
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          spellCheck="false"
        />

        {/* Button container */}
        <div className="buttonContainer">
          {/* Check button */}
          <div className="button" onClick={handleSecurityCheck}  onKeyPress={(e) => {
                if (e.key === "" || e.key === "") {
                  window.location.href = "/security/verify";
                }
              }}>
            Check
          </div>
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
