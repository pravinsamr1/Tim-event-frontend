# IGNITE 2027 — Event Registration Frontend

React + Vite frontend for a 2-day event registration platform, built from
the frontend specification. Payment and registration verification are
never decided by the frontend — it only displays what the backend confirms.

## Quick start

```bash
npm install
cp .env.example .env   # then fill in your API base URL / Razorpay key ID
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

The app runs **fully in demo mode out of the box** — no backend required.
`registrationService.js` and `paymentService.js` simulate network delay and
return realistic mock responses, so you can click through the entire flow:
landing → register → pay → verify → success → digital pass with QR code.

## Connecting a real backend

1. Set `VITE_API_BASE_URL` in `.env` to your API's base URL.
2. Set `VITE_USE_MOCKS=false` in `.env`.
3. Implement these endpoints (see `src/services/*.js` for the exact shapes
   the frontend expects):
   - `POST /registrations` — create a pending registration
   - `GET /registrations/:id` — fetch a confirmed registration
   - `GET /registrations/status?registrationId=&mobile=` — status lookup
   - `POST /payments/order` — create a Razorpay order
   - `POST /payments/verify` — verify a Razorpay payment response
4. Set `VITE_RAZORPAY_KEY_ID` to your **public** Razorpay key ID.
   Never put the Razorpay **secret** key, database credentials, or any
   private API key in a `VITE_`-prefixed variable — anything with that
   prefix is bundled into client-side JavaScript and is publicly visible.

## Project structure

```
src/
├── components/
│   ├── common/        Button, Input, Loader, ErrorMessage
│   ├── landing/        Navbar, Hero, PlanCards, EventInfo, Schedule, FAQ, Footer
│   ├── registration/   PersonalDetailsForm, DaySelector, PassSummary,
│   │                   PaymentButton, RegistrationProgress
│   └── pass/            EventPass, QRCodeDisplay
├── pages/               Home, OneDayRegistration, TwoDayRegistration,
│                        RegistrationPage (shared), RegistrationSuccess,
│                        RegistrationStatus
├── services/            api.js, registrationService.js, paymentService.js
├── hooks/                useRegistration.js (payment state machine)
├── config/               eventConfig.js (event/schedule/FAQ copy), plans.js
├── utils/                validation.js, formatters.js
├── routes/               AppRoutes.jsx
├── styles/               tokens.css, base.css, landing.css,
│                         registration.css, pass.css
├── App.jsx
└── main.jsx
```

## Editing event content

Event name, dates, venue, schedule, and FAQ all live in
`src/config/eventConfig.js` — nothing is duplicated across components, so
you only need to edit it in one place.

Plan pricing and rules (₹150 one-day / ₹250 two-day, allowed days) live in
`src/config/plans.js`. Remember: these values only drive the UI — your
backend must independently verify amount and plan validity on every
request, since a person could edit these values in browser dev tools.

## Design system

Color, type, spacing, radius, and shadow tokens are defined once in
`src/styles/tokens.css`. Typefaces are Fraunces (display) and Manrope
(UI/body), loaded from Google Fonts in `index.html`.

## Routes

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/register/1-day` | ₹150 pass, requires choosing Day 1 or Day 2 |
| `/register/2-day` | ₹250 pass, both days included automatically |
| `/registration/success?rid=REG-XXXXXX` | Confirmation + digital pass |
| `/registration/status` | Optional lookup by registration ID + mobile |

## Building for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```
