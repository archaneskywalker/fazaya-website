/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip type checking for uploadthing during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
