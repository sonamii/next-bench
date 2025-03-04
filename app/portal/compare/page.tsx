import  {Navbar} from "@/custom/nav";
import { Footer } from "@/custom/footer";
import "./compare.css";

export default function Compare() {
  return (
    <div className="containerMax">
      <Navbar />
      <div className="selectorContainer">
        <div className="selector">
          <input type="text" placeholder="Search" />
          <div className="lineBreak">
            <div className="line" />
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

        <div className="lineVertical" />

        <div className="selector">
          <input type="text" placeholder="Search" />
          <div className="lineBreak">
            <div className="line" />
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

        <div className="lineVertical" />

        <div className="selector">
          <input type="text" placeholder="Search" />
          <div className="lineBreak">
            <div className="line" />
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
        <div className="textBottom">Select schools to get started</div>
      </div>

      <Footer />
    </div>
  );
}
