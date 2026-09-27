import Button from "../common/Button";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import { FLOW_STATES } from "../../hooks/useRegistration";
import { formatRupees } from "../../utils/formatters";

export default function PaymentButton({
  amount,
  flowState,
  errorMessage,
  isProcessing,
  loadingLabel,
  onPay,
  onRetry,
  canSubmit,
}) {
  if (flowState === FLOW_STATES.VERIFYING_PAYMENT) {
    return <Loader label="Verifying your payment…" note="Please don't close this page." />;
  }

  if (
    flowState === FLOW_STATES.CREATING_REGISTRATION ||
    flowState === FLOW_STATES.OPENING_PAYMENT ||
    flowState === FLOW_STATES.PAYMENT_PENDING
  ) {
    return <Loader label={loadingLabel} />;
  }

  if (flowState === FLOW_STATES.PAYMENT_SUCCESS) {
    return <Loader label="Registration confirmed" note="Taking you to your pass…" />;
  }

  if (flowState === FLOW_STATES.VERIFICATION_PENDING) {
    return (
      <ErrorMessage title="We are still confirming your payment.">
        <p>Please don&apos;t pay again immediately. Check your registration status shortly.</p>
      </ErrorMessage>
    );
  }

  if (
    flowState === FLOW_STATES.PAYMENT_FAILED ||
    flowState === FLOW_STATES.VERIFICATION_FAILED ||
    flowState === FLOW_STATES.PAYMENT_CANCELLED
  ) {
    return (
      <div>
        <ErrorMessage
          title="Payment was not completed."
          message={
            flowState === FLOW_STATES.PAYMENT_CANCELLED
              ? "You closed the payment window before it finished."
              : errorMessage || "Your registration information has been saved."
          }
        />
        <Button variant="gold" block onClick={onRetry}>
          Try Payment Again
        </Button>
      </div>
    );
  }

  return (
    <Button variant="gold" block onClick={onPay} disabled={!canSubmit || isProcessing}>
      Register &amp; Pay {formatRupees(amount)}
    </Button>
  );
}
