import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: '**',
        pathname: '**',
      }
    ],
    unoptimized: true
  },
  output: 'export',
  distDir: 'build',
};

export default nextConfig;
