import rewrites from "./rewrites.mjs";

const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "rstr.in" }],
    unoptimized: false,
  },

  rewrites: async () => [
    { source: "/monogram", destination: "https://monogram.io" },
    { source: "/rewrite", destination: "/rewrite-target" },
    ...rewrites,
  ],
};

export default nextConfig;
