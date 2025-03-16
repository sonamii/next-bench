import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function Sidebar(){
  return(
    <div className="p-5 pt-10 bg-secondary border-r-[1px] relative h-screen">
      <h2 className="font-bold text-6xl text-center">Next-AI</h2>
      <Button className="w-full mt-5">+ New Chat</Button>

      <div>
        <Button className="absolute bottom-5 w-[85%]">
          <Trash2 />
          Clear Conversation
        </Button>
      </div>
    </div>
  );
};