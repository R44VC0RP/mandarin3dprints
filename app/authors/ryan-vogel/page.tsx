import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllPosts } from "@/lib/blog";
import { socialImage } from "@/lib/seo";

const title = "Ryan Vogel, founder of Mandarin3D";
const description = "Ryan Vogel built Mandarin3D in Jacksonville, Florida. Read his guides on 3D printing businesses, pricing, and quoting software, or explore consulting.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "https://mandarin3d.com/authors/ryan-vogel" },
  openGraph: { title, description, url: "https://mandarin3d.com/authors/ryan-vogel", images: [socialImage("ryan-vogel", title)] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage("ryan-vogel", title).url] },
};

export default function AuthorPage() {
  const posts = getAllPosts().filter((post) => post.author === "Ryan Vogel");
  const schema = { "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: { "@type": "Person", "@id": "https://mandarin3d.com/authors/ryan-vogel#person", name: "Ryan Vogel", url: "https://mandarin3d.com/authors/ryan-vogel", sameAs: ["https://ryan.ceo"], description } };
  return (
    <>
      <div className="site-width">
        <Header />
        <main id="main-content" className="py-10 sm:py-12">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
          <h1 className="text-3xl font-semibold tracking-tight">Ryan Vogel</h1>
          <div className="mt-5 max-w-2xl space-y-4 leading-relaxed text-muted-foreground">
            <p>I built and developed Mandarin3D, a small 3D printing business in Jacksonville, Florida. It did over $100,000 in sales over two years.</p>
            <p>The project began with an Ender 3 at a tech repair shop and a PHP and HTML instant-quote tool. It grew into both a print business and a software project. Mandarin3D no longer accepts print orders; I now share what went into building it through these guides and <Link href="/consulting" className="text-link">3D printing business consulting</Link>.</p>
            <p>You can find my broader work and background at <a href="https://ryan.ceo" className="text-link">ryan.ceo</a>.</p>
          </div>
          <section className="section-space">
            <h2 className="section-heading mb-5">Guides by Ryan</h2>
            <div className="grid gap-x-10 sm:grid-cols-2">
              {posts.map((post) => <Link href={`/blog/${post.slug}`} key={post.slug} className="block border-t border-border py-5"><h3 className="text-lg font-medium text-[#466f80]">{post.title}</h3><p className="mt-2 text-muted-foreground leading-relaxed">{post.description}</p></Link>)}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
