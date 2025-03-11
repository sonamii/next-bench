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

/**
 * The homepage of the website. This is the entry point for the app.
 */
export default function Home() {
  /**
   * State variable to track if the page is visible or not.
   */
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Set the component as visible after a 100ms delay
   * This is done to prevent the component from being visible
   * before the animation is done, which can cause a flicker
   */
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  /**
   * Adds a scroll event listener to adjust the position of the navigation bar
   * based on the scroll position and window width. The navigation bar's top
   * position is set to 20px if the window width is greater than 500px or if
   * the scroll position exceeds 20px. Otherwise, it is set to 70px.
   * The event listener is cleaned up on component unmount.
   */
  React.useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector(".nav");
      if (nav && nav instanceof HTMLElement) {
        const top =
          window.innerWidth > 500 ? 20 : window.scrollY > 20 ? 20 : 70;
        nav.style.setProperty("top", `${top}px`, "important");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**
   * Fetches the user's email from Supabase and updates the user's email
   * and name in the "users" table if the email has changed since the last
   * login. If the email has not changed, a welcome back message is displayed.
   * If there is an error fetching the user, an error message is displayed.
   * If there is an error updating the user, an error message is displayed.
   * If the user is updated successfully, a success message is displayed.
   */
  useEffect(() => {
    /**
     * Fetches the user's email from Supabase and updates the user's email
     * and name in the "users" table if the email has changed since the last
     * login. If the email has not changed, a welcome back message is displayed.
     * If there is an error fetching the user, an error message is displayed.
     * If there is an error updating the user, an error message is displayed.
     * If the user is updated successfully, a success message is displayed.
     */
    const getUserEmail = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        // If there is an error fetching the user, display an error message
        toast.error("Error fetching user email: " + error.message);
      } else {
        // Check if the email has changed since the last login
        if (data?.user?.email != localStorage.getItem("email")) {
          // If the email has changed, display an error message
          toast.error("Recent email change detected.");

          if (data?.user?.email) {
            // Update the local email
            localStorage.setItem("email", data.user.email);
            console.log("Local email: " + localStorage.getItem("email"));

            // Fetch the session
            const session = await supabase.auth.getSession();
            if (session.error) {
              // If there is an error fetching the session, display an error message
              toast.error("Error fetching session: " + session.error.message);
            } else {
              // Get the session ID
              const sessionId = session.data.session?.user.id;

              // Get the new email and name
              const newEmail = data.user.email;
              const newName = newEmail.split("@")[0];

              // Update the user's email and name in the "users" table
              const { error: updateError } = await supabase
                .from("users")
                .update({ email: newEmail, name: newName })
                .eq("id", sessionId);

              if (updateError) {
                // If there is an error updating the user, display an error message
                toast.error("Error updating user: " + updateError.message);
              } else {
                // If the user is updated successfully, display a success message
                toast.success("User updated successfully.");
              }
            }
          }
        } else {
          // If the email has not changed, display a welcome back message
          toast.success("Welcome back, " + data?.user?.email);
        }
      }
    };
    getUserEmail();
  }, []);

  // The below code is the React component for the main landing page.
  // It renders a background image, a header with a release code,
  // a navbar, a space to separate the navbar from the main content,
  // and the main content itself.
  // The main content includes a container with an initial details section,
  // a features section, and a call to action section.
  // The initial details section includes an image, a heading, and a paragraph.
  // The features section includes a heading and a grid of feature cards.
  // The call to action section includes a heading and a button.
  return (
    <>
      {/* BACKGROUND IMAGE FOR GRID*/}
      <div className="background"></div>
      {/* HEADER WITH RELEASE CODE*/}
      <div className="header">
        <code className="releaseCode">&nbsp;v0.1.0.beta-1</code>
        released. SignUp Now!
      </div>
      {/* NAVBAR START*/}
      <Nav />
      {/* NAVABR END*/}
      <div className="space"></div>
      {/* MAIN LANDING PAGE START*/}
      <div className={`containerMain ${isVisible ? "fade-in" : ""}`}>
        {/* INITIAL DETAILS START*/}

        {/* LOGO */}
        <Link href="/">
          {" "}
          <div className="logo fade-item">
            <Image src="/logoMain.svg" alt="Logo" width={25} height={25} />
          </div>
        </Link>
        <div className="space-s"></div>
        {/* MEMBERS */}
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
        {/* HEADING */}
        <div className="textTop fade-item">
          Find the perfect school that fits your child.{" "}
        </div>
        <div className="space-xs"></div>
        {/* PARAGRAPH */}
        <div className="textBottom fade-item">
          Finding the right school should be easy. Whether it&apos;s K-12,
          college, or grad school, we simplify your search.
        </div>
        <div className="space-s"></div>
        {/* FORM */}
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
        {/* FEATURES */}
        <div className="features fade-item">
          <div className="textTop fade-item">Our top notch features</div>
          <div className="space-xs"></div>
          <MarqueeComponent />
        </div>
        {/* INITIAL DETAILS END*/}

        <div className="space"></div>
        <div className="space"></div>

        {/*TOP FEATURES START */}
        {/* TOP FEATURES START */}
        {/* TOP FEATURES CONTAINER */}
        <div className="topFeatures fade-item">
          {/* LEFT CONTAINER */}
          <div className="left">
            {/* BADGE CONTAINER */}
            <div className="badge fade-item">
              <Star size={15} style={{ marginRight: "5px" }} />
              Top features
            </div>
            {/* HEADING */}
            <div className="textTop2 fade-item">
              Unleashing power through Top features
            </div>
            {/* PARAGRAPH */}
            <div className="textBottom3 fade-item">
              Find, Compare, and Apply - Simplifying Education & Tutoring
              Searches
            </div>
            <div className="space-xs"></div>
            {/* BADGE CONTAINER */}
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
          {/* RIGHT CONTAINER */}
          <div className="right ">
            {/* TOP FEATURES DISPLAY */}
            <div className="topFeaturesDisplay fade-item">
              {/* TOP */}
              <div className="top">
                <div className="topLogo">
                  <Calendar />
                </div>
                School and college search
              </div>
              {/* PARAGRAPH */}
              <div className="textBottom3">
                Effortlessly find the perfect K-12 school, college, or graduate
                program with our intuitive search system. Just enter a
                school&apos;s name or locality to explore options.
              </div>
            </div>
            {/* TOP FEATURES DISPLAY */}
            <div className="topFeaturesDisplay fade-item">
              {/* TOP */}
              <div className="top">
                <div className="topLogo">
                  <Rotate3DIcon />
                </div>
                AI-Powered University Roadmap
              </div>
              {/* PARAGRAPH */}
              <div className="textBottom3">
                Get a personalized step-by-step roadmap to your dream
                university, helping you build a strong academic profile, craft
                standout applications, and excel in extracurricular activities.
              </div>
            </div>
            {/* TOP FEATURES DISPLAY */}
            <div className="topFeaturesDisplay fade-item">
              {/* TOP */}
              <div className="top">
                <div className="topLogo">
                  <Currency />
                </div>
                Admission Tracker & Comparison
              </div>
              {/* PARAGRAPH */}
              <div className="textBottom3">
                Keep track of your applications to schools, tuitions and compare
                shortlisted schools to make informed decisions with ease.
              </div>
            </div>
            {/* TOP FEATURES DISPLAY */}
            <div className="topFeaturesDisplay fade-item">
              {/* TOP */}
              <div className="top">
                <div className="topLogo">
                  <Bot />
                </div>
                Next-AI bot
              </div>
              {/* PARAGRAPH */}
              <div className="textBottom3">
                NEXT-AI is specifically designed to give step by step roadmap
                providing all the details and recommendations on resume
                building, application letter, and more.
              </div>
            </div>

            {/* TOP FEATURES DISPLAY */}
            <div className="topFeaturesDisplay fade-item">
              {/* TOP */}
              <div className="top">
                <div className="topLogo">
                  <UsersRound />
                </div>
                Seamless Support & Guidance
              </div>
              {/* PARAGRAPH */}
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
        {/* WHY US START*/}
        <div className="topFeatures topFeatures2 fade-item">
          {/* LEFT CONTAINER */}
          <div className="left">
            {/* BADGE CONTAINER */}
            <div className="badge fade-item">
              <SparklesIcon size={15} style={{ marginRight: "5px" }} />
              Why Next Bench?
            </div>
            {/* HEADING */}
            <div className="textTop2 fade-item">
              Why should you choose next bench?{" "}
            </div>
            {/* PARAGRAPH */}
            <div className="textBottom3 fade-item">
              Your One-Stop Platform for Finding Schools, Tuitions, and Teaching
              Opportunities All At ONE PLACE.
            </div>
            <div className="space-xs"></div>
            {/* USER CONTAINER */}
            <div className="userContainer fade-item">
              {/* USER ITEM */}
              <div className="item">
                <div className="text">800+</div>
                <div className="bottomText">User Views</div>
              </div>
              {/* USER ITEM */}
              <div className="item bordered">
                <div className="text">80+</div>
                <div className="bottomText">Active Users</div>
              </div>
              {/* USER ITEM */}
              <div className="item">
                <div className="text">4.7</div>
                <div className="bottomText">Rating</div>
              </div>
            </div>
          </div>
          {/* RIGHT CONTAINER */}
          <div className="right right2">
            {/* WHY US DISPLAY */}
            <div className="whyUsDisplay fade-item">
              {/* TOP */}
              <div className="top">
                <div className="topLogo">
                  <Search />
                </div>
                Easy search{" "}
              </div>
              {/* PARAGRAPH */}
              <div className="textBottom4">
                Find top schools, tuitions, and tutors in your area quickly.
              </div>
            </div>
            {/* WHY US DISPLAY */}
            <div className="whyUsDisplay fade-item">
              {/* TOP */}
              <div className="top">
                <div className="topLogo">
                  <Bot />
                </div>
                AI Guidance
              </div>
              {/* PARAGRAPH */}
              <div className="textBottom4">
                Get a personalized roadmap for success and other questions.
              </div>
            </div>
            {/* WHY US DISPLAY */}
            <div className="whyUsDisplay fade-item">
              {/* TOP */}
              <div className="top">
                <div className="topLogo">
                  <DonutIcon />
                </div>
                Simple Application
              </div>
              {/* PARAGRAPH */}
              <div className="textBottom4">
                Apply for tuitions, and teaching jobs hassle-free in one click.
              </div>
            </div>
            {/* WHY US DISPLAY */}
            <div className="whyUsDisplay fade-item">
              {/* TOP */}
              <div className="top">
                <div className="topLogo">
                  <Shield />
                </div>
                Trusted Network
              </div>
              {/* PARAGRAPH */}
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
        {/* ABOUT US START */}
        {/* TOP FEATURES START */}
        <div className="topFeatures topFeatures2 fade-item">
          {/* LEFT CONTAINER */}
          <div className="left">
            {/* BADGE CONTAINER */}
            <div className="badge fade-item">
              <WandIcon size={15} style={{ marginRight: "5px" }} />
              About Us
            </div>
            {/* HEADING */}
            <div className="textTop2 fade-item">
              Revolutionizing school searching{" "}
            </div>
            {/* PARAGRAPH */}
            <div className="textBottom3 fade-item">
              Next Bench, under Sonamii, is a startup which simplifies finding
              and applying to schools, universities, institutions, and tuitions
              in one click. You get all the important feature all in one place.
              With Next-AI, our smart AI agent, users get personalized guidance
              for admissions and profile building.
            </div>
            {/* BUTTON CONTAINER */}
            <div className="space-xxs"></div>
            <a href={"/auth/login"}>
              {" "}
              <div className="button">Pre-Login Now</div>
            </a>
            {/* USER CONTAINER */}
            <div className="space-xxs"></div>
            <div className="userContainer userContainer2 fade-item">
              {/* USER ITEM */}
              <div className="item">
                <div className="text">800+</div>
                <div className="bottomText">User Views</div>
              </div>
              {/* USER ITEM */}
              <div className="item bordered">
                <div className="text">80+</div>
                <div className="bottomText">Active Users</div>
              </div>

              {/* USER ITEM */}
              <div className="item">
                <div className="text">4</div>
                <div className="bottomText">Team Members</div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTAINER */}
          <div className="right">
            {/* IMAGE CONTAINER */}
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
        {/* TOP FEATURES END*/}
        {/* ABOUT US END*/}

        <div className="space"></div>
        <div className="space"></div>

        {/*SPONSERSHIPS START */}
        {/* SPONSERSHIPS START */}
        {/* 
          topFeatures is a container class for the Partnerships section
          It contains two main parts: left and right
          The left part contains the badge and the text
          The right part contains the partners' logos
        */}
        <div className="topFeatures topFeatures2 fade-item">
          {/* Left part of the container */}
          <div className="left">
            {/* Badge containing the Slack icon and the text 'Partners' */}
            <div className="badge fade-item">
              <Slack size={15} style={{ marginRight: "5px" }} />
              Partners
            </div>

            {/* Heading of the section */}
            <div className="textTop2  fade-item">
              Explore Our Trusted Partnerships{" "}
            </div>
            {/* Text describing the partnerships */}
            <div className="textBottom3 fade-item">
              Next Bench is backed by leading companies and institutions. Our
              trusted partners help us provide a seamless and secure experience
              for students, parents, and educators.
            </div>
          </div>

          {/* Right part of the container */}
          <div className="right textPartnership">
            {/* Container for the partners' logos */}
            <div className="partnersDisplay">
              {/* Figma */}
              <Figma />
            </div>
            {/* Container for the partners' logos */}
            <div className="partnersDisplay">
              {/* Gitlab */}
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
        {/* FOOTER START - This component is a footer for the main landing page. */}
        <div className="footer">
          {/* TOP - This div contains the logo of the company. */}
          <div className="top">
            {/* The logo is an SVG image. */}
            <Image
              src={"/logoFooter.svg"}
              alt="logo"
              width={230}
              height={230}
            ></Image>
          </div>

          {/* BOTTOM - This div contains the text and links of the footer. */}
          <div className="bottom">
            {/* Link to the top of the page. */}
            <a href={"#"}>
              {/* The text is " 2025 Sonamii. All rights reserved." */}
              <div className="text"> 2025 Sonamii. All rights reserved.</div>
            </a>

            {/* Link to the privacy policy page. */}
            <a href={""}>
              {/* The text is "Privacy Policy" and it is aligned to the right. */}
              <div className="right10vw text">Privacy Policy</div>
            </a>

            {/* Link to the Next-AI page. */}
            <a href={"/ai"}>
              {/* The text is "Try out Next-AI". */}
              <div className="text">Try out Next-AI</div>
            </a>
          </div>
        </div>
        {/* FOOTER END */}
        {/* FOOTER END*/}

        <div className="space-s"></div>
      </div>
      {/* MAIN LANDING PAGE END*/}
    </>
  );
}

