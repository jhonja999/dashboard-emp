/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de imágenes
  images: {
    domains: [
      "www.flaticon.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "utfs.io",
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

  // Opciones del compilador de Next.js
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  reactStrictMode: true,

  // ❌ Quita la línea "swcMinify: true," si usas Next 15 (ya no se usa).
  // swcMinify: true,
};

export default nextConfig;
