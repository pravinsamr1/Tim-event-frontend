import { FAQS } from "../../config/eventConfig";

export default function FAQ() {
  return (
    <section className="section" id="faq" style={{ background: "var(--paper-raised)" }}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">FAQ</span>
          <h2>Common questions</h2>
        </div>

        <div className="faq-list">
          {FAQS.map((item) => (
            <details className="faq-item" key={item.q}>
              <summary>
                {item.q}
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
