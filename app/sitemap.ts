import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mandarin3d.com";

  return [
    { url: baseUrl },
    { url: `${baseUrl}/blog` },
    ...getAllPosts().map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
    })),
  ];
}
