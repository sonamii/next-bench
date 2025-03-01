import Link from "next/link";
import "../custom/styles/ai.css";

export function NextAI() {
  return (
    <section className="nextai" id="nextai">
      <div className="nextContainer">
        <div className="left">
          <div className="textTop">Try "NextAI" for free</div>
          <div className="textBottom">
            Get complete roadmap to your dream university with a complete
            step-by-step roadmap designed to help you succeed. From building a
            strong academic profile to crafting standout applications, gaining
            extracurricular achievements.
          </div>
          <Link href="#comingSoonSection">
            <div className="button">Start now</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
