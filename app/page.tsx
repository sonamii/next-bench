"use client";
import {
  ArrowRight,
  BarChartBigIcon,
  Bot,
  Calendar,
  Currency,
  DonutIcon,
  Figma,
  Gitlab,
  GitMergeIcon,
  Grid2X2Icon,
  LucideCircuitBoard,
  Luggage,
  Rotate3DIcon,
  Search,
  Shapes,
  Shield,
  Slack,
  SparklesIcon,
  Star,
  UsersRound,
  WandIcon,
  Wifi,
} from "lucide-react";
import * as React from "react";

import "./style.css";
import Image from "next/image";
import { Nav } from "@/custom-components/nav/nav";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "@/services/supabase";
import { toast } from "sonner";

export default function Waitlist() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector(".nav");
      if (nav && nav instanceof HTMLElement) {
        if (window.innerWidth > 500) {
          nav.style.setProperty("top", "20px", "important");
        } else {
          if (window.scrollY > 20) {
            nav.style.setProperty("top", "20px", "important");
          } else {
            nav.style.setProperty("top", "70px", "important");
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getUserEmail = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        toast.error("Error fetching user email: " + error.message);
      } else {
        if (data?.user?.email != localStorage.getItem("email")) {
          toast.error("Recent email change detected.");

          if (data?.user?.email) {
            localStorage.setItem("email", data.user.email);
            console.log("Local email: " + localStorage.getItem("email"));
            const session = await supabase.auth.getSession();
            if (session.error) {
              toast.error("Error fetching session: " + session.error.message);
            } else {
              const sessionId = session.data.session?.user.id;
              const newEmail = data.user.email;
              const newName = newEmail.split("@")[0];

              const { error: updateError } = await supabase
                .from("users")
                .update({ email: newEmail, name: newName })
                .eq("id", sessionId);

              if (updateError) {
                toast.error("Error updating user: " + updateError.message);
              } else {
                toast.success("User updated successfully.");
              }
            }
          }
        } else {
          toast.success("Welcome back, " + data?.user?.email);
        }
      }
    };
    getUserEmail();
  }, []);

  return (
    <>
      {/* BACKGROUND IMAGE FOR GRID*/}
      <div className="background"></div>
      <div className="header">
        <code className="releaseCode">&nbsp;v0.1.0.alpha-2</code>
        released. SignUp Now!
      </div>{" "}
      {/* NAVBAR START*/}
      <Nav />
      {/* NAVABR END*/}
      <div className="space"></div>
      {/* MAIN LANDING PAGE START*/}
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        {/* INITIAL DETAILS START*/}

        <Link href="/">
          {" "}
          <div className="logo fade-item">
            <Image src="./logoMain.svg" alt="Logo" width={25} height={25} />
          </div>
        </Link>
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
              Join waitlist{" "}
              <ArrowRight size={14} style={{ marginLeft: "5px" }} />
            </div>
          </Link>
        </div>
        <div className="space-xs"></div>
        <div className="textTop fade-item">
          Find the perfect school that fits your child.{" "}
        </div>
        <div className="space-xs"></div>
        <div className="textBottom fade-item">
          Finding the right school should be easy. Whether it&apos;s K-12,
          college, or grad school, we simplify your search.
        </div>
        <div className="space-s"></div>
        <form
          className="inputContainer  fade-item"
          onSubmit={(e) => e.preventDefault()}
        >
          <Button onClick={() => (window.location.href = "/ai")}>
            Try it now
          </Button>
          <div className="buttonS">
            <a href={"/auth/signup"}>Sign Up</a>
          </div>
        </form>
        <div className="space-s"></div>
        <div className="features fade-item">
          <div className="textTop fade-item">Our top notch features</div>
          <div className="space-xs"></div>
          <MarqueeComponent />
        </div>
        {/* INITIAL DETAILS END*/}

        <div className="space"></div>
        <div className="space"></div>

        {/*TOP FEATURES START */}
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
                program with our intuitive search system. Just enter a
                school&apos;s name or locality to explore options.
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
                  <Currency />
                </div>
                Admission Tracker & Comparison
              </div>
              <div className="textBottom3">
                Keep track of your applications to schools, tuitions and compare
                shortlisted schools to make informed decisions with ease.
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
            {/* SPACE FOR RIGHT CONTAINER (TO MAKE IT OVERFLOW SO THAT THE SCROLLING LOOKS REAL)*/}
            <div className="space"></div>
            <div className="space"></div>
          </div>
        </div>
        {/* TOP FEATURES END*/}

        <div className="space"></div>

        {/* WHY US START*/}
        <div className="topFeatures topFeatures2 fade-item">
          <div className="left">
            <div className="badge fade-item">
              <SparklesIcon size={15} style={{ marginRight: "5px" }} />
              Why Next Bench?
            </div>
            <div className="textTop2 fade-item">
              Why should you choose next bench?{" "}
            </div>
            <div className="textBottom3 fade-item">
              Your One-Stop Platform for Finding Schools, Tuitions, and Teaching
              Opportunities All At ONE PLACE.
            </div>
            <div className="space-xs"></div>
            <div className="userContainer fade-item">
              <div className="item">
                <div className="text">200+</div>
                <div className="bottomText">User Views</div>
              </div>
              <div className="item bordered">
                <div className="text">10+</div>
                <div className="bottomText">Active Users</div>
              </div>
              <div className="item">
                <div className="text">4.7</div>
                <div className="bottomText">Rating</div>
              </div>
            </div>
          </div>
          <div className="right right2">
            <div className="whyUsDisplay fade-item">
              <div className="top">
                <div className="topLogo">
                  <Search />
                </div>
                Easy search{" "}
              </div>
              <div className="textBottom4">
                Find top schools, tuitions, and tutors in your area quickly.
              </div>
            </div>
            <div className="whyUsDisplay fade-item">
              <div className="top">
                <div className="topLogo">
                  <Bot />
                </div>
                AI Guidance
              </div>
              <div className="textBottom4">
                Get a personalized roadmap for success and other questions.
              </div>
            </div>
            <div className="whyUsDisplay fade-item">
              <div className="top">
                <div className="topLogo">
                  <DonutIcon />
                </div>
                Simple Application
              </div>
              <div className="textBottom4">
                Apply for tuitions, and teaching jobs hassle-free in one click.
              </div>
            </div>
            <div className="whyUsDisplay fade-item">
              <div className="top">
                <div className="topLogo">
                  <Shield />
                </div>
                Trusted Network
              </div>
              <div className="textBottom4">
                Connect ONLY with verified institutions and best tutors.
              </div>
            </div>
          </div>
        </div>
        {/* WHY US END */}

        <div className="space"></div>
        <div className="space"></div>

        {/*ABOUT US START */}
        <div className="topFeatures topFeatures2 fade-item">
          <div className="left">
            <div className="badge fade-item">
              <WandIcon size={15} style={{ marginRight: "5px" }} />
              About Us
            </div>
            <div className="textTop2 fade-item">
              Revolutionizing school searching{" "}
            </div>
            <div className="textBottom3 fade-item">
              Next Bench, under Sonamii, is a startup which simplifies finding
              and applying to schools, universities, institutions, and tuitions
              in one click. You get all the important feature all in one place.
              With Next-AI, our smart AI agent, users get personalized guidance
              for admissions and profile building.
            </div>
            <div className="space-xxs"></div>
            <a href={"/auth/login"}>
              {" "}
              <div className="button">Pre-Login Now</div>
            </a>
            <div className="space-xxs"></div>
            <div className="userContainer userContainer2 fade-item">
              <div className="item">
                <div className="text">200+</div>
                <div className="bottomText">User Views</div>
              </div>
              <div className="item bordered">
                <div className="text">10+</div>
                <div className="bottomText">Active Users</div>
              </div>

              <div className="item">
                <div className="text">4</div>
                <div className="bottomText">Team Members</div>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="imageCont">
              <Image
                src={"/aboutUsImg.png"}
                alt="Logo"
                width={440}
                height={440}
              ></Image>
            </div>
          </div>
        </div>
        {/* ABOUT US END*/}

        <div className="space"></div>
        <div className="space"></div>

        {/*SPONSERSHIPS START */}
        <div className="topFeatures topFeatures2 fade-item">
          <div className="left">
            <div className="badge fade-item">
              <Slack size={15} style={{ marginRight: "5px" }} />
              Partners
            </div>

            <div className="textTop2  fade-item">
              Explore Our Trusted Partnerships{" "}
            </div>
            <div className="textBottom3 fade-item">
              Next Bench is backed by leading companies and institutions. Our
              trusted partners help us provide a seamless and secure experience
              for students, parents, and educators.
            </div>
          </div>

          <div className="right textPartnership">
            <div className="partnersDisplay">
              <Figma />
            </div>{" "}
            <div className="partnersDisplay">
              <Gitlab />
            </div>
          </div>
        </div>
        {/*SPONSERSHIPS END */}

        <div className="space"></div>
        <div className="space"></div>

        {/*TESTIMONIALS START */}
        {/* <div className="topFeatures topFeatures2 fade-item">
          <div className="left">
            <div className="badge fade-item">
              <MessageCircle size={15} style={{ marginRight: "5px" }} />
              Testimonials
            </div>

            <div className="textTop2  fade-item">Coming Soon </div>
          </div>
        </div> */}
        {/*TESTIMONIALS END */}
        {/*FAQS START */}
        {/* <div className="topFeatures topFeatures2 fade-item">
          <div className="left">
            <div className="badge fade-item">
              <ShieldQuestion size={15} style={{ marginRight: "5px" }} />
              FAQs
            </div>
            <div className="textTop2  fade-item">Coming Soon </div>
          </div>
        </div> */}
        {/*FAQS END */}

        <div className="space"></div>

        {/* FOOTER START*/}
        <div className="footer">
          <div className="top">
            {" "}
            <Image
              src={"/logoFooter.svg"}
              alt="logo"
              width={230}
              height={230}
            ></Image>
          </div>
          <div className="bottom">
            <a href={"#"}>
              {" "}
              <div className="text">© 2025 Sonamii. All rights reserved.</div>
            </a>
            <a href={""}>
              {" "}
              <div className="right10vw text">Privacy Policy</div>
            </a>

            <a href={"/ai"}>
              {" "}
              <div className="text">Try out Next-AI</div>
            </a>
          </div>
        </div>
        {/* FOOTER END*/}

        <div className="space-s"></div>
      </div>
      {/* MAIN LANDING PAGE END*/}
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
