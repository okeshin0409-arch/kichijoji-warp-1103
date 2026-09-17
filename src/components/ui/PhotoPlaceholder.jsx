// アー写・ロゴ画像が未支給のときに使う「意図されたデザインに見える」
// プレースホルダー。灰色の "No Image" 枠は使わない。
//
// 深海グラデーション（.deepsea-placeholder）の上に、
//  ・薄いクラゲのシルエット（SVG）
//  ・水面の光のゆらぎのような同心円（CSS側で実装）
//  ・出演順ナンバー（Cormorant Garamond の極細イタリック）
// を重ねる。
//
// 【色について】ベースの深海グラデーションはもともと青〜藍（hue 約240°）。
// カードごとの違いは "色相を大きく回す" のではなく、その青〜藍〜菫の帯の中で
// ごく僅かに色相を振り、代わりに明度・彩度・発光の強さで差をつける。
// 5枚並んだときに「一枚の深海の情景」に見えることを優先し、暖色（赤・橙・黄）
// には絶対に振らない。
export default function PhotoPlaceholder({ index = 0, order }) {
  // hue-rotate の入力はごく狭い範囲(-18°〜+18°)に固定。
  // ベース hue(約240°)±18° = 222°〜258° で、指定された 210°〜280° の帯の内側に収まる。
  const hueShift = ((index % 5) * 9 - 18).toFixed(0); // -18, -9, 0, 9, 18
  // 明度と彩度はカードごとにはっきり変える（これが5枚の差の主役）
  const brightness = (0.82 + (index % 5) * 0.09).toFixed(2); // 0.82 〜 1.18
  const saturate = (0.85 + (index % 5) * 0.07).toFixed(2); // 0.85 〜 1.13
  const gradId = `jelly-glow-${index}`;

  return (
    <div
      className="deepsea-placeholder"
      style={{
        "--hue": `${hueShift}deg`,
        "--bri": brightness,
        "--sat": saturate,
      }}
    >
      <svg
        className="placeholder-jelly"
        viewBox="0 0 200 220"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id={gradId} cx="50%" cy="38%" r="55%">
            <stop offset="0%" stopColor="rgba(238,240,255,0.85)" />
            <stop offset="55%" stopColor="rgba(201,199,255,0.32)" />
            <stop offset="100%" stopColor="rgba(201,199,255,0)" />
          </radialGradient>
        </defs>

        {/* 傘（ベル）部分 */}
        <path
          d="M38 92
             C38 46 68 26 100 26
             C132 26 162 46 162 92
             C162 116 146 128 128 130
             C118 131.5 109 130 100 130
             C91 130 82 131.5 72 130
             C54 128 38 116 38 92 Z"
          fill={`url(#${gradId})`}
        />
        <path
          d="M38 92 C38 46 68 26 100 26 C132 26 162 46 162 92"
          fill="none"
          stroke="rgba(238,240,255,0.4)"
          strokeWidth="1.2"
        />

        {/* 触手 */}
        <path
          d="M58 128 C50 150 62 164 54 188 C48 204 58 212 52 226"
          fill="none"
          stroke="rgba(238,240,255,0.32)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M80 131 C75 156 86 172 79 196"
          fill="none"
          stroke="rgba(238,240,255,0.26)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M100 131 C100 158 108 176 100 200"
          fill="none"
          stroke="rgba(238,240,255,0.3)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M120 131 C125 156 114 172 121 196"
          fill="none"
          stroke="rgba(238,240,255,0.26)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M142 128 C150 150 138 164 146 188 C152 204 142 212 148 226"
          fill="none"
          stroke="rgba(238,240,255,0.32)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>

      {order ? <span className="placeholder-order">{order}</span> : null}
    </div>
  );
}
