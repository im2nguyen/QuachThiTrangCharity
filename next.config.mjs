import { legacyRedirects } from "./lib/redirects.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
