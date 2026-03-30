import Image from "next/image"

export const metadata = {
  title: "Next.js 15.5.x Image Test",
  description: "Testing next/image detection in App Router-only projects",
}

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
