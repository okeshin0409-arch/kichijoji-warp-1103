import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import { FLEA_MARKET } from "../data/eventData.js";
import { formatRevealDate, isRevealed, getNow } from "../lib/reveal.js";

export default function FleaMarket() {
  const now = getNow();
  const detailRevealed = isRevealed(FLEA_MARKET.detailRevealDate, now);

  return (
    <section id="flea">
      <div className="container">
        <SectionTitle label="Flea Market" title="フリーマーケット" />

        <Reveal>
          <div className="coming-panel">
            <p className="headline">{FLEA_MARKET.headline}</p>
            <p className="coming-soon">coming soon</p>
            {!detailRevealed ? (
              <p className="reveal-note">
                {formatRevealDate(FLEA_MARKET.detailRevealDate)} 詳細解禁
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
