import { formatNumber, formatPrice } from "../../utils/formatters";
import { getPricing } from "../../utils/pricing";

export default function MembershipDurationSection({
  language,
  t,
  membershipTerms,
  selectedDuration,
  selectedMonthlyLessons,
  payInAdvance,
  setSelectedDuration,
  setFormMessage,
}) {
  return (
    <section className="form-card">
      <div className="section-heading">
        <span className="section-number">03</span>
        <div>
          <h2>{t.durationTitle}</h2>
          <p>{t.durationSectionDescription}</p>
        </div>
      </div>

      <div className="plan-options">
        {membershipTerms.map((term) => {
          const termPricing = getPricing(selectedMonthlyLessons, term, payInAdvance);
          return (
            <label
              key={term.months}
              className={`plan-card ${selectedDuration === term.months ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="membershipDuration"
                value={term.months}
                checked={selectedDuration === term.months}
                onChange={() => {
                  setSelectedDuration(term.months);
                  setFormMessage(null);
                }}
              />
              <span className="plan-check" aria-hidden="true">
                {selectedDuration === term.months ? "✓" : ""}
              </span>
              {term.popular && <span className="popular-badge">{t.popular}</span>}
              <span className="plan-title">{t.durationLabels[term.months]}</span>
              <span className="plan-description">{t.durationDescription}</span>
              <span className="plan-price">{formatPrice(termPricing.monthlyPayment, language)}</span>
              <span className="plan-monthly-caption">{t.monthlyPrice}</span>
              {term.discount > 0 && (
                <span className="plan-discount">
                  {t.saveDiscount.replace("{discount}", formatNumber(term.discount * 100, language))}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </section>
  );
}
