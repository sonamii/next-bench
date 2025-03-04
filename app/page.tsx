"use client";
import "./style.css";
import  {Navbar} from "@/custom/nav";
import { Footer } from "@/custom/footer";
import { ComingSoon } from "@/custom/coming-soon";
import { NextAI } from "@/custom/ai";
import { Main } from "@/custom/main";
import { TrustedBy } from "@/custom/trustedby";
import { Faq3 } from "../custom/faq";

import "@/custom/styles/main.css";

export default function Home() {
  return (
      <div className="containerMax">
        <Navbar />
        <Main />
        <div className="line"></div>
        <TrustedBy />
        <div className="line"></div>
        <NextAI />
        <div className="line"></div>
        <Faq3
          heading="Frequently asked questions"
          description="Find answers to common questions about our products. Can't find what you're looking for? Contact our support team."
          supportHeading="Need more support?"
          supportDescription="Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance."
          supportButtonText="Contact Support"
          supportButtonUrl="https://www.shadcnblocks.com"
        />{" "}
        <div className="line"></div>
        <ComingSoon />
        <Footer />
      </div>
  );
}
