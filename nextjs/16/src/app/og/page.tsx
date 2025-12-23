export const dynamic = 'force-dynamic'

export default function Page() {
	return (
		<>
			Dynamic OG image test: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
		</>
	)
}
