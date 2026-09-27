import api from "./api";

// This flag lets the whole frontend run and demo end-to-end before a real
// backend exists. Set VITE_USE_MOCKS=false (and point VITE_API_BASE_URL at
// your backend) to switch every call below to the real HTTP request.
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mockRegistrationId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `REG-${n}`;
}

/**
 * Creates a pending registration before payment starts.
 * @param {{plan: string, amount: number, selectedDay: string|null, details: object}} payload
 */
export async function createRegistration(payload) {
  if (USE_MOCKS) {
    await delay(900);
    const registrationId = mockRegistrationId();
    return {
      registrationId,
      status: "PENDING_PAYMENT",
      plan: payload.plan,
      amount: payload.amount,
      selectedDay: payload.selectedDay,
      details: payload.details,
      qrToken: `mock-token-${registrationId}`,
    };
  }
  const { data } = await api.post("/registrations", payload);
  return data?.data ? { ...data.data, ...data } : data;
}

/**
 * Fetches a confirmed registration (used on the success page after
 * payment verification, or when re-loading the page).
 */
export async function getRegistration(registrationId) {
  if (USE_MOCKS) {
    await delay(600);
    return {
      registrationId,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      fullName: "Guest Attendee",
      plan: "ONE_DAY",
      amount: 150,
      selectedDay: "DAY_1",
      qrToken: `mock-token-${registrationId}`,
    };
  }
  const { data } = await api.get(`/registrations/${registrationId}`);
  return data?.data ? { ...data.data, ...data } : data;
}

/**
 * Looks up a registration by ID + mobile number, for the public status page.
 */
export async function getRegistrationStatus({ registrationId, mobile }) {
  if (USE_MOCKS) {
    await delay(900);
    if (!registrationId || !mobile) {
      throw { message: "Enter your registration ID and mobile number." };
    }
    if (registrationId.toUpperCase().startsWith("REG-")) {
      return {
        found: true,
        registrationId: registrationId.toUpperCase(),
        paymentStatus: "PAID",
        plan: "ONE_DAY",
        planLabel: "1-Day Pass",
        selectedDay: "DAY_1",
      };
    }
    return { found: false };
  }
  const { data } = await api.get("/registrations/status", {
    params: {
      registrationId: registrationId?.trim()?.toUpperCase(),
      mobile: mobile?.trim(),
    },
  });
  return data?.data ? { ...data.data, ...data } : data;
}
