import { Navbar } from "../../../custom/Nav";
import { Footer } from "../../../custom/footer";
import "./compare.css";
import { Input } from "@/components/ui/input";

export default function compare(){
  return(
    <div className="containerMax">
      <Navbar />
      
      <div className="selectorContainer">
        <div className="selector">
          <input type="text" placeholder="Search"/>
          <div className="lineBreak">
            <div className="line"/>
            <div className="or">OR</div>
            <div className="line"></div>
          </div>
          <div className="dropDown">
            <select name="schools" id="schools">
              <option value={"A"}>A</option>
              <option value={"B"}>B</option>
              <option value={"C"}>C</option>
            </select>
          </div>
        </div>

        <div className="lineVertical"/>

        <div className="selector">
          <input type="text" placeholder="Search"/>
          <div className="lineBreak">
            <div className="line"/>
            <div className="or">OR</div>
            <div className="line"></div>
          </div>
          <div className="dropDown">
            <select name="schools" id="schools">
              <option value={"A"}>A</option>
              <option value={"B"}>B</option>
              <option value={"C"}>C</option>
            </select>
          </div>
        </div>

        <div className="lineVertical"/>

        <div className="selector">
          <input type="text" placeholder="Search"/>
          <div className="lineBreak">
            <div className="line"/>
            <div className="or">OR</div>
            <div className="line"></div>
          </div>
          <div className="dropDown">
            <select name="schools" id="schools">
              <option value={"A"}>A</option>
              <option value={"B"}>B</option>
              <option value={"C"}>C</option>
            </select>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="textTop">Ready to find what suits you?</div>
        <div className="textBottom">
          Select schools to get started
        </div>
      </div>

      <Footer/>
    </div>
  )
}