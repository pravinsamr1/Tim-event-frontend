import { useCallback, useRef, useState } from "react";
import { createRegistration } from "../services/registrationService";
import {
  createPaymentOrder,
  loadRazorpayScript,
  verifyPayment,
} from "../services/paymentService";
import { EVENT } from "../config/eventConfig";

export const FLOW_STATES = {
  IDLE: "IDLE",
  CREATING_REGISTRATION: "CREATING_REGISTRATION",
  OPENING_PAYMENT: "OPENING_PAYMENT",
  PAYMENT_PENDING: "PAYMENT_PENDING",
  VERIFYING_PAYMENT: "VERIFYING_PAYMENT",
  PAYMENT_SUCCESS: "PAYMENT_SUCCESS",
  PAYMENT_FAILED: "PAYMENT_FAILED",
  PAYMENT_CANCELLED: "PAYMENT_CANCELLED",
  VERIFICATION_PENDING: "VERIFICATION_PENDING",
  VERIFICATION_FAILED: "VERIFICATION_FAILED",
};

const LOADING_COPY = {
  [FLOW_STATES.CREATING_REGISTRATION]: "Creating your registration…",
  [FLOW_STATES.OPENING_PAYMENT]: "Opening secure payment…",
  [FLOW_STATES.PAYMENT_PENDING]: "Waiting for payment…",
  [FLOW_STATES.VERIFYING_PAYMENT]: "Verifying your payment…",
};

/**
 * Drives the whole "submit details -> pay -> verify" flow for both the
 * 1-day and 2-day registration pages, so neither page has to reimplement
 * duplicate submission protection, Razorpay wiring, or error copy.
 */
export function useRegistration({ plan, selectedDay, onConfirmed }) {
  const [flowState, setFlowState] = useState(FLOW_STATES.IDLE);
  const [errorMessage, setErrorMessage] = useState("");
  const pendingRegistrationRef = useRef(null); // survives a failed retry

  const isProcessing =
    flowState !== FLOW_STATES.IDLE &&
    flowState !== FLOW_STATES.PAYMENT_FAILED &&
    flowState !== FLOW_STATES.VERIFICATION_FAILED &&
    flowState !== FLOW_STATES.PAYMENT_CANCELLED;

  const runPayment = useCallback(
    async (registration) => {
      try {
        setFlowState(FLOW_STATES.OPENING_PAYMENT);
        await loadRazorpayScript();
        const order = await createPaymentOrder({
          registrationId: registration.registrationId,
        });

        setFlowState(FLOW_STATES.PAYMENT_PENDING);

        const options = {
          key: order.keyId,
          order_id: order.orderId,
          name: EVENT.name,
          description: `${plan.label} registration`,
          prefill: {
            name: registration.details?.fullName,
            email: registration.details?.email,
            contact: registration.details?.mobile,
          },
          theme: { color: "#1b3a5c" },
          handler: async (razorpayResponse) => {
            setFlowState(FLOW_STATES.VERIFYING_PAYMENT);
            try {
              const result = await verifyPayment({
                registrationId: registration.registrationId,
                razorpayResponse,
              });
              if (result.verified) {
                setFlowState(FLOW_STATES.PAYMENT_SUCCESS);
                onConfirmed?.({ ...registration, ...result });
              } else {
                setFlowState(FLOW_STATES.VERIFICATION_FAILED);
              }
            } catch (err) {
              setFlowState(FLOW_STATES.VERIFICATION_PENDING);
              setErrorMessage(
                err?.message ||
                  "We are still confirming your payment. Please don't pay again immediately."
              );
            }
          },
          modal: {
            ondismiss: () => {
              setFlowState(FLOW_STATES.PAYMENT_CANCELLED);
            },
          },
        };

        if (window.Razorpay) {
          const checkout = new window.Razorpay(options);
          checkout.on?.("payment.failed", () => {
            setFlowState(FLOW_STATES.PAYMENT_FAILED);
          });
          checkout.open();
        } else {
          // No live gateway configured in this environment (demo mode) —
          // simulate the same handler Razorpay would call, so the rest of
          // the flow (verify -> success) can still be exercised.
          await new Promise((r) => setTimeout(r, 500));
          await options.handler({ demo: true });
        }
      } catch (err) {
        setFlowState(FLOW_STATES.PAYMENT_FAILED);
        setErrorMessage(err?.message || "Payment could not be started.");
      }
    },
    [plan, onConfirmed]
  );

  const submit = useCallback(
    async (details) => {
      if (isProcessing) return; // duplicate-submission guard
      setErrorMessage("");
      try {
        setFlowState(FLOW_STATES.CREATING_REGISTRATION);
        const registration =
          pendingRegistrationRef.current ||
          (await createRegistration({
            plan: plan.type,
            amount: plan.amount,
            selectedDay: plan.requiresDaySelection ? selectedDay : null,
            details,
          }));
        pendingRegistrationRef.current = registration;
        await runPayment(registration);
      } catch (err) {
        setFlowState(FLOW_STATES.PAYMENT_FAILED);
        setErrorMessage(err?.message || "Something went wrong. Please try again.");
      }
    },
    [isProcessing, plan, selectedDay, runPayment]
  );

  const retry = useCallback(() => {
    setErrorMessage("");
    if (pendingRegistrationRef.current) {
      runPayment(pendingRegistrationRef.current);
    } else {
      setFlowState(FLOW_STATES.IDLE);
    }
  }, [runPayment]);

  return {
    flowState,
    isProcessing,
    errorMessage,
    loadingLabel: LOADING_COPY[flowState] || "",
    submit,
    retry,
    registrationId: pendingRegistrationRef.current?.registrationId,
  };
}
