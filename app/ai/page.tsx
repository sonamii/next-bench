"use client";

import "./style.css";
import { useState, useEffect } from "react";
import { Nav } from "@/custom-components/nav/nav";
import { Particles } from "@/components/magicui/particles";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send } from "lucide-react";
import Avvvatars from "avvvatars-react";
import { marked } from "marked";
import { useVerificationStore } from "@/store/verificationStore";
import { toast } from "sonner";
import Link from "next/link";
import supabase from "@/services/supabase";

/**
 * The main page for NextAI, containing a chat interface for users to interact
 * with the AI.
 *
 * The page is split into two sections: the top, which contains the chat log and
 * the input field, and the bottom, which contains the release date and the
 * "Bot may make mistakes" notice.
 *
 * The top section is further divided into two parts: the chat log, which is
 * displayed as a list of messages, and the input field, which is a text input
 * that allows users to type messages to the AI.
 *
 * When the user types a message and presses Enter, the message is sent to the
 * AI and the response is displayed in the chat log.
 *
 * If the user's account is not verified or logged in, a toast notification will
 * appear after 2.5 seconds, prompting the user to log in.
 *
 * The page also contains a particles animation in the background, which is
 * animated using the "ease" property.
 *
 * @returns The JSX element for the main page of NextAI.
 */
