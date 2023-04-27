/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["links.papareact.com", "aiimagegeneratorav5ddc8e.blob.core.windows.net"]
  }
}

module.exports = nextConfig
