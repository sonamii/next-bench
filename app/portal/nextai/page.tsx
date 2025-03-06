'use client'

import { Navbar } from "@/custom/nav";
import { Footer } from "@/custom/footer";
import { Button } from "@/components/ui/button";
import TextareaAutosize from 'react-textarea-autosize';
import "./nextai.css";
import { Send, Trash2 } from 'lucide-react';
import { Input } from "@/ui/input";

export default function nextai() {
  return (
    <div className="containerMax">
      <div className="container">
        <div className="sideBar">
          <div className="textTop">NEXT AI</div>
          <Button className="newChat">+ New Chat</Button>
          <Button className="clearConvo"><Trash2 />Clear Conversation</Button>
        </div>
        <div className="main">
          <div className="navbarStyle"><Navbar /></div>
          <div className="bg">NEXT BENCH AI</div>
          <div className="searchBar">
            <TextareaAutosize id="autoresizing" placeholder="Send a message..." />
            <Button><Send /></Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}