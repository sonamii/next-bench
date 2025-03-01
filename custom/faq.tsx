"use client"; // ✅ Ensures `useState` works

import React, { useState } from "react";
import "../custom/Styles/faq.css"; // Importing a separate CSS file for FAQ
import Link from "next/link";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: "Is there a free trial available?", answer: "Yes, you can try it for free for 30 days." },
    { question: "What are the main features?", answer: "Our platform provides AI-powered school recommendations, application tracking, and more." },
    { question: "What is the success rate of this platform?", answer: "We have a 95% success rate in helping students find their ideal schools." },
    { question: "Can school authorities see my profile?", answer: "No, your profile remains private unless you choose to share it." },
    { question: "What information does this platform show?", answer: "It displays admission requirements, fees, reviews, and more." },
    { question: "How can I revert my application?", answer: "You can contact support to withdraw or modify your application." },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faqContainer">
      <section className="faqSection">
        {/* SEO Optimized Title */}
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">Everything you need to know about the platform and its usage.</p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? "active" : ""}`}>
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className="faq-icon">{openIndex === index ? "−" : "+"}</span>
              </button>
              <div className="faq-answer">{openIndex === index && <p>{faq.answer}</p>}</div>
            </div>
          ))}
        </div>

        {/* Additional Support */}
        <div className="faq-support">
          <p>Still have questions?</p>
          <button className="faq-support-btn"><Link href="#comingSoonSection">Get in touch</Link></button>
        </div>
      </section>
    </div>
  );
};
