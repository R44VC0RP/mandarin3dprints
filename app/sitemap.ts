import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mandarin3d.com";

  return [
    { url: baseUrl },
    { url: `${baseUrl}/blog` },
    { url: `${baseUrl}/consulting` },
    { url: `${baseUrl}/calculator` },
    { url: `${baseUrl}/business` },
    { url: `${baseUrl}/authors/ryan-vogel` },
    ...getAllPosts().map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated || post.date),
    })),
  ];
}
