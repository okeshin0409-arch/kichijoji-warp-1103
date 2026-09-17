import Reveal from "./ui/Reveal.jsx";

// セクション3の直下に置く、チケット取り置きへの大きめボタン。
export default function TicketCta() {
  return (
    <Reveal delay={0.15}>
      <div className="ticket-cta-wrap">
        <a className="btn-glow" href="#ticket">
          チケット取り置きはこちら
          <span className="arrow">→</span>
        </a>
      </div>
    </Reveal>
  );
}
