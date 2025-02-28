import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*", // This ensures Next.js recognizes the /api folder
      },
    ];
  },
};

export default nextConfig;
