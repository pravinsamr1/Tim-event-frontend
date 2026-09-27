import { Link } from "react-router-dom";
import { PLANS } from "../../config/plans";

export default function PlanCards() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-heading">
          <span className="kicker">Registration</span>
          <h2>Two ways to attend</h2>
          <p>Both passes include full access to sessions, workshops, and meals on the days they cover.</p>
        </div>

        <div className="plans-grid">
          <article className="plan-card">
            <h3>{PLANS.ONE_DAY.label}</h3>
            <div className="plan-price">₹{PLANS.ONE_DAY.amount}</div>
            <p className="plan-desc">{PLANS.ONE_DAY.description}</p>
            <ul className="plan-list">
              <li>✓ Choose Day 1</li>
              <li className="or-divider">or</li>
              <li>✓ Choose Day 2</li>
            </ul>
            <Link to={PLANS.ONE_DAY.routePath} className="btn btn-outline btn-block">
              Register for 1 Day
            </Link>
          </article>

          <article className="plan-card is-featured">
            <span className="plan-card-tag">Full access</span>
            <h3>{PLANS.TWO_DAY.label}</h3>
            <div className="plan-price">₹{PLANS.TWO_DAY.amount}</div>
            <p className="plan-desc">{PLANS.TWO_DAY.description} This is a fixed both-days pass — there&apos;s no day to pick.</p>
            <ul className="plan-list">
              <li>✓ Day 1</li>
              <li>✓ Day 2</li>
            </ul>
            <Link to={PLANS.TWO_DAY.routePath} className="btn btn-gold btn-block">
              Register for 2 Days
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
