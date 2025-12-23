import { Suspense } from "react"
import { RscNotCached } from "../RscNotCached"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense fallback="Loading..">
      <RscNotCached />
    </Suspense>
  )
}
