import { countries } from "../../data/countries";

function PhoneField({
  inputId,
  fieldName,
  label,
  placeholder,
  value,
  dialCode,
  onDialCodeChange,
  errorKey,
  autoComplete,
  errors,
  t,
  isArabic,
  onInputChange,
  clearFieldError,
}) {
  return (
    <div className="form-field">
      <label htmlFor={inputId}>{label}</label>
      <div className="phone-input-group">
        <select
          className="country-code-select"
          aria-label={t.countryCodeLabel}
          value={dialCode}
          onChange={(event) => {
            onDialCodeChange(event.target.value);
            clearFieldError(fieldName);
          }}
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag} {isArabic ? country.ar : country.en} ({country.code})
            </option>
          ))}
        </select>
        <input
          id={inputId}
          name={fieldName}
          type="tel"
          dir="ltr"
          inputMode="tel"
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onInputChange}
          aria-invalid={Boolean(errors[errorKey])}
          aria-describedby={errors[errorKey] ? `${inputId}-error` : undefined}
        />
      </div>
      {errors[errorKey] && (
        <span id={`${inputId}-error`} className="field-error">
          {t.errors[errors[errorKey]]}
        </span>
      )}
    </div>
  );
}

export default function ContactDetailsSection({
  formData,
  errors,
  t,
  language,
  loginCountryCode,
  contactCountryCode,
  setLoginCountryCode,
  setContactCountryCode,
  billingCountry,
  billingCountries,
  setBillingCountry,
  onInputChange,
  clearFieldError,
}) {
  const isArabic = language === "ar";

  return (
    <section className="form-card">
      <div className="section-heading">
        <span className="section-number">01</span>
        <div>
          <h2>{t.customerTitle}</h2>
          <p>{t.customerDescription}</p>
        </div>
      </div>

      <div className="form-fields">
        <PhoneField
          inputId="loginPhone"
          fieldName="loginPhone"
          label={t.loginPhoneLabel}
          placeholder={t.loginPhonePlaceholder}
          value={formData.loginPhone}
          dialCode={loginCountryCode}
          onDialCodeChange={setLoginCountryCode}
          errorKey="loginPhone"
          autoComplete="tel"
          errors={errors}
          t={t}
          isArabic={isArabic}
          onInputChange={onInputChange}
          clearFieldError={clearFieldError}
        />
        <PhoneField
          inputId="phone"
          fieldName="phone"
          label={t.contactPhoneLabel}
          placeholder={t.phonePlaceholder}
          value={formData.phone}
          dialCode={contactCountryCode}
          onDialCodeChange={setContactCountryCode}
          errorKey="phone"
          autoComplete="tel-national"
          errors={errors}
          t={t}
          isArabic={isArabic}
          onInputChange={onInputChange}
          clearFieldError={clearFieldError}
        />

        <div className="form-field">
          <label htmlFor="email">{t.emailLabel}</label>
          <input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            value={formData.email}
            onChange={onInputChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className="field-error">
              {t.errors.email}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="fullName">{t.fullNameLabel}</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder={t.fullNamePlaceholder}
            value={formData.fullName}
            onChange={onInputChange}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && (
            <span id="fullName-error" className="field-error">
              {t.errors.fullName}
            </span>
          )}
        </div>
      </div>

      <div className="subsection-heading">
        <h3>{t.billingAddressTitle}</h3>
      </div>

      <div className="billing-address-grid">
        <div className="form-field">
          <label htmlFor="address">{t.addressLabel}</label>
          <input
            id="address"
            name="address"
            type="text"
            autoComplete="street-address"
            placeholder={t.addressPlaceholder}
            value={formData.address}
            onChange={onInputChange}
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? "address-error" : undefined}
          />
          {errors.address && (
            <span id="address-error" className="field-error">
              {t.errors.address}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="houseNumber">{t.houseNumberLabel}</label>
          <input
            id="houseNumber"
            name="houseNumber"
            type="text"
            autoComplete="address-line2"
            placeholder={t.houseNumberPlaceholder}
            value={formData.houseNumber}
            onChange={onInputChange}
            aria-invalid={Boolean(errors.houseNumber)}
            aria-describedby={errors.houseNumber ? "houseNumber-error" : undefined}
          />
          {errors.houseNumber && (
            <span id="houseNumber-error" className="field-error">
              {t.errors.houseNumber}
            </span>
          )}
        </div>
      </div>

      <div className="billing-meta-grid">
        <div className="form-field">
          <label htmlFor="postalCode">{t.postalCodeLabel}</label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            autoComplete="postal-code"
            placeholder={t.postalCodePlaceholder}
            value={formData.postalCode}
            onChange={onInputChange}
            aria-invalid={Boolean(errors.postalCode)}
            aria-describedby={errors.postalCode ? "postalCode-error" : undefined}
          />
          {errors.postalCode && (
            <span id="postalCode-error" className="field-error">
              {t.errors.postalCode}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="city">{t.cityLabel}</label>
          <input
            id="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            placeholder={t.cityPlaceholder}
            value={formData.city}
            onChange={onInputChange}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? "city-error" : undefined}
          />
          {errors.city && (
            <span id="city-error" className="field-error">
              {t.errors.city}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="billingCountry">{t.billingCountryLabel}</label>
          <select
            id="billingCountry"
            name="billingCountry"
            autoComplete="country-name"
            value={billingCountry}
            onChange={(event) => {
              setBillingCountry(event.target.value);
              clearFieldError("billingCountry");
            }}
          >
            {billingCountries.map((country) => (
              <option key={country.code} value={country.code}>
                {isArabic ? country.ar : country.en}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
