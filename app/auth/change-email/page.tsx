"use client";
import { Mail } from "lucide-react";
import "./page.css";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import supabase from "@/services/supabase";
import { toast } from "sonner";

/**
 * The Waitlist component is a page that allows users to change their email
 * address. It takes the user's current email address from local storage and
 * displays it in a read-only input field. The user can then enter their new
 * email address in a second input field and submit the form to update their
 * email address in the Supabase database.
 *
 * The component displays a success message if the update is successful, or an
 * error message if there is an error.
 */
export default function Waitlist() {
  const [isVisible, setIsVisible] = useState(false);
  const [emailLocal, setEmailLocal] = useState("");
  const [changedEmail, setChangedEmail] = useState("");

  // Retrieve the user's current email address from local storage and set it as
  // the initial value for the read-only input field. This will be used to
  // display the user's current email address when the page loads.
  useEffect(() => {
    const storedEmail = localStorage.getItem("email") as string;
    setEmailLocal(storedEmail);
  }, []);

  /**
   * Sets the visibility state to true after a short delay of 100ms.
   * This is used to create a fade-in effect when the component mounts.
   */
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  /**
   * Updates the user's email address using Supabase authentication.
   * - If no new email is entered, it displays an error message.
   * - If the update is successful, it displays a success message.
   * - If there is an error during the update, it displays an error message.
   */
  function changeEmail() {
    // Check if the user has entered a new email address
    if (!changedEmail) {
      toast.error("Please enter a new email address.");
      return;
    }

    // Attempt to update the user's email address in Supabase
    supabase.auth
      .updateUser({ email: changedEmail })
      .then(({ error }) => {
        if (error) {
          // Display an error message if there is an issue with updating the email
          toast.error("Error updating email: " + error.message);
        } else {
          // Display a success message if the email is updated successfully
          toast.success(
            "Email updated successfully. Please check your new email for confirmation."
          );
        }
      })
      .catch((error) => {
        // Display an error message for any unexpected errors
        toast.error("Unexpected error: " + error.message);
      });
  }

  return (
    <>
      {/* The background div is used to display the background image. */}
      <div className="background"></div>
      {/* The space div is used to add a small gap between the background and the content. */}
      <div className="space"></div>
      {/* The containerMain div is used to contain all the content. */}
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        {/* The logo div is used to display the logo. */}
        <button
          className="logo fade-item"
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
        >
          {/* The Image component is used to display the logo image. */}
          <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
        </button>
        {/* The space-s div is used to add a small gap between the logo and the content. */}
        <div className="space-s"></div>
        {/* The textTop div is used to display the main text. */}
        <div className="textTop fade-item">
          Follow the steps to change your email
        </div>
        {/* The space-xs div is used to add a small gap between the textTop and the textBottom. */}
        <div className="space-xs"></div>
        {/* The textBottom div is used to display the secondary text. */}
        <div className="textBottom fade-item">
          Enter your new email address below and we&apos;ll send you a link to
          change your email.
        </div>
        {/* The space-s div is used to add a small gap between the textBottom and the members. */}
        <div className="space-s"></div>
        {/* The members div is used to display the members text. */}
        <div className="members fade-item">
          {/* The Image component is used to display the avatar image. */}
          <Image
            src="/logoMain.svg"
            alt="Avatar"
            width={20}
            height={20}
            style={{ borderRadius: "100%", marginRight: "5px" }}
          />
          Status: excellent
        </div>
        {/* The space-xs div is used to add a small gap between the members and the form. */}
        <div className="space-xs"></div>
        {/* The form is used to update the user's email address. */}
        <form
          className="inputContainer fade-item"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* The Input component is used to display the user's current email address. */}
          <Input
            type="email"
            placeholder={emailLocal}
            readOnly
            required
            className="input-placeholder"
          />
          {/* The Input component is used to get the user's new email address. */}
          <Input
            type="email"
            placeholder="Enter your new email"
            value={changedEmail}
            onChange={(e) => setChangedEmail(e.target.value)}
          />
          {/* The Button component is used to submit the form. */}
          <Button onClick={changeEmail}>Change email</Button>
        </form>
        {/* The space-xs div is used to add a small gap between the form and the releaseDate. */}
        <div className="space-xs"></div>
        {/* The releaseDate div is used to display the release date text. */}
        <div className="releaseDate fade-item">
          {/* The Mail component is used to display the mail icon. */}
          <Mail size={15} style={{ marginRight: "5px" }} /> Please confirm your
          new email
        </div>
      </div>
    </>
  );
}
