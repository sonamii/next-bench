import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import AnimatedCursor from "react-animated-cursor";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
/**
 * Geist Sans is a sans-serif font used in the application.
 * The `variable` property is used to define the variable name for the font.
 * The `subsets` property is used to define the subsets of the font to import.
 * The `latin` subset is the only subset used in the application.
 * The font is imported from Google Fonts.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Geist Mono is a monospace font used in the application.
 * The `variable` property is used to define the variable name for the font.
 * The `subsets` property is used to define the subsets of the font to import.
 * The `latin` subset is the only subset used in the application.
 * The font is imported from Google Fonts.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
//?wh
/**
 * The metadata object is used to define metadata for the entire application.
 * This metadata is used to generate the HTML document's `<head>` element.
 *
 * The object contains three properties: `title`, `description`, and `openGraph`.
 * The `title` property is a string that defines the title of the HTML document.
 * The `description` property is a string that defines the description of the HTML document.
 * The `openGraph` property is an object that defines the Open Graph metadata for the application.
 * The `twitter` property is an object that defines the Twitter metadata for the application.
 *
 * The `openGraph` object contains three properties: `title`, `description`, and `images`.
 * The `title` property is a string that defines the title of the Open Graph metadata.
 * The `description` property is a string that defines the description of the Open Graph metadata.
 * The `images` property is an array of strings that defines the images to be used as the Open Graph metadata.
 *
 * The `twitter` object contains four properties: `card`, `title`, `description`, and `images`.
 * The `card` property is a string that defines the type of Twitter card to be used.
 * The `title` property is a string that defines the title of the Twitter card.
 * The `description` property is a string that defines the description of the Twitter card.
 * The `images` property is an array of strings that defines the images to be used as the Twitter card.
 */
export const metadata: Metadata = {
  title: "Next Bench by Sonamii",
  description:
    "Next Bench is a user-friendly web application that helps students to find the best institutions, offering advanced search and school comparisons.",

  openGraph: {
    title: "Next Bench by Sonamii",
    description:
      "Next Bench is a user-friendly web application that helps students to find the best institutions, offering advanced search and school comparisons.",
    images: ["/ogFinal.png"], // Assuming the image is at /public/thumbnail.png
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Bench by Sonamii",
    description:
      "Next Bench is a user-friendly web application that helps students to find the best institutions, offering advanced search and school comparisons.",
    images: ["/ogFinal.png"],
  },
};

/**
 * The root layout component. This component wraps all pages and is only
 * rendered on the server. It is used to define the overall structure of the
 * HTML document, including the `<html>` and `<body>` tags.
 *
 * @param {{ children: React.ReactNode }} props The props object
 * @returns {JSX.Element} The root layout element
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <Analytics />
        <SpeedInsights />
        {/* <AnimatedCursor
          innerSize={6}
          outerSize={41}
          innerScale={1}
          outerScale={1.7}
          outerAlpha={0}
          innerStyle={{
            backgroundColor: "#EF9720",
            zIndex: "9999 !important",
          }}
          outerStyle={{
            border: "1px solid #414141",
            zIndex: "9999 !important",
          }}
        /> */}

        {children}
      </body>
    </html>
  );
}
