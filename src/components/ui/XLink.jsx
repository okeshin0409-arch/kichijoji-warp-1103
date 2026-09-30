// 【J-9】個人のX（旧Twitter）アカウントへのリンクボタン。
// URL が空のときは何も描画しない（押しても何も起きないボタンは置かない）。
export default function XLink({ href, name, className = "" }) {
  if (!href) return null;
  return (
    <a
      className={`x-link ${className}`.trim()}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name}のX（旧Twitter）を開く（新しいタブで開きます）`}
      title={`${name}のX`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </a>
  );
}
