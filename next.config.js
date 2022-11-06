/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["t4.ftcdn.net", "pbs.twimg.com"],
    remotePatterns: [
      {
        protocol: "ipfs",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
