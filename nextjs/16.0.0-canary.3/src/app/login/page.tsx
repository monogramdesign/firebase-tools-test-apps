import Link from 'next/link'

export default function LoginPage() {
	return (
		<>
			<p>testing middleawre</p>

			<p>/authenticated should redirect to /login via middleware</p>
			<br />

			<Link href="/authenticated?admin">Go to auth</Link>
		</>
	)
}
