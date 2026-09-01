import type { NextConfig } from "next";

const config: NextConfig = {
  turbopack: { root: process.cwd() },
  async redirects() {
    return [
      { source: "/upload", destination: "/#local-printing", permanent: true },
      { source: "/cart", destination: "/#local-printing", permanent: true },
      { source: "/pricing", destination: "/#local-printing", permanent: true },
      { source: "/contact", destination: "/#local-printing", permanent: true },
      { source: "/file/:path*", destination: "/", permanent: true },
      { source: "/signin", destination: "/", permanent: true },
      { source: "/dashboard", destination: "/", permanent: true },
      { source: "/admin", destination: "/", permanent: true },
      { source: "/about", destination: "/#story", permanent: true },
      { source: "/docs", destination: "/#resources", permanent: true },
    ];
  },
};

export default config;
