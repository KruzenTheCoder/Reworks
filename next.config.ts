import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Explicitly set tracing root to this project to avoid monorepo lockfile warnings
  outputFileTracingRoot: process.cwd(),
  images: {
    // IMPROVED: Allow optimized loading of external team portraits
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"], // IMPROVED: Prefer modern formats when available
  },
};

export default nextConfig;
