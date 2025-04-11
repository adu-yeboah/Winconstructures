import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // Leave empty unless a specific port is required
        pathname: '/**', // Allow all paths under this hostname
      },
    ],
  },
};

export default nextConfig;
