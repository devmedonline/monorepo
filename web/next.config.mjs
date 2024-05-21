/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dev-med-file-demogorgon.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
