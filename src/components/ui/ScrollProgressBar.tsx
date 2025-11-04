"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.2,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[70] h-1 bg-transparent">
      <motion.div
        style={{ scaleX: width, transformOrigin: "0% 50%" }}
        className="h-full w-full bg-primary-blue shadow-md"
      />
    </div>
  );
}
