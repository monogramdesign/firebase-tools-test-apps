"use client"

import Image from "next/image"

export default function Home() {
  return (
    <main>
      <h1>Next.js 15.5.x App Router Image Test</h1>
      <Image src="/next.svg" alt="Next.js Logo" width={180} height={37} priority />
    </main>
  )
}
