import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import TicketCta from "./TicketCta.jsx";
import { EVENT } from "../data/eventData.js";

const ROWS = [
  { label: "date", value: EVENT.dateLabelJa },
  { label: "venue", value: EVENT.venue },
  { label: "open", value: EVENT.open },
  { label: "start", value: EVENT.start },
  {
    label: "price",
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
    <section id="info" className="pad-tight">
      <div className="container container--narrow">
        <SectionTitle title="ライブ情報" seed={1} />

        <div className="info-table">
          {ROWS.map((row, i) => (
            <Reveal as="div" delay={i * 0.05} key={row.label} amount={0.4}>
              <div className="info-row">
                <span className="info-label">{row.label}</span>
                <span className="info-value">{row.value}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <TicketCta />
      </div>
    </section>
  );
}
