"use client";
import { motion } from "framer-motion";
import TypedTitle from "./TypedTitle";

export default function ClientBlogTitle() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="text-3xl font-bold text-text-base"
    >
      <TypedTitle text="Blog" typeSpeed={32} />
    </motion.h1>
  );
}
