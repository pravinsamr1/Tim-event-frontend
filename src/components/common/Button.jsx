export default function Button({
  children,
  variant = "primary",
  block = false,
  loading = false,
  className = "",
  ...rest
}) {
  const variantClass = {
    primary: "btn-primary",
    gold: "btn-gold",
    outline: "btn-outline",
  }[variant];

  return (
    <button
      className={`btn ${variantClass} ${block ? "btn-block" : ""} ${className}`}
      disabled={rest.disabled || loading}
      {...rest}
    >
      {loading && <span className="spinner spinner-inline" aria-hidden="true" />}
      {children}
    </button>
  );
}
