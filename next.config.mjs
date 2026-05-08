/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Only apply basePath in production if you are deploying to a subfolder
  // If your production domain is root (e.g. www.artisauc.com), set this to ''
  basePath: isProd ? '/artisAuc' : '', 
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
