import Link from 'next/link'

export const dynamicParams = true

const staticIds = [1, 2, 3].map(String)

export async function generateStaticParams() {
	return staticIds.map((id) => ({
		id
	}))
}

export default function Page({ params }: { params: { id: string } }) {
	const staticGenerated = staticIds.includes(params.id)

	return (
		<div
			style={{
				display: 'grid',
				gap: '1rem'
			}}
		>
			<h1>Dynamic Route</h1>
			{staticGenerated ? (
				<p>
					✅ This page is generated using the <code>generateStaticParams</code>.
				</p>
			) : (
				<p>
					❌ This page was not generated using the <code>generateStaticParams</code>.
				</p>
			)}
			<p>
				The following <code>params</code> were returned from <code>getStaticPaths</code>:
			</p>
			<pre>{JSON.stringify(params)}</pre>

			<p>The following pages were statically generated:</p>
			<ul>
				{staticIds.map((id) => {
					const href = `/dynamic-routes/${id}`
					return (
						<li key={href}>
							<Link href={href}>{href}</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
