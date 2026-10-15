export default function OrderSubmitButton({
  t,
  isArabic,
  isSubmitting,
  acceptedTerms,
  setAcceptedTerms,
  setErrors,
  setFormMessage,
}) {
  return (
    <>
      <label className="terms-option">
        <input
          type="checkbox"
          form="order-form"
          checked={acceptedTerms}
          onChange={(event) => {
            setAcceptedTerms(event.target.checked);
            setErrors((previous) => ({ ...previous, terms: "" }));
            setFormMessage(null);
          }}
        />
        <span>{t.terms}</span>
      </label>

      <button className="submit-button" type="submit" form="order-form" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? t.messages.submitting : t.submitButton}
        {!isSubmitting && <span aria-hidden="true">{isArabic ? "←" : "→"}</span>}
      </button>
    </>
  );
}
