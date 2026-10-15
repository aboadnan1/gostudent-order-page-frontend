import { formatNumber, formatPrice } from "../../utils/formatters";

export default function MembershipSummary({
  language,
  t,
  selectedTerm,
  selectedMonthlyLessons,
  payInAdvance,
  acceptedTerms,
  setAcceptedTerms,
  setPayInAdvance,
  pricing,
  errors,
  formMessage,
  isSubmitting,
  getMessageText,
  setFormMessage,
  setErrors,
}) {
  const isArabic = language === "ar";

  return (
    <aside className="summary-card" aria-labelledby="summary-title">
      <div className="summary-header">
        <span className="summary-icon" aria-hidden="true">✓</span>
        <div>
          <h2 id="summary-title">{t.summaryTitle}</h2>
          <p>{t.summaryDescription}</p>
        </div>
      </div>

      <div className="selected-plan">
        <span className="summary-label">{t.selectedDuration}</span>
        <strong>{t.durationLabels[selectedTerm.months]}</strong>
      </div>

      <div className="summary-row">
        <span>{t.selectedFrequency}</span>
        <strong>{formatNumber(selectedMonthlyLessons, language)}</strong>
      </div>
      <div className="summary-row">
        <span>{t.pricePerLesson}</span>
        <strong>{formatPrice(pricing.pricePerLesson, language)}</strong>
      </div>
      <div className="summary-row">
        <span>{t.regularPrice}</span>
        <strong>{formatPrice(pricing.regularMonthlyPayment, language)}</strong>
      </div>
      <div className="summary-row">
        <span>{t.yourPrice}</span>
        <strong>{formatPrice(pricing.monthlyPayment, language)}</strong>
      </div>
      <div className="summary-row savings-row">
        <span>{t.discountLabel}</span>
        <strong>{formatNumber(pricing.discountPercentage, language)}%</strong>
      </div>

      <label className="prepayment-option">
        <input
          type="checkbox"
          checked={payInAdvance}
          onChange={(event) => {
            setPayInAdvance(event.target.checked);
            setFormMessage(null);
          }}
        />
        <span>
          <strong>{t.prepaymentLabel}</strong>
          <small>{t.prepaymentDescription}</small>
        </span>
      </label>

      {payInAdvance && (
        <div className="summary-row savings-row">
          <span>{t.advanceDiscount}</span>
          <strong>{formatPrice(pricing.advanceSavings, language)}</strong>
        </div>
      )}

      <div className="summary-divider" />
      <div className="monthly-total">
        <span>{t.monthlyPayment}</span>
        <strong>{formatPrice(pricing.monthlyPayment, language)}</strong>
      </div>
      <div className="summary-row savings-row">
        <span>{t.totalSavings}</span>
        <strong>{formatPrice(pricing.totalSavings, language)}</strong>
      </div>
      <div className="contract-total">
        <span>{t.totalContract}</span>
        <strong>{formatPrice(pricing.totalPayment, language)}</strong>
        <span className="contract-duration">{t.durationLabels[selectedTerm.months]}</span>
      </div>

      <p className="summary-note">{t.summaryNote}</p>
      <p className="refund-note">{t.refundNote}</p>
      <p className="security-note">{t.securityNote}</p>

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
      {errors.terms && <p className="field-error terms-error">{t.errors.terms}</p>}

      <button
        className="submit-button"
        type="submit"
        form="order-form"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? t.messages.submitting : t.submitButton}
        {!isSubmitting && <span aria-hidden="true">{isArabic ? "←" : "→"}</span>}
      </button>

      {formMessage && (
        <div className={`form-message ${formMessage.type}`} role="status" aria-live="polite" aria-atomic="true">
          {getMessageText()}
        </div>
      )}
    </aside>
  );
}
