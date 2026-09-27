import { QRCodeSVG } from "qrcode.react";

/**
 * Renders whatever secure token/identifier the backend issues for this
 * pass. The frontend never builds this value itself and never encodes
 * name, phone, email, or payment status into it — only an opaque token
 * the backend can look up and validate at the door.
 */
export default function QRCodeDisplay({ token, size = 168 }) {
  return (
    <div className="pass-qr-wrap">
      <QRCodeSVG value={token} size={size} level="M" />
    </div>
  );
}
