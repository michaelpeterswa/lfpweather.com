import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'lfpweather.com',
    short_name: 'lfp weather',
    description: 'lfpweather.com is a website that provides local weather observations, forecasts, and cameras for the Lake Forest Park, Washington area.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/png/icon-192.png',
        type: 'image/png',
        purpose: "any",
        sizes: '192x192',
      },
      {
        src: '/png/icon-512-maskable.png',
        type: 'image/png',
        purpose: "maskable",
        sizes: '512x512',
      },
      {
        src: '/png/icon-512.png',
        type: 'image/png',
        purpose: "any",
        sizes: '512x512',
      },
    ],
  }
}