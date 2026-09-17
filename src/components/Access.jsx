import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import { ACCESS } from "../data/eventData.js";

export default function Access() {
  return (
    <section id="access" className="pad-normal">
      <div className="container">
        <SectionTitle title="アクセス" seed={8} />

        <div className="access-grid">
          <Reveal className="access-detail">
            <dl>
              <dt>venue</dt>
              <dd>{ACCESS.venue}</dd>
              <dt>address</dt>
              <dd>{ACCESS.address}</dd>
              <dt>tel</dt>
              <dd>{ACCESS.tel}</dd>
              <dt>access</dt>
              <dd>{ACCESS.directions}</dd>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <div className="map-frame-wrap">
                <iframe
                  title="吉祥寺WARP 地図"
                  src={ACCESS.mapsEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="access-directions">
                <a
                  className="btn-outline"
                  href={ACCESS.directionsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  吉祥寺駅から経路を見る →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
