import { Navbar } from "@/custom/Nav"; // Importing Navbar component
import { Footer } from "@/custom/footer"; // Importing Footer component
import { Button } from "@/components/ui/button"; // Importing Button component
import { Input } from "@/components/ui/input"; // Importing Input component
import "./style.css"; // Importing CSS styles
import { FilterIcon, Mail, MessageCircleIcon, PhoneCall } from "lucide-react"; // Importing icons from lucide-react
import Avvvatars from "avvvatars-react";

export default function Explore() {
  return (
    <>
      <div className="containerMax">
        <Navbar /> {/* Navbar component */}
        <div className="search">
          <div className="sideBar">
            <div className="item">{/* <School /> */}S</div> {/* Sidebar item */}
            <div className="item">{/* <University /> */}U</div>{" "}
            {/* Sidebar item */}
            <div className="item">
              {/* <BookHeadphonesIcon size={20}/> */}
            </div>{" "}
            {/* Sidebar item */}
            <div className="item"></div> {/* Empty sidebar item */}
          </div>
          <div className="searchMain">
            <div className="container">
              <div className="heading">
                <div className="text"> Search:</div> {/* Search heading */}
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
                  <Input placeholder="Latest in your area..." type="text" />{" "}
                  {/* Search input */}
                  <Button>
                    <FilterIcon size={26} /> {/* Filter button */}
                  </Button>
                </div>
              </div>
              <div className="filters">{/* Filters section */}</div>
              <div className="tableContainer">
                <div className="attributes"></div> {/* Table attributes */}
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
              </div>
            </div>
          </div>
          <div className="profileCard">
            <div className="pfp">
              <Avvvatars value="ewt" style="shape" />
            </div>
            <div className="name"></div>
            <div className="tagline"></div>

            <div className="message">
              <div className="item">
                <PhoneCall />
              </div>
              <div className="item">
                <MessageCircleIcon />
              </div>
              <div className="item">
                <Mail />
              </div>
            </div>

            <div className="about">
              <div className="title"></div>
              <p></p>
              <br />
              <div className="grid">
                {" "}
                {/* Grid layout square*/}
                <div className="boards"></div>
                <div className="grades"></div>
                <div className="timings"></div>
                <div className="fees"></div>
              </div>
              <br />
              <div className="information">
                <div className="title">Streams</div>
                <p></p>
              </div>
              <div className="information">
                <div className="title">Student:Teachers</div>
                <p></p>
              </div>
              <br />
              <div className="information">
                <div className="title">Campus</div>
                <p></p>
              </div>
              <div className="information">
                <div className="title">Labs</div>
                <p></p>
              </div>
              <div className="information">
                <div className="title">Sports</div>
                <p></p>
              </div>
              <div className="information">
                <div className="title">Cafeteria</div>
                <p></p>
              </div>
              <div className="information">
                <div className="title">Auditorium</div>
                <p></p>
              </div>
              <br />
              <div className="information">
                <div className="title">Transport</div>
                <p></p>
              </div>
              <div className="information">
                <div className="title">Medical</div>
                <p></p>
              </div>
              <div className="information">
                <div className="title">Admission</div>
                <p></p>
              </div>
              <div className="information">
                <div className="title">Scholarships</div>
                <p></p>
              </div>
            </div>
          </div>{" "}
          {/* Profile card section */}
        </div>
        <Footer /> {/* Footer component */}
      </div>
    </>
  );
}
