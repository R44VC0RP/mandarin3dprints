import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllPosts } from "@/lib/blog";
import { socialImage } from "@/lib/seo";

const title = "3D printing business guides";
const description = "Practical guides to starting a 3D printing business, pricing jobs, expanding capacity, and improving quoting workflows, plus a free cost calculator.";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "https://mandarin3d.com/business" },
  openGraph: { title, description, url: "https://mandarin3d.com/business", images: [socialImage("business", title)] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage("business", title).url] },
};

export default function BusinessPage() {
  const posts = getAllPosts().filter((post) => post.category === "business");
  return (
    <>
      <div className="site-width">
        <Header />
        <main id="main-content" className="py-10 sm:py-12">
          <h1 className="text-3xl font-semibold tracking-tight">3D printing business guides</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Start with the customer and the numbers, then work on equipment and operations. These guides draw on the business and software behind Mandarin3D.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link className="action-link" href="/calculator">Calculate a job price</Link><Link className="action-link action-link-secondary" href="/consulting">Consulting with Ryan</Link></div>
          <div className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {posts.map((post) => <Link href={`/blog/${post.slug}`} key={post.slug} className="block border-t border-border py-6"><h2 className="text-xl font-medium text-[#466f80]">{post.title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{post.description}</p></Link>)}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
