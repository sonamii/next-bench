'use client';
import "./style.css";
import { Navbar } from "@custom/nav";
import { Footer } from "@custom/footer";
import { ComingSoon } from "@custom/coming-soon";
import { NextAI } from "@custom/ai";
import { Main } from "@custom/main";

export default function Home() {
  return (
    <>
     
    <div className="containerMax">
      <Navbar />
      <Main />
      <div className="line"></div>
      <NextAI />
      <div className="line"></div>
      <ComingSoon />
      <Footer />
    </div>
    </>
  );
}
