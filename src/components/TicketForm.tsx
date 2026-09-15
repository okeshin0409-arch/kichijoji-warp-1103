import { useState, type FormEvent } from "react";

// Netlify Forms 用のエンコード関数
function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

type TicketType = "advance" | "under23";

interface FormState {
  name: string;
  email: string;
  ticketType: TicketType;
  quantity: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  ticketType: "advance",
  quantity: "1",
  message: "",
};

export default function TicketForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "ticket-hold", ...form }),
    })
      .then(() => setStatus("done"))
      .catch(() => setStatus("error"));
  };

  if (status === "done") {
    return (
      <div className="ticket-form__done">
        取り置きのお申し込みを受け付けました。折り返しのご連絡をお待ちください。
      </div>
    );
  }

  return (
    <form
      name="ticket-hold"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="ticket-form"
    >
      {/* Netlify Forms のスパム対策用（画面には表示しない） */}
      <p hidden>
        <label>
          この項目は入力しないでください: <input name="bot-field" />
        </label>
      </p>

      <label className="ticket-form__field">
        お名前
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
        />
      </label>

      <label className="ticket-form__field">
        メールアドレス
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
        />
      </label>

      <label className="ticket-form__field">
        チケット区分
        <select name="ticketType" value={form.ticketType} onChange={handleChange}>
          <option value="advance">前売</option>
          <option value="under23">U23</option>
        </select>
      </label>

      <label className="ticket-form__field">
        枚数
        <input
          type="number"
          name="quantity"
          min={1}
          max={10}
          required
          value={form.quantity}
          onChange={handleChange}
        />
      </label>

      <label className="ticket-form__field">
        備考（任意）
        <textarea name="message" rows={3} value={form.message} onChange={handleChange} />
      </label>

      <button type="submit" className="ticket-form__submit" disabled={status === "submitting"}>
        {status === "submitting" ? "送信中..." : "取り置きを申し込む"}
      </button>

      {status === "error" && (
        <p className="ticket-form__error">
          送信に失敗しました。お手数ですが時間をおいて再度お試しください。
        </p>
      )}
    </form>
  );
}
