import Reveal from "./Reveal.jsx";
import HandUnderline from "./HandUnderline.jsx";

// セクション見出し。
//
// 深海版は「大文字の英字ラベル→和文見出し」の2段組が全セクション共通で
// 中央揃えだった（SPEC2 原因①⑨）。ここでは原則左寄せにし、英字ラベルは
// 渡されたときだけ・小文字・見出しの脇に添える形にする。
// 下線は直線の border-bottom ではなく、seed ごとに揺れ方が変わる
// 手描き風 SVG（HandUnderline）。
export default function SectionTitle({
  eyebrow,
  title,
  sub,
  align = "left",
  seed = 0,
  mascot = false,
}) {
  return (
    <Reveal
      as="div"
      className={`section-title section-title--${align}`}
    >
      <div className="section-title-row">
        {mascot ? (
          <img
            className="section-title-cat"
            src="/images/cat.png"
            alt=""
            aria-hidden="true"
          />
        ) : null}
        <h2>{title}</h2>
        {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      </div>
      <HandUnderline seed={seed} width={align === "center" ? 130 : 108} />
      {sub ? <p className="sub">{sub}</p> : null}
    </Reveal>
  );
}
