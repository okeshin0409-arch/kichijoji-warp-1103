// 現在時刻の取得（カウントダウン用）
//
// 【J-11】以前は「毎週水曜に出演者などを自動で解禁する」仕組み（isRevealed）が
// ここにあったが、施主の判断で解禁の仕組み自体をやめ、最初から全情報を
// 表示する形にした。残っているのはカウントダウンが使う現在時刻の取得と、
// ?preview=YYYY-MM-DD で任意の日の見え方を確認するための補助だけ。

const JST_OFFSET = "+09:00";

/**
 * URL の ?preview=2026-11-02 パラメータを見て、その日の日本時間 正午を
 * 「現在時刻」として扱う（カウントダウンの見え方の確認用）。
 * プレビュー指定がなければ実際の現在時刻を返す。
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
