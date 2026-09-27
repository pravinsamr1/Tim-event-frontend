import { formatRupees } from "../../utils/formatters";
import { dayLabel, PLAN_TYPES } from "../../config/plans";

export default function PassSummary({ plan, selectedDay }) {
  const isTwoDay = plan.type === PLAN_TYPES.TWO_DAY;

  return (
    <div>
      <h2>Registration summary</h2>
      <div className="summary-row">
        <span className="label">Pass</span>
        <span className="value">{plan.label}</span>
      </div>
      <div className="summary-row">
        <span className="label">{isTwoDay ? "Access" : "Selected day"}</span>
        <span className="value">
          {isTwoDay ? "Day 1 + Day 2" : dayLabel(selectedDay) || "—"}
        </span>
      </div>
      <div className="summary-row">
        <span className="label">Registration fee</span>
        <span className="value">{formatRupees(plan.amount)}</span>
      </div>
      <div className="summary-total">
        <span className="label">Total</span>
        <span className="value">{formatRupees(plan.amount)}</span>
      </div>
      <p className="summary-note">
        Prices are fixed and verified by our payment provider — nothing changes at checkout.
      </p>
    </div>
  );
}
