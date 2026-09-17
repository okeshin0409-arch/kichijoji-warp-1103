import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import TicketCta from "./TicketCta.jsx";
import { EVENT } from "../data/eventData.js";

const CELLS = [
  { label: "Date", value: EVENT.dateLabelJa },
  { label: "Venue", value: EVENT.venue },
  { label: "Open", value: EVENT.open },
  { label: "Start", value: EVENT.start },
  {
    label: "Price",
    value: (
      <>
        前売 {EVENT.price.advance}
        <small>
          当日 {EVENT.price.door} / U23 {EVENT.price.u23}
        </small>
      </>
    ),
  },
];

export default function EventInfo() {
  return (
    <section id="info">
      <div className="container">
        <SectionTitle label="Live Info" title="ライブ情報" />

        <Reveal delay={0.05}>
          <div className="info-grid">
            {CELLS.map((cell, i) => (
              <div className="info-cell" key={cell.label}>
                <div className="info-label">{cell.label}</div>
                <div className="info-value">{cell.value}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <TicketCta />
      </div>
    </section>
  );
}
