/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/backend/:path*',
        destination: process.env.REAL_API_URL + '/:path*',
      },
    ];
  },
};

export default nextConfig;
