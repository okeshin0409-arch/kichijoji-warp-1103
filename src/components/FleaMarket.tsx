import { fleaMarketVendors } from "../data/eventData";

export default function FleaMarket() {
  return (
    <section id="fleamarket" className="section section--alt">
      <h2 className="section__title">フリーマーケット</h2>
      {fleaMarketVendors.length === 0 ? (
        <p className="section__placeholder">
          出店者は現在交渉中です。決まり次第こちらに掲載します。
        </p>
      ) : (
        <ul className="vendor-list">
          {fleaMarketVendors.map((v) => (
            <li key={v.name} className="vendor-card">
              {v.name}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
