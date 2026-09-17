// 解禁（reveal）判定ロジック
//
// 毎週水曜に情報を小出しにする運用のため、"日付が来たら自動で表示が切り替わる"
// 必要がある（再デプロイ不要）。判定はすべて日本時間（JST, UTC+9）の
// 0:00 を基準にする。

const JST_OFFSET = "+09:00";

/**
 * "2026-09-23" のような YYYY-MM-DD 文字列を、日本時間 0:00 の
 * タイムスタンプ（ミリ秒）に変換する。
 */
function jstMidnightTimestamp(dateStr) {
  return new Date(`${dateStr}T00:00:00${JST_OFFSET}`).getTime();
}

/**
 * URL の ?preview=2026-10-14 パラメータを見て、施主が解禁後の見た目を
 * 事前に確認できるようにする。プレビュー指定がなければ実際の現在時刻を返す。
 *
 * プレビュー中は、その日付の日本時間 正午 を「現在時刻」として扱う
 * （日付単位の解禁判定には影響しない、分かりやすい代表時刻）。
 */
export function getNow() {
  if (typeof window === "undefined") return new Date();

  try {
    const params = new URLSearchParams(window.location.search);
    const preview = params.get("preview");
    if (preview && /^\d{4}-\d{2}-\d{2}$/.test(preview)) {
      const t = new Date(`${preview}T12:00:00${JST_OFFSET}`);
      if (!Number.isNaN(t.getTime())) return t;
    }
  } catch (e) {
    // URL が読めない環境（テスト等）では実時間にフォールバック
  }

  return new Date();
}

/**
 * 現在プレビューモードかどうか、また指定されている日付文字列を返す。
 * 画面右下の PREVIEW 表示に使う。
 */
export function getPreviewParam() {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const preview = params.get("preview");
    if (preview && /^\d{4}-\d{2}-\d{2}$/.test(preview)) return preview;
  } catch (e) {
    // noop
  }
  return null;
}

/**
 * dateStr（"2026-09-23"）で示される解禁日を、now（省略時は getNow()）が
 * 過ぎているかどうかを判定する。日本時間 0:00 を基準にした「その日になったか」
 * の判定であり、時刻には依存しない。
 */
export function isRevealed(dateStr, now = getNow()) {
  if (!dateStr) return true;
  return now.getTime() >= jstMidnightTimestamp(dateStr);
}

const WEEKDAY_JA = ["日", "月", "火", "水", "木", "金", "土"];

/**
 * "2026-09-23" -> "9/23(水)" のように整形する。
 *
 * 【重要】ここは isRevealed 用の「JST 0:00 のタイムスタンプ」を経由しない。
 * 一度タイムスタンプ（UTC基準の絶対時刻）に変換してから getUTC* で読み戻すと、
 * JST 0:00 は UTC では前日 15:00 になるため、getUTCDate() が1日前の日付を
 * 返してしまう（実際にこのバグで曜日が1日ずれていた）。
 * dateStr はそもそも「その暦日」を表す文字列でしかないので、文字列の
 * 数値をそのままカレンダー計算に使う（タイムゾーン変換を一切挟まない）。
 */
export function formatRevealDate(dateStr) {
  const [year, month, date] = dateStr.split("-").map(Number);
  // Date.UTC はタイムゾーンを持たない「暦日としての曜日」を計算するためだけに使う。
  const weekdayIndex = new Date(Date.UTC(year, month - 1, date)).getUTCDay();
  const weekday = WEEKDAY_JA[weekdayIndex];
  return `${month}/${date}(${weekday})`;
}

/**
 * dateStr までの残り日数（日本時間の暦日ベース）。
 * 解禁日当日は 0、過ぎていれば負の値になる。
 */
export function daysUntil(dateStr, now = getNow()) {
  const target = jstMidnightTimestamp(dateStr);
  const nowMidnight = jstMidnightTimestamp(toJstDateStr(now));
  const diff = target - nowMidnight;
  return Math.round(diff / 86400000);
}

/**
 * Date オブジェクトを日本時間の "YYYY-MM-DD" に変換する内部ヘルパー。
 */
function toJstDateStr(date) {
  // date の UTC タイムスタンプに +9h して、UTC のカレンダー欄を JST とみなす
  const jst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const y = jst.getUTCFullYear();
  const m = String(jst.getUTCMonth() + 1).padStart(2, "0");
  const d = String(jst.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
