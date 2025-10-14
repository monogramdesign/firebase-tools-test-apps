import type { NextConfig } from "next"
import rewrites from "./rewrites"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "rstr.in" }],
    domains: ["rstr.in"],
    unoptimized: false,
  },

  rewrites: async () => [{ source: "/monogram", destination: "https://monogram.io" }, ...rewrites],
}

export default nextConfig
