import { EVENT } from "../data/eventData.js";
import NoWrapPhrase from "./ui/NoWrapPhrase.jsx";

export default function Footer() {
  const year = new Date(EVENT.dateISO).getFullYear();

  return (
    <footer className="footer">
      <div className="footer-row">
        <div>
          <div className="footer-brand">{EVENT.venue}</div>
          <div className="footer-meta">
            <NoWrapPhrase
              tokens={[`© ${year} ${EVENT.name}`, ...EVENT.subtitleTokens]}
            />
          </div>
        </div>
        {/* 脇役の羊毛フェルト猫（メインはフライヤーのキャラクター） */}
        <img
          className="footer-cat cat-bob"
          src="/images/cat.png"
          alt=""
          aria-hidden="true"
        />
      </div>
    </footer>
  );
}
