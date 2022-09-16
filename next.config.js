/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "setlinn.s3.us-east-1.amazonaws.com",
      "lh3.googleusercontent.com"
    ],
    output: "standalone"
  }
};

module.exports = nextConfig;
