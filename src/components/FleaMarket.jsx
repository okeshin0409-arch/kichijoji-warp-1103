import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import { FLEA_MARKET } from "../data/eventData.js";
import { formatRevealDate, isRevealed, getNow } from "../lib/reveal.js";
import { cornerRadius, tiltDeg } from "../lib/wobble.js";

export default function FleaMarket() {
  const now = getNow();
  const detailRevealed = isRevealed(FLEA_MARKET.detailRevealDate, now);

  return (
    <section id="flea" className="pad-loose">
      <div className="container container--mid">
        <SectionTitle title="フリーマーケット" seed={5} />

        <Reveal>
          <div
            className="coming-panel"
            style={{
              borderRadius: cornerRadius(9),
              transform: `rotate(${tiltDeg(9, 0.5).toFixed(2)}deg)`,
            }}
          >
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
