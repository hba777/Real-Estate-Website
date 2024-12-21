/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-image-domain.com", // Replace with your image domain
        pathname: "/path/to/images/*", // You can define a pattern for the path
      },
    ],
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
