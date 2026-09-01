import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import BackgroundMask from "@/components/BackgroundMask";
import { CustomerShowcase } from "@/components/customer-showcase";
import { getPostBySlug } from "@/lib/blog";

export const metadata: Metadata = {
  alternates: { canonical: "https://mandarin3d.com" },
};

const resources = [
  {
    title: "Find your next model",
    links: [
      { name: "MakerWorld", href: "https://makerworld.com/en", description: "Community models and ready-to-use Bambu print profiles." },
      { name: "Printables", href: "https://www.printables.com", description: "Models, community makes, and practical parts for all kinds of printers." },
    ],
  },
  {
    title: "Get a better print",
    links: [
      { name: "Bambu Lab Wiki", href: "https://wiki.bambulab.com/en/bambu-studio", description: "Bambu Studio setup, calibration, supports, and troubleshooting." },
      { name: "Prusa material guide", href: "https://help.prusa3d.com/filament-material-guide", description: "Compare filament properties, temperatures, and printing requirements." },
    ],
  },
  {
    title: "Design something yourself",
    links: [
      { name: "Tinkercad", href: "https://www.tinkercad.com", description: "A friendly, browser-based place to learn 3D design." },
      { name: "Blender", href: "https://www.blender.org", description: "Free, open-source modeling for more ambitious shapes and ideas." },
    ],
  },
  {
    title: "Keep learning",
    links: [
      { name: "All3DP", href: "https://all3dp.com", description: "Printer reviews, tutorials, and explainers across the world of 3D printing." },
      { name: "Prusa Blog", href: "https://blog.prusa3d.com", description: "Hands-on projects, material experiments, and printing techniques." },
    ],
  },
];

const guideSlugs = [
  "starting-a-3d-printing-business-lessons-from-mandarin3d",
  "your-first-3d-print-a-complete-beginners-guide",
  "pla-vs-petg-which-material-should-you-choose",
  "how-to-prepare-your-3d-model-for-printing",
];

export default function Home() {
  const guides = guideSlugs.map((slug) => getPostBySlug(slug).meta);

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[740px] overflow-hidden" aria-hidden="true"><BackgroundMask /></div>
      <div className="site-width">
        <Header />
        <main id="main-content">
          <Hero />

          <section id="story" className="section-space">
            <div className="mb-7 grid gap-4 md:grid-cols-[1fr_2fr] md:gap-12">
              <h2 className="section-heading">It started with an Ender 3.</h2>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>At a little tech repair shop, Ryan was handed a 3D printer and a challenge: turn it into a business. He built a simple PHP and HTML tool that let people upload a model and get an instant quote. Eventually, the printers and software became Mandarin3D.</p>
                <p>From custom nameplates to little everyday objects, this was as much a software project as a print shop. These are a few of the things that came off the build plate.</p>
                <a href="https://ryan.ceo" className="inline-link min-h-11">More of Ryan&apos;s story <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
            <CustomerShowcase />
          </section>

          <section id="local-printing" className="section-space border-t border-border">
            <div className="mb-6 grid gap-3 md:grid-cols-[1fr_2fr] md:gap-12">
              <h2 className="section-heading">Still need something printed?</h2>
              <p className="text-muted-foreground leading-relaxed">Mandarin3D has closed, but Jacksonville still has people making great things. Here are two local businesses to explore.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="https://www.readytoprint3d.com/" className="resource-card group">
                <h3 className="flex items-center justify-between gap-4 text-lg font-semibold">Ready to Print 3D <ArrowUpRight size={19} className="shrink-0" aria-hidden="true" /></h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">Veteran-owned in Jacksonville. Custom 3D printing, CAD design, reverse engineering, and printer repair.</p>
                <span className="mt-5 block text-sm text-[#466F80] group-hover:underline underline-offset-4">Explore their services</span>
              </a>
              <a href="https://www.forgejax.com/" className="resource-card group">
                <h3 className="flex items-center justify-between gap-4 text-lg font-semibold">FORGE <ArrowUpRight size={19} className="shrink-0" aria-hidden="true" /></h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">Jacksonville design and fabrication, including 3D scanning and product development. Design and consultation projects start at a $2,500 budget.</p>
                <span className="mt-5 block text-sm text-[#466F80] group-hover:underline underline-offset-4">Explore their services</span>
              </a>
            </div>
          </section>

          <section id="resources" className="section-space border-t border-border">
            <h2 className="section-heading mb-7">3D printing resources</h2>
            <div className="mb-10 grid gap-6 rounded-2xl bg-[#edf2f3] p-6 sm:p-8 md:grid-cols-[1fr_1.2fr] md:gap-12">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">Choosing a 3D printer</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">Start with what you want to make: small PLA projects, larger functional parts, or multicolor prints. Then compare build volume, material support, and the space you have.</p>
              </div>
              <div className="space-y-6">
                <div>
                  <a href="https://bambulab.com/en-us/compare" className="inline-link font-semibold min-h-11">Bambu Lab <ArrowUpRight size={17} aria-hidden="true" /></a>
                  <p className="text-muted-foreground leading-relaxed">Our first place to look. Mandarin3D used Bambu Lab printers; their integrated printers, software, and material systems make a strong starting point.</p>
                </div>
                <div>
                  <a href="https://www.prusa3d.com/category/3d-printers/" className="inline-link font-semibold min-h-11">Original Prusa <ArrowUpRight size={17} aria-hidden="true" /></a>
                  <p className="text-muted-foreground leading-relaxed">Also worth comparing, especially if detailed assembly guides, repairability, and learning your machine matter to you.</p>
                </div>
              </div>
            </div>
            <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
              {resources.map((group) => (
                <div key={group.title}>
                  <h3 className="text-lg font-semibold mb-3">{group.title}</h3>
                  <ul className="divide-y divide-border">
                    {group.links.map((resource) => (
                      <li key={resource.name}>
                        <a href={resource.href} className="group block py-4">
                          <span className="flex items-center justify-between gap-3 font-medium text-[#466F80] group-hover:underline underline-offset-4">{resource.name}<ArrowUpRight size={17} className="shrink-0" aria-hidden="true" /></span>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="section-space border-t border-border">
            <div className="grid gap-5 md:grid-cols-[1fr_2fr] md:gap-12">
              <h2 className="section-heading">Building a 3D printing business?</h2>
              <div>
                <p className="leading-relaxed text-muted-foreground">Ryan offers consulting for people starting or running their own print businesses. Work through pricing, printer choices, customers, and operations. <strong className="font-semibold text-foreground">$300 per consulting session.</strong></p>
                <Link href="/consulting" className="inline-link min-h-11 mt-3">Explore consulting with Ryan <ArrowRight size={16} aria-hidden="true" /></Link>
              </div>
            </div>
          </section>

          <section className="section-space border-t border-border">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h2 className="section-heading">From the Mandarin3D library</h2>
              <Link href="/blog" className="inline-link min-h-11">All guides <ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
            <div className="grid gap-x-12 sm:grid-cols-2">
              {guides.map((guide) => (
                <Link key={guide.slug} href={`/blog/${guide.slug}`} className="group border-b border-border py-6">
                  <h3 className="text-lg font-medium group-hover:text-[#466F80] transition-colors">{guide.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm text-[#466F80]">Read guide <ArrowRight size={15} aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
