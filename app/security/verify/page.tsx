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
import Link from "next/link";

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
  const [isVisible, setIsVisible] = useState(false);
  const [isVerificationSuccessDone, setIsVerificationSuccessDone] =
    useState(false);

  // Retrieve security ID from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const securityIdLocalStorage = localStorage.getItem(
        "security_id"
      ) as string;
      if (securityIdLocalStorage) {
        setSecurityId(securityIdLocalStorage);
      }
    }
  }, []);

  // Effect to set visibility after 100ms for fade-in animation
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Retrieve email from localStorage
  let emailLocalStorage = "";
  useEffect(() => {
    emailLocalStorage = localStorage.getItem("email") as string;
  }, []);

  //! ALWAYS KEEP THIS PAGE OPEN FOR ADMINS (MAY REMOVE)

  // Effect to handle session check and verification status
  useEffect(() => {
    if (!emailLocalStorage) {
      toast("No Session Found", {
        description: `Redirecting in 1.5 seconds`,
        action: {
          label: "Login",
          onClick: () => (window.location.href = "/auth/login"),
        },
      });
    } else {
      if (isVerified && !isVerificationSuccessDone) {
        toast("You are already verified as", {
          description: `${emailLocalStorage}`,
          action: {
            label: "Dashboard",
            onClick: () => (window.location.href = "/dashboard"),
          },
        });
        setIsVerificationSuccessDone(true);
      }
    }
  }, [isVerified]);

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

    // Check if the user has entered both the security id and email
    if (email && securityId) {
      try {
        // Fetch the user's id from the database using the security id and email
        const { data, error } = await supabase
          .from("users")
          .select("id")
          .eq("security_id", securityId)
          .eq("email", email)
          .single();

        // Check if there is an error
        if (error) {
          // Display an error message to the user
          toast.error("Invalid securityID or email");
        } else {
          // Check if the user is an admin
          if (data.id == process.env.NEXT_PUBLIC_ADMIN_UID) {
            // Set the isVerified state to true
            setIsVerified(true);
            // Display a success message to the user
            toast("Admin Verified", {
              description: `Redirecting to admin dashboard in 1.5 seconds`,
              action: { label: "Roger!", onClick: () => console.log("Okay") },
            });

            // Redirect the user to the admin dashboard
            setTimeout(() => {
              window.location.href = "/admin/dashboard";
            }, 2500);
          } else {
            // Check if the user is the same as the one in the database
            if (uidDatabase === data.id) {
              // Set the isVerified state to true
              setIsVerified(true);
              // Display a success message to the user
              toast("Admin Verified", {
                description: `Redirecting in 1.5 seconds`,
                action: { label: "Okay", onClick: () => console.log("Okay") },
              });

              // Redirect the user to the dashboard
              setTimeout(() => {
                window.location.href = "/dashboard";
              }, 1500);
            } else {
              // Display an error message to the user
              toast.error("Invalid securityID or email");
            }
          }
        }
      } catch (error) {
        // Log any errors to the console
        console.error(error);
      }
    }
  };

  return (
    <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
      {/* Logo */}
      <Link href={"/"}>
        <div className="logo fade-item">
          <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
        </div>
      </Link>
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
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        {/* Security ID input */}

        {/* Button container */}
        <div className="buttonContainer">
          {/* Check button */}
          <div className="button" onClick={handleSecurityCheck}>
            Check
          </div>
          {/* Forgot button */}
          <div
            className="button2"
            onClick={() => {
              window.location.href = "/auth/callback";
            }}
          >
            Forgot?
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
