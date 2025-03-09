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

export default function Callback() {
  const [email, setEmail] = useState("");
  const [securityId, setSecurityId] = useState("");
  const [uidDatabase, setUidDatabase] = useState("");
  const { isVerified, setIsVerified } = useVerificationStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  let emailLocalStorage = "";
  useEffect(() => {
    emailLocalStorage = localStorage.getItem("email") as string;
  }, []);

  const [isVerificationSuccessDone, setIsVerificationSuccessDone] =
    useState(false);
  //! ALWAYS KEEP THIS PAGE OPEN FOR ADMINS (MAY REMOVE)

  useEffect(() => {
    if (!emailLocalStorage) {
      toast("No Session Found", {
        description: `Login to continue`,
        action: {
          label: "Login",
          onClick: () => (window.location.href = "/auth/login"),
        },
      });
    } else {
      if (isVerified && !isVerificationSuccessDone) {
        toast("Account Verified", {
          description: `You are already verified as ${emailLocalStorage} `,
          action: {
            label: "Dashboard",
            onClick: () => (window.location.href = "/dashboard"),
          },
        });
        setIsVerificationSuccessDone(true);
      }
    }
  }, [isVerified]);

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

  const handleSecurityCheck = async () => {
    console.log("Security id:", securityId);
    console.log("Email:", email);

    if (email && securityId) {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("security_id", securityId)
        .eq("email", email)
        .single();

      if (error) {
        toast.error("Invalid securityID or email");
      } else {
        if (uidDatabase === data.id) {
          if (data.id == process.env.ADMIN_UID) {
            setIsVerified(true);
            toast("Admin Verified", {
              description: `Redirecting to admin dashboard in 1.5 seconds`,
              action: { label: "Roger!", onClick: () => console.log("Okay") },
            });

            setTimeout(() => {
              window.location.href = "/admin/dashboard";
            }, 2500);
          } else {
            setIsVerified(true);
            toast("Admin Verified", {
              description: `Redirecting in 1.5 seconds`,
              action: { label: "Okay", onClick: () => console.log("Okay") },
            });

            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 1500);
          }
        } else if (data.id == process.env.ADMIN_UID) {
          setIsVerified(true);
          toast("Admin Verified", {
            description: `Redirecting to admin dashboard in 1.5 seconds`,
            action: { label: "Roger!", onClick: () => console.log("Okay") },
          });

          setTimeout(() => {
            window.location.href = "/admin/dashboard";
          }, 2500);
        } else {
          toast.error("Invalid securityID or email");
        }
      }
    }
  };
  return (
    <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
      {" "}
      <div className="logo fade-item">
        <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
      </div>{" "}
      <div className="space-xs"></div>
      <div className="textTop fade-item">Security Check</div>
      <div className="space-xxs"></div>
      <div className="textBottom fade-item">
        We have to perform security check to prevent bots from accessing your
        account.
      </div>
      <div className="space-s"></div>
      <div className="inputContainer fade-item">
        {" "}
        <Input
          type="email"
          className="input fade-item"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <Input
          type="text"
          className="input fade-item"
          placeholder="Enter your securityID"
          onChange={(e) => setSecurityId(e.target.value)}
          value={securityId}
          required
        />
        <div className="buttonContainer">
          {" "}
          <div className="button" onClick={handleSecurityCheck}>
            Check
          </div>
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
      <div className="space-xs"></div>
      <div className="releaseDate fade-item">
        <CheckCircle2Icon size={15} style={{ marginRight: "5px" }} /> Complete
        this one-time security check.
      </div>
    </div>
  );
}
