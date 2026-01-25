const pricingPlans = [
  {
    icon: "userOutline",
    iconText: "Basic",

    monthlyPrice: "Free",
    title: "Ideal for group of students",
    description:
      "Institutes searching, Application tracking, Personalized advice, Support, Career prospects, Admission updates",
    buttonText: "Get Started",
    originalPrice: "",
    buttonLink: "/",
  },
  {
    icon: "luggageOutline",
    iconText: "Pro",
    tagText: "Popular",
    monthlyPrice: "349",
    title: "Ideal for group of students",
    description:
      "All feautres of BASIC, Agentic AI automation, Priority call support, 24/7 support, Interview preparation, Outreach access, Admission updates, Career prospects, Counseling, Access to verified voting",
    buttonText: "Get Started",
    originalPrice: "749",
    buttonLink: "/",
  },
  {
    icon: "buildingOutline",
    iconText: "Exceptional",
    tagText: "Best Value",
    monthlyPrice: "749",
    originalPrice: "1549",
    title: "Ideal for group of students",
    description:
      "All feautres of PRO, Free counseling, Unlimited AI uses*, Unlimited outreach access*, Universitiy application tracking, NextAI access",
    buttonText: "Get Started",
    buttonLink: "/",
    toc: true,
  },
];

const companyLogo =
  "https://media.licdn.com/dms/image/v2/D560BAQFyPNfJhr3kZw/company-logo_100_100/B56Zs1v9oTKIAM-/0/1766133325738?e=1770854400&v=beta&t=c7QJ4ZxcL1Q7BexaTjs_hyBo8SWCDgPMQA0BUDl5WlQ";

import { Geist,DM_Mono } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

const mono = DM_Mono({
    subsets: ["latin"],
    weight: "300"
});
export { pricingPlans, companyLogo, geist,mono   };
