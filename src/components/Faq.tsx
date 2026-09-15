import { faq } from "../data/eventData";

export default function Faq() {
  return (
    <section id="faq" className="section section--alt">
      <h2 className="section__title">よくあるご質問</h2>
      <dl className="faq-list">
        {faq.map((item) => (
          <div key={item.question} className="faq-list__row">
            <dt>Q. {item.question}</dt>
            <dd>
              {item.answer ? (
                `A. ${item.answer}`
              ) : (
                <span className="section__placeholder">A. 準備中</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
