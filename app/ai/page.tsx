"use client";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import "./style.css";
import {Trash2 } from "lucide-react";

export default function NextAI() {
  const [userInput, setUserInput] = useState("");
  const [aiResponses, setAIResponses] = useState<string[]>([]);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleSendUserInput = async () => {
    const trimmedInput = userInput.trim();
    setUserInput("");
    if (!trimmedInput) return; // Prevent empty messages

    setIsSendingMessage(true);
    setAIResponses((prev: string[]) => [...prev, ""]); // Add new input to messages list

    try {
      const response = await fetch("/api/next-ai-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setAIResponses((prev) =>
        prev.map((response, index) => {
          if (index === prev.length - 1) {
            return (data?.reply || "No response from AI.") as string;
          }
          return response;
        })
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setAIResponses((prev) =>
        prev.map((response, index) => {
          if (index === prev.length - 1) {
            return "Failed to get a response.";
          }
          return response;
        })
      );
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <div className="containerMax">
      <div className="container">
        <div className="sideBar">
          <div className="textTop">NEXT AI</div>
          <Button className="newChat">+ New Chat</Button>
          <Button className="clearConvo">
            <Trash2 />
            Clear Conversation
          </Button>
        </div>
        <div className="main">
          <div className="navbarStyle">
          </div>
          <div className="bg">NEXT BENCH AI</div>
          {aiResponses.map((response, index) => (
            <div key={index} className="responseContainer">
              <div
                className="response"
                dangerouslySetInnerHTML={{
                  __html: ` ${response}`,
                }}
              />
              <br />
              <br />
            </div>
          ))}
          <div className="searchBar">
            <TextareaAutosize
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask Next AI something..."
              disabled={isSendingMessage}
            />
            <Button
              onClick={handleSendUserInput}
              disabled={isSendingMessage || !userInput.trim()}
            >
              {isSendingMessage ? "Thinking..." : "Send"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
