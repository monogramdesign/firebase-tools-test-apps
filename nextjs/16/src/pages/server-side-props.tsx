import { GetServerSideProps } from 'next'

type TestPageProps = {
	title: string
	body: string
}

export const getServerSideProps: GetServerSideProps<TestPageProps> = async () => {
	return { props: { title: 'Test', body: 'Hello World' } }
}

export default function TestPage({ title, body }: TestPageProps) {
	return (
		<div>
			<h1>{title}</h1>
			<p>{body}</p>
		</div>
	)
}
