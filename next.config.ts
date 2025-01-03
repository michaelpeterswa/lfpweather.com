import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.lfpweather.com',
          port: '',
        }
      ],
  },
  output: "standalone",
};

export default nextConfig;
