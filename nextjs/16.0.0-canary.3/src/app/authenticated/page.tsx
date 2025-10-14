import Link from 'next/link'

export default function Page() {
	return (
		<>
			<p>Authenticated!</p>

			<Link href="/login">Go to login</Link>
		</>
	)
}
