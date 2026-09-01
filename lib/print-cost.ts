export const printCostExample = {
  materialGrams: 150,
  filamentPricePerKg: 25,
  machineHours: 8,
  machineRatePerHour: 1,
  laborMinutes: 30,
  laborRatePerHour: 25,
  otherJobCosts: 3,
  failurePercent: 10,
  sellingFeePercent: 3,
  fixedSellingFee: 0.3,
  profitMarginPercent: 30,
};

export type PrintCostField = keyof typeof printCostExample;
export type PrintCostInput = Record<PrintCostField, number | string>;
export type PrintCostErrors = Partial<Record<PrintCostField, string>>;

export function calculatePrintCost(input: PrintCostInput) {
  const errors: PrintCostErrors = {};
  const values = {} as Record<PrintCostField, number>;

  for (const key of Object.keys(printCostExample) as PrintCostField[]) {
    const raw = input[key];
    const value = typeof raw === "string" && raw.trim() !== "" ? Number(raw) : raw;
    const isPercent = key.endsWith("Percent");
    if (typeof value !== "number" || !Number.isFinite(value)) {
      errors[key] = "Enter a finite number; this field cannot be empty.";
    } else if (value < 0 || value > (isPercent ? 100 : 1_000_000)) {
      errors[key] = isPercent
        ? "Enter a percentage from 0 to less than 100."
        : "Enter a number from 0 to 1,000,000.";
    } else if (isPercent && value >= 100) {
      errors[key] = "Enter a percentage from 0 to less than 100.";
    } else {
      values[key] = value;
    }
  }

  if (values.sellingFeePercent + values.profitMarginPercent >= 100) {
    errors.sellingFeePercent = "Selling fee and profit margin must total less than 100%.";
    errors.profitMarginPercent = errors.sellingFeePercent;
  }

  if (Object.keys(errors).length) return { valid: false as const, errors };

  const materialCost = (values.materialGrams / 1000) * values.filamentPricePerKg;
  const machineCost = values.machineHours * values.machineRatePerHour;
  const attemptCost = materialCost + machineCost;
  const expectedAttemptCost = attemptCost / (1 - values.failurePercent / 100);
  const failureAllowance = expectedAttemptCost - attemptCost;
  const laborCost = (values.laborMinutes / 60) * values.laborRatePerHour;
  const totalJobCost = expectedAttemptCost + laborCost + values.otherJobCosts;
  const feeRate = values.sellingFeePercent / 100;
  const marginRate = values.profitMarginPercent / 100;
  const unroundedPrice = (totalJobCost + values.fixedSellingFee) / (1 - feeRate - marginRate);
  const price = Math.ceil(unroundedPrice * 100) / 100;
  const percentageSellingFee = price * feeRate;
  const sellingFees = percentageSellingFee + values.fixedSellingFee;
  const totalCosts = totalJobCost + sellingFees;
  const netProfit = price - totalJobCost - values.fixedSellingFee - percentageSellingFee;
  const netMarginPercent = price > 0 ? (netProfit / price) * 100 : null;
  const markupPercent = totalCosts > 0 ? (netProfit / totalCosts) * 100 : null;

  // Reject extreme combinations before currency rounding loses cent precision.
  if (
    !Number.isFinite(price) || price > Number.MAX_SAFE_INTEGER / 100 ||
    !Number.isFinite(netProfit) ||
    (netMarginPercent !== null && !Number.isFinite(netMarginPercent)) ||
    (markupPercent !== null && !Number.isFinite(markupPercent))
  ) {
    return {
      valid: false as const,
      errors,
      message: "These inputs exceed the calculator's supported range. Reduce costs or move the percentages away from 100%.",
    };
  }

  return {
    valid: true as const,
    materialCost,
    machineCost,
    attemptCost,
    expectedAttemptCost,
    failureAllowance,
    laborCost,
    otherJobCosts: values.otherJobCosts,
    totalJobCost,
    price,
    percentageSellingFee,
    fixedSellingFee: values.fixedSellingFee,
    sellingFees,
    totalCosts,
    netProfit,
    netMarginPercent,
    markupPercent,
  };
}
