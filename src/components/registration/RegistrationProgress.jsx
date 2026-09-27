const STEPS = ["Your details", "Review & pay", "Confirmation"];

export default function RegistrationProgress({ activeStep }) {
  return (
    <ol className="reg-progress">
      {STEPS.map((step, i) => (
        <li
          key={step}
          className={i === activeStep ? "is-active" : i < activeStep ? "is-done" : ""}
        >
          {step}
        </li>
      ))}
    </ol>
  );
}
