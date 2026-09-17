import { useState } from "react";
import { motion } from "framer-motion";
import { EVENT } from "../data/eventData.js";
import NoWrapPhrase from "./ui/NoWrapPhrase.jsx";
import Tape from "./ui/Tape.jsx";

const EASE_OUT = [0.16, 1, 0.3, 1];

const titleContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.45,
    },
  },
};

const titleLine = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: EASE_OUT },
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

      <div className="hero-grid">
        {/* 紙の上に1枚貼られた写真プリント、という構図にする。
            画面いっぱいの背景写真＋中央文字、という型をやめた
            （SPEC2 原因①への対処の中でも最大のもの）。 */}
        <div className="hero-photo-wrap">
          <motion.div
            className="hero-photo"
            initial={{ opacity: 0, scale: 1.04, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -1.5 }}
            transition={{ duration: 1.7, ease: EASE_OUT }}
          >
            <div className="paper-print">
              <img
                src="/images/sea.jpg"
                alt="眠い光の中、防波堤の先に凪いだ海が広がるフィルム写真"
              />
            </div>
            <Tape rotate={-6} top={-10} left={26} width={58} />
          </motion.div>

          <motion.img
            className="hero-cat cat-bob"
            src="/images/cat.png"
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: EASE_OUT }}
          />
        </div>

        <div className="hero-text">
          <motion.span
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 }}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.95 }}
          >
            <span>{EVENT.venue}</span>
            <span>
              OPEN {EVENT.open} / START {EVENT.start}
            </span>
          </motion.div>
        </div>
      </div>

      {/* 本文の続きに見えないよう、テキスト列から切り離してヒーロー
          全体の左下に独立して置く（下にスクロール、の意味を明確に）。 */}
      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <span className="stem" />
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
