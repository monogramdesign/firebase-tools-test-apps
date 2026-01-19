import { Suspense } from "react"
import { TimeoutComponent } from "../ppr/TimeoutComponent"
import Loading from "./loading"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <TimeoutComponent />
    </Suspense>
  )
}
