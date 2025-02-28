import Link from "next/link";
import '../custom/Styles/footer.css';
export function Footer() {

return  (<><div className="footer">
    <div className="left">
      <div className="top">
        <h1>NEXT BENCH</h1>
      </div>
      <div className="bottom">
        <h1>About us</h1>
        <p>
        Next Bench is a startup that helps parents explore, compare, and apply to schools. 
        It simplifies the admission process by offering a seamless application system. 
        The platform provides end-to-end services, including uniforms and study materials. 
        It ensures parents make informed decisions with easy access to school details. 
        Next Bench aims to revolutionize school admissions with convenience and transparency.
        </p>
      </div>
    </div>
    <div className="right">
      <div className="item">
        <h1>Product</h1>
        <div className="p">
          <Link href="#comingSoonSection">About</Link>
          <Link href="#comingSoonSection">Admisison Tracker</Link>
          <Link href="#comingSoonSection">Comparison</Link>
          <Link href="#comingSoonSection">Shortlisted Schools</Link>
        </div>
      </div>
      <div className="item">
        <h1>Help</h1>
        <div className="p">
          <Link href="#comingSoonSection">Customer Support</Link>
          <Link href="#comingSoonSection">For Teachers</Link>
          <Link href="#comingSoonSection">Terms and Conditions</Link>
          <Link href="#comingSoonSection">Privacy Policy</Link>
        </div>
      </div>
      <div className="item">
        <h1>Resource</h1>
        <div className="p">
          <Link href="#comingSoonSection">School</Link>
          <Link href="#comingSoonSection">College</Link>
          <Link href="#comingSoonSection">Universities</Link>
          <Link href="#comingSoonSection">Others</Link>
        </div>
      </div>
    </div>
  </div></>)

}