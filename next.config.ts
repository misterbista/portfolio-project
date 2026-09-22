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
    ]
  },
  output: 'export',
  distDir: 'build',
};

export default nextConfig;
