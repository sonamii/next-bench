"use client";
import { useState } from "react";

export default function NextAIBot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return; // Prevent empty messages

    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const res = await fetch("/api/next-ai-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }), // Use the user's input message
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.reply || "No response from AI.");
    } catch (error) {
      console.error("Error sending message:", error);
      setResponse("⚠️ Failed to get a response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h2>💬 Next AI Bot</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask Next AI something..."
        disabled={loading}
      />
      <button onClick={handleSendMessage} disabled={loading || !message.trim()}>
        {loading ? "Thinking..." : "Send"}
      </button>

      {/* This  is the only response container, place it anywhere and change the style to make it attractive */}
      {response && (
        <p
          className="response"
          dangerouslySetInnerHTML={{ __html: `🔹 ${response}` }}
        />
      )}

      <style jsx>{`
        .chat-container {
          max-width: 400px;
          margin: auto;
          text-align: center;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fff;
        }
        textarea {
          width: 100%;
          height: 60px;
          margin-bottom: 10px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
        }
        button {
          background: blue;
          color: white;
          padding: 8px 15px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        button:disabled {
          background: gray;
          cursor: not-allowed;
        }
        .response {
          margin-top: 15px;
          padding: 10px;
          background: #f1f1f1;
          border-radius: 5px;
          text-align: left !important;
        }
      `}</style>
    </div>
  );
}
