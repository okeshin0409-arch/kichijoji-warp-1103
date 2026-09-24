import { useLayoutEffect, useRef, useState } from "react";
import Reveal from "./Reveal.jsx";
import HandUnderline from "./HandUnderline.jsx";

// セクション見出し。
//
// 深海版は「大文字の英字ラベル→和文見出し」の2段組が全セクション共通で
// 中央揃えだった（SPEC2 原因①⑨）。ここでは原則左寄せにし、英字ラベルは
// 渡されたときだけ・小文字・見出しの脇に添える形にする。
// 下線は直線の border-bottom ではなく、seed ごとに揺れ方が変わる
// 手描き風 SVG（HandUnderline）。
//
// 【G-2】下線は以前「align=center なら130px、左寄せなら108px」という
// 固定幅を、コンテナの左端 or 中央に置いていた。これは
//  ・中央寄せの見出し：下線の幅と実際の文字幅が一致しないため、
//    中央揃えの基準点は同じでも左端はズレる
//  ・猫アイコン付きの見出し：文字はアイコン＋gap分だけ右にずれるが、
//    下線はコンテナの左端のまま
// という理由で、文字の左端と下線の左端が数十pxズレることがあった。
// 固定値で位置を決め打ちするのをやめ、実際に描画された見出し文字
// （h2）の位置と幅を実測し、その値をそのまま下線に反映することで、
// 揃え方（左/中央）やアイコンの有無に関わらず常に一致させる。
export default function SectionTitle({
  eyebrow,
  title,
  sub,
  align = "left",
  seed = 0,
  mascot = false,
}) {
  const containerRef = useRef(null);
  const h2Ref = useRef(null);
  const [underline, setUnderline] = useState(null); // { left, width }

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      const h2 = h2Ref.current;
      if (!container || !h2) return;
      const containerRect = container.getBoundingClientRect();
      const h2Rect = h2.getBoundingClientRect();
      // HandUnderline の手描きパスは、viewBox（幅236）の中で x=2 から
      // 始まる（線の丸い端が viewBox の外側で欠けないための余白）。
      // 下線の幅を見出しの実測幅に合わせて拡大縮小すると、この2単位分の
      // 余白も一緒に拡大され、幅が広い見出しほど「文字の左端」と
      // 「パスの描画開始点」のズレが大きくなる。あらかじめこの分だけ
      // 左にずらして相殺し、常にパスの描画開始点＝文字の左端にする。
      const PATH_INSET_RATIO = 2 / 236;
      setUnderline({
        left: h2Rect.left - containerRect.left - PATH_INSET_RATIO * h2Rect.width,
        width: h2Rect.width,
      });
    }

    measure();

    // Webフォント（Zen Old Mincho）の読み込みが遅れて文字幅が後から
    // 変わることがあるため、読み込み完了後に再計測する。
    let cancelled = false;
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) measure();
      });
    }

    // clamp() で見出しのフォントサイズが幅に応じて変わるため、
    // リサイズ時にも再計測する。
    window.addEventListener("resize", measure);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", measure);
    };
  }, [title, eyebrow, align, mascot]);

  return (
    <Reveal
      as="div"
      className={`section-title section-title--${align}`}
      tilt={false}
      ref={containerRef}
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
        <h2 ref={h2Ref}>{title}</h2>
        {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      </div>
      <HandUnderline
        seed={seed}
        width={underline ? underline.width : align === "center" ? 130 : 108}
        style={underline ? { marginLeft: underline.left } : undefined}
      />
      {sub ? <p className="sub">{sub}</p> : null}
    </Reveal>
  );
}
