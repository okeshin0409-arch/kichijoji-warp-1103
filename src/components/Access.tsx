import { eventInfo } from "../data/eventData";

export default function Access() {
  return (
    <section id="access" className="section">
      <h2 className="section__title">アクセス</h2>
      <p>{eventInfo.venue}</p>
      {eventInfo.venueAddress ? (
        <p>{eventInfo.venueAddress}</p>
      ) : (
        <p className="section__placeholder">※ 住所・アクセス情報は追って掲載します。</p>
      )}
    </section>
  );
}
