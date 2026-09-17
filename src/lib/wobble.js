// 「手の痕跡」を出すための、決定的な擬似乱数ヘルパー。
//
// Math.random() は使わない（リロードのたびに配置が変わり、
// スクリーンショットでの確認や施主側での見え方が安定しないため）。
// 代わりに index から一意に決まる値を作る。同じ index なら常に同じ値。

/**
 * index から 0〜1 の擬似乱数を作る。
 * salt を変えると、同じ index からでも別系統の乱数列を得られる
 * （例：回転用と距離用で違う揺らぎにしたいとき）。
 */
export function pseudoRandom(index, salt = 37, mod = 11) {
  const n = ((index + 1) * salt) % mod;
  return n / mod;
}

/**
 * 紙を手で切ったような、四隅がバラバラの border-radius を作る。
 */
export function cornerRadius(index, base = 14, spread = 12) {
  const corner = (saltOffset) =>
    Math.round(base + pseudoRandom(index, 13 + saltOffset, 17) * spread);
  return `${corner(0)}px ${corner(1)}px ${corner(2)}px ${corner(3)}px`;
}

/**
 * -spread 〜 +spread deg のわずかな傾き。
 */
export function tiltDeg(index, spread = 1.6, salt = 53) {
  return (pseudoRandom(index, salt, 23) - 0.5) * 2 * spread;
}

/**
 * 羊毛フェルトのプレースホルダー用：カードごとに明度をわずかに変えて、
 * 同じ生地が5枚並んでも単調にならないようにする。
 */
export function woolTone(index) {
  // 明るい側の狭い範囲だけで振る（暗い側に振れると紙の地から
  // 重く浮いて見えるため）。saturate を落として、緑みの強い
  // オリーブ寄りの色を紙の暖かみに寄せる。
  const b = 0.99 + pseudoRandom(index, 43, 15) * 0.07; // 0.99〜1.06
  return `brightness(${b.toFixed(2)}) saturate(0.82)`;
}

/**
 * Reveal 用：要素ごとに移動距離・時間・回転をわずかに変える。
 */
export function revealVariance(index) {
  const a = pseudoRandom(index, 37, 11);
  const b = pseudoRandom(index, 71, 13);
  const c = pseudoRandom(index, 19, 9);
  return {
    distance: 14 + a * 16, // 14〜30px
    duration: 0.9 + b * 0.7, // 0.9〜1.6s
    rotate: (c - 0.5) * 2.4, // -1.2〜+1.2deg
  };
}
