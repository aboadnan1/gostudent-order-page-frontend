import { basePricePerLesson } from "../data/membershipOptions";

export function getPricing(lessonCount, term, payInAdvance = false) {
  const originalPricePerLesson = basePricePerLesson[lessonCount];
  const termPricePerLesson = Math.round(originalPricePerLesson * (1 - term.discount));
  const standardMonthlyPayment = termPricePerLesson * lessonCount;
  const pricePerLesson = Math.round(termPricePerLesson * (payInAdvance ? 0.95 : 1));
  const monthlyPayment = pricePerLesson * lessonCount;
  const regularMonthlyPayment = originalPricePerLesson * lessonCount;
  const monthlySavings = regularMonthlyPayment - monthlyPayment;
  const advanceSavings = payInAdvance ? standardMonthlyPayment - monthlyPayment : 0;

  return {
    pricePerLesson,
    monthlyPayment,
    regularMonthlyPayment,
    monthlySavings,
    advanceSavings,
    discountPercentage: regularMonthlyPayment
      ? Math.round((monthlySavings / regularMonthlyPayment) * 100)
      : 0,
    totalPayment: monthlyPayment * term.months,
    totalSavings: monthlySavings * term.months,
  };
}