export default function AiPage() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ff0000");
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<
    { sender: "user" | "bot"; message: string }[]
  >([]);
  const { isVerified } = useVerificationStore();
  const [emailLocal, setEmailLocal] = useState("");

  const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);

  // Set the user's email from local storage if it exists, otherwise set it to an empty string.
  useEffect(() => {
    setColor("#ff0000")
    const emailLocal = localStorage.getItem("email");
    setEmail(emailLocal ?? "");
    console.log(email);
  }, []);

  useEffect(() => {
    console.log(color);
  }, [resolvedTheme]);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  /**
   * Scrolls to the bottom of the chat log whenever the chat history
   * updates. This is used to keep the chat log scrolled to the bottom
   * after the user sends a message or the AI responds.
   */

  useEffect(() => {
    const scrollBottom = document.getElementById("scrollBottom");
    if (scrollBottom) {
      scrollBottom.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]); // Scrolls whenever chatHistory updates

  /**
   * Handles sending a message from the user to the AI and updates the chat history.
   * Animates the chat introduction heading, manages input, and handles errors.
   */
  /**
   * Handles sending a message from the user to the AI and updates the chat history.
   *
   * Animates the chat introduction heading, manages input, and handles errors.
   *
   * @function onSendMessage
   * @returns {void}
   */

  const onSendMessage = async () => {
    const chatCont = document.querySelector(".chatCont");
    if (window.innerWidth < 500 && chatCont) {
      chatCont.setAttribute("style", "height: calc(102vh);");
    }
    const chatIntroHeading = document.getElementById("chatIntroHeading");

    // Animate and hide the chat introduction heading
    if (chatIntroHeading) {
      chatIntroHeading.style.animation = "fadeUps 1.0s ease-in-out";

      setTimeout(() => {
        chatIntroHeading.style.display = "none";
        const chatResponse = document.getElementById("chatResponse");
        if (chatResponse) {
          chatResponse.style.display = "flex";
        }
      }, 1000);
    }

    const trimmedInput = input.trim();
    if (!trimmedInput) return; // Prevent sending empty messages

    // Add user's message to chat history
    if (isFirstMessageSent) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "user", message: trimmedInput },
      ]);
    } else {
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          { sender: "user", message: trimmedInput },
        ]);
      }, 800);
      setIsFirstMessageSent(true);
    }
    setInput(""); // Clear input field

    try {
      // Scroll to the bottom of the chat log
      setTimeout(() => {
        const scrollBottom = document.getElementById("scrollBottom");
        if (scrollBottom) {
          scrollBottom.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);

      // Send a POST request to the AI API
      const res = await fetch("/api/next-ai-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput }),
      });

      if (res.ok) {
        const data = await res.json();
        // Append AI's response to chat history
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", message: data.reply },
        ]);
      } else {
        // Handle error if response is not ok
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", message: "⚠️ Error: Unable to fetch response." },
        ]);
      }
    } catch {
      // Handle network or other errors
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: "❌ AI is currently unavailable." },
      ]);
    }
  };

  /**
   * Retrieves the user's email from localStorage and sets it to the local state.
   * Logs the retrieved email to the console.
   *
   * @function useEffect
   */
  useEffect(() => {
    setEmailLocal(localStorage.getItem("email") ?? "");
    console.log(emailLocal);
  }, []);

  /**
   * useEffect hook to handle user verification and login status.
   *
   * If the user's account is not verified, a toast notification is shown,
   * and the user is redirected to the login page after a delay.
   * If the account is verified, a toast notification is shown allowing the
   * user to chat with NextAI.
   *
   * @dependency isVerified - The verification status of the user's account.
   */
  useEffect(() => {
    const checkSession = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        return false;
      }
      return true;
    };

    const handleSessionCheck = async () => {
      const sessionExists = await checkSession();
      if (!isVerified && sessionExists) {
        // Show toast notification and redirect to login if not verified
        setTimeout(() => {
          toast("Account not verified", {
            description: `Redirecting in 1.5 seconds`,
            action: {
              label: "Verify",
              onClick: () => (window.location.href = "/security/verify"),
            },
          });
          // setTimeout(() => {
          //   window.location.href = "/security/verify";
          // }, 1500);
        }, 500);
      } else if (!isVerified && !sessionExists) {
        // Show toast notification and redirect to login if not verified
        setTimeout(() => {
          toast("Session not found", {
            description: `Redirecting in 1.5 seconds`,
            action: {
              label: "Login",
              onClick: () => (window.location.href = "/auth/login"),
            },
          });
          // setTimeout(() => {
          //   window.location.href = "/auth/login";
          // }, 1500);
        }, 500);
      } else {
        // Show toast notification for verified account
        setTimeout(() => {
          toast("Account is verified and logged in", {
            description: `Chat with NextAI`,
            action: {
              label: "Okay",
              onClick: () => console.log("Okay"),
            },
          });
        }, 500);
      }
    };

    handleSessionCheck();
  }, [isVerified]);
  return (
    <>
      {/* Navigation bar at the top of the page */}
      <Nav />
      {/* Particles background effect */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={10}
        color={"red"}
        refresh
      />
      {/* Background that holds the entire page */}
      <div className="background"></div>
      {/* Main container that contains the chat */}
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        <div className="chatCont">
          {/* Top section of the chat that contains the intro text and heading */}
          <div className="top">
            <div
              className="intro"
              id="chatIntroHeading"
              style={{ display: "flex" }}
            >
              {/* Logo of the application */}
              <div className="logo fade-item">
                <Image src="./logoMain.svg" alt="Logo" width={25} height={25} />
              </div>
              {/* Space between the logo and the text */}
              <div className="space-xxs"></div>
              {/* Sparkly text that says "NextAI" */}
              <SparklesText text="NextAI" className="CG fade-item" />
              {/* Space between the text and the bottom text */}
              <div className="space-xxs"></div>
              {/* Text that says "Start a conversation with NextAI" */}
              <div className="textBottom fade-item">
                Start a conversation with NextAI
              </div>
              <div className="space-xxs"></div>

              <div className="textBottom fade-item">
                <Link
                  href={"/ai/old"}
                  style={{ textDecoration: "none" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  <b>Try UI-v1</b>
                </Link>
              </div>
            </div>
            {/* Chat response section that contains the chat messages */}
            <div className="chatResponse" id="chatResponse">
              {/* Text that says "Chatting with NextAI*" */}
              <div className="textChat">Chatting with NextAI*</div>
              {/* Map over the chat history and render each message */}
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender == "user" ? "justify-end" : "justify-start"
                  }`}
                  style={{ animation: "fadeInUp 0.6s ease-out" }}
                >
                  <div className="flex gap-3">
                    {msg.sender == "bot" && (
                      <Image
                        src="/pfpChat.png"
                        alt="BOT"
                        width={100}
                        height={100}
                        className="w-[30px] h-[30px] object-cover rounded-full"
                        style={{ animation: "fadeInUp 0.6s ease-out" }}
                      />
                    )}

                    <div
                      className={`p-3 rounded-lg ${
                        msg.sender == "user"
                          ? "bg-gray-100 text-black rounded-lg  border-gray-200  border-1"
                          : "bg-gray-100 text-black rounded-lg  border-gray-200  border-1"
                      }`}
                      dangerouslySetInnerHTML={{ __html: marked(msg.message) }}
                      style={{ animation: "fadeInUp 0.6s ease-out" }}
                    ></div>

                    {msg.sender == "user" && (
                      <div
                        className="w-[30px] h-[30px] rounded-l object-cover"
                        style={{ animation: "fadeInUp 0.6s ease-out" }}
                      >
                        <Avvvatars value={emailLocal.split("@")[0]} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {/* Scroll to the bottom of the chat */}
              <div className="scrollBottom" id="scrollBottom"></div>
            </div>
          </div>

          {/* Bottom section of the chat that contains the input field */}
          <div className="bottom">
            {/* Container for the input field */}
            <div className="inputContainer fade-item">
              {/* Input field */}
              <Input
                className="input"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSendMessage();
                  }
                }}
                spellCheck={false}
                placeholder="Type a message..."
              />
              {/* Send button */}
              <Button onClick={onSendMessage}>
                <Send />
              </Button>
            </div>
            {/* Text that says "Bot may make mistakes" */}
            <div className="releaseDate fade-item">
              <Bot
                style={{ marginRight: "5px", marginLeft: "3px" }}
                size={15}
              />
              Bot may make mistakes
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
