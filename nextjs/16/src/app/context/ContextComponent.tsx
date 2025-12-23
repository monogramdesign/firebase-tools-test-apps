import { useContext } from 'react'
import { Context } from './context'

export default function ContextComponent() {
	const context = useContext(Context)

	return (
		<>
			<h3>Context value:</h3>
			<pre>{JSON.stringify(context)}</pre>
		</>
	)
}
