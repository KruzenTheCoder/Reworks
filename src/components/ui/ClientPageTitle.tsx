"use client";
import { motion } from "framer-motion";
import TypedTitle from "./TypedTitle";

export default function ClientPageTitle({
  text,
  className = "text-3xl font-bold text-text-base",
  viewportAmount = 0.6,
}: {
  text: string;
  className?: string;
  viewportAmount?: number;
}) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className={className}
    >
      <TypedTitle text={text} typeSpeed={32} />
    </motion.h1>
  );
}
