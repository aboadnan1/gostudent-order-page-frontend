import { useState } from "react";
import "./App.css";

import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";
import OrderPageIntro from "./components/order/OrderPageIntro";
import ContactDetailsSection from "./components/order/ContactDetailsSection";
import PaymentMethodSection from "./components/order/PaymentMethodSection";
import MembershipDurationSection from "./components/order/MembershipDurationSection";
import LessonsPerMonthSection from "./components/order/LessonsPerMonthSection";
import MembershipSummary from "./components/order/MembershipSummary";
import { billingCountries } from "./data/countries";
import { membershipTerms, monthlyLessonOptions } from "./data/membershipOptions";
import { translations } from "./i18n/translations";
import { getPricing } from "./utils/pricing";
import { isValidInternationalPhone } from "./utils/validation";

export default function App() {
  const [language, setLanguage] = useState("ar");
  const [selectedDuration, setSelectedDuration] = useState(12);
  const [selectedMonthlyLessons, setSelectedMonthlyLessons] = useState(4);
  const [payInAdvance, setPayInAdvance] = useState(false);
  const [loginCountryCode, setLoginCountryCode] = useState("+971");
  const [contactCountryCode, setContactCountryCode] = useState("+971");
  const [billingCountry, setBillingCountry] = useState("AE");

  const [formData, setFormData] = useState({
    loginPhone: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = translations[language];
  const selectedTerm = membershipTerms.find((term) => term.months === selectedDuration);
  const pricing = getPricing(selectedMonthlyLessons, selectedTerm, payInAdvance);

  function toggleLanguage() {
    setLanguage((currentLanguage) => (currentLanguage === "ar" ? "en" : "ar"));
  }

  function clearFieldError(fieldName) {
    setErrors((previous) => ({ ...previous, [fieldName]: "" }));
    setFormMessage(null);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    clearFieldError(name);
  }

  function handleCardNumberChange(event) {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 19);
    const formatted = digits.match(/.{1,4}/g)?.join(" ") || "";
    setFormData((previous) => ({ ...previous, cardNumber: formatted }));
    clearFieldError("cardNumber");
  }

  function handleExpiryDateChange(event) {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
    const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    setFormData((previous) => ({ ...previous, expiryDate: formatted }));
    clearFieldError("expiryDate");
  }

  function handleCvcChange(event) {
    const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
    setFormData((previous) => ({ ...previous, cvc: digits }));
    clearFieldError("cvc");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isValidInternationalPhone(formData.loginPhone, loginCountryCode)) {
      newErrors.loginPhone = "loginPhone";
    }
    if (!isValidInternationalPhone(formData.phone, contactCountryCode)) {
      newErrors.phone = "phone";
    }
    if (!emailPattern.test(formData.email.trim())) newErrors.email = "email";
    if (formData.fullName.trim().length < 3) newErrors.fullName = "fullName";
    if (formData.address.trim().length < 3) newErrors.address = "address";
    if (!formData.houseNumber.trim()) newErrors.houseNumber = "houseNumber";
    if (formData.postalCode.trim().length < 3) newErrors.postalCode = "postalCode";
    if (formData.city.trim().length < 2) newErrors.city = "city";

    const cardDigits = formData.cardNumber.replace(/\D/g, "");
    const expiryMatch = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(formData.expiryDate.trim());
    const validCardNumberLength = cardDigits.length >= 13 && cardDigits.length <= 19;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    let expiryIsFuture = false;

    if (expiryMatch) {
      const expiryMonth = Number(expiryMatch[1]);
      const expiryYear = Number(expiryMatch[2]);
      expiryIsFuture = expiryYear > currentYear || (expiryYear === currentYear && expiryMonth >= currentMonth);
    }

    if (formData.cardholderName.trim().length < 2) {
      newErrors.cardholderName = "cardholderName";
    }
    if (!validCardNumberLength) newErrors.cardNumber = "cardNumber";
    if (!expiryMatch || !expiryIsFuture) newErrors.expiryDate = "expiryDate";
    if (!/^\d{3,4}$/.test(formData.cvc)) newErrors.cvc = "cvc";
    if (!acceptedTerms) newErrors.terms = "terms";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setFormMessage({ type: "error", key: "validationError" });
      return;
    }

    setIsSubmitting(true);
    setFormMessage({ type: "loading", key: "submitting" });

    try {
      const apiUrl = window.GoStudentOrderPage?.restUrl;
      if (!apiUrl) {
        setFormMessage({ type: "success", key: "frontendSuccess" });
        return;
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName.trim(),
          student_name: formData.fullName.trim(),
          email: formData.email.trim(),
          country_code: contactCountryCode,
          phone: formData.phone.replace(/\D/g, ""),
          duration_months: selectedDuration,
          lessons_per_month: selectedMonthlyLessons,
          accepted_terms: acceptedTerms,
          language,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        const serverFields = data?.data?.fields;
        if (serverFields && typeof serverFields === "object") {
          const fieldMap = {
            full_name: "fullName",
            student_name: "fullName",
            email: "email",
            phone: "phone",
            country_code: "phone",
            accepted_terms: "terms",
          };
          const serverErrors = {};
          Object.keys(serverFields).forEach((serverField) => {
            const formField = fieldMap[serverField];
            if (formField && t.errors[formField]) serverErrors[formField] = formField;
          });
          if (Object.keys(serverErrors).length) {
            setErrors((previous) => ({ ...previous, ...serverErrors }));
          }
        }
        setFormMessage({ type: "error", key: "serverError" });
        return;
      }

      if (!data.order_id) {
        setFormMessage({ type: "error", key: "serverError" });
        return;
      }

      setFormMessage({ type: "success", key: "success", orderId: data.order_id });
    } catch (error) {
      console.error("GoStudent Order API request failed:", error);
      setFormMessage({ type: "error", key: "networkError" });
    } finally {
      setIsSubmitting(false);
    }
  }

  function getMessageText() {
    if (!formMessage) return "";
    if (formMessage.key === "success") {
      return t.messages.success.replace("{orderId}", String(formMessage.orderId));
    }
    return t.messages[formMessage.key] || t.messages.serverError;
  }

  return (
    <div className="app" lang={language} dir={t.direction}>
      <SiteHeader language={language} t={t} onToggleLanguage={toggleLanguage} />

      <main id="main" className="container page-container">
        <OrderPageIntro t={t} />

        <div className="checkout-layout">
          <section className="checkout-form-section" aria-label={t.customerTitle}>
            <form id="order-form" onSubmit={handleSubmit} noValidate>
              <ContactDetailsSection
                formData={formData}
                errors={errors}
                t={t}
                language={language}
                loginCountryCode={loginCountryCode}
                contactCountryCode={contactCountryCode}
                setLoginCountryCode={setLoginCountryCode}
                setContactCountryCode={setContactCountryCode}
                billingCountry={billingCountry}
                billingCountries={billingCountries}
                setBillingCountry={setBillingCountry}
                onInputChange={handleInputChange}
                clearFieldError={clearFieldError}
              />

              <PaymentMethodSection
                formData={formData}
                errors={errors}
                t={t}
                handleCardNumberChange={handleCardNumberChange}
                handleExpiryDateChange={handleExpiryDateChange}
                handleCvcChange={handleCvcChange}
                onInputChange={handleInputChange}
              />

              <MembershipDurationSection
                language={language}
                t={t}
                membershipTerms={membershipTerms}
                selectedDuration={selectedDuration}
                selectedMonthlyLessons={selectedMonthlyLessons}
                payInAdvance={payInAdvance}
                setSelectedDuration={setSelectedDuration}
                setFormMessage={setFormMessage}
              />

              <LessonsPerMonthSection
                language={language}
                t={t}
                monthlyLessonOptions={monthlyLessonOptions}
                selectedMonthlyLessons={selectedMonthlyLessons}
                setSelectedMonthlyLessons={setSelectedMonthlyLessons}
                setFormMessage={setFormMessage}
              />
            </form>
          </section>

          <MembershipSummary
            language={language}
            t={t}
            selectedTerm={selectedTerm}
            selectedMonthlyLessons={selectedMonthlyLessons}
            payInAdvance={payInAdvance}
            acceptedTerms={acceptedTerms}
            setAcceptedTerms={setAcceptedTerms}
            setPayInAdvance={setPayInAdvance}
            pricing={pricing}
            errors={errors}
            formMessage={formMessage}
            isSubmitting={isSubmitting}
            getMessageText={getMessageText}
            setFormMessage={setFormMessage}
            setErrors={setErrors}
            onSubmit={handleSubmit}
          />
        </div>
      </main>

      <SiteFooter t={t} />
    </div>
  );
}
