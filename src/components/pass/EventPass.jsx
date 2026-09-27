import QRCodeDisplay from "./QRCodeDisplay";
import { EVENT } from "../../config/eventConfig";
import { dayLabel, PLAN_TYPES } from "../../config/plans";

export default function EventPass({ registration }) {
  const { registrationId, fullName, plan, selectedDay, qrToken, passId } = registration;
  const isTwoDay = plan === PLAN_TYPES.TWO_DAY;
  const validFor = isTwoDay ? "DAY 1 + DAY 2" : dayLabel(selectedDay).toUpperCase();

  return (
    <div className="pass-card">
      <div className="pass-content">
        <div className="pass-event-name">{EVENT.fullName}</div>
        <div className="pass-type">{isTwoDay ? "2-DAY PASS" : "1-DAY PASS"}</div>

        <div className="pass-field">
          <span className="pf-label">Name</span>
          <span className="pf-value">{fullName}</span>
        </div>
        <div className="pass-field">
          <span className="pf-label">Registration</span>
          <span className="pf-value">{registrationId}</span>
        </div>
        {passId && (
          <div className="pass-field">
            <span className="pf-label">Pass ID</span>
            <span className="pf-value">{passId}</span>
          </div>
        )}
        <div className="pass-field">
          <span className="pf-label">Valid for</span>
          <span className="pf-value">{validFor}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <QRCodeDisplay token={qrToken || passId || registrationId} />
        </div>

        <span className="pass-status">Payment: PAID</span>
      </div>
    </div>
  );
}
