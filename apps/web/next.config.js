/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      'your-supabase-project.supabase.co',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'SoulLines',
    NEXT_PUBLIC_APP_DESCRIPTION: 'Emotion-intelligent poetry platform',
  },
}

module.exports = nextConfig
