"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "../custom/Styles/coming-soon.css";
import { useState } from "react";
import { toast } from "sonner";

export function ComingSoon() {
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
          description: "Sunday, December 03, 2023 at 9:00 AM",
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
    <section className="comingSoonSection" id="comingSoonSection">
      <div className="comingContainer">
        <div className="textTop">
          Coming Soon <span>...</span>
        </div>
        <div className="textBottom">
          Enter your email below to be notified as soon as our website is ready
          for beta use.
        </div>
        <div className="">
          <form
            style={{ display: "flex", gap: "20px" }}
            onSubmit={(e) => e.preventDefault()}
            className="input"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <Button type="submit" onClick={sendEmail}>
              Notify us
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
