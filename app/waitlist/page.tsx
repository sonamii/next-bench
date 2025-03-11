"use client";
import { Github, Info, Instagram } from "lucide-react";
import "./page.css";
import Image from "next/image";
import { Nav } from "@/custom-components/nav/nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

/**
 * The waitlist page.
 *
 * This page is used to collect user emails and send them a notification when the site is ready.
 */
export default function Waitlist() {
  const [isVisible, setIsVisible] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    /**
     * After 100ms, set the visibility to true.
     *
     * This is done to prevent the page from "jumping" when it is first rendered.
     */
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  /**
   * Sends a POST request to the API to send an email to the user.
   *
   * @param {string} userEmail - The email address of the user.
   * @returns {Promise<void>}
   */
  async function sendEmail() {
    // Check if the email is empty
    if (!userEmail.trim()) {
      toast.error("Please enter a valid email.");
      return;
    }

    // Send the email
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail }),
      });

      // Check the response
      const result = await response.json();

      if (response.ok && result.success) {
        // Show a success message
        toast("Email sent to the host", {
          description: "You will be notified soon.",
          action: {
            label: "Okay",
            onClick: () => console.log("Okay"),
          },
        });
        // Clear the input
        setUserEmail("");
      } else {
        // Show an error message
        toast.error(`Error: ${result.error || "Failed to send email."}`);
      }
    } catch (error) {
      // Show an error message
      toast.error("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className="background"></div>
      {/* The navigation bar at the top of the page. */}
      <Nav />
      <div className="space"></div>
      {/* The main container for the page. */}
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        {/* The logo of the site. */}
        <button
          onClick={() => (window.location.href = "/")}
          className="logo fade-item"
          style={{ cursor: "pointer" }}
        >
          <Image src="./logoMain.svg" alt="Logo" width={25} height={25} />
        </button>
        <div className="space-s"></div>
        {/* The top text on the page. */}
        <div className="textTop fade-item">
          Join Our Waitlist for exclusive updates
        </div>
        <div className="space-xs"></div>
        {/* The bottom text on the page. */}
        <div className="textBottom fade-item">
          Sign up to be the first to know about site launches. Join our waitlist
          today!
        </div>
        <div className="space-s"></div>
        {/* The members section. */}
        <div className="members fade-item">
          {/* The avatar of a member. */}
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
        {/* The form to join the waitlist. */}
        <form
          className="inputContainer  fade-item"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* The input field for the email. */}
          <Input
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          {/* The button to submit the form. */}
          <Button onClick={sendEmail}>Join waitlist</Button>
        </form>
        <div className="space-xs"></div>
        {/* The release date of the site. */}
        <div className="releaseDate fade-item">
          <Info size={15} style={{ marginRight: "5px" }} /> Planning to release
          in 3 months
        </div>
        <div className="space-xs"></div>
        {/* The social media links. */}
        <div className="socialMedia fade-item">
          {/* The Instagram link. */}
          <Link href={"#"}>
            <div className="item">
              <Instagram size={20} />
            </div>
          </Link>
          {/* The GitHub link. */}
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
