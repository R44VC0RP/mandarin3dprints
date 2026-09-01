import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="site-width flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span aria-hidden="true"><Wordmark className="w-[130px] h-auto mb-3" color="currentColor" /></span>
          <p className="text-sm text-muted-foreground">Built by Ryan Vogel in Jacksonville, Florida.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
          <Link href="/#local-printing" className="inline-link min-h-11">Local printing</Link>
          <Link href="/business" className="inline-link min-h-11">Business guides</Link>
          <a href="/blog/feed.xml" className="inline-link min-h-11">RSS feed</a>
          <a href="https://ryan.ceo" className="inline-link min-h-11">Find Ryan <ArrowUpRight size={15} aria-hidden="true" /></a>
        </nav>
      </div>
    </footer>
  );
}
