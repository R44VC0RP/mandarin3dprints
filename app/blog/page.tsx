import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogLibrary } from "@/components/blog-library";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "3D printing guides",
  description: "Explore the Mandarin3D library: practical guides to materials, 3D design, print preparation, and getting started with 3D printing.",
  alternates: { canonical: "https://mandarin3d.com/blog" },
  openGraph: {
    title: "3D printing guides | Mandarin3D",
    description: "Practical guides to materials, 3D design, print preparation, and getting started.",
    url: "https://mandarin3d.com/blog",
  },
  twitter: {
    card: "summary",
    title: "3D printing guides | Mandarin3D",
    description: "Practical guides to materials, 3D design, print preparation, and getting started.",
  },
};

export default function BlogPage() {
  return (
    <>
      <div className="site-width">
        <Header />
        <main id="main-content" className="py-10 sm:py-12">
          <h1 className="text-3xl font-semibold tracking-tight mb-4">The 3D printing library</h1>
          <p className="max-w-2xl text-muted-foreground leading-relaxed mb-8">Materials, modeling, and the details that make a better print. The guides from Mandarin3D are still here to help with your next project.</p>
          <BlogLibrary posts={getAllPosts()} />
        </main>
      </div>
      <Footer />
    </>
  );
}
