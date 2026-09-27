import api from "./api";

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";
const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Loads the Razorpay checkout script once and caches the promise so
 * repeated payment attempts don't re-inject the script tag.
 */
let scriptPromise = null;
export function loadRazorpayScript() {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${RAZORPAY_SCRIPT_SRC}"]`)) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Could not load payment gateway."));
    document.body.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Asks the backend to create a Razorpay order for a pending registration.
 * The backend decides the real amount — the frontend only forwards the
 * registration id it already has.
 */
export async function createPaymentOrder({ registrationId }) {
  if (USE_MOCKS) {
    await delay(700);
    return {
      orderId: `order_mock_${registrationId}`,
      amount: undefined, // real amount always comes from/verified by backend
      currency: "INR",
      keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_mock",
    };
  }
  const { data } = await api.post("/payments/order", { registrationId });
  return data?.data ? { ...data.data, ...data } : data;
}

/**
 * Sends the payment response from Razorpay Checkout to the backend for
 * verification. The frontend never decides success or failure itself —
 * it only reports what the gateway returned and waits for a verdict.
 */
export async function verifyPayment({ registrationId, razorpayResponse }) {
  if (USE_MOCKS) {
    await delay(1400);
    // Simulate an occasional failure so the failure UI is reachable in
    // the demo. Remove this branch once wired to a real backend.
    if (razorpayResponse?.simulateFailure) {
      return { verified: false, status: "VERIFICATION_FAILED" };
    }
    return { verified: true, status: "PAYMENT_SUCCESS" };
  }
  const { data } = await api.post("/payments/verify", {
    registrationId,
    razorpayResponse,
  });
  return data?.data ? { ...data.data, ...data } : data;
}
