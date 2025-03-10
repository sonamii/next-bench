"use client";

import ChatUi from "./../aiComponents/ChatUi";
import Sidebar from "./../aiComponents/Sidebar";
import { useEffect } from "react";

export default function AiPage2() {
  useEffect(() => {
    const handleReload = () => {
      if (!sessionStorage.getItem("reloaded")) {
        sessionStorage.setItem("reloaded", "true");
        window.location.reload();
      } else {
        sessionStorage.removeItem("reloaded");
      }
    };

    handleReload();
  }, []);
  return (
    <div className="h-screen fixed w-full">
      <div className="grid grid-cols-5">
        <div className="hidden md:block">
          {/*Sidebar*/}
          <Sidebar />
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-4">
          <ChatUi />
        </div>
      </div>
    </div>
  );
}
