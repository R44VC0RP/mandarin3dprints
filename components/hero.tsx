import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section className="grid items-center gap-6 py-10 sm:py-14 md:grid-cols-[1.25fr_1fr] md:gap-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.035em] leading-[1.12] text-balance">
          Mandarin3D had<br className="hidden sm:block" /> a pretty great run.
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
          A small 3D printing business, built and developed by <a className="text-link whitespace-nowrap" href="https://ryan.ceo">Ryan Vogel</a> in Jacksonville, Florida. Over <strong className="font-semibold text-foreground">$100,000 in sales over two years</strong>, and a whole lot of ideas made real.
        </p>
        <p className="mt-4 max-w-lg text-base leading-relaxed">
          <strong className="font-semibold">Mandarin3D is no longer open for business.</strong> Thank you to everyone who was part of it. The prints, the story, and a few useful things we learned live on here.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="#resources" className="action-link">Explore the resources <ArrowDown size={16} aria-hidden="true" /></Link>
          <Link href="#local-printing" className="action-link action-link-secondary">Find local printing <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-[230px] sm:max-w-[290px] md:max-w-[370px]">
        <Image src="/h2s-image.png" alt="Bambu Lab H2S 3D printer" fill sizes="(max-width: 640px) 230px, (max-width: 768px) 290px, 370px" className="object-contain" priority />
      </div>
    </section>
  );
}
