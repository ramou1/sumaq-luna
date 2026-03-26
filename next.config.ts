import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    // Evita que o Turbopack escolha a root errada por causa de múltiplos lockfiles.
    root: __dirname,
  },
};

export default nextConfig;
