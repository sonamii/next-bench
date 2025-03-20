"use client";


import "./style.css";
import { SparklesText } from "@/components/magicui/sparkles-text";

export default function EmptyChatUi() {
  return (
    <div className="flex flex-col items-center">
      <SparklesText className="text-6xl mt-20" text="How Can I Assist You?" />
    </div>
  );
}
