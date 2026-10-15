export default function PaymentMethodSection({
  formData,
  errors,
  t,
  handleCardNumberChange,
  handleExpiryDateChange,
  handleCvcChange,
  onInputChange,
}) {
  return (
    <section className="form-card">
      <div className="section-heading">
        <span className="section-number">02</span>
        <div>
          <h2>{t.paymentTitle}</h2>
          <p>{t.paymentDescription}</p>
        </div>
      </div>

      <p className="payment-method-label">{t.paymentMethodLabel}</p>
      <div className="payment-method-options">
        <label className="payment-method-option selected">
          <input type="radio" name="paymentMethod" value="card" defaultChecked aria-label={t.cardPaymentLabel} />
          <span>{t.cardPaymentLabel}</span>
        </label>
      </div>

      <div className="payment-brands" aria-label={t.acceptedCardsLabel}>
        <span className="payment-brand visa">VISA</span>
        <span className="payment-brand mastercard">
          <i />
          <i />
          <b>mastercard</b>
        </span>
        <span className="payment-brand amex">AMEX</span>
      </div>

      <div className="payment-fields">
        <div className="form-field">
          <label htmlFor="cardholderName">{t.cardholderNameLabel}</label>
          <input
            id="cardholderName"
            name="cardholderName"
            type="text"
            autoComplete="cc-name"
            placeholder={t.cardholderNamePlaceholder}
            value={formData.cardholderName}
            onChange={onInputChange}
            aria-invalid={Boolean(errors.cardholderName)}
            aria-describedby={errors.cardholderName ? "cardholderName-error" : undefined}
          />
          {errors.cardholderName && (
            <span id="cardholderName-error" className="field-error">
              {t.errors.cardholderName}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="cardNumber">{t.cardNumberLabel}</label>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            inputMode="numeric"
            dir="ltr"
            autoComplete="cc-number"
            maxLength={23}
            placeholder={t.cardNumberPlaceholder}
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            aria-invalid={Boolean(errors.cardNumber)}
            aria-describedby={errors.cardNumber ? "cardNumber-error" : undefined}
          />
          {errors.cardNumber && (
            <span id="cardNumber-error" className="field-error">
              {t.errors.cardNumber}
            </span>
          )}
        </div>

        <div className="card-details-grid">
          <div className="form-field">
            <label htmlFor="expiryDate">{t.expiryDateLabel}</label>
            <input
              id="expiryDate"
              name="expiryDate"
              type="text"
              inputMode="numeric"
              dir="ltr"
              autoComplete="cc-exp"
              maxLength={5}
              placeholder={t.expiryDatePlaceholder}
              value={formData.expiryDate}
              onChange={handleExpiryDateChange}
              aria-invalid={Boolean(errors.expiryDate)}
              aria-describedby={errors.expiryDate ? "expiryDate-error" : undefined}
            />
            {errors.expiryDate && (
              <span id="expiryDate-error" className="field-error">
                {t.errors.expiryDate}
              </span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="cvc">{t.cvcLabel}</label>
            <input
              id="cvc"
              name="cvc"
              type="password"
              inputMode="numeric"
              dir="ltr"
              autoComplete="cc-csc"
              maxLength={4}
              placeholder={t.cvcPlaceholder}
              value={formData.cvc}
              onChange={handleCvcChange}
              aria-invalid={Boolean(errors.cvc)}
              aria-describedby={errors.cvc ? "cvc-error" : undefined}
            />
            {errors.cvc && (
              <span id="cvc-error" className="field-error">
                {t.errors.cvc}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="demo-payment-note">{t.demoPaymentNote}</p>
    </section>
  );
}
