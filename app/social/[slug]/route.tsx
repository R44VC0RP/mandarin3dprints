import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { socialPages } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [...Object.keys(socialPages), ...getAllPostSlugs()].map((slug) => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let info = Object.hasOwn(socialPages, slug) ? socialPages[slug] : undefined;
  let image = "/h2s-image.png";
  if (!info) {
    try {
      const { meta } = getPostBySlug(slug);
      info = { title: meta.title, detail: `A guide from ${meta.author}` };
      if (meta.featuredImage && /^\/customerShowcase\/[a-zA-Z0-9_-]+\.(png|jpe?g)$/.test(meta.featuredImage)) image = meta.featuredImage;
    } catch {
      return new Response("Not found", { status: 404 });
    }
  }
  const [font, photo, logo] = await Promise.all([
    readFile(path.join(process.cwd(), "app/fonts/OverusedGrotesk-SemiBold.otf")),
    readFile(path.join(process.cwd(), "public", image)),
    readFile(path.join(process.cwd(), "public/web-app-manifest-192x192.png")),
  ]);
  const photoSrc = `data:image/${image.endsWith(".png") ? "png" : "jpeg"};base64,${photo.toString("base64")}`;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#edf2f3", color: "#454139", padding: 56, fontFamily: "Overused" }}>
      <div style={{ display: "flex", alignItems: "center", flex: 1, gap: 42 }}>
        <div style={{ display: "flex", flexDirection: "column", width: 680, gap: 24 }}>
          <div style={{ fontSize: 46, lineHeight: 1.12, letterSpacing: -1.2 }}>{info.title}</div>
          <div style={{ fontSize: 24, lineHeight: 1.4, color: "#64635f" }}>{info.detail}</div>
        </div>
        {/* Local brand and archive assets keep sharing images independent of external services. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoSrc} width={340} height={350} alt="" style={{ objectFit: image === "/h2s-image.png" ? "contain" : "cover", borderRadius: 18 }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${logo.toString("base64")}`} width={48} height={48} alt="" />
          <span style={{ fontSize: 28 }}>Mandarin3D</span>
        </div>
        <span style={{ fontSize: 22, color: "#466f80" }}>mandarin3d.com</span>
      </div>
    </div>,
    { width: 1200, height: 630, fonts: [{ name: "Overused", data: font, weight: 600, style: "normal" }] },
  );
}
