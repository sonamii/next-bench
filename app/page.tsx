import "./style.css";

import { Navbar } from "../custom/nav";
import { Footer } from "./../custom/footer";
import { ComingSoon } from "./../custom/coming-soon";
import { NextAI } from "./../custom/ai";
import { Main } from "./../custom/main";
import { FAQ } from "../custom/faq"; // Correct import for FAQ

export default function Home() {
  return (
    <>
      <div className="containerMax">
        <Navbar />
        <Main />
        <div className="line"></div>
        
        {/* <Features />
        <div className="line"></div> */}
        
        <NextAI />
        <div className="line"></div>
        
        <ComingSoon />  {/* Still Here! */}
        <div className="line"></div>
        
        <FAQ />  {/* FAQ Added at the Bottom */}
        
        <Footer />
      </div>
    </>
  );
}
