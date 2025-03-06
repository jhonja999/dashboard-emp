/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.flaticon.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "utfs.io",
    ],

    "exclude": [
      "node_modules",
      ".next" // <--- Asegúrate de que esta línea exista
    ],

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
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
