"use client";

import { useSearchParams } from "next/navigation";

export function SearchParams() {
  const queryParams = useSearchParams();

  return <p>Query params: {queryParams?.toString()}</p>;
}
