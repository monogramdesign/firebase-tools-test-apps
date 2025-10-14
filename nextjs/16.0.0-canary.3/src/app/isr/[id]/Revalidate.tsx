'use client'

import type { ReportType } from './types'

export function Revalidate({ reportId }: { reportId: ReportType['id'] }) {
	return (
		<button
			type="button"
			onClick={() => {
				fetch(`/isr/revalidate?path=/isr/${reportId}`, {
					method: 'POST',
					body: JSON.stringify({ id: reportId })
				})
			}}
		>
			revalidate {reportId}
		</button>
	)
}
