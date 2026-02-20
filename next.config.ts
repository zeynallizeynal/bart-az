import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: 50 * 1024 * 1024,
    },
  },
  cacheComponents: true,
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      new URL("https://pub-21d38abe310a430db973d20c2495235d.r2.dev/**"),
    ],
  },
};

export default nextConfig;
