"use client";
import "./page.css";
import Image from "next/image";
import supabase from "@/services/supabase";
import { useEffect } from "react";
import { useState } from "react";
import { Copy, Info } from "lucide-react";
import { toast } from "sonner";

export default function Callback() {
  const [isSessionPresent, setIsSessionPresent] = useState(false);
  const [securityID, setSecurityID] = useState(
    "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx"
  );
  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching session:", error);
      return;
    }

    if (data.session) {
      setIsSessionPresent(true);
      //get user id
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("security_id")
        .eq("id", data.session.user.id)
        .single();
      if (userError) {
        console.error("Error fetching user data:", userError);
        return;
      }
      setSecurityID(userData.security_id);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  const deleteSessionAndLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      return;
    }
    console.log("Signed out successfully");
    // Redirect to login page or home page after logout
    window.location.href = "/auth/login";
    localStorage.setItem("email", "");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(securityID).then(
      () => {
        console.log("Security ID copied to clipboard");
        toast("Copied!", {
          description: `Security ID copied to clipboard`,
          action: { label: "Okay", onClick: () => console.log("Okay") },
        });
        setTimeout(() => {
          toast("Redirecting...", {
            description: `Redirecting in 1.5 seconds`,
            action: { label: "Okay", onClick: () => console.log("Okay") },
          });
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1500);
        }, 1500);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  if (isSessionPresent)
    return (
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        <div className="logo fade-item">
          <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
        </div>{" "}
        <div className="space-xs"></div>
        <div className="textTop fade-item">Callback Successful</div>
        <div className="space-xxs"></div>
        <div className="textBottom fade-item">
          Your authentication callback was successful. You can now proceed to
          the next step.
        </div>
        <div className="space-s"></div>
        <div className="buttonContainer  fade-item">
          {" "}
          <div className="codeBlock  fade-item">
            {securityID}{" "}
            <div className="copyButton" onClick={copyToClipboard}>
              <Copy size={15} />
            </div>
          </div>
          <div className="button" onClick={deleteSessionAndLogout}>
            Logout
          </div>
        </div>
        <div className="space-xs"></div>
        <div className="releaseDate fade-item">
          <Info size={15} style={{ marginRight: "5px" }} /> This is your user
          id, use it to access your account.
        </div>
      </div>
    );
  else
    return (
      <div className="containerMain">
        <div className="logo fade-item">
          <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
        </div>{" "}
        <div className="space-xs"></div>
        <div className="textTop">Callback Unsuccessful</div>
        <div className="space-xxs"></div>
        <div className="textBottom">
          Your authentication callback was not successful.
        </div>
        <div className="space-s"></div>
        <div className="buttonContainer">
          <div
            className="button"
            onClick={() => (window.location.href = "/auth/login")}
          >
            LogIn
          </div>
        </div>
      </div>
    );
}
