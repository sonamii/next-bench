import { Navbar } from "@/custom/Nav";
import { Footer } from "@/custom/footer";
import { Table } from "./table2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./style.css";
import { Filter, FilterIcon } from "lucide-react";

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
            <div className="item">{/* <School /> */}S</div>
            <div className="item">{/* <University /> */}U</div>
            <div className="item">{/* <BookHeadphonesIcon size={20}/> */}</div>
            <div className="item"></div>
          </div>
          <div className="searchMain">
            <div className="container">
              <div className="heading">
                <div className="text"> Search:</div>
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
                  <Input placeholder="Latest in your area..." type="text" />
                  <Button>
                    <FilterIcon size={26} />
                  </Button>
                </div>
              </div>
              <div className="filters">{/*to do*/}</div>
              <div className="tableContainer">
                <div className="attributes"></div>
                <div className="tuples"></div>
                <div className="tuples"></div>

                <div className="tuples"></div>
                <div className="tuples"></div>
                <div className="tuples"></div>
                <div className="tuples"></div>
                <div className="tuples"></div>
                <div className="tuples"></div>
              </div>
            </div>{" "}
          </div>
          <div className="profileCard"></div>
        </div>
        <Footer />
      </div>
    </>
  );
}
