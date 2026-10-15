export function formatNumber(value, language) {
  return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-GB").format(value);
}

export function formatPrice(value, language) {
  return new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-GB", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(value);
}
