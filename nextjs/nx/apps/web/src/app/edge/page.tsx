// import { getArray } from './node-apis'

import { Suspense } from "react"
import { RscNotCached } from "../rsc/RscNotCached"

export const runtime = "edge"

export default async function Page() {
  // const array = await getArray()

  return (
    <>
      <h1>~On the edge~</h1>

      <Suspense fallback="Loading..">
        <RscNotCached />
      </Suspense>
    </>
  )
}
