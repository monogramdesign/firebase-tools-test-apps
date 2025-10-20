import rewrites from "./rewrites.mjs"

const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "rstr.in" }],
    domains: ["rstr.in"],
    unoptimized: false,
  },

  rewrites: async () => [{ source: "/monogram", destination: "https://monogram.io" }, ...rewrites],
}

export default nextConfig
