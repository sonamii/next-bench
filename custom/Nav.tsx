import "./style.css";
import { MapPin, User } from "lucide-react";


export function Navbar(){
    return(
        <>
        <div className="containerMax">
            <div className="nav">
            <div className="logoContainer">
                <div className="logo">NEXT BENCH</div>
                <div className="location">
                <MapPin
                    size={13}
                    color="#52525B"
                    style={{ marginBottom: "4px" }}
                />
                Dehradun
                </div>
            </div>

            <div className="midCont">
                <div className="links">Admission Tracker</div>
                <div className="links">Comparison</div>
                <div className="links">Explore</div>
            </div>

            <div className="right">
                <div className="button">Shortlist</div>

                <div className="profile">
                <User size={20} />
                </div>
            </div>
            </div>
        </div>
        </>
        
    )
}