import { barMenu } from "../data/eventData";

export default function Bar() {
  return (
    <section id="bar" className="section">
      <h2 className="section__title">バー</h2>
      {barMenu.length === 0 ? (
        <p className="section__placeholder">
          メニューは準備中です。決まり次第こちらに掲載します。
        </p>
      ) : (
        <ul className="menu-list">
          {barMenu.map((item) => (
            <li key={item.name} className="menu-list__row">
              <span>{item.name}</span>
              {item.price != null && <span>¥{item.price.toLocaleString()}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
