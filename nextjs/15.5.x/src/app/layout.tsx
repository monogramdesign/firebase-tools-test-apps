"use client"

import Image from "next/image"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Image src="/vercel.svg" alt="Vercel" width={100} height={24} />
        {children}
      </body>
    </html>
  )
}
