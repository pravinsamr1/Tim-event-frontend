export default function Loader({ label = "Loading…", note }) {
  return (
    <div className="loader-block" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <div>
        <p style={{ margin: 0, fontWeight: 700, color: "var(--ink)" }}>{label}</p>
        {note && <p className="loader-note">{note}</p>}
      </div>
    </div>
  );
}
