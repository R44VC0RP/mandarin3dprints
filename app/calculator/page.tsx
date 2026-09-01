import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PrintCostCalculator } from "@/components/print-cost-calculator";
import { socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "3D printing cost and profit calculator",
  description: "Calculate a whole-job 3D printing price from filament, machine time, labor, failed prints, selling fees, and your target profit margin. Free calculator in USD.",
  alternates: { canonical: "https://mandarin3d.com/calculator" },
  openGraph: { title: "3D printing cost and profit calculator", description: "Calculate job costs, selling fees, and a price for your target margin.", url: "https://mandarin3d.com/calculator", images: [socialImage("calculator", "3D printing cost and profit calculator")] },
  twitter: { card: "summary_large_image", title: "3D printing cost and profit calculator", description: "Calculate job costs, selling fees, and a price for your target margin.", images: [socialImage("calculator", "3D printing cost and profit calculator").url] },
};

export default function CalculatorPage() {
  return (
    <>
      <div className="site-width">
        <Header />
        <main id="main-content" className="py-8 sm:py-10">
          <h1 className="section-heading mb-6">3D printing cost and profit calculator</h1>
          <PrintCostCalculator />

          <section aria-labelledby="assumptions-heading" className="mt-10 border-t border-border pt-7">
            <h2 id="assumptions-heading" className="text-xl font-semibold">How the price is calculated</h2>
            <div className="mt-4 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>Material cost is grams / 1,000 multiplied by filament price per kg. Machine cost is printer-hours multiplied by your machine rate. Together, these are the cost of one print attempt.</p>
              <p>Expected attempt cost = attempt cost / (1 - failure rate). Each failed attempt is assumed to consume the full material and machine time, with the same failure probability on every retry. Hands-on labor and other job costs are charged once, not per attempt.</p>
              <p>Total job cost = expected attempt cost + labor + other job costs. Selling price = (total job cost + fixed selling fee) / (1 - selling fee rate - desired margin rate), rounded up to a cent. Percentages are converted to decimal rates in these formulas.</p>
              <p>Net profit = selling price - total job cost - fixed selling fee - percentage selling fee. Enter packaging and shipping you pay under other job costs. Include electricity and depreciation in the machine rate only. Tax is not included.</p>
            </div>
            <Link href="/blog/how-to-price-3d-printing-jobs" className="inline-link mt-3 min-h-11 text-sm">Read the guide to pricing 3D printing jobs</Link>
          </section>

          <section aria-labelledby="consulting-heading" className="mt-7 flex flex-col items-start justify-between gap-4 border-t border-border pt-7 sm:flex-row sm:items-center">
            <div>
              <h2 id="consulting-heading" className="text-xl font-semibold">Work through your business pricing</h2>
              <p className="mt-2 text-sm text-muted-foreground">3D printing business consulting with Ryan Vogel. $300 per session.</p>
            </div>
            <Link href="/consulting" className="action-link shrink-0">Explore consulting</Link>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
