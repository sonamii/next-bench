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
    monthlyPrice: "299",
    title: "Ideal for group of students",
    description:
      "All feautres of BASIC, Agentic AI automation, Priority call support, 24/7 support, Interview preparation, Outreach access, Admission updates, Career prospects, Counseling, Access to verified voting",
    buttonText: "Get Started",
    originalPrice: "499",
    buttonLink: "/",
  },
  {
    icon: "buildingOutline",
    iconText: "Exceptional",
    tagText: "Best Value",
    monthlyPrice: "499",
    originalPrice: "799",
    title: "Ideal for group of students",
    description:
      "All feautres of PRO, Free counseling, Unlimited AI uses*, Unlimited outreach access*, Universitiy application tracking, NextAI access",
    buttonText: "Get Started",
    buttonLink: "/",
    toc: true,
  },
];

const companyLogo =
  "https://media.licdn.com/dms/image/v2/D560BAQFyPNfJhr3kZw/company-logo_200_200/B56Zs1v9oTKIAE-/0/1766133325738?e=1775692800&v=beta&t=80EjYLG_aYBBOGITmzkI3EV5qs7kqeMUhX8lg22B4mY";

import { Geist,DM_Mono } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

const mono = DM_Mono({
    subsets: ["latin"],
    weight: "300"
});
export { pricingPlans, companyLogo, geist,mono   };
