import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import PhotoPlaceholder from "./ui/PhotoPlaceholder.jsx";
import { PERFORMERS } from "../data/eventData.js";
import { isRevealed, formatRevealDate, getNow } from "../lib/reveal.js";

export default function Performers() {
  const now = getNow();

  return (
    <section id="performers">
      <div className="container">
        <SectionTitle
          label="Performers"
          title="出演者"
          sub="毎週水曜、出演者情報を少しずつ解禁していきます。"
        />

        <div className="card-grid">
          {PERFORMERS.map((p, i) => {
            const revealed = isRevealed(p.revealDate, now);

            return (
              <Reveal delay={i * 0.08} key={p.order}>
                <div className="card">
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
                      <>
                        <h3 className="coming-soon">coming soon</h3>
                        <p className="card-reveal-note">
                          {formatRevealDate(p.revealDate)} 解禁
                        </p>
                      </>
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
