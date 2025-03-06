"use client";

import { Navbar } from "@/custom/Nav"; // Importing Navbar component
import { Footer } from "@/custom/footer"; // Importing Footer component
import { Button } from "@/components/ui/button"; // Importing Button component
import { Input } from "@/components/ui/input"; // Importing Input component
import "./style.css"; // Importing CSS styles
import {
  // Building2,
  FilterIcon,
  Mail,
  MessageCircleIcon,
  MoreHorizontal,
  // NotepadTextDashedIcon,
  PhoneCall,
  // School,
} from "lucide-react"; // Importing icons from lucide-react
import { useState } from "react";


/**
 * ExplorePage component
 *
 * A page that allows users to search and filter schools.
 */
export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  return (
    <div className="containerMax">
      <Navbar /> {/* Navbar component */}
      <div className="search">
        <div className="sideBar">
          <div className="item">S </div> {/* Sidebar item */}
          <div className="item">U </div> {/* Sidebar item */}
          <div className="item">T </div> {/* Sidebar item */}
          <div className="item">
            <MoreHorizontal size={20} />{" "}
          </div>{" "}
          {/* Sidebar item */}
        </div>
        <div className="searchMain">
          <div className="container">
            <div className="heading">
              <div className="text">Search:</div> {/* Search heading */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",
                  width: "400px",
                  justifyContent: "end",
                  flexDirection: "row",
                }}
              >
                <Input
                  placeholder="Latest in your area..."
                  type="text"
                  spellCheck={false}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />{" "}
                {/* Search input */}
                <Button>
                  <FilterIcon size={26} /> {/* Filter button */}
                </Button>
              </div>
            </div>
            <div className="filters"></div>
            <div className="tableContainer">
              <div className="attributes">
                Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Board&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Class&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Streams&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Transport&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Labs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ratings&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add
              </div>{" "}
              {/* Table attributes */}
              <div className="tuples">
                {" "}
                Woodland&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4285-AF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ICSE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LKG-12th&nbsp;&nbsp;&nbsp;&nbsp;PCMBH&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bus/Van&nbsp;Labs&nbsp;&nbsp;&nbsp;&nbsp;PCMB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.5/5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✅
              </div>{" "}
              {/* Table row */}
            </div>
          </div>
        </div>
      </div>
      <Footer /> {/* Footer component */}
    </div>
  );
}
