import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages (no Node server)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
