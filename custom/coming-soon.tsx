import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./coming-soon.css";

export function ComingSoon() {
  return (
    <>
      <section className="comingSoonSection" id="comingSoonSection">
        <div className="comingContainer">
          <div className="textTop">
            Coming Soon <span>...</span>
          </div>
          <div className="textBottom">
            Enter your email below to be notified as soon as our website is
            ready for beta use.
          </div>{" "}
          <div className="input">
            {" "}
            <Input type="email" placeholder="Enter your email" />
            <Button type="submit">Notify</Button>{" "}
          </div>
        </div>
        <div></div>
      </section>
    </>
  );
}
