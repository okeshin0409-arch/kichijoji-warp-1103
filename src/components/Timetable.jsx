import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import { PERFORMERS, TIMETABLE_HEAD } from "../data/eventData.js";
import { isRevealed, getNow } from "../lib/reveal.js";

export default function Timetable() {
  const now = getNow();

  return (
    <section id="timetable">
      <div className="container">
        <SectionTitle label="Timetable" title="タイムテーブル" />

        <Reveal>
          <div className="timetable-list">
            <div className="timetable-row">
              <div className="timetable-time">{TIMETABLE_HEAD.time}</div>
              <div className="timetable-main">
                <div className="timetable-note">{TIMETABLE_HEAD.label}</div>
              </div>
            </div>

            {PERFORMERS.map((p) => {
              const revealed = isRevealed(p.revealDate, now);
              return (
                <div className="timetable-row" key={p.order}>
                  <div className="timetable-time">{p.time}</div>
                  <div className="timetable-main">
                    {revealed ? (
                      <>
                        <div className="timetable-name">{p.name}</div>
                        <div className="timetable-unit">{p.unit}</div>
                      </>
                    ) : (
                      <div className="coming-soon">coming soon</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
