"use client";
import "./page.css";
import Image from "next/image";
import { Info } from "lucide-react";
import { useVerificationStore } from "@/store/verificationStore";
import { Nav } from "./../custom-components/nav";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect } from "react";
export default function Callback() {
  const { isVerified } = useVerificationStore();

  useEffect(() => {
    if (!isVerified) {
      toast("Account not verified", {
        description: `Redirecting in 3 seconds`,
        action: {
          label: "Login",
          onClick: () => (window.location.href = "/auth/login"),
        },
      });
      setTimeout(() => {
        window.location.href = "/security/user";
      }, 3000);
    }
  }, [isVerified]);

  return (
    <>
      {" "}
      <Nav></Nav>
      <div className="containerMain">
        <div className="logo fade-item">
          <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
        </div>{" "}
        <div className="space-xs"></div>
        <div className="textTop">Dashboard</div>
        <div className="space-xxs"></div>
        <div className="textBottom">Coming soon</div>
        <div className="space-s"></div>
        <div className="buttonContainer">
          {" "}
          <Link href={"/"}>
            {" "}
            <div className="button">Home</div>
          </Link>
        </div>
        <div className="space-xs"></div>
        <div className="releaseDate fade-item">
          <Info size={15} style={{ marginRight: "5px" }} /> This is the
          dashboard for users.
        </div>
      </div>
    </>
  );
}
