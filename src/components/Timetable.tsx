import { eventInfo } from "../data/eventData";

// TODO: 出演順・時間帯への出演者割り当てが決まったら、各行の performer を埋める
const rows: { time: string; label: string; performer?: string }[] = [
  { time: eventInfo.schedule.arrival, label: "出演者入り" },
  { time: eventInfo.schedule.rehearsal, label: "リハーサル" },
  { time: eventInfo.schedule.open, label: "OPEN（フード・バー・フリマ展開開始）" },
  { time: "11:30〜11:50", label: "弾き語り出演①" },
  { time: "12:00〜12:20", label: "弾き語り出演②" },
  { time: "12:30〜12:50", label: "弾き語り出演③" },
  { time: "13:00〜13:20", label: "弾き語り出演④" },
  { time: "13:30〜13:50", label: "弾き語り出演⑤" },
  { time: "14:00〜14:30", label: "弾き語り出演⑥（出演確定）" },
];

export default function Timetable() {
  return (
    <section id="timetable" className="section section--alt">
      <h2 className="section__title">タイムテーブル</h2>
      <ul className="timetable">
        {rows.map((r) => (
          <li key={r.label} className="timetable__row">
            <span className="timetable__time">{r.time}</span>
            <span className="timetable__label">
              {r.label}
              {r.performer && (
                <strong className="timetable__performer"> {r.performer}</strong>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="section__note">
        ※ 出演順・各枠の出演者は交渉の進捗に応じて更新します。
      </p>
    </section>
  );
}
