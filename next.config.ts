import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root; otherwise Next walks up and finds an unrelated
  // package-lock.json in the home directory.
  turbopack: { root: __dirname },

  // Nothing here needs a server: no API routes, no image optimization, no ISR.
  // To host as plain static files (GitHub Pages, S3, any CDN) instead of Vercel,
  // uncomment the line below and run `npm run build` — output lands in ./out.
  // output: "export",
};

export default nextConfig;
