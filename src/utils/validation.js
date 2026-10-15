export function isValidInternationalPhone(phone, dialCode) {
  const phoneDigits = phone.replace(/\D/g, "");
  const countryDigits = dialCode.replace(/\D/g, "");
  const fullLength = phoneDigits.length + countryDigits.length;

  return phoneDigits.length >= 6 && fullLength >= 8 && fullLength <= 15;
}
