"use client";

import "./style.css";
import { useState, useEffect, useRef } from "react";
import { Nav } from "@/custom-components/nav/nav";
import { Particles } from "@/components/magicui/particles";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Swal from "sweetalert2";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send, Search, Calendar, FileText, FileDown, Table2, School } from "lucide-react";
import Avvvatars from "avvvatars-react";
import { marked } from "marked";
import { toast } from "sonner";
import Link from "next/link";
import supabase from "@/services/supabase";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  params?: Record<string, string>;
}

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
  const [isSearching, setIsSearching] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [toolParams, setToolParams] = useState<Record<string, string>>({});
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const tools: Tool[] = [
    {
      id: "date-checker",
      name: "Exam/Admission Date Checker",
      description: "Check important dates for exams and admissions",
      icon: <Calendar className="h-5 w-5" />,
      params: { exam: "", institution: "" }
    },
    {
      id: "institution-comparison",
      name: "School/College Comparison",
      description: "Compare institutions by fees, rankings, and more",
      icon: <School className="h-5 w-5" />,
      params: { institutions: "" }
    },
    {
      id: "document-generator",
      name: "Document Generator",
      description: "Create study plans, application drafts, and more",
      icon: <FileText className="h-5 w-5" />,
      params: { documentType: "", topic: "" }
    },
    {
      id: "pdf-formatter",
      name: "PDF Formatter",
      description: "Format content for clean PDF downloads",
      icon: <FileDown className="h-5 w-5" />,
      params: { content: "" }
    },
    {
      id: "tabular-comparison",
      name: "Tabular College Comparison",
      description: "View colleges in an easy-to-read table format",
      icon: <Table2 className="h-5 w-5" />,
      params: { colleges: "" }
    }
  ];
  
  const handleToolActivation = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
      setActiveTool(toolId);
      setToolParams(tool.params || {});
      setInput(`Use ${tool.name} tool to `);
    }
  };
  
  const handleParamChange = (paramName: string, value: string) => {
    setToolParams(prev => ({
      ...prev,
      [paramName]: value
    }));
  };
  
  const resetToolState = () => {
    setActiveTool(null);
    setToolParams({});
  };

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
    setInput("");
    resetToolState();

    try {
      // Scroll to the bottom of the chat log
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);

      // Show typing indicator
      setIsTyping(true);
      
      // Prepare request payload
      const payload: { message: string; tool?: { type: string; id?: string; params: Record<string, unknown> } } = { message: trimmedInput };
      
      // Add tool parameters if a tool is active
      if (activeTool) {
        payload.tool = {
          type: activeTool,
          id: activeTool,
          params: toolParams
        };
      }

      const res = await fetch("/api/next-ai-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Hide typing indicator
      setIsTyping(false);

      if (res.ok) {
        const data = await res.json();
        // Check if search was performed
        setIsSearching(data.searchPerformed || false);
        
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
    } catch (error) {
      // Hide typing indicator
      setIsTyping(false);
      
      // Handle network or other errors
      console.error("Error sending message:", error);
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
        {/* Tools sidebar */}
        <div className="tools-sidebar">
          <div className="tools-header">Smart Tools</div>
          <div className="tools-list">
            {tools.map((tool) => (
              <div 
                key={tool.id} 
                className={`tool-item ${activeTool === tool.id ? 'active' : ''}`}
                onClick={() => handleToolActivation(tool.id)}
              >
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-info">
                  <div className="tool-name">{tool.name}</div>
                  <div className="tool-description">{tool.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
              {/* Typing indicator in chat */}
              {isTyping && (
                <div className="chat-typing-indicator">
                  <div className="typing-avatar">
                    <Image
                      src="/pfpChat.png"
                      alt="BOT"
                      width={100}
                      height={100}
                      className="w-[30px] h-[30px] object-cover rounded-full"
                    />
                  </div>
                  <div className="typing-bubble">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
              
              {/* Scroll to the bottom of the chat */}
              <div className="scrollBottom" ref={chatContainerRef}></div>
            </div>
          </div>

          {/* Bottom section of the chat that contains the input field */}
          <div className="bottom">
            {/* Tool parameters section (shown when a tool is active) */}
            {activeTool && (
              <div className="tool-params-container">
                <div className="tool-params-header">
                  {tools.find(t => t.id === activeTool)?.name} Parameters
                  <button className="tool-close-btn" onClick={resetToolState}>×</button>
                </div>
                <div className="tool-params-fields">
                  {Object.entries(toolParams).map(([paramName, paramValue]) => (
                    <div key={paramName} className="tool-param-field">
                      <label htmlFor={`param-${paramName}`}>{paramName.charAt(0).toUpperCase() + paramName.slice(1)}:</label>
                      <Input
                        id={`param-${paramName}`}
                        value={paramValue}
                        onChange={(e) => handleParamChange(paramName, e.target.value)}
                        placeholder={`Enter ${paramName}...`}
                        className="tool-param-input"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Container for the input field */}
            <div className="inputContainer fade-item">
              {/* Search indicator */}
              {isSearching && (
                <div className="search-indicator">
                  <Search className="h-4 w-4" />
                  <span>Searching web...</span>
                </div>
              )}
              
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
                placeholder={activeTool 
                  ? `Describe what you need with the ${tools.find(t => t.id === activeTool)?.name}...` 
                  : "Type a message..."}
              />
              
              {/* Typing indicator or send button */}
              {isTyping ? (
                <div className="typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              ) : (
                <Button onClick={onSendMessage}>
                  <Send />
                </Button>
              )}
            </div>
            
            {/* Status indicators */}
            <div className="status-indicators fade-item">
              {/* Bot indicator */}
              <div className="bot-indicator">
                <Bot style={{ marginRight: "5px" }} size={15} />
                Bot may make mistakes
              </div>
              
              {/* Search capability indicator */}
              <div className="search-capability">
                <Search style={{ marginRight: "5px" }} size={15} />
                Web search enabled
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
