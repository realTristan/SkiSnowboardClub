/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "lh3.googleusercontent.com" }, { hostname: "fgg5lrporntnbunc.public.blob.vercel-storage.com" }],
  },
  experimental: {
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: "5mb",
    }
  },
};

module.exports = nextConfig;
