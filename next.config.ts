module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },

  serverRuntimeConfig: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    ELASTIC_EMAIL_API_KEY: process.env.ELASTIC_EMAIL_API_KEY,
    PRIVATE_EMAIL: process.env.PRIVATE_EMAIL,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY,
    ADMIN_UID: process.env.ADMIN_UID,
  },
};
