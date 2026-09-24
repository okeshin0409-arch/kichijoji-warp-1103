import { useState } from "react";
import { motion } from "framer-motion";
import { EVENT } from "../data/eventData.js";
import NoWrapPhrase from "./ui/NoWrapPhrase.jsx";

const EASE_OUT = [0.16, 1, 0.3, 1];

// G-5：ファーストビューを作り直し。
// 施主のiPhone実機では、写真つき2カラム構成が縦に長くなりすぎて
// 「最初の画面の上に謎の空白があり、写真が中途半端な位置で切れる」
// 状態になっていた。写真をやめ、min-height: 100svh（iOSのアドレスバー
// の出し引きでも高さが変にジャンプしないよう vh ではなく svh を使う）
// の中でタイトル一式を縦中央に置くだけの、シンプルな構成に作り直す。
// 各要素は少しずつ間合いをずらしてふわっと現れる（Reveal と同じ
// 「blurから復帰＋わずかな上昇」の考え方をヒーロー専用に手で組む）。
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

      <div className="hero-inner">
        {/* 猫はヒーローに1匹だけ（施主曰く「メインキャラクター」）。
            以前はタイトルの右肩に重ねていたが、幅390pxでは猫がタイトル
            最後の文字「り」に被って読めなくなっていた（施主指摘）。
            企画名は一番読ませたい文字なので、絶対に文字へ重ねてはいけ
            ない。日付の行の上に、独立したブロックとして完全に離して
            置く方式に変更（通常のブロック要素の縦積みなので、幅に
            関わらず下のテキストと重なりようがない）。 */}
        <motion.img
          className="hero-cat cat-bob"
          src="/images/cat.png"
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.1 }}
        />

        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }}
        >
          {EVENT.dateLabel}
        </motion.span>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.45 }}
        >
          {EVENT.name}
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.75 }}
        >
          <NoWrapPhrase tokens={EVENT.subtitleTokens} />
        </motion.p>

        <motion.div
          className="hero-meta"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.05 }}
        >
          <span>{EVENT.venue}</span>
          <span>
            OPEN {EVENT.open} / START {EVENT.start}
          </span>
        </motion.div>
      </div>

      {/* スクロールするとすぐフライヤーが浮かび上がってくる、という
          流れの入口。画面下部に独立して置く（本文の続きに見せない）。 */}
      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="stem" />
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
