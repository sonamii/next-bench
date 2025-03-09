"use client"

import { useState } from "react";
import { Nav } from "@/custom-components/nav/nav";
import EmptyChatUi from "./EmptyChatUi";
import "./style.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";


export default function ChatUi() {
  const [input, setInput] = useState<string>("");
  const [aiResponses, setAIResponses] = useState<string[]>([]);

  const onSendMessage = async () => {
    const trimmedInput = input.trim();
    setInput("");

    if (!trimmedInput) return; // Prevent empty messages

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
    }
  };

  return(
    <div className="background">
      <Nav />
      <div className="mt-30 relative h-[85vh]">
        {aiResponses?.length == 0 && <EmptyChatUi />}

        <div className="h-[75vh] overflow-scroll">
          {aiResponses.map((response, index) => (
            <div key={index} className="p-5 m-5 ml-10 bg-secondary border-r-[1px] rounded-md">
              <div
                className="response"
                dangerouslySetInnerHTML={{
                  __html: ` ${response}`,
                }}
              />
              <br />
            </div>
          ))}
        </div>

        <div className="flex justify-between p-5 gap-5 absolute bottom-5 w-full">
          <Input
            value={input}
            placeholder="Start Typing Here..."
            onChange={(event) => setInput(event.target.value)}
            onKeyPress={(e) => e.key=='Enter' && onSendMessage()}/>
          <Button onClick={onSendMessage}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
};  