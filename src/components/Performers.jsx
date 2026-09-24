import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import PhotoPlaceholder from "./ui/PhotoPlaceholder.jsx";
import { PERFORMERS } from "../data/eventData.js";
import { isRevealed, getNow } from "../lib/reveal.js";
import { cornerRadius, tiltDeg } from "../lib/wobble.js";

export default function Performers() {
  const now = getNow();

  return (
    <section id="performers" className="pad-normal">
      <div className="container container--wide">
        <SectionTitle eyebrow="performers" title="出演者" seed={3} mascot />

        <div className="card-grid">
          {PERFORMERS.map((p, i) => {
            const revealed = isRevealed(p.revealDate, now);
            // 机に並べた写真のように、偶数番目を少し下にずらす
            // （3-3）。CSSの stagger-even/odd は 760px 以上でのみ有効。
            const staggerClass = i % 2 === 0 ? "stagger-odd" : "stagger-even";

            return (
              <Reveal delay={i * 0.07} key={p.order} className={staggerClass}>
                <div
                  className="card"
                  style={{
                    borderRadius: cornerRadius(i),
                    transform: `rotate(${tiltDeg(i, 0.9).toFixed(2)}deg)`,
                  }}
                >
                  <div className="card-media">
                    {revealed && p.photo ? (
                      <img src={p.photo} alt={p.name} />
                    ) : (
                      <PhotoPlaceholder
                        index={i}
                        order={String(p.order).padStart(2, "0")}
                      />
                    )}
                  </div>
                  <div className="card-body">
                    <p className="card-time">{p.time}</p>

                    {revealed ? (
                      <>
                        <h3 className="card-name">{p.name}</h3>
                        <p className="card-unit">{p.unit}</p>
                        {p.profile ? (
                          <p className="card-profile">{p.profile}</p>
                        ) : null}
                      </>
                    ) : (
                      <h3 className="coming-soon">coming soon</h3>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
