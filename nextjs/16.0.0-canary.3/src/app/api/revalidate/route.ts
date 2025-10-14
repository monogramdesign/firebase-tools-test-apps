import { NextResponse } from "next/server"

export async function GET() {
  const data = new Date().toISOString()

  return NextResponse.json({ data: data || "Failed to get API response" })
}
