"use client";

import "./style.css";
import { useState, useEffect } from "react";
import { Nav } from "@/custom-components/nav/nav";
import { Particles } from "@/components/magicui/particles";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Swal from "sweetalert2";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send } from "lucide-react";
import Avvvatars from "avvvatars-react";
import { marked } from "marked";
import { toast } from "sonner";
import Link from "next/link";
import supabase from "@/services/supabase";

export default function AiPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<
    { sender: "user" | "bot"; message: string }[]
  >([]);

  const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
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
    const fetchVerificationStatus = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("isVerified")
        .eq("id", userID)
        .single();

      if (error) {
        toast.error("Failed to fetch verification status");
      } else {
        setIsVerified(data.isVerified);
        toast.success("Successfully fetched verification status");
      }
    };
    if (userID) {
      fetchVerificationStatus();
    }
  }, [userID]);

  // Set the user's email from local storage if it exists, otherwise set it to an empty string.

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    const scrollBottom = document.getElementById("scrollBottom");
    if (scrollBottom) {
      scrollBottom.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]); // Scrolls whenever chatHistory updates

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
      if (!sessionExists) {
        setTimeout(() => {
          toast("Session not found", {
            description: `Redirecting in 1.5 seconds`,
            action: {
              label: "Login",
              onClick: () => (window.location.href = "/auth/login"),
            },
          });
        }, 0);
      } else {
        setTimeout(() => {
          Swal.fire({
            title: "Account is verified",
            text: "Chat with NextAI",
            icon: "success",
            confirmButtonText: "Okay",
            customClass: {
              container: "my-swal-container",
            },
          });
        }, 0);
      }
    };
    if (isVerified) {
      handleSessionCheck();
    }
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
                    msg.sender == "user" ? "justify-end" : "justify-start, pr-10"
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
                        <Avvvatars value={emailID.split("@")[0]} />
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
