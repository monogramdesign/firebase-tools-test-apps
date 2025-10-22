import Link from "next/link"
import pagePaths from "./pages.json"

export function Header() {
  return (
    <header>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "start",
          padding: ".5rem",
          overflow: "scroll",
        }}
      >
        {pagePaths.map((pagePath) => (
          <Link key={pagePath} href={pagePath}>
            {pagePath}
          </Link>
        ))}
      </nav>
    </header>
  )
}
