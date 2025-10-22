import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path")

  if (!path) {
    return NextResponse.json({
      revalidated: false,
      now: Date.now(),
      cache: "no-store",
    })
  }

  console.log("revalidating", path)

  revalidatePath(path)

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    cache: "no-store",
  })
}
