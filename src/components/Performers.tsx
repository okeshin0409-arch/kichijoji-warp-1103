import { performers } from "../data/eventData";

export default function Performers() {
  return (
    <section id="performers" className="section">
      <h2 className="section__title">出演者</h2>
      <ul className="performer-list">
        {performers.map((p) => (
          <li key={p.name} className="performer-card">
            <div className="performer-card__head">
              <span className="performer-card__name">{p.name}</span>
              <span className="performer-card__unit">{p.unit}</span>
              {p.status === "negotiating" && (
                <span className="badge badge--pending">交渉中</span>
              )}
            </div>
            {p.comment && <p className="performer-card__comment">{p.comment}</p>}
            {p.sns && (
              <a className="performer-card__sns" href={p.sns} target="_blank" rel="noreferrer">
                SNSを見る
              </a>
            )}
            {p.note && <p className="performer-card__note">{p.note}</p>}
          </li>
        ))}
      </ul>
      <p className="section__note">
        ※ 出演者は交渉が確定次第、順次追加していきます。
      </p>
    </section>
  );
}
