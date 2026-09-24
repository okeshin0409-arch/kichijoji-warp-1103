import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENT } from "../data/eventData.js";

const LINKS = [
  { href: "#info", label: "info" },
  { href: "#performers", label: "line up" },
  { href: "#ticket", label: "ticket" },
  { href: "#access", label: "access" },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.72);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <motion.nav
        className={`nav${visible ? " is-visible" : ""}`}
        initial={{ opacity: 0, y: -16 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href="#top" className="nav-brand">
          {EVENT.name}
        </a>
        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="nav-toggle"
          aria-label="メニューを開く"
          onClick={() => setDrawerOpen(true)}
        >
          ☰
        </button>
      </motion.nav>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="nav-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              type="button"
              className="nav-drawer-close"
              aria-label="メニューを閉じる"
              onClick={closeDrawer}
            >
              ×
            </button>
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={closeDrawer}>
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
