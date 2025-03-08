"use client";
import { Github, Info, Instagram } from "lucide-react";
import "./page.css";
import Image from "next/image";
import { Nav } from "@/custom-components/nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function Waitlist() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const [userEmail, setUserEmail] = useState("");

  async function sendEmail() {
    if (!userEmail.trim()) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast("Email sent to the host", {
          description: "You will be notified soon.",
          action: {
            label: "Okay",
            onClick: () => console.log("Okay"),
          },
        });
        setUserEmail(""); // Clear input after successful submission
      } else {
        toast.error(`Error: ${result.error || "Failed to send email."}`);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className="background"></div>
      <Nav />
      <div className="space"></div>
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        <div className="logo fade-item">
          <Image src="./logoMain.svg" alt="Logo" width={25} height={25} />
        </div>
        <div className="space-s"></div>
        <div className="textTop fade-item">
          Join Our Waitlist for exclusive updates
        </div>
        <div className="space-xs"></div>
        <div className="textBottom fade-item">
          Sign up to be the first to know about site launches. Join our waitlist
          today!
        </div>
        <div className="space-s"></div>
        <div className="members fade-item">
          <Image
            src="/pfp.png"
            alt="Avatar"
            width={20}
            height={20}
            style={{ borderRadius: "100%", marginRight: "5px" }}
          />
          50+ People Joined
        </div>
        <div className="space-xs"></div>
        <form
          className="inputContainer  fade-item"
          onSubmit={(e) => e.preventDefault()}
        >
          {" "}
          <Input
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <Button onClick={sendEmail}>Join waitlist</Button>
        </form>
        <div className="space-xs"></div>
        <div className="releaseDate fade-item">
          <Info size={15} style={{ marginRight: "5px" }} /> Planning to release
          in 3 months
        </div>
        <div className="space-xs"></div>
        <div className="socialMedia fade-item">
          <Link href={"#"}>
            <div className="item">
              <Instagram size={20} />
            </div>
          </Link>
          <Link href={"https://github.com/sonamii/next-bench"} target="_blank">
            <div className="item">
              <Github size={20} />
            </div>
          </Link>
        </div>
        <div className="space-s"></div>
      </div>
    </>
  );
}
