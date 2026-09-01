"use client";

import { useDeferredValue, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

export function BlogLibrary({ posts }: { posts: BlogPostMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const search = useDeferredValue(query.trim().toLowerCase());
  const categories = [...new Set(posts.map((post) => post.category))].sort();
  const filtered = posts.filter((post) =>
    (!category || post.category === category) &&
    `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase().includes(search)
  );

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
        <div>
          <label htmlFor="guide-search" className="block text-sm font-medium mb-2">Search the guides</label>
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-3.5 text-muted-foreground pointer-events-none" aria-hidden="true" />
            <input id="guide-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try PLA, supports, or your first print" className="w-full min-h-11 rounded-xl border border-border bg-white pl-11 pr-3 py-2.5 text-base" />
          </div>
        </div>
        <div>
          <label htmlFor="guide-category" className="block text-sm font-medium mb-2">Topic</label>
          <select id="guide-category" value={category} onChange={(event) => setCategory(event.target.value)} className="w-full min-h-11 rounded-xl border border-border bg-white px-3 py-2.5 text-base">
            <option value="">All topics</option>
            {categories.map((topic) => <option key={topic} value={topic}>{topic.charAt(0).toUpperCase() + topic.slice(1)}</option>)}
          </select>
        </div>
      </div>
      <p className="my-6 text-sm text-muted-foreground" role="status">{filtered.length} {filtered.length === 1 ? "guide" : "guides"}{search || category ? " found" : " to explore"}</p>
      {filtered.length > 0 ? (
        <div className="grid gap-x-12 sm:grid-cols-2">
          {filtered.map((post) => (
            <article key={post.slug} className="border-t border-border">
              <Link href={`/blog/${post.slug}`} className="group block py-6">
                <h2 className="text-xl font-medium leading-snug tracking-tight group-hover:text-[#466F80] transition-colors">{post.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{post.description}</p>
                <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{post.readingTime}</span>
                  <span className="inline-flex items-center gap-2 text-[#466F80]">Read guide <ArrowRight size={15} aria-hidden="true" /></span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="border-t border-border py-12">
          <h2 className="text-xl font-medium">No matching guides</h2>
          <p className="mt-2 text-muted-foreground">Try a different search or explore all topics.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory(""); }} className="action-link mt-5">Clear filters</button>
        </div>
      )}
    </>
  );
}
