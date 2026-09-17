import Reveal from "./Reveal.jsx";

// セクション見出し：欧文の小さいラベル（大文字・letter-spacing）＋和文見出しの2段組。
export default function SectionTitle({ label, title, sub }) {
  return (
    <Reveal as="div" className="section-title">
      <span className="label">{label}</span>
      <h2>{title}</h2>
      {sub ? <p className="sub">{sub}</p> : null}
    </Reveal>
  );
}
