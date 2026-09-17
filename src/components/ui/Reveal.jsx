import { motion } from "framer-motion";

// スクロール表示アニメーションの共通ラッパ。
// 仕様: opacity 0→1 / y 36→0 / blur(10px)→0、duration 1.1s、
// ease [0.16,1,0.3,1]、viewport once・amount 0.18。
// delay を渡すことで 0.08s 刻みの stagger を親側で組める。
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

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  amount = 0.18,
  ...rest
}) {
  const MotionTag = MOTION_TAGS[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
