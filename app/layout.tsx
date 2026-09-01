import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ConsultingIntent } from "@/components/consulting-intent";
import { socialImage } from "@/lib/seo";
import { overusedGrotesk } from "./fonts";
import "./globals.css";

const description = "Remembering Mandarin3D, a small 3D printing business built by Ryan Vogel in Jacksonville, Florida. Now a home for printing guides, tools, and local resources.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mandarin3d.com"),
  title: {
    default: "Mandarin3D | Our story & 3D printing resources",
    template: "%s | Mandarin3D",
  },
  description,
  authors: [{ name: "Ryan Vogel", url: "https://ryan.ceo" }],
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mandarin3D",
    url: "https://mandarin3d.com",
    title: "Mandarin3D | Our story & 3D printing resources",
    description,
    images: [socialImage("home", "Mandarin3D printing resources")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mandarin3D | Our story & 3D printing resources",
    description,
    images: [socialImage("home", "Mandarin3D printing resources").url],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="alternate" type="application/rss+xml" title="Mandarin3D guides" href="https://mandarin3d.com/blog/feed.xml" />
      </head>
      <body className={`${overusedGrotesk.variable} antialiased`}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
        <Analytics />
        <ConsultingIntent />
      </body>
    </html>
  );
}
