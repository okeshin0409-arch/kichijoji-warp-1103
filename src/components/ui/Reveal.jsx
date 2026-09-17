import { useState } from "react";
import { motion } from "framer-motion";
import { revealVariance } from "../../lib/wobble.js";

// スクロール表示アニメーションの共通ラッパ。
//
// 深海版は「全要素が36px・blur10px・1.1秒・同じイージング」で統一されて
// いたが、これは機械的に見える原因のひとつだった（SPEC2 原因⑥）。
// ここでは要素ごとに移動距離・所要時間・回転量をわずかに変える。
// ただし Math.random() は使わない（リロードで結果が変わると確認しづらい
// ため）。マウント順から決定的に導く pseudoRandom を使う。
const EASE = [0.16, 1, 0.3, 1];

const MOTION_TAGS = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  section: motion.section,
  article: motion.article,
};

// モジュール内で増え続けるカウンタ。ページ内に置かれた Reveal の
// 出現順を安定した「index」として使う（DOM順は毎回同じなので、
// これでリロードしても同じ配置になる）。
let mountOrder = 0;

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  amount = 0.18,
  seed,
  ...rest
}) {
  const [idx] = useState(() => (seed ?? mountOrder++));
  const { distance, duration, rotate } = revealVariance(idx);
  const MotionTag = MOTION_TAGS[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        y: distance,
        rotate,
        filter: "blur(7px)",
      }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
