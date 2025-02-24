import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Agrega 'utfs.io' a la lista de dominios permitidos
    domains: [
      "www.flaticon.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "utfs.io",
    ],
    // Si deseas usar remotePatterns, añade uno para utfs.io
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.flaticon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/**",
      },
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
