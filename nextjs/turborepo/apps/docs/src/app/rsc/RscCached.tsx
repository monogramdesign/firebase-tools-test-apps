export async function RscCached() {
  const data = new Date().toISOString()

  return (
    <p>
      Server timestamp: <strong>{data}</strong>
    </p>
  )
}
