/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['randomuser.me', 'media.licdn.com'],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
