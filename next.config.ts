import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rubbertrackwholesale-upgrade-production.up.railway.app",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://rubbertrackwholesale-upgrade-production.up.railway.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
