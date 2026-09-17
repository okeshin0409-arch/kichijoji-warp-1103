import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import { BAR } from "../data/eventData.js";
import { formatRevealDate, isRevealed, getNow } from "../lib/reveal.js";

export default function Bar() {
  const now = getNow();
  const detailRevealed = isRevealed(BAR.detailRevealDate, now);

  return (
    <section id="bar">
      <div className="container">
        <SectionTitle label="Bar" title="バー" />

        <Reveal>
          <div className="coming-panel">
            <p className="headline">{BAR.headline}</p>
            <p className="coming-soon">coming soon</p>
            {!detailRevealed ? (
              <p className="reveal-note">
                {formatRevealDate(BAR.detailRevealDate)} 詳細解禁
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
