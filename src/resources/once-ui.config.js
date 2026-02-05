// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = "https://next-bench-dev.vercel.app";

// Import and set font for each variant
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
const style = {
  theme: "system", // dark | light | system
  neutral: "gray", // sand | gray | slate
  brand: "orange", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "indigo", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "contrast", // color | contrast | inverse
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "filled", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

// metadata for pages
const meta = {
  home: {
    path: "/",
    title: "Next Bench - Comprehensive Tool for students",
    description:
      "Next Bench is a comprehensive tool for students, that enables them to find the best universities and courses based on their preferences. ",
    image: "/images/og/og.png",
    canonical: "https://next-bench-dev.vercel.app",
    robots: "index,follow",
    alternates: [{ href: "https://next-bench-dev.vercel.app", hrefLang: "en" }],
  },
  // add more routes and reference them in page.tsx
};

// default schema data
const schema = {
  logo: "",
  type: "Startup",
  name: "Next Bench",
  description: meta.home.description,
  email: "nextbench@nextbench.com",
};

// social links
const social = {
  twitter: "https://www.twitter.com/nextbench",
  linkedin: "https://www.linkedin.com/company/nextbench/",
  discord: "https://discord.com/invite/5EyAQ4eNdS",
};

export { baseURL, fonts, style, meta, schema, social, dataStyle };
