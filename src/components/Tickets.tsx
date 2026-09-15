import { pricing, performanceTerms } from "../data/eventData";
import TicketForm from "./TicketForm";

export default function Tickets() {
  return (
    <section id="tickets" className="section section--alt">
      <h2 className="section__title">チケット</h2>
      <ul className="price-list">
        <li>
          <span>前売</span>
          <span>¥{pricing.advance.toLocaleString()}</span>
        </li>
        <li>
          <span>当日</span>
          <span>¥{pricing.door.toLocaleString()}</span>
        </li>
        <li>
          <span>U23</span>
          <span>¥{pricing.under23.toLocaleString()}</span>
        </li>
      </ul>
      {pricing.note && <p className="section__note">{pricing.note}</p>}
      <p className="section__note">
        出演時間 {performanceTerms.duration} ／ {performanceTerms.noruma} ／{" "}
        {performanceTerms.back}
      </p>

      <h3 className="section__subtitle">チケット取り置き申し込み</h3>
      <TicketForm />
    </section>
  );
}
