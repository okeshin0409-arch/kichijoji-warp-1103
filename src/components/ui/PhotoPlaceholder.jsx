import { woolTone } from "../../lib/wobble.js";

// アー写・ロゴ画像が未支給のときに使う「意図されたデザインに見える」
// プレースホルダー。
//
// 深海版はクラゲの SVG だった。リスキン直後は猫（cat.png）を判子として
// 使っていたが、出演者5枚すべてに同じ猫の写真が並ぶと「デザインでは
// なく不具合」に見え、来場者が猫を出演者だと誤解し、かつ「猫は使い
// すぎない」という指示にも反する、という指摘を受けた。
// → 猫はやめ、「アー写が入る前の、羊毛フェルトを貼った台紙」に。
// wool-tile.jpg を敷き、カードごとに明度だけをわずかに変えることで、
// 同じ生地でも5枚が単調に見えないようにしている。
export default function PhotoPlaceholder({ index = 0, order }) {
  return (
    <div className="photo-stamp" style={{ filter: woolTone(index) }}>
      <div className="photo-stamp-wool" />
      {order ? <span className="photo-stamp-order">{order}</span> : null}
    </div>
  );
}
