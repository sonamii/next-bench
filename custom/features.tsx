import "../custom/styles/features.css";

export function Features() {
  return (
      <section className="features" id="features">
        <div className="textTop">
          What are you <span>looking</span> for?
        </div>
        <div className="textBottom">
          Discover and connect with the best ones
        </div>
        <div className="cardContainer">
          <div className="item">
            <div className="text">Play <br/>School</div>
          </div>
          <div className="item">
            {" "}
            <div className="text">Boarding <br/>School</div>
          </div>
          <div className="item">
            {" "}
            <div className="text">Day <br/>Boarding</div>
          </div>
          <div className="item">
            {" "}
            <div className="text">Colleges</div>
          </div>
        </div>
      </section>
  );
}
