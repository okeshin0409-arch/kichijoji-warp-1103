import { useState } from "react";
import { eventInfo } from "../data/eventData";

const links = [
  { href: "#overview", label: "イベント概要" },
  { href: "#timetable", label: "タイムテーブル" },
  { href: "#performers", label: "出演者" },
  { href: "#fleamarket", label: "フリマ" },
  { href: "#bar", label: "バー" },
  { href: "#tickets", label: "チケット" },
  { href: "#access", label: "アクセス" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="#top" className="site-header__logo">
          {eventInfo.name}
        </a>
        <button
          className="site-header__menu-btn"
          aria-label="メニューを開く"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav className={`site-nav ${open ? "site-nav--open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
