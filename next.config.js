/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos"],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "https://127.0.0.1:8000/api/:path*"
            : "/api/",
      },
    ];
  },
};

module.exports = nextConfig;
