import Link from "next/link";
import { Wordmark } from "@/components/wordmark";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" aria-label="Mandarin3D home" className="inline-flex min-h-11 items-center shrink-0">
        <Wordmark className="w-[140px] h-auto" color="currentColor" />
      </Link>
      <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-1 sm:gap-4">
        <Link href="/#story" className="nav-link">Our story</Link>
        <Link href="/#resources" className="nav-link">Resources</Link>
        <Link href="/blog" className="nav-link">Guides</Link>
        <Link href="/consulting" className="nav-link">Consulting</Link>
      </nav>
    </header>
  );
}
