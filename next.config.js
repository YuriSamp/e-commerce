/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'http.cat',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
