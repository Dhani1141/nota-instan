import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 uses Turbopack by default
  // html2canvas and jspdf are loaded dynamically on the client, no special config needed
  turbopack: {},
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
