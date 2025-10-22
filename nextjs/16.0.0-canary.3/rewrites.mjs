const rewrites = [
  {
    source: "/monogram-about",
    destination: "https://monogram.io/about",
  },
  {
    source: "/_app/:path*",
    destination: "https://monogram.io/_app/:path*",
  },
]

export default rewrites
