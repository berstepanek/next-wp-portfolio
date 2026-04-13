import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cms.sang-mele-compagnie.com",
      },
    ],
  },
};

export default nextConfig;
