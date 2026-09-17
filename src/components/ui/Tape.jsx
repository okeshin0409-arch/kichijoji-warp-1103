// マスキングテープ風の小さな矩形。半透明の生成り、わずかに回転。
// パネルの角に1〜2箇所だけ使う（使いすぎない）。
export default function Tape({ rotate = -4, top, bottom, left, right, width = 62 }) {
  return (
    <span
      className="tape"
      style={{
        top,
        bottom,
        left,
        right,
        width,
        transform: `rotate(${rotate}deg)`,
      }}
      aria-hidden="true"
    />
  );
}
