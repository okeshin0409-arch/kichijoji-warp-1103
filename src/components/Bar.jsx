import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import { BAR } from "../data/eventData.js";
import { cornerRadius, tiltDeg } from "../lib/wobble.js";

export default function Bar() {
  return (
    <section id="bar" className="pad-loose">
      <div className="container container--mid">
        <SectionTitle title="バー" seed={6} />

        <Reveal>
          <div
            className="coming-panel"
            style={{
              borderRadius: cornerRadius(10),
              transform: `rotate(${tiltDeg(10, 0.5).toFixed(2)}deg)`,
            }}
          >
            <p className="headline">{BAR.headline}</p>
            <p className="coming-soon">coming soon</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
