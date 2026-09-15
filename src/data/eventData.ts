// =====================================================================
// イベント情報データ
// ここの値を書き換えるだけで、サイト内の各セクションの表示が更新されます。
// まだ決まっていない項目は "TODO: ..." というコメント付きで空/仮の値にしてあります。
// =====================================================================

export const eventInfo = {
  name: "11/3 吉祥寺WARP 弾き語り × バー × フリマ", // TODO: 正式な企画名が決まったら差し替え
  date: "2026年11月3日（火・文化の日）",
  venue: "吉祥寺WARP",
  // TODO: 会場の住所・アクセス情報（最寄り駅からの道順など）
  venueAddress: "",
  concept:
    "弾き語り出演 × バーテンダー × フリーマーケットを掛け合わせた、吉祥寺WARPの昼イベントです。",
  schedule: {
    arrival: "9:15", // 出演者入り
    rehearsal: "9:45〜10:15",
    open: "10:30", // フード・バー・フリマ展開開始
  },
};

export const pricing = {
  advance: 2300, // 前売
  door: 2800, // 当日
  under23: 1300, // U23
  // TODO: U23の年齢確認方法（学生証提示など）が決まったら注記を追加
  note: "",
};

export const performanceTerms = {
  duration: "20分",
  noruma: "ノルマ・機材費なし",
  back: "3枚目からハーフバック（通常条件）",
  // 個別に特例条件がある出演者は performers 側の note に記載
};

// 弾き語り出演者
// status: "confirmed" = 出演確定 / "negotiating" = 交渉中
export type PerformerStatus = "confirmed" | "negotiating";

export interface Performer {
  name: string;
  unit: string; // ユニット名・バンド名
  status: PerformerStatus;
  timeSlot?: string; // 出演時間帯（未割当なら空欄）
  sns?: string; // TODO: SNSリンク
  comment?: string; // TODO: プロフィール・一言コメント
  note?: string; // 特記事項（特例条件など）
}

export const performers: Performer[] = [
  { name: "ハシイユキネ", unit: "よすが", status: "confirmed" },
  { name: "梅サワ", unit: "海風邪 / Rhakka", status: "confirmed" },
  { name: "フクダチナツ", unit: "ウマシカて", status: "confirmed" },
  { name: "宝", unit: "nett!", status: "confirmed" },
  {
    name: "淡甘",
    unit: "終日柄",
    status: "negotiating",
    note: "日程確認のため返信待ち。通常条件と異なり、1枚目からハーフバックの特例で了承済み",
  },
  // TODO: 残りの出演枠が埋まり次第、ここに追加
];

// フリーマーケット出店者
export interface FleaMarketVendor {
  name: string;
  // TODO: 出店ジャンル・SNSなど
}

export const fleaMarketVendors: FleaMarketVendor[] = [
  // TODO: 交渉が進み次第、出店者情報を追加
];

// バーメニュー
export interface BarMenuItem {
  name: string;
  price?: number;
}

export const barMenu: BarMenuItem[] = [
  // TODO: メニュー・価格が決まり次第、追加
];

export const faq: { question: string; answer: string }[] = [
  {
    question: "雨天の場合は開催されますか？",
    answer: "", // TODO: 雨天時の対応方針
  },
  {
    question: "再入場はできますか？",
    answer: "", // TODO: 再入場可否が決まり次第、記載
  },
  {
    question: "年齢制限はありますか？",
    answer: "年齢制限は特に設けておりません。",
  },
];

export const contact = {
  // TODO: 問い合わせ先メールアドレス・SNSアカウント
  email: "",
  sns: [] as { label: string; url: string }[],
};
