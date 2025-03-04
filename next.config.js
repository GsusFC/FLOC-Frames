/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para imágenes de banderas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
    ],
  },
  // Configuración específica para frames
  async redirects() {
    return [
      {
        source: '/flag-system',
        destination: '/flag-system-v2',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
