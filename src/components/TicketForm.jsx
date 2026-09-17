import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./ui/Reveal.jsx";
import SectionTitle from "./ui/SectionTitle.jsx";
import { PERFORMERS, TICKET_TYPES } from "../data/eventData.js";
import { isRevealed, getNow } from "../lib/reveal.js";

function encode(data) {
  return Object.keys(data)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    )
    .join("&");
}

const INITIAL_STATE = {
  name: "",
  email: "",
  ticketType: TICKET_TYPES[0].value,
  quantity: 1,
  performer: "選ばない",
  message: "",
  "bot-field": "",
};

export default function TicketForm() {
  const now = getNow();
  const revealedPerformers = PERFORMERS.filter((p) =>
    isRevealed(p.revealDate, now)
  );

  const [form, setForm] = useState(INITIAL_STATE);
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form["bot-field"]) return; // honeypot

    setStatus("submitting");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "ticket-hold", ...form }),
      });
      setStatus("done");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="ticket" className="pad-normal">
      <div className="container container--narrow">
        <SectionTitle eyebrow="reserve" title="チケット取り置き" seed={7} />

        <AnimatePresence mode="wait">
          {status === "done" ? (
            <motion.div
              key="success"
              className="form-success"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="label">Thank you</div>
              <h3>お申し込みありがとうございました</h3>
              <p>取り置き分は当日受付にてお名前をお伝えください。</p>
            </motion.div>
          ) : (
            <Reveal key="form" delay={0.05}>
              <form
                className="ticket-form"
                name="ticket-hold"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="ticket-hold" />

                <p className="honeypot-field">
                  <label>
                    ここには入力しないでください
                    <input
                      name="bot-field"
                      value={form["bot-field"]}
                      onChange={handleChange}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </label>
                </p>

                <div className="field">
                  <label htmlFor="name">
                    お名前<span className="required">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">
                    メールアドレス<span className="required">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>

                <div className="field">
                  <label htmlFor="ticketType">
                    チケット区分<span className="required">*</span>
                  </label>
                  <select
                    id="ticketType"
                    name="ticketType"
                    required
                    value={form.ticketType}
                    onChange={handleChange}
                  >
                    {TICKET_TYPES.map((t) => (
                      <option value={t.value} key={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="quantity">
                    枚数<span className="required">*</span>
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={form.quantity}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label htmlFor="performer">お目当ての出演者（任意）</label>
                  <select
                    id="performer"
                    name="performer"
                    value={form.performer}
                    onChange={handleChange}
                  >
                    <option value="選ばない">選ばない</option>
                    {revealedPerformers.map((p) => (
                      <option value={p.name} key={p.order}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="message">ご連絡事項（任意）</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                {status === "error" ? (
                  <p className="form-error">
                    送信に失敗しました。時間をおいて再度お試しください。
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="btn-glow form-submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "送信中…" : "取り置きを申し込む"}
                </button>
              </form>

              <p className="form-note">
                取り置き分は当日受付にてお名前をお伝えください。
              </p>
            </Reveal>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
