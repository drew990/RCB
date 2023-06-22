/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.chec.io"],
  },
  images: {
    domains: ["items-images-production.s3.us-west-2.amazonaws.com"],
    // domains: ["square-catalog-sandbox.s3.amazonaws.com"],
  },
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config;
  },
};

module.exports = nextConfig;
