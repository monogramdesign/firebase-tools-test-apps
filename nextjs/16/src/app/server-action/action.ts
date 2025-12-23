"use server"

export async function getAction(): Promise<string> {
  return Promise.resolve(new Date().toISOString())
}
