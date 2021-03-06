/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['media.api-sports.io']
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  }
}

module.exports = nextConfig
