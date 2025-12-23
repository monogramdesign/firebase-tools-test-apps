import Link from "next/link";
import { SearchParams } from "./SearchParams";
import { Suspense } from "react";

export default async function Page() {
  return (
    <>
      <p>Authenticated!</p>
      <Suspense fallback={<p>Loading...</p>}>
        <SearchParams />
      </Suspense>

      <Link href="/login">Go to login</Link>
    </>
  );
}
