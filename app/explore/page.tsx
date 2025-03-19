"use client";
import "./page.css";

import supabase from "@/services/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Nav } from "@/custom-components/nav/nav";
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
  const [userID, setUserID] = useState("");
  const [emailID, setEmailID] = useState("");

  useEffect(() => {
    const getSessionAndUserID = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        const { user } = session;
        setUserID(user.id);
        setEmailID(user.email as string);
      } else {
        toast.error("No active session found");
      }
    };
    getSessionAndUserID();
  }, []);

  useEffect(() => {
    console.log(userID, emailID);
    console.clear();
  }, [userID, emailID]);
  return (
    <>
      <Nav />
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        coming soon.stay tuned.
      </div>
    </>
  );
}
