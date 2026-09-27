import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { getRegistrationStatus } from "../services/registrationService";
import { dayLabel } from "../config/plans";

export default function RegistrationStatus() {
  const [form, setForm] = useState({ registrationId: "", mobile: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const data = await getRegistrationStatus(form);
      setResult(data);
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="status-page">
      <div className="container">
        <Link to="/" className="reg-back">
          ← Back to landing page
        </Link>
        <div className="reg-header">
          <h1>Check your registration</h1>
          <p>Enter the details you used when registering to look up your pass.</p>
        </div>

        <form className="reg-card status-form" onSubmit={handleSubmit}>
          <Input
            id="registrationId"
            label="Registration ID"
            required
            placeholder="REG-000123"
            value={form.registrationId}
            onChange={(e) => setForm((f) => ({ ...f, registrationId: e.target.value }))}
            disabled={loading}
          />
          <Input
            id="mobile"
            label="Mobile number"
            required
            type="tel"
            inputMode="numeric"
            value={form.mobile}
            onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
            disabled={loading}
          />
          <Button type="submit" variant="primary" block loading={loading}>
            {loading ? "Checking…" : "Check status"}
          </Button>
        </form>

        {loading && <Loader label="Looking up your registration…" />}

        {error && (
          <div className="status-result">
            <ErrorMessage message={error} />
          </div>
        )}

        {result && !result.found && (
          <div className="status-result">
            <ErrorMessage
              title="Registration not found."
              message="Double-check your registration ID and mobile number, or register for the event first."
            />
          </div>
        )}

        {result?.found && (
          <div className="status-result reg-card">
            <h2>Registration found</h2>
            <p>
              <span className={`status-pill ${result.paymentStatus === "PAID" ? "paid" : "pending"}`}>
                Payment: {result.paymentStatus === "PAID" ? "PAID" : "Pending"}
              </span>
            </p>
            <div className="summary-row">
              <span className="label">Pass type</span>
              <span className="value">
                {result.planLabel || (result.plan === "TWO_DAY" ? "2-Day Pass" : "1-Day Pass")}
              </span>
            </div>
            <div className="summary-row">
              <span className="label">Valid day</span>
              <span className="value">{dayLabel(result.selectedDay) || "Day 1 + Day 2"}</span>
            </div>
            <Link
              to={`/registration/success?rid=${result.registrationId}`}
              className="btn btn-primary btn-block"
              style={{ marginTop: "1rem" }}
            >
              View Pass
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