//=============================================================================
/**
 * ItemProps is an interface that defines the properties of each item in the Marquee component.
 * The interface contains two properties: icon and text.
 * The icon property is of type React.ReactNode, which represents a React component.
 * The text property is of type string, which represents the text to be displayed in the item.
 */
interface ItemProps {
  icon: React.ReactNode;
  text: string;
}

/**
 * Item component renders an icon alongside a text label.
 *
 * @param {ItemProps} props - The properties for the component.
 * @param {React.ReactNode} props.icon - The icon to display.
 * @param {string} props.text - The text label to display next to the icon.
 * @returns {React.ReactElement} The rendered item component.
 */
function Item({ icon, text }: ItemProps) {
  return (
    <div className="item">
      {icon}
      <span style={{ marginLeft: "4px" }}>{text}</span>
    </div>
  );
}

/**
 * MarqueeComponent renders a scrollable marquee with repeated items for an infinite scrolling effect.
 *
 * @returns {React.ReactElement} The rendered marquee component.
 */
function MarqueeComponent() {
  return (
    <div className="scrollable">
      <div className="marquee">
        {/* Item components with icons and text */}
        <Item icon={<Shield size={15} />} text="Privacy control" />
        <Item icon={<GitMergeIcon size={14} />} text="Resume sharing" />
        <Item icon={<Wifi size={15} />} text="University finder" />
        <Item icon={<Luggage size={17} />} text="1-1 counselling" />
        <Item icon={<Grid2X2Icon size={15} />} text="Advance AI bot" />

        {/* Duplicate items for infinite scrolling effect */}
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
