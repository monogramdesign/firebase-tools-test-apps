"use client"

import { useState } from "react"
import { getAction } from "./action"

export default function ClientComponent() {
  const [timestamp, setTimestamp] = useState<string>("Waiting for server action click")
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = async () => {
    setLoading(true)
    setTimestamp(await getAction())
    setLoading(false)
  }

  return (
    <>
      <p>Server timestamp: {loading ? "Getting timestamp..." : timestamp}</p>

      <button type="button" onClick={handleClick}>
        Get server timestamp through server action
      </button>
    </>
  )
}
