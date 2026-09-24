import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import PhotoPlaceholder from "./ui/PhotoPlaceholder.jsx";
import { ORGANIZERS } from "../data/eventData.js";
import { cornerRadius, tiltDeg } from "../lib/wobble.js";

// 件数が少ない（1〜2件）うちは、出演者と同じ縦型カードを使うと
// 1440px 幅では間延びして見える。横長カード（左に画像・右に文字）に
// 切り替えることで、少人数でも成立するレイアウトにする。
const HORIZONTAL_THRESHOLD = 2;

export default function Organizers() {
  // name が空のカードは描画しない（情報未支給のため）
  const entries = ORGANIZERS.filter((o) => o.name);
  const useHorizontal = entries.length <= HORIZONTAL_THRESHOLD;

  return (
    <section id="organizers" className="pad-tight">
      <div className="container">
        <SectionTitle title="主催・共催" seed={2} />

        <div className={useHorizontal ? "org-list" : "card-grid"}>
          {entries.map((org, i) => (
            <Reveal delay={i * 0.08} key={org.name}>
              <div
                className={useHorizontal ? "org-card" : "card"}
                style={{
                  borderRadius: cornerRadius(i + 5),
                  transform: `rotate(${tiltDeg(i + 5, 0.6).toFixed(2)}deg)`,
                }}
              >
                <div className={useHorizontal ? "org-card-media" : "card-media"}>
                  {org.logo ? (
                    <img src={org.logo} alt={org.name} />
                  ) : (
                    <PhotoPlaceholder index={i} />
                  )}
                </div>
                <div className={useHorizontal ? "org-card-body" : "card-body"}>
                  <span className="org-role">{org.role}</span>
                  <h3 className="card-name">{org.name}</h3>
                  {org.unit ? <p className="card-unit">{org.unit}</p> : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
