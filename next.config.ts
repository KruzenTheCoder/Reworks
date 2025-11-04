import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Explicitly set tracing root to this project to avoid monorepo lockfile warnings
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
