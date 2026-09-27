export function validatePersonalDetails(values) {
  const errors = {};

  if (!values.fullName || values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (!values.mobile || !/^[6-9]\d{9}$/.test(values.mobile.trim())) {
    errors.mobile = "Enter a valid 10-digit mobile number.";
  }

  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

export function hasErrors(errorsObject) {
  return Object.keys(errorsObject).length > 0;
}
