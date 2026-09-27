# Frontend-to-Backend Connection Guide (CONNECT.md)

> Technical integration document connecting the **IGNITE 2027 React + Vite Attendee Frontend** (`http://localhost:5173`) with the **Express.js API Backend** (`http://localhost:5001/api`).

---

## 1. Architecture & Data Flow

```text
  ATTENDEE BROWSER
 (http://localhost:5173)
        │
        ├─ 1. POST /api/registrations ────────────────► EXPRESS API (:5001)
        │     (Attendee Details & Plan)                        │
        │                                                      ▼
        │◄─ 2. { registrationId: "REG-000001" } ─────── Saved in MongoDB (PENDING)
        │
        ├─ 3. POST /api/payments/order ──────────────► EXPRESS API
        │     { registrationId: "REG-000001" }                 │
        │                                                      ▼
        │◄─ 4. { orderId: "order_xxx", amount } ◄────── Razorpay Order Created
        │
        ▼
   RAZORPAY POPUP (checkout.js)
        │
        ├─ 5. Attendee Enters UPI/Card & Pays
        │
        ▼
  ATTENDEE BROWSER
        │
        ├─ 6. POST /api/payments/verify ─────────────► EXPRESS API
        │     { razorpay_payment_id, order_id, ... }          │
        │                                                      ▼
        │                                               HMAC SHA-256 Verified
        │                                               MongoDB Updated (PAID)
        │                                               Pass & QR Token Generated
        │◄─ 7. { verified: true, passId, qrToken } ◄────┘
        │
        ▼
   SUCCESS PAGE (/registration/success)
   Displays QR Pass & Pass ID (EVT-XXXXXX)
```

---

## 2. Environment Configuration

In `ignite-frontend/.env`:

```env
# URL of your running backend (includes /api prefix)
VITE_API_BASE_URL=http://localhost:5001/api

# Disable mock mode to talk to the live Express API
VITE_USE_MOCKS=false

# Public Razorpay Test Key ID (never put secret keys here!)
VITE_RAZORPAY_KEY_ID=rzp_test_Th1MLkFYaYiVFl
```

---

## 3. Directory Map of Connection Files

| File | Purpose |
|---|---|
| `src/services/api.js` | Central Axios instance configured with `VITE_API_BASE_URL` and `withCredentials: true`. |
| `src/services/registrationService.js` | HTTP methods for registrations (`createRegistration`, `getRegistration`, `getRegistrationStatus`). |
| `src/services/paymentService.js` | HTTP methods for Razorpay (`createPaymentOrder`, `verifyPayment`, `loadRazorpayScript`). |
| `src/hooks/useRegistration.js` | React orchestration hook managing the registration state machine and Razorpay popup. |
| `src/pages/RegistrationPage.jsx` | Main registration UI layout binding form input, plan summary, and payment button. |
| `src/pages/OneDayRegistration.jsx` | Route for 1-Day Pass (`/register/1-day`). |
| `src/pages/TwoDayRegistration.jsx` | Route for 2-Day Pass (`/register/2-day`). |
| `src/pages/RegistrationSuccess.jsx` | Pass display page showing the QR code and entry details. |
| `src/pages/RegistrationStatus.jsx` | Public lookup page (`/registration/status`) by Registration ID & Mobile. |

---

## 4. API Request & Response Contracts

### 4.1 Create Registration

- **Triggered in**: `src/services/registrationService.js` → `createRegistration(payload)`
- **HTTP Method & URL**: `POST http://localhost:5001/api/registrations`

#### Request Payload
```json
{
  "plan": "ONE_DAY",
  "amount": 150,
  "selectedDay": "DAY_1",
  "details": {
    "fullName": "Pravin Sam",
    "mobile": "9876543210",
    "email": "user@example.com",
    "organization": "College / Company",
    "city": "Chennai"
  }
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "registrationId": "REG-000001",
  "status": "PENDING_PAYMENT",
  "plan": "ONE_DAY",
  "amount": 150,
  "selectedDay": "DAY_1",
  "details": {
    "fullName": "Pravin Sam",
    "mobile": "9876543210",
    "email": "user@example.com",
    "organization": "College / Company",
    "city": "Chennai"
  }
}
```

---

### 4.2 Create Razorpay Order

- **Triggered in**: `src/services/paymentService.js` → `createPaymentOrder({ registrationId })`
- **HTTP Method & URL**: `POST http://localhost:5001/api/payments/order`

#### Request Payload
```json
{
  "registrationId": "REG-000001"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "orderId": "order_Qz1234567890",
  "amount": 15000,
  "currency": "INR",
  "keyId": "rzp_test_Th1MLkFYaYiVFl"
}
```

---

### 4.3 Verify Payment & Generate Pass

- **Triggered in**: `src/services/paymentService.js` → `verifyPayment({ registrationId, razorpayResponse })`
- **HTTP Method & URL**: `POST http://localhost:5001/api/payments/verify`

#### Request Payload (Forwarded from Razorpay Checkout handler)
```json
{
  "registrationId": "REG-000001",
  "razorpayResponse": {
    "razorpay_order_id": "order_Qz1234567890",
    "razorpay_payment_id": "pay_QzABC1234567",
    "razorpay_signature": "9b1c7823f6e10745..."
  }
}
```

#### Success Response (`200 OK`)
```json
{
  "verified": true,
  "status": "PAYMENT_SUCCESS",
  "registrationId": "REG-000001",
  "passId": "EVT-7K29X4",
  "qrToken": "a8f3b20c91d4e5f67a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f"
}
```

---

### 4.4 Get Registration (Post-Payment / Reload)

- **Triggered in**: `src/services/registrationService.js` → `getRegistration(registrationId)`
- **HTTP Method & URL**: `GET http://localhost:5001/api/registrations/:registrationId`

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "registrationId": "REG-000001",
  "status": "PAID",
  "paymentStatus": "PAID",
  "fullName": "Pravin Sam",
  "plan": "ONE_DAY",
  "amount": 150,
  "selectedDay": "DAY_1",
  "allowedDays": ["DAY_1"],
  "passId": "EVT-7K29X4",
  "createdAt": "2026-09-27T09:44:50.423Z"
}
```

---

### 4.5 Public Status Lookup

- **Triggered in**: `src/services/registrationService.js` → `getRegistrationStatus({ registrationId, mobile })`
- **HTTP Method & URL**: `GET http://localhost:5001/api/registrations/status?registrationId=REG-000001&mobile=9876543210`

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "found": true,
  "registrationId": "REG-000001",
  "paymentStatus": "PAID",
  "plan": "ONE_DAY",
  "planLabel": "1-Day Pass",
  "selectedDay": "DAY_1"
}
```
