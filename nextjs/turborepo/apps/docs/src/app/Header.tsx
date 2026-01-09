import Link from "next/link";
import pagePaths from "./pages.json";
import { getReports } from "./isr/[id]/page";

export async function Header() {
  const reports = await getReports();

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
        {reports.map((report) => (
          <Link key={`report-${report.id}`} href={`/isr/${report.id}`}>
            /isr/{report.id}
          </Link>
        ))}
      </nav>
    </header>
  );
}
