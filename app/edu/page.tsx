import { Navbar } from "@/custom/Nav";
import { Footer } from "@/custom/footer";
import { Table } from "./table2";
import "./style.css";

import { Component } from "./table";
import { BookHeadphonesIcon, School, University } from "lucide-react";
export default function Explore() {
  return (
    <>
      {" "}
      <div className="containerMax">
        <Navbar />
        <div className="search">
          <div className="sideBar">
            <div className="item">
              {/* <School /> */}
              S
            </div>
            <div className="item">
              {/* <University /> */}
              U
            </div>
            <div className="item">
              {/* <BookHeadphonesIcon size={20}/> */}
              T
            </div>
            <div className="item"></div>
          </div>
          <div className="searchMain">
            <Table></Table>
          </div>
          <div className="profileCard"></div>
        </div>
        <Footer />
      </div>
    </>
  );
}
