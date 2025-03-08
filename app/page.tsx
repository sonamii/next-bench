"use client";
import {
  ArrowRight,
  BarChartBigIcon,
  Bot,
  Calendar,
  GitMergeIcon,
  Grid2X2Icon,
 
  LucideCircuitBoard,
  Luggage,
  Rotate3DIcon,
  Shapes,
  Shield,
  Star,
  UsersRound,
  Wifi,
} from "lucide-react";
import "./style.css";
import Image from "next/image";
import { Nav } from "@/custom-components/nav";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Waitlist() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <>
      <div className="background"></div>
      <Nav />
      <div className="space"></div>
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        <div className="logo fade-item">
          <Image src="./logoMain.svg" alt="Logo" width={25} height={25} />
        </div>

        <div className="space-s"></div>
        <div className="members fade-item">
          <Image
            src="/pfp.png"
            alt="Avatar"
            width={20}
            height={20}
            style={{ borderRadius: "100%", marginRight: "5px" }}
          />
          50+ People Joined
          <Link href="/waitlist">
          <div className="button">
            Join waitlist <ArrowRight size={14} style={{ marginLeft: "5px" }} />
          </div>
          </Link>
        </div>
        <div className="space-xs"></div>
        <div className="textTop fade-item">
          Find the perfect school that fits your child.{" "}
        </div>
        <div className="space-xs"></div>
        <div className="textBottom fade-item">
          Finding the right school should be easy. Whether it&apos;s K-12, college,
          or grad school, we simplify your search.
        </div>

        <div className="space-s"></div>
        <form
          className="inputContainer  fade-item"
          onSubmit={(e) => e.preventDefault()}
        >
          <Button>Try it now</Button>
          <div className="buttonS">Sign Up</div>
        </form>
        <div className="space-s"></div>
        <div className="features fade-item">
          <div className="textTop fade-item">Our top notch features</div>
          <div className="space-xs"></div>
          <MarqueeComponent />
        </div>
        <div className="space"></div>
        <div className="space"></div>
        <div className="topFeatures fade-item">
          <div className="left">
            <div className="badge fade-item">
              <Star size={15} style={{ marginRight: "5px" }} />
              Top features
            </div>
            <div className="textTop2 fade-item">
              Unleashing power through Top features
            </div>
            <div className="textBottom3 fade-item">
              Find, Compare, and Apply - Simplifying Education & Tutoring
              Searches
            </div>
            <div className="space-xs"></div>
            <div className="badgeContainer fade-item">
              <div className="badge2 ">
                <Shapes size={18} />
                Find the Right Tuition & Schools
              </div>
              <div className="badge2">
                <LucideCircuitBoard size={18} />
                Apply as a Teacher or Tutor
              </div>
              <div className="badge2">
                <BarChartBigIcon size={18} />
                24/7 AI Chatbot Assistance
              </div>
              <div className="badge2">
                <Shield size={18} />
                Robust Data Security Measures
              </div>
            </div>
          </div>
          <div className="right ">
            <div className="topFeaturesDisplay fade-item">
              <div className="top">
                <div className="topLogo">
                  <Calendar />
                </div>
                School and college search
              </div>
              <div className="textBottom3">
                Effortlessly find the perfect K-12 school, college, or graduate
                program with our intuitive search system. Just enter a school&apos;s
                name or locality to explore options.
              </div>
            </div>

            <div className="topFeaturesDisplay fade-item">
              <div className="top">
                <div className="topLogo">
                  <Rotate3DIcon />
                </div>
                AI-Powered University Roadmap
              </div>
              <div className="textBottom3">
                Get a personalized step-by-step roadmap to your dream
                university, helping you build a strong academic profile, craft
                standout applications, and excel in extracurricular activities.
              </div>
            </div>

            <div className="topFeaturesDisplay fade-item">
              <div className="top">
                <div className="topLogo">
                  <Bot />
                </div>
                Next-AI bot
              </div>
              <div className="textBottom3">
                NEXT-AI is specifically designed to give step by step roadmap
                providing all the details and recommendations on resume
                building, application letter, and more.
              </div>
            </div>

            <div className="topFeaturesDisplay fade-item">
              <div className="top">
                <div className="topLogo">
                  <UsersRound />
                </div>
                Seamless Support & Guidance
              </div>
              <div className="textBottom3">
                From FAQs to personalized assistance, our dedicated support team
                is always available to help you with any questions or concerns
              </div>
            </div>
          </div>
        </div>
        <div className="space"></div>
        <div className="space"></div>
        <div className="space"></div>
        <div className="space"></div>
        <div className="space"></div>
        <div className="space"></div>
        <div className="space"></div>
      </div>
    </>
  );
}

//=============================================================================
interface ItemProps {
  icon: React.ReactNode;
  text: string;
}

function Item({ icon, text }: ItemProps) {
  return (
    <div className="item">
      {icon}
      <span style={{ marginLeft: "4px" }}>{text}</span>
    </div>
  );
}

function MarqueeComponent() {
  return (
    <div className="scrollable">
      <div className="marquee">
        <Item icon={<Shield size={15} />} text="Privacy control" />
        <Item icon={<GitMergeIcon size={14} />} text="Resume sharing" />
        <Item icon={<Wifi size={15} />} text="University finder" />
        <Item icon={<Luggage size={17} />} text="1-1 counselling" />
        <Item icon={<Grid2X2Icon size={15} />} text="Advance AI bot" />

        {/* Duplicate items for infinite effect */}
        <Item icon={<Shield size={15} />} text="Privacy control" />
        <Item icon={<GitMergeIcon size={14} />} text="Resume sharing" />
        <Item icon={<Wifi size={15} />} text="University finder" />
        <Item icon={<Luggage size={17} />} text="1-1 counselling" />
        <Item icon={<Grid2X2Icon size={15} />} text="Advance AI bot" />
        <Item icon={<Shield size={15} />} text="Privacy control" />
        <Item icon={<GitMergeIcon size={14} />} text="Resume sharing" />
        <Item icon={<Wifi size={15} />} text="University finder" />
        <Item icon={<Luggage size={17} />} text="1-1 counselling" />
        <Item icon={<Grid2X2Icon size={15} />} text="Advance AI bot" />
        <Item icon={<Shield size={15} />} text="Privacy control" />
        <Item icon={<GitMergeIcon size={14} />} text="Resume sharing" />
        <Item icon={<Wifi size={15} />} text="University finder" />
        <Item icon={<Luggage size={17} />} text="1-1 counselling" />
        <Item icon={<Grid2X2Icon size={15} />} text="Advance AI bot" />
        <Item icon={<Shield size={15} />} text="Privacy control" />
        <Item icon={<GitMergeIcon size={14} />} text="Resume sharing" />
        <Item icon={<Wifi size={15} />} text="University finder" />
        <Item icon={<Luggage size={17} />} text="1-1 counselling" />
        <Item icon={<Grid2X2Icon size={15} />} text="Advance AI bot" />
        <Item icon={<Shield size={15} />} text="Privacy control" />
        <Item icon={<GitMergeIcon size={14} />} text="Resume sharing" />
        <Item icon={<Wifi size={15} />} text="University finder" />
        <Item icon={<Luggage size={17} />} text="1-1 counselling" />
        <Item icon={<Grid2X2Icon size={15} />} text="Advance AI bot" />
      </div>
    </div>
  );
}
