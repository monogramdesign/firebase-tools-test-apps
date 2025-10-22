import { Suspense } from "react"
import { RscCached } from "../RscCached"

export default function Page() {
  return (
    <Suspense fallback="Loading..">
      <RscCached />
    </Suspense>
  )
}
