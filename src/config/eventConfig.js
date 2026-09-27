// Single source of truth for event copy and structured content.
// Keeping this separate from components means the schedule, FAQ, and
// venue details are never duplicated or re-typed across the app.

export const EVENT = {
  name: "IGNITE 2027",
  fullName: "IGNITE 2027 — National Innovation Summit",
  tagline: "Where builders meet the future.",
  day1Date: "20 February 2027",
  day2Date: "21 February 2027",
  dateRange: "20–21 February 2027",
  venue: "Anna Centenary Library Auditorium, Chennai",
  timings: "9:00 AM – 6:00 PM, both days",
};

export const SCHEDULE = {
  day1: {
    label: "Day 1",
    date: EVENT.day1Date,
    theme: "Foundations & Frontiers",
    items: [
      { time: "9:00 AM", title: "Registration & badge pickup" },
      { time: "10:00 AM", title: "Opening keynote" },
      { time: "11:30 AM", title: "Main stage: Building at scale" },
      { time: "1:00 PM", title: "Lunch & networking" },
      { time: "2:00 PM", title: "Breakout workshops" },
      { time: "4:30 PM", title: "Founder panel" },
      { time: "6:00 PM", title: "Day 1 close" },
    ],
  },
  day2: {
    label: "Day 2",
    date: EVENT.day2Date,
    theme: "Product & Practice",
    items: [
      { time: "9:00 AM", title: "Doors open" },
      { time: "9:30 AM", title: "Case studies from the field" },
      { time: "11:00 AM", title: "Live build session" },
      { time: "1:00 PM", title: "Lunch & networking" },
      { time: "2:00 PM", title: "Hands-on labs" },
      { time: "4:00 PM", title: "Closing keynote & awards" },
      { time: "5:30 PM", title: "Farewell mixer" },
    ],
  },
};

export const FAQS = [
  {
    q: "What is the 1-Day Pass?",
    a: "The 1-Day Pass costs ₹150 and gives you entry to either Day 1 or Day 2 of IGNITE 2027 — whichever you choose during registration.",
  },
  {
    q: "What is the 2-Day Pass?",
    a: "The 2-Day Pass costs ₹250 and includes entry to both Day 1 and Day 2. There's nothing to choose — both days are included automatically.",
  },
  {
    q: "Can I change my selected day after registering?",
    a: "Day selection is locked in at the time of payment. If you need to change it, contact the event team with your registration ID before the event.",
  },
  {
    q: "What is the registration fee?",
    a: "₹150 for a single day, or ₹250 for both days. Prices are fixed and shown before you pay.",
  },
  {
    q: "What payment methods are available?",
    a: "All major UPI apps, credit and debit cards, and net banking, through a secure checkout.",
  },
  {
    q: "How will I receive my pass?",
    a: "Once your payment is confirmed, your digital pass with a unique QR code appears on the confirmation page. You can also look it up later on the status page.",
  },
  {
    q: "What should I show at the entrance?",
    a: "Show the QR code from your digital pass, either on your phone screen or printed. It's scanned once at entry each day.",
  },
  {
    q: "Can I attend both days with the ₹150 pass?",
    a: "No — the ₹150 pass is valid for one day only. For both days, register for the ₹250 2-Day Pass instead.",
  },
];

export const NAV_LINKS = [
  { label: "Passes", href: "#about" },
];
