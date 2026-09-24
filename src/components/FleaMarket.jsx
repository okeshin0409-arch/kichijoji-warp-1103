import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import { FLEA_MARKET } from "../data/eventData.js";
import { cornerRadius, tiltDeg } from "../lib/wobble.js";

export default function FleaMarket() {
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
