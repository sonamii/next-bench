import { ChevronDown, MenuIcon } from "lucide-react";
import "./nav.css";
import Image from "next/image";
interface NavProps {
  className?: string;
}

export const Nav = ({ className }: NavProps) => {
  return (
    <div className={`nav ${className}`}>
      <div className="left">
        <div className="item">Home</div>
        <div className="link">Explore</div>

        <div className="dropdown">
          Next-AI
          <ChevronDown size={20} />
        </div>
      </div>
      <div className="mid">
        <Image src="./logoNav.svg" alt="Logo" width={30} height={30} />
      </div>
      <div className="right">
        <div className="dropdown">Dashboard</div>
        <div className="button">Sign Up</div>
        <div className="item">
          <MenuIcon />
        </div>
      </div>
    </div>
  );
};
