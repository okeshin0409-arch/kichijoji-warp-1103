// 見出しの下線。まっすぐな border-bottom ではなく、
// 手で引いたようにわずかに揺れた SVG のパスにする。
// seed によってパターンを変えるので、同じ下線の使い回しにならない。

const PATHS = [
  "M2 6.5 C 40 2.5, 78 9.5, 118 5 S 196 2, 234 6.5",
  "M2 5 C 46 9, 84 1.5, 120 6.5 S 190 2.5, 234 5.5",
  "M2 7 C 34 3, 92 9, 130 4 S 198 8.5, 234 4",
  "M2 4 C 54 8.5, 100 2, 140 8 S 200 4, 234 7",
  "M2 6 C 30 2, 70 9, 116 5.5 S 200 3, 234 6",
];

export default function HandUnderline({
  seed = 0,
  width = 150,
  className = "",
}) {
  const d = PATHS[Math.abs(seed) % PATHS.length];
  return (
    <svg
      className={`hand-underline ${className}`.trim()}
      viewBox="0 0 236 12"
      width={width}
      height={12}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={d} fill="none" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
