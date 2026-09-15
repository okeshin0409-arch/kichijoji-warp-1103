import { eventInfo } from "../data/eventData";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__inner">
        <p className="hero__eyebrow">吉祥寺WARP 昼イベント</p>
        <h1 className="hero__title">{eventInfo.name}</h1>
        <p className="hero__date">{eventInfo.date}</p>
        <p className="hero__venue">{eventInfo.venue}</p>
        <p className="hero__concept">{eventInfo.concept}</p>
        <a className="hero__cta" href="#tickets">
          チケットを見る
        </a>
      </div>
    </section>
  );
}
