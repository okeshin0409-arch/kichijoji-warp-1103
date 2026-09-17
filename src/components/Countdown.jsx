import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EVENT, COUNTDOWN_START_DATE } from "../data/eventData.js";
import { getNow, isRevealed } from "../lib/reveal.js";

const TARGET_TS = new Date(`${EVENT.dateISO}T${EVENT.start}:00+09:00`).getTime();

function splitRemaining(ms) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const [now, setNow] = useState(() => getNow());

  useEffect(() => {
    const base = getNow();
    const baseSystemTime = Date.now();
    const id = setInterval(() => {
      setNow(new Date(base.getTime() + (Date.now() - baseSystemTime)));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (!isRevealed(COUNTDOWN_START_DATE, now)) return null;

  const { days, hours, minutes, seconds } = splitRemaining(TARGET_TS - now.getTime());

  const units = [
    { value: days, label: "DAYS" },
    { value: hours, label: "HOURS" },
    { value: minutes, label: "MIN" },
    { value: seconds, label: "SEC" },
  ];

  return (
    <motion.div
      className="countdown"
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      {units.map((u) => (
        <div className="countdown-unit" key={u.label}>
          <span className="num">{String(u.value).padStart(2, "0")}</span>
          <span className="unit-label">{u.label}</span>
        </div>
      ))}
    </motion.div>
  );
}
