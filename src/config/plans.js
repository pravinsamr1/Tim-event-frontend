// Plan definitions the UI reads from. The backend remains the final
// authority on price and validity — these values only drive what the
// frontend *displays* and *submits*; they are re-verified server-side.

export const PLAN_TYPES = {
  ONE_DAY: "ONE_DAY",
  TWO_DAY: "TWO_DAY",
};

export const DAYS = {
  DAY_1: "DAY_1",
  DAY_2: "DAY_2",
};

export const PLANS = {
  [PLAN_TYPES.ONE_DAY]: {
    type: PLAN_TYPES.ONE_DAY,
    label: "1-Day Pass",
    amount: 150,
    allowedDays: [DAYS.DAY_1, DAYS.DAY_2],
    requiresDaySelection: true,
    routePath: "/register/1-day",
    description: "Attend either Day 1 or Day 2.",
  },
  [PLAN_TYPES.TWO_DAY]: {
    type: PLAN_TYPES.TWO_DAY,
    label: "2-Day Pass",
    amount: 250,
    allowedDays: [DAYS.DAY_1, DAYS.DAY_2],
    requiresDaySelection: false,
    routePath: "/register/2-day",
    description: "Attend both Day 1 and Day 2.",
  },
};

export function dayLabel(day) {
  if (day === DAYS.DAY_1) return "Day 1";
  if (day === DAYS.DAY_2) return "Day 2";
  return "";
}
