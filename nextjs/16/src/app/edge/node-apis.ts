import { readFile } from 'fs/promises'

export async function getArray() {
	const array = await readFile(new URL('./array.json', import.meta.url), 'utf-8')

	return JSON.parse(array)
}
