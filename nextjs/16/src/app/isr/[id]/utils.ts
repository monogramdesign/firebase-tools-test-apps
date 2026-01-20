export async function getReports() {
  return Promise.resolve(
    Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      data: `[${new Date().toLocaleTimeString("pt-BR")}] Report ${i}`,
    }))
  )
}
