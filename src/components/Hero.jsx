import { useState } from "react";
import { motion } from "framer-motion";
import { EVENT } from "../data/eventData.js";
import NoWrapPhrase from "./ui/NoWrapPhrase.jsx";

const EASE_OUT = [0.16, 1, 0.3, 1];

// G-5：ファーストビューは min-height: 100svh の中にタイトル一式を
// 縦中央に置くシンプルな構成（iOSのアドレスバーの出し引きでも高さが
// 変にジャンプしないよう vh ではなく svh を使う）。
// 各要素は少しずつ間合いをずらしてふわっと現れる。
//
// 【J-5】メインキャラクターを、フライヤー第1弾のキャラクターに変更。
// フライヤーと同じく「画面の右端からのぞき込んでいる」構図で置く。
// 羊毛フェルトの猫は脇役に回し、ヒーローからは外した
// （出演者見出しのアイコンとフッターに小さく残している）。
// キャラクターが企画名などの文字に重なるのは厳禁（H-1 の教訓）。
//  ・スマホ〜タブレット：文字ブロックの下に「通常の流れ」で置き、右端へ
//    はみ出させる。縦に積むだけなので、幅に関わらず文字と重ならない。
//  ・広い画面（1200px〜）：左右に十分な余白があるので、画面右端・縦中央
//    からのぞく配置にする（文字列の右端との間に余白が残る幅でだけ使う）。
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
        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.2 }}
        >
          {EVENT.presenter}
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
          className="hero-date"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.95 }}
        >
          {EVENT.dateLabel}
        </motion.div>

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

      {/* メインキャラクター：右端の外から、そっとのぞき込んでくる。
          入場（横からスッと出てくる）は framer-motion、その後のゆらゆらは
          CSS アニメーション。同じ要素に両方をかけると transform が
          ぶつかるため、外側（入場）と内側（ゆらぎ）で要素を分けている。 */}
      <motion.div
        className="hero-chara"
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.3, ease: EASE_OUT, delay: 1.15 }}
      >
        <img
          className="hero-chara-img chara-sway"
          src="/images/chara.webp"
          alt=""
          aria-hidden="true"
        />
      </motion.div>

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
