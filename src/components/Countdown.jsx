import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EVENT } from "../data/eventData.js";
import { getNow } from "../lib/time.js";

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

  // 【J-11】以前は 10/28 から表示していたが、日付による切り替えをやめ、
  // 常に表示する。開演時刻（11/3 11:30）を過ぎたら「00 00 00 00」の
  // まま残らないよう、非表示にする。
  const remaining = TARGET_TS - now.getTime();
  if (remaining <= 0) return null;

  const { days, hours, minutes, seconds } = splitRemaining(remaining);

  const units = [
    { value: days, label: "days" },
    { value: hours, label: "hours" },
    { value: minutes, label: "min" },
    { value: seconds, label: "sec" },
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
