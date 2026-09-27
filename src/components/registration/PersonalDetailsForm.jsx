import Input from "../common/Input";

export default function PersonalDetailsForm({ values, errors, onChange, disabled }) {
  const handle = (field) => (e) => onChange(field, e.target.value);
  const handleMobile = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange("mobile", digitsOnly);
  };

  return (
    <div>
      <h2>Your details</h2>
      <Input
        id="fullName"
        label="Full name"
        required
        autoComplete="name"
        value={values.fullName}
        onChange={handle("fullName")}
        error={errors.fullName}
        disabled={disabled}
      />
      <Input
        id="mobile"
        label="Mobile number"
        required
        type="tel"
        inputMode="numeric"
        maxLength={10}
        autoComplete="tel"
        placeholder="10-digit mobile number"
        value={values.mobile}
        onChange={handleMobile}
        error={errors.mobile}
        disabled={disabled}
      />
      <Input
        id="email"
        label="Email"
        required
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={handle("email")}
        error={errors.email}
        disabled={disabled}
      />
      <Input
        id="organization"
        label="College / Organization"
        autoComplete="organization"
        value={values.organization}
        onChange={handle("organization")}
        disabled={disabled}
      />
      <Input
        id="city"
        label="City"
        autoComplete="address-level2"
        value={values.city}
        onChange={handle("city")}
        disabled={disabled}
      />
    </div>
  );
}
