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
import { Bot, BotOff, Send } from "lucide-react";
import Avvvatars from "avvvatars-react";

export default function aiPage() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ff0000");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailLocal = localStorage.getItem("email");
    setEmail(emailLocal || "");
  }, []);

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ff0000" : "#000000");
  }, [resolvedTheme]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  //BOT
  const [input, setInput] = useState<string>("");
  const [aiResponses, setAIResponses] = useState<string[]>([]);

  const onSendMessage = async () => {
    const trimmedInput = input.trim();
    setInput("");
    console.log(trimmedInput);

    const response = await fetch("/api/next-ai-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: trimmedInput }),
    });

    if (response.ok) {
      const data = await response.json();
      setAIResponses((prevResponses) => [...prevResponses, data.response]);
      console.log(data.response);
    } else {
      console.error("Failed to fetch AI response");
    }
  };
  return (
    <>
      <Nav />{" "}
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
            {/* <div className="intro">
              <div className="logo fade-item">
                <Image src="./logoMain.svg" alt="Logo" width={25} height={25} />
              </div>
              <div className="space-xxs"></div>
              <SparklesText text="NextAI" className="CG fade-item" />
              <div className="space-xxs"></div>
              <div className="textBottom fade-item">
                Start a conversation with NextAI
              </div>
            </div> */}
            <div className="chatResponse">
              <div className="bot">
                <div className="pfp">
                  {" "}
                  <Image src="/pfpChat.png" alt="Logo" width={35} height={35} />
                </div>
                Hey brrioro owe ot wHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegoHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegoHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegoHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegoHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegoHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegoHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegooetwo jwego v
              </div>
              <div className="user">
                Hey brrioro owe ot wHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegoHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegoHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegoHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegoHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegoHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegoHey brrioro owe ot woetwo jwegoHey brrioro
                owe ot woetwo jwegooetwo jwego v{" "}
                <div className="pfp" style={{ transform: "scale(1.2)" }}>
                  {" "}
                  <Avvvatars value={email} />
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="inputContainer fade-item">
              <Input
                className="input"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <Button
                onClick={onSendMessage}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSendMessage();
                  }
                }}
              >
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
