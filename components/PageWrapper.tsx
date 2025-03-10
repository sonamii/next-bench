// components/Layout.tsx
"use client"; // Required for using Framer Motion

import { motion } from "framer-motion";
import { ReactNode } from "react";

/**
 * PageWrapper
 * @description A wrapper component that wraps the page content and provides a fade-in animation
 * @param {ReactNode} children The content to be wrapped
 * @returns {JSX.Element} The wrapped content
 */
const PageWrapper = ({ children }: { children: ReactNode }) => {
  // Use the motion.div component from Framer Motion to provide a fade-in animation
  // The initial state is set to opacity: 0, so the content is not visible when the component mounts
  // The animate state is set to opacity: 1, so the content will fade in over time
  // The transition prop is used to customize the animation, with a duration of 0.5 seconds in this case
  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial state
      animate={{ opacity: 1 }} // Animate state
      transition={{ duration: 0.5 }} // Transition prop
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
