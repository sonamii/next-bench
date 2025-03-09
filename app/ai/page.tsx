"use client"

import ChatUi from "./aiComponents/ChatUi";
import Sidebar from "./aiComponents/Sidebar";

export default function aiPage(){
  return(
    <div className="h-screen fixed w-full">
      <div className="grid grid-cols-5">
        <div className="hidden md:block">
          {/*Sidebar*/}
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-4">
            <ChatUi />
        </div>
      </div>
    </div>
  );
};