// 「弾き語り × バー × フリマ」のような、区切り記号でつながった
// 複数パーツから成る見出しを、狭い画面幅でも見苦しく折り返さないための
// 共通パーツ。
//
// 各トークンを display:inline-block（改行禁止）にした上で、
// トークンとトークンの間にだけ折り返し可能な余白を置く。
// こうすると、ブラウザは「単語の内部」や「× の直前直後の1文字」ではなく、
// 必ずトークンの境目でしか改行できなくなる。
export default function NoWrapPhrase({ tokens, className = "" }) {
  return (
    <span className={`nowrap-phrase ${className}`.trim()}>
      {tokens.map((token, i) => (
        <span className="nowrap-phrase-token" key={`${token}-${i}`}>
          {token}
        </span>
      ))}
    </span>
  );
}
