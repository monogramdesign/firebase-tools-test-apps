'use client'

import { useState } from 'react'
import type { ReportType } from './types'

export function Purge({ reportId }: { reportId: ReportType['id'] }) {
	const [fetching, setFetching] = useState(false)

	return (
		<button
			type="button"
			onClick={async () => {
				setFetching(true)
				await fetch(`/isr/${reportId}`, { method: 'PURGE' })
				setFetching(false)
			}}
		>
			{fetching ? 'PURGING' : 'PURGE'} /isr/{reportId}
		</button>
	)
}
