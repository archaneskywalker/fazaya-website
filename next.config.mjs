/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip type checking and ESLint errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
