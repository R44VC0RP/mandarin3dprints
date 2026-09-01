"use client";

import { useState } from "react";
import { calculatePrintCost, printCostExample, type PrintCostField, type PrintCostInput } from "@/lib/print-cost";

const groups: { title: string; fields: { key: PrintCostField; label: string; help?: string }[] }[] = [
  {
    title: "Print attempt",
    fields: [
      { key: "materialGrams", label: "Material (grams)", help: "Include supports and waste for the whole job." },
      { key: "filamentPricePerKg", label: "Filament (USD/kg)" },
      { key: "machineHours", label: "Machine time (hours)", help: "Total printer-hours for one complete attempt." },
      { key: "machineRatePerHour", label: "Machine rate (USD/hour)", help: "Include power and depreciation here, not again below." },
      { key: "failurePercent", label: "Expected failure rate (%)", help: "Share of attempts that fail, not a price markup." },
    ],
  },
  {
    title: "Labor and other costs",
    fields: [
      { key: "laborMinutes", label: "Hands-on labor (minutes)" },
      { key: "laborRatePerHour", label: "Labor rate (USD/hour)" },
      { key: "otherJobCosts", label: "Other job costs (USD)", help: "Include packaging, shipping you pay, and other costs not entered above." },
    ],
  },
  {
    title: "Selling fees and profit",
    fields: [
      { key: "sellingFeePercent", label: "Selling fee (%)", help: "Percentage of the selling price." },
      { key: "fixedSellingFee", label: "Fixed selling fee (USD)", help: "Charged once per job." },
      { key: "profitMarginPercent", label: "Desired profit margin (%)", help: "Profit as a share of selling price, after selling fees." },
    ],
  },
];

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function PrintCostCalculator() {
  const [input, setInput] = useState<PrintCostInput>({ ...printCostExample });
  const result = calculatePrintCost(input);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
      <form onSubmit={(event) => event.preventDefault()} className="min-w-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="max-w-sm text-sm text-muted-foreground">Editable example values, not measured business data. Enter totals for the whole job. All money is USD.</p>
          <button type="button" className="inline-link min-h-11 text-sm" onClick={() => setInput({ ...printCostExample })}>Reset example</button>
        </div>
        <div className="space-y-7">
          {groups.map((group) => (
            <fieldset key={group.title}>
              <legend className="mb-4 text-lg font-semibold">{group.title}</legend>
              <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                {group.fields.map(({ key, label, help }) => {
                  const error = result.valid ? undefined : result.errors[key];
                  return (
                    <div key={key} className="min-w-0">
                      <label htmlFor={key} className="mb-1.5 block text-sm font-medium">{label}</label>
                      <input
                        id={key}
                        name={key}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={key.endsWith("Percent") ? undefined : 1_000_000}
                        step="any"
                        required
                        value={input[key]}
                        onChange={(event) => setInput({ ...input, [key]: event.target.value })}
                        aria-invalid={Boolean(error)}
                        aria-describedby={[help && `${key}-help`, error && `${key}-error`].filter(Boolean).join(" ") || undefined}
                        className="min-h-11 w-full rounded-md border border-[#b5bec1] bg-background px-3 py-2 text-base tabular-nums aria-invalid:border-[#a12f27]"
                      />
                      {help && <p id={`${key}-help`} className="mt-1.5 text-sm leading-snug text-muted-foreground">{help}</p>}
                      {error && <p id={`${key}-error`} className="mt-1.5 text-sm leading-snug text-[#a12f27]">{error}</p>}
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </form>

      <aside aria-labelledby="estimate-heading" className="min-w-0 bg-[#edf2f3] p-5 sm:p-6 lg:sticky lg:top-6">
        <h2 id="estimate-heading" className="text-xl font-semibold">Whole-job estimate</h2>
        <div aria-live="polite" aria-atomic="true">
          {result.valid ? (
            <>
              <p className="mt-5 text-sm">Selling price (USD)</p>
              <p className="mt-1 break-words text-3xl font-semibold tracking-tight tabular-nums">{usd.format(result.price)}</p>
              <p className="mt-2 text-sm text-muted-foreground">{result.price === 0 ? "A zero-cost job produces a $0.00 price; its profit margin is not defined." : "Rounded up to the next cent to meet your target margin."}</p>
              <dl className="mt-6 space-y-2 text-sm tabular-nums">
                {[
                  ["Material, one attempt", result.materialCost],
                  ["Machine, one attempt", result.machineCost],
                  ["Expected failed-attempt costs", result.failureAllowance],
                  ["Hands-on labor", result.laborCost],
                  ["Other job costs", result.otherJobCosts],
                ].map(([label, amount]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt>{label}</dt><dd className="shrink-0">{usd.format(amount as number)}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 border-t border-[#cbd5d8] pt-3 font-semibold">
                  <dt>Total job cost</dt><dd>{usd.format(result.totalJobCost)}</dd>
                </div>
                <div className="flex justify-between gap-4"><dt>Percentage selling fee</dt><dd>{usd.format(result.percentageSellingFee)}</dd></div>
                <div className="flex justify-between gap-4"><dt>Fixed selling fee</dt><dd>{usd.format(result.fixedSellingFee)}</dd></div>
                <div className="flex justify-between gap-4 border-t border-[#cbd5d8] pt-3 font-semibold">
                  <dt>Net profit</dt><dd>{usd.format(result.netProfit)}</dd>
                </div>
                <div className="flex justify-between gap-4"><dt>Net profit margin</dt><dd>{result.netMarginPercent === null ? "Not defined" : `${result.netMarginPercent.toFixed(2)}%`}</dd></div>
                <div className="flex justify-between gap-4"><dt>Markup on all costs</dt><dd>{result.markupPercent === null ? "Not defined" : `${result.markupPercent.toFixed(2)}%`}</dd></div>
              </dl>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Margin is net profit divided by price. Markup is net profit divided by all costs, including selling fees. A zero denominator has no defined percentage.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Breakdown amounts are displayed to the nearest cent; calculations use unrounded costs. Tax is not included.</p>
            </>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-[#a12f27]">{result.message ?? "Complete or correct the highlighted fields to see a price. No estimate is shown while inputs are invalid."}</p>
          )}
        </div>
      </aside>
    </div>
  );
}
