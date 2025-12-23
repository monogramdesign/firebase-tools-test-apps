import { Suspense } from "react"
import { RscNotCached } from "../rsc/RscNotCached"
import { TimeoutComponent } from "./TimeoutComponent"

export default function Page() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        gap: "1rem",
      }}
    >
      <h1>static!</h1>

      <Suspense fallback="Loading server timestamp...">
        <RscNotCached />
      </Suspense>

      <Suspense fallback="Waiting for timeout..">
        <TimeoutComponent />
      </Suspense>

      <footer>static too!</footer>
    </section>
  )
}
