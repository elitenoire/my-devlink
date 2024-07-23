import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Devlinks',
    short_name: 'Devlinks',
    description: 'Share your links with the world',
    start_url: '/',
    display: 'standalone',
    background_color: '##fafafa',
    theme_color: '#633cff',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
