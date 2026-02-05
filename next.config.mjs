/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      '127.00.1',
      'next-bench-dev.vercel.app',
      'media.licdn.com',
      'iitashram.com',
      'www.moe.gov.sg',
      'randomuser.me',
      'p.urbanpro.com'
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
