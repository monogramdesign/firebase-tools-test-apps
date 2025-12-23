import Link from 'next/link'

const anchorIds = ['a', 'b', 'c', 'd']

export default function AnchorPage() {
	return (
		<>
			<nav
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					justifyContent: 'center',
					position: 'fixed',
					top: 10,
					left: 10
				}}
			>
				{anchorIds.map((id) => (
					<Link key={id} href={`#${id}`}>
						{id}
					</Link>
				))}
			</nav>
			<ul style={{ display: 'grid' }}>
				{anchorIds.map((id) => (
					<li key={id}>
						<div id={id} style={{ height: '75vh' }}>
							id = #{id}
						</div>
					</li>
				))}
			</ul>
		</>
	)
}
