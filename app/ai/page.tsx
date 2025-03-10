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

export default function AiPage() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ff0000");
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<
    { sender: "user" | "bot"; message: string }[]
  >([]);

  const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);

  useEffect(() => {
    const emailLocal = localStorage.getItem("email");
    setEmail(emailLocal || "");
  }, []);

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ff0000" : "#ff0000");
    console.log(color);
  }, [resolvedTheme]);

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
    const chatIntroHeading = document.getElementById("chatIntroHeading");

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
    if (!trimmedInput) return;

    if (isFirstMessageSent == true) {
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
    setInput("");

    try {
      setTimeout(() => {
        const scrollBottom = document.getElementById("scrollBottom");
        if (scrollBottom) {
          scrollBottom.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
      const res = await fetch("/api/next-ai-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput }),
      });

      if (res.ok) {
        const data = await res.json();
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", message: data.reply },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", message: "⚠️ Error: Unable to fetch response." },
        ]);
      }
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: "❌ AI is currently unavailable." },
      ]);
    }
  };

  //VERIFICATION AND LOGIN

  const { isVerified } = useVerificationStore();

  const [emailLocal, setEmailLocal] = useState("");
  useEffect(() => {
    setEmailLocal(localStorage.getItem("email") || "");
    console.log(emailLocal);
  }, []);

  useEffect(() => {
    if (!isVerified) {
      setTimeout(() => {
        toast("Account not verified/logged in", {
          description: `Redirecting in 1.5 seconds`,
          action: {
            label: "Login",
            onClick: () => (window.location.href = "/auth/login"),
          },
        });
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1500);
      }, 2500);
    } else {
      setTimeout(() => {
        toast("Account is verified and logged in", {
          description: `Chat with NextAI`,
          action: {
            label: "Okay",
            onClick: () => console.log("Okay"),
          },
        });
      }, 2500);
    }
  }, [isVerified]);

  return (
    <>
      <Nav />
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        ease={10}
        color={"red"}
        refresh
      />
      <div className="background"></div>
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        <div className="chatCont">
          <div className="top">
            <div
              className="intro"
              id="chatIntroHeading"
              style={{ display: "flex" }}
            >
              <div className="logo fade-item">
                <Image src="./logoMain.svg" alt="Logo" width={25} height={25} />
              </div>
              <div className="space-xxs"></div>
              <SparklesText text="NextAI" className="CG fade-item" />
              <div className="space-xxs"></div>
              <div className="textBottom fade-item">
                Start a conversation with NextAI
              </div>
            </div>
            <div className="chatResponse" id="chatResponse">
              <div className="textChat">Chatting with NextAI*</div>
              {chatHistory.map((msg, index) => (
                <div key={index} className={msg.sender}>
                  {msg.sender === "bot" ? (
                    <>
                      <div className="pfp">
                        <Image
                          src="/pfpChat.png"
                          alt="Bot"
                          width={35}
                          height={35}
                        />
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: marked(msg.message),
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: marked(msg.message),
                        }}
                      />
                      <div className="pfp" style={{ transform: "scale(1.2)" }}>
                        <Avvvatars value={email} />
                      </div>
                    </>
                  )}
                </div>
              ))}
              <div className="scrollBottom" id="scrollBottom"></div>
            </div>
          </div>

          <div className="bottom">
            <div className="inputContainer fade-item">
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
              <Button onClick={onSendMessage}>
                <Send />
              </Button>
            </div>
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
