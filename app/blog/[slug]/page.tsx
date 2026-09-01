import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { mdxComponents } from "@/components/mdx-components";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts, formatDate } from "@/lib/blog";
import { socialImage } from "@/lib/seo";

interface Props { params: Promise<{ slug: string }> }

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getPostBySlug(slug);
    return {
      title: meta.title,
      description: meta.description,
      authors: [{ name: meta.author, url: meta.author === "Ryan Vogel" ? "https://mandarin3d.com/authors/ryan-vogel" : "https://mandarin3d.com/#story" }],
      alternates: { canonical: `https://mandarin3d.com/blog/${slug}` },
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: `https://mandarin3d.com/blog/${slug}`,
        type: "article",
        publishedTime: meta.date,
        modifiedTime: meta.updated,
        authors: [meta.author],
        images: [socialImage(slug, meta.title)],
      },
      twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [socialImage(slug, meta.title).url] },
    };
  } catch {
    notFound();
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try { post = getPostBySlug(slug); } catch { notFound(); }
  const { meta, content } = post;
  const related = getRelatedPosts(meta);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updated || meta.date,
    image: [socialImage(slug, meta.title).url],
    author: { "@type": meta.author === "Mandarin3D" ? "Organization" : "Person", name: meta.author, url: meta.author === "Ryan Vogel" ? "https://mandarin3d.com/authors/ryan-vogel" : "https://mandarin3d.com/#story" },
    publisher: { "@type": "Organization", name: "Mandarin3D", url: "https://mandarin3d.com" },
    mainEntityOfPage: `https://mandarin3d.com/blog/${slug}`,
  };

  return (
    <>
      <div className="site-width"><Header /></div>
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <article className="mx-auto max-w-3xl px-5 sm:px-8 py-8 sm:py-12">
          <Link href="/blog" className="inline-link text-sm min-h-11 mb-5"><ArrowLeft size={16} aria-hidden="true" /> All guides</Link>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight text-balance">{meta.title}</h1>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            <span>{meta.readingTime}</span>
            {meta.updated && meta.updated !== meta.date && <span>Updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time></span>}
            <span>By <Link href={meta.author === "Ryan Vogel" ? "/authors/ryan-vogel" : "/#story"} className="text-link">{meta.author}</Link></span>
          </div>
          <p className="my-8 border-y border-border py-4 text-sm leading-relaxed text-muted-foreground">Mandarin3D&apos;s printing service is closed; these guides remain available. <Link href="/#local-printing" className="text-link">Find a local printing service.</Link></p>
          <div className="prose-custom"><MDXRemote source={content} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} /></div>
          {meta.category === "business" && <p className="mt-8 border-t border-border pt-5"><Link href="/business" className="text-link">Explore all business guides</Link> or <Link href="/calculator" className="text-link">calculate a job price</Link>.</p>}
        </article>
        {related.length > 0 && (
          <section className="mx-auto max-w-3xl px-5 sm:px-8 py-10">
            <h2 className="section-heading mb-5">Keep exploring</h2>
            <div className="divide-y divide-border border-y border-border">
              {related.map((guide) => (
                <Link key={guide.slug} href={`/blog/${guide.slug}`} className="group flex items-center justify-between gap-5 py-5">
                  <h3 className="font-medium group-hover:text-[#466F80]">{guide.title}</h3>
                  <ArrowRight size={17} className="shrink-0 text-[#466F80]" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
