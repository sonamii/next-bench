import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnimatedCursor from "react-animated-cursor";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Bench by Sonamii",
  description:
    "Next Bench is a user-friendly web application that helps students to find the best institutions, offering advanced search and school comparisons.",

  openGraph: {
    title: "Next Bench by Sonamii",
    description:
      "Next Bench is a user-friendly web application that helps students to find the best institutions, offering advanced search and school comparisons.",
    images: ["/og2.png"], // Assuming the image is at /public/thumbnail.png
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Bench by Sonamii",
    description:
      "Next Bench is a user-friendly web application that helps students to find the best institutions, offering advanced search and school comparisons.",
    images: ["/og2.png"],
  },
};

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
        <AnimatedCursor
          innerSize={6}
          outerSize={41}
          innerScale={1}
          outerScale={1.7}
          outerAlpha={0}
          innerStyle={{
            backgroundColor: "#EF9720",
          }}
          outerStyle={{
            border: "1px solid #414141",
          }}
        />

       

        {children}
      </body>
    </html>
  );
}
