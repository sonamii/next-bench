import  Link  from "next/link";
export default function Callback() {
  return (
    <div>
      <h1>
        <b>[UNDER DEVELOPMENT]</b> Callback Successful
      </h1>
      <p>
        Your authentication callback was successful. You can now proceed to the
        next step.
      </p>
      <p>If you have any issues, please contact support.</p>
      <br></br>
      <Link href="/">
        <i>
          <u>Back to Home</u>
        </i>
      </Link>
    </div>
  );
}
