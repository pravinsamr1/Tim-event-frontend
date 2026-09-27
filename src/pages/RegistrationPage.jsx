import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonalDetailsForm from "../components/registration/PersonalDetailsForm";
import { DaySelector, BothDaysNotice } from "../components/registration/DaySelector";
import PassSummary from "../components/registration/PassSummary";
import PaymentButton from "../components/registration/PaymentButton";
import RegistrationProgress from "../components/registration/RegistrationProgress";
import { useRegistration, FLOW_STATES } from "../hooks/useRegistration";
import { validatePersonalDetails, hasErrors } from "../utils/validation";
import { PLAN_TYPES } from "../config/plans";
import { useEffect } from "react";

const EMPTY_DETAILS = {
  fullName: "",
  mobile: "",
  email: "",
  organization: "",
  city: "",
};

export default function RegistrationPage({ plan }) {
  const navigate = useNavigate();
  const [details, setDetails] = useState(EMPTY_DETAILS);
  const [errors, setErrors] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

  const isTwoDay = plan.type === PLAN_TYPES.TWO_DAY;

  const {
    flowState,
    isProcessing,
    errorMessage,
    loadingLabel,
    submit,
    retry,
    registrationId,
  } = useRegistration({
    plan,
    selectedDay,
    onConfirmed: (registration) => {
      // Success is only shown once the backend confirms — this navigation
      // happens from the PAYMENT_SUCCESS branch, never before it.
      setTimeout(
        () =>
          navigate(`/registration/success?rid=${registration.registrationId}`, {
            state: {
              registrationId: registration.registrationId,
              fullName: details.fullName,
              plan: plan.type,
              selectedDay,
              qrToken: registration.qrToken,
              passId: registration.passId,
            },
          }),
        900
      );
    },
  });

  const canSubmit = useMemo(() => {
    if (plan.requiresDaySelection && !selectedDay) return false;
    return true;
  }, [plan.requiresDaySelection, selectedDay]);

  function handleChange(field, value) {
    setDetails((prev) => ({ ...prev, [field]: value }));
  }

  function handlePay() {
    const validationErrors = validatePersonalDetails(details);
    if (plan.requiresDaySelection && !selectedDay) {
      validationErrors.day = "Choose Day 1 or Day 2.";
    }
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;
    submit(details);
  }

  useEffect(() => {
    window.scrollTo(0,0);
  })

  const activeStep = flowState === FLOW_STATES.IDLE ? 0 : flowState === FLOW_STATES.PAYMENT_SUCCESS ? 2 : 1;

  return (
    <section className="reg-page">
      <div className="container">
        <Link to="/" className="reg-back">
          ← Back to landing page
        </Link>

        <div className="reg-header">
          <h1>{plan.label === "1-Day Pass" ? "1-Day Event Pass" : "2-Day Event Pass"}</h1>
          <div className="reg-price">₹{plan.amount}</div>
          <p>
            {isTwoDay
              ? "Attend both Day 1 and Day 2."
              : "Attend either Day 1 or Day 2."}
          </p>
        </div>

        <RegistrationProgress activeStep={activeStep} />

        <div className="reg-layout">
          <div className="reg-card">
            <PersonalDetailsForm
              values={details}
              errors={errors}
              onChange={handleChange}
              disabled={isProcessing}
            />

            {plan.requiresDaySelection ? (
              <DaySelector
                selectedDay={selectedDay}
                onSelect={setSelectedDay}
                amount={plan.amount}
                disabled={isProcessing}
              />
            ) : (
              <BothDaysNotice />
            )}
            {errors.day && (
              <p className="field-error" role="alert" style={{ marginTop: "-0.5rem", marginBottom: "1rem" }}>
                {errors.day}
              </p>
            )}
          </div>

          <div className="reg-card">
            <PassSummary plan={plan} selectedDay={selectedDay} />
            <PaymentButton
              amount={plan.amount}
              flowState={flowState}
              errorMessage={errorMessage}
              isProcessing={isProcessing}
              loadingLabel={loadingLabel}
              onPay={handlePay}
              onRetry={retry}
              canSubmit={canSubmit}
            />
            {registrationId && flowState !== FLOW_STATES.PAYMENT_SUCCESS && (
              <p className="payment-pending-note">Registration ID: {registrationId}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
