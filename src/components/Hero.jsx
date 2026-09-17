import { useState } from "react";
import { motion } from "framer-motion";
import { EVENT } from "../data/eventData.js";
import NoWrapPhrase from "./ui/NoWrapPhrase.jsx";

const EASE_OUT = [0.16, 1, 0.3, 1];

const titleContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.5,
    },
  },
};

const titleLine = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE_OUT },
  },
};

export default function Hero() {
  const [veilGone, setVeilGone] = useState(false);

  return (
    <section id="top" className="hero">
      {/* 1. 全画面ベール → 900ms で opacity 0 へ */}
      <motion.div
        className="hero-veil"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        onAnimationComplete={() => setVeilGone(true)}
        style={{ pointerEvents: veilGone ? "none" : "auto" }}
      />

      <div className="hero-bg">
        <motion.img
          src="/images/hero-placeholder.jpg"
          alt="深い青紫の水中を漂うミズクラゲ"
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 1.6, ease: EASE_OUT },
            scale: { duration: 2.4, ease: EASE_OUT },
          }}
        />
      </div>

      <div className="hero-content">
        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.3 }}
        >
          {EVENT.dateLabel}
        </motion.span>

        <motion.h1
          className="hero-title"
          variants={titleContainer}
          initial="hidden"
          animate="show"
        >
          <motion.span className="line" variants={titleLine}>
            {EVENT.nameLines[0]}
          </motion.span>
          <motion.span className="line" variants={titleLine}>
            <NoWrapPhrase tokens={EVENT.nameLine2Tokens} />
          </motion.span>
        </motion.h1>

        <motion.div
          className="hero-meta"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.0 }}
        >
          <span>{EVENT.venue}</span>
          <span>
            OPEN {EVENT.open} / START {EVENT.start}
          </span>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <span>SCROLL</span>
        <span className="stem" />
      </motion.div>
    </section>
  );
}
