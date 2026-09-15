import { eventInfo } from "../data/eventData";

export default function EventOverview() {
  return (
    <section id="overview" className="section">
      <h2 className="section__title">イベント概要</h2>
      <dl className="overview-list">
        <div className="overview-list__row">
          <dt>日時</dt>
          <dd>
            {eventInfo.date}　{eventInfo.schedule.open} OPEN
          </dd>
        </div>
        <div className="overview-list__row">
          <dt>会場</dt>
          <dd>{eventInfo.venue}</dd>
        </div>
        <div className="overview-list__row">
          <dt>内容</dt>
          <dd>{eventInfo.concept}</dd>
        </div>
      </dl>
    </section>
  );
}
