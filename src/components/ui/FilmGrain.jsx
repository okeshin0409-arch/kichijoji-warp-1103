// 画面全体に固定されたフィルム粒子のオーバーレイ。
// sea.jpg のような、眠い光・低コントラスト・フィルム粒子の空気感を
// 画面全体にごく薄くかける。
//
// 深海版にあった発光オーブ・水中の粒子（Orbs.jsx）は削除し、これに置き換えた。
// 粒子はレンズ側にあるものなので、position:fixed でスクロールに追従させない。
export default function FilmGrain() {
  return (
    <div className="film-grain" aria-hidden="true">
      <svg width="100%" height="100%">
        <filter id="filmGrainFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.24
                    0 0 0 0 0.25
                    0 0 0 0 0.21
                    0 0 0 0.9 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#filmGrainFilter)" />
      </svg>
    </div>
  );
}
