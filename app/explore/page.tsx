import { Navbar } from "@/custom/Nav"; // Importing Navbar component
import { Footer } from "@/custom/footer"; // Importing Footer component
import { Button } from "@/components/ui/button"; // Importing Button component
import { Input } from "@/components/ui/input"; // Importing Input component
import "./style.css"; // Importing CSS styles
import {
  Building2,
  FilterIcon,
  Mail,
  MessageCircleIcon,
  MoreHorizontal,
  NotepadTextDashedIcon,
  PhoneCall,
  School,
} from "lucide-react"; // Importing icons from lucide-react
import Avvvatars from "avvvatars-react"; // Importing Avvvatars component

export default function Explore() {
  return (
    <>
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
                  <Input
                    placeholder="Latest in your area..."
                    type="text"
                    spellCheck={false}
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
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
                <div className="tuples"></div> {/* Table row */}
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
              {/* <Avvvatars value="tim@apple.com" style="shape" />{" "} */}
              {/* Profile picture */}
            </div>
            <div className="name">Woodland School</div> {/* School name */}
            <div className="tagline">
              A school from future shaping your child
            </div>{" "}
            {/* School tagline */}
            <div className="message">
              <div className="item">
                <PhoneCall size={19} /> {/* Phone call icon */}
              </div>
              <div className="item">
                <MessageCircleIcon size={19} /> {/* Message icon */}
              </div>
              <div className="item">
                <Mail size={19} /> {/* Mail icon */}
              </div>
            </div>
            <div className="about">
              <div className="title">ABOUT</div> {/* About section title */}
              <p>
                Woodland School is dedicated to providing a nurturing and
                innovative learning environment. Our mission is to shape the
                future by fostering creativity, critical thinking, and a love
                for learning in every student.
              </p>
              <br />
              <div className="grid">
                <div className="item">A</div> {/* Grid item */}
                <div className="item">B</div> {/* Grid item */}
                <div className="item">C</div> {/* Grid item */}
                <div className="item">D</div> {/* Grid item */}
              </div>
              <br />
              {/* Additional information sections commented out */}
              {/*<div className="information">
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
                            </div>*/}
            </div>
          </div>
        </div>
        <Footer /> {/* Footer component */}
      </div>
    </>
  );
}
