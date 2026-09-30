import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import { PERFORMERS, TIMETABLE_HEAD } from "../data/eventData.js";

export default function Timetable() {
  return (
    <section id="timetable" className="pad-tight">
      <div className="container container--mid">
        <SectionTitle title="タイムテーブル" seed={4} />

        <Reveal>
          <div className="timetable-list">
            <div className="timetable-row">
              <div className="timetable-time">{TIMETABLE_HEAD.time}</div>
              <div className="timetable-main">
                <div className="timetable-note">{TIMETABLE_HEAD.label}</div>
              </div>
            </div>

            {PERFORMERS.map((p) => (
              <div className="timetable-row" key={p.order}>
                <div className="timetable-time">{p.time}</div>
                <div className="timetable-main">
                  <div className="timetable-name">{p.name}</div>
                  <div className="timetable-unit">{p.unit}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
