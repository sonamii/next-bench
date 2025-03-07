"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/waitlist";
  }, []);
  return <></>;
}
