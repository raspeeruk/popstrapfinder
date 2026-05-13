import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**.swatch.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "**.shopify.com" },
      { protocol: "https", hostname: "**.cloudinary.com" },
      { protocol: "https", hostname: "**.amazonaws.com" },
      { protocol: "https", hostname: "**.watchtime.com" },
      { protocol: "https", hostname: "**.fratellowatches.com" },
      { protocol: "https", hostname: "**.hodinkee.com" },
      { protocol: "https", hostname: "**.worldtempus.com" },
    ],
  },
};

export default nextConfig;
