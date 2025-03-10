"use client";
import { Mail } from "lucide-react";
import "./page.css";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import supabase from "@/services/supabase";
import { toast } from "sonner";
import Link from "next/link";

export default function Waitlist() {
  const [isVisible, setIsVisible] = useState(false);

  const [emailLocal, setEmailLocal] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email") as string;
    setEmailLocal(storedEmail);
  }, []);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const [changedEmail, setChangedEmail] = useState("");

  function changeEmail() {
    if (!changedEmail) {
      toast.error("Please enter a new email address.");
      return;
    }

    supabase.auth
      .updateUser({ email: changedEmail })
      .then(({ error }) => {
        if (error) {
          toast.error("Error updating email: " + error.message);
        } else {
          toast.success(
            "Email updated successfully. Please check your new email for confirmation."
          );
        }
      })
      .catch((error) => {
        toast.error("Unexpected error: " + error.message);
      });
  }

  return (
    <>
      <div className="background"></div>
      <div className="space"></div>
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        <Link href="/">
          <div className="logo fade-item">
            <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
          </div>
        </Link>
        <div className="space-s"></div>
        <div className="textTop fade-item">
          Follow the steps to change your email
        </div>
        <div className="space-xs"></div>
        <div className="textBottom fade-item">
          Enter your new email address below and we&apos;ll send you a link to
          change your email.
        </div>
        <div className="space-s"></div>
        <div className="members fade-item">
          <Image
            src="/logoMain.svg"
            alt="Avatar"
            width={20}
            height={20}
            style={{ borderRadius: "100%", marginRight: "5px" }}
          />
          Status: excellent
        </div>
        <div className="space-xs"></div>
        <form
          className="inputContainer fade-item"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            type="email"
            placeholder={emailLocal}
            readOnly
            required
            className="input-placeholder"
          />
          <Input
            type="email"
            placeholder="Enter your new email"
            value={changedEmail}
            onChange={(e) => setChangedEmail(e.target.value)}
          />
          <Button onClick={changeEmail}>Change email</Button>
        </form>
        <div className="space-xs"></div>
        <div className="releaseDate fade-item">
          <Mail size={15} style={{ marginRight: "5px" }} /> Please confirm your
          new email
        </div>
      </div>
    </>
  );
}
