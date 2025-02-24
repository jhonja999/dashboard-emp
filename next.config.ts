import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.flaticon.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.flaticon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  compilerOptions: {
    moduleResolution: "node",
    allowJs: true,
    strict: true,
    noEmit: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;