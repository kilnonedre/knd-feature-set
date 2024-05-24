/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@import '@/style/indexStyle.scss';`,
  },
}

export default nextConfig
