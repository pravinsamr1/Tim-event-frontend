import { EVENT } from "../../config/eventConfig";

export default function EventInfo() {
  return (
    <section className="section" id="details" style={{ background: "var(--paper-raised)" }}>
      <div className="container">
        <div className="section-heading">
          <span className="kicker">Event details</span>
          <h2>Everything you need to plan around</h2>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <div className="info-label">Day 1</div>
            <div className="info-value">{EVENT.day1Date}</div>
          </div>
          <div className="info-card">
            <div className="info-label">Day 2</div>
            <div className="info-value">{EVENT.day2Date}</div>
          </div>
          <div className="info-card">
            <div className="info-label">Venue</div>
            <div className="info-value">{EVENT.venue}</div>
          </div>
          <div className="info-card">
            <div className="info-label">Registration</div>
            <div className="info-value">From ₹150</div>
          </div>
        </div>

        <p className="info-note">
          Timings: {EVENT.timings}. Bring a valid photo ID along with your digital pass for entry each day.
        </p>
      </div>
    </section>
  );
}
