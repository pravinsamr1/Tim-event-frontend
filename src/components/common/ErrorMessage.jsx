export default function ErrorMessage({ title = "Something went wrong.", message, children }) {
  return (
    <div className="error-banner" role="alert">
      <div>
        <strong>{title}</strong>
        {message && <p>{message}</p>}
        {children}
      </div>
    </div>
  );
}
