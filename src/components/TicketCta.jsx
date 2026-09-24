import Reveal from "./ui/Reveal.jsx";
import { EVENT } from "../data/eventData.js";

// ライブ情報の下に置く、チケット取り置きへの大きめボタン。
//
// 施主の運用方針変更により、取り置きは Google フォームで受け付ける
// ことになった（サイト上の入力フォームは廃止）。フォームのURLは
// まだ届いていないため、EVENT.ticketFormUrl が空の間はリンク切れの
// ボタンを置かず、同じ見た目のまま押せない状態で
// 「取り置き受付 coming soon」と表示する。URLが入り次第、
// 自動で通常の（新しいタブで開く）リンクボタンに切り替わる。
//
// ナビの `ticket` リンクはこの外枠（id="ticket"）へスクロールする。
export default function TicketCta() {
  const url = EVENT.ticketFormUrl;

  return (
    <Reveal delay={0.15}>
      <div className="ticket-cta-wrap" id="ticket">
        {url ? (
          <a
            className="btn-glow"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            チケット取り置きはこちら
            <span className="arrow">→</span>
          </a>
        ) : (
          <span
            className="btn-glow btn-glow--disabled"
            role="button"
            aria-disabled="true"
          >
            取り置き受付 coming soon
          </span>
        )}
      </div>
    </Reveal>
  );
}
