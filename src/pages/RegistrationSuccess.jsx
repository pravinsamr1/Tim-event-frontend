import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import EventPass from "../components/pass/EventPass";
import { getRegistration } from "../services/registrationService";
import { formatRupees } from "../utils/formatters";
import { dayLabel, PLAN_TYPES } from "../config/plans";

export default function RegistrationSuccess() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const rid = searchParams.get("rid");

  const [registration, setRegistration] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState("");

  useEffect(() => {
    if (registration || !rid) return;
    let cancelled = false;
    setLoading(true);
    getRegistration(rid)
      .then((data) => {
        if (!cancelled) setRegistration({ registrationId: rid, ...data });
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || "Could not load your registration.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [rid, registration]);

  if (loading) {
    return (
      <section className="success-page">
        <div className="container">
          <Loader label="Loading your registration…" />
        </div>
      </section>
    );
  }

  if (error || !registration) {
    return (
      <section className="success-page">
        <div className="container">
          <ErrorMessage
            title="We couldn't find that registration."
            message={error || "The link may be incomplete. Check your registration status instead."}
          />
          <Link to="/registration/status" className="btn btn-primary">
            Check registration status
          </Link>
        </div>
      </section>
    );
  }

  const isTwoDay = registration.plan === PLAN_TYPES.TWO_DAY;

  return (
    <section className="success-page">
      <div className="container">
        <div className="success-banner">
          <span className="success-check" aria-hidden="true">✓</span>
          Registration successful — thank you, {registration.fullName?.split(" ")[0] || "there"}.
        </div>

        <div className="success-layout">
          <div className="success-details">
            <div className="reg-card">
              <h2>Your registration</h2>
              <div className="summary-row">
                <span className="label">Registration ID</span>
                <span className="value">{registration.registrationId}</span>
              </div>
              <div className="summary-row">
                <span className="label">Pass</span>
                <span className="value">{isTwoDay ? "2-Day Pass" : "1-Day Pass"}</span>
              </div>
              <div className="summary-row">
                <span className="label">Valid on</span>
                <span className="value">
                  {isTwoDay ? "Day 1 + Day 2" : dayLabel(registration.selectedDay)}
                </span>
              </div>
              <div className="summary-row">
                <span className="label">Payment</span>
                <span className="value">
                  {formatRupees(isTwoDay ? 250 : 150)} — PAID
                </span>
              </div>
            </div>

            <div className="success-actions">
              <Link to="/" className="btn btn-outline">
                Back to home
              </Link>
              <Link to="/registration/status" className="btn btn-outline">
                Check status later
              </Link>
            </div>
          </div>

          <EventPass
            registration={{
              registrationId: registration.registrationId,
              fullName: registration.fullName || "Guest Attendee",
              plan: registration.plan,
              selectedDay: registration.selectedDay,
              qrToken: registration.qrToken,
            }}
          />
        </div>
      </div>
    </section>
  );
}
