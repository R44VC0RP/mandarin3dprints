import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { socialImage } from "@/lib/seo";

const description = "3D printing business consulting with Ryan Vogel, founder of Mandarin3D. Work through pricing, printer choices, customer acquisition, and operations. $300 per session.";

export const metadata: Metadata = {
  title: "3D printing business consulting",
  description,
  alternates: { canonical: "https://mandarin3d.com/consulting" },
  openGraph: {
    title: "3D printing business consulting | Mandarin3D",
    description,
    url: "https://mandarin3d.com/consulting",
    images: [socialImage("consulting", "3D printing business consulting")],
  },
  twitter: {
    card: "summary_large_image",
    images: [socialImage("consulting", "3D printing business consulting").url],
    title: "3D printing business consulting | Mandarin3D",
    description,
  },
};

export default function ConsultingPage() {
  const schema = { "@context": "https://schema.org", "@type": "Service", name: "3D printing business consulting", serviceType: "Business consulting", url: "https://mandarin3d.com/consulting", description, provider: { "@type": "Person", name: "Ryan Vogel", url: "https://mandarin3d.com/authors/ryan-vogel" }, offers: { "@type": "Offer", price: "300", priceCurrency: "USD", description: "One consulting session with Ryan Vogel", url: "https://mandarin3d.com/consulting" } };
  return (
    <>
      <div className="site-width">
        <Header />
        <main id="main-content" className="py-10 sm:py-12">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
          <div className="grid items-start gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-balance">3D printing business consulting</h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">Starting a print business, or figuring out what to improve in one you already run? Work through your next decision with someone who has built one.</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">I&apos;m <a href="https://ryan.ceo" className="text-link">Ryan Vogel</a>. I built Mandarin3D in Jacksonville, Florida, including the software that turned uploaded models into instant quotes. The business did over $100,000 in sales over two years.</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Mandarin3D&apos;s printing service is closed. Consulting is available directly with me, not a way to place a print order.</p>
            </div>
            <section aria-labelledby="session-heading" className="rounded-2xl bg-[#edf2f3] p-6 sm:p-8">
              <h2 id="session-heading" className="text-xl font-semibold tracking-tight">A consulting session with Ryan</h2>
              <p className="mt-4"><span className="text-3xl font-semibold tracking-tight">$300</span><span className="ml-2 text-muted-foreground">per session</span></p>
              <p className="mt-4 leading-relaxed text-muted-foreground">Email a little about your business, the printers you use or are considering, and the main question you want to work through.</p>
              <a href="mailto:3d@ryan.ceo?subject=3D%20printing%20consulting" className="action-link mt-6"><Mail size={16} aria-hidden="true" /> Email 3d@ryan.ceo</a>
            </section>
          </div>

          <section className="section-space mt-8 border-t border-border">
            <h2 className="section-heading mb-7">What we can work through</h2>
            <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold">Pricing and margins</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">Look beyond filament cost. Account for machine time, hands-on work, failed prints, and the difference between a busy shop and a profitable one. Try the <Link href="/calculator" className="text-link">free pricing calculator</Link>.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Printers and capacity</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">Choose equipment around the work you want to sell, and think through when more printers would actually help.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Customers and positioning</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">Define who you want to serve, what problem you solve, and how to explain the value of your work beyond a price per gram.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Quoting and operations</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">Talk through file intake, customer communication, repeat orders, and where software or automation could remove manual work.</p>
              </div>
            </div>
          </section>

          <div className="border-t border-border pt-6">
            <Link href="/blog/starting-a-3d-printing-business-lessons-from-mandarin3d" className="inline-link min-h-11">Read my guide to starting a 3D printing business <ArrowRight size={16} className="shrink-0" aria-hidden="true" /></Link>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
