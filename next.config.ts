import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.lfpweather.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'radar.weather.gov',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'cdn.star.nesdis.noaa.gov',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'graphical.weather.gov',
          port: '',
        },
      ],
  },
  output: "standalone",
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    // @ts-expect-error - implicit any
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config;
  },
};

export default nextConfig;
