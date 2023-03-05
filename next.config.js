/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  ...nextConfig,
  images: {
      domains: [
          "localhost",
          "chatroom.rodygosset.dev"
      ],
  },
  // output: 'standalone',
}
