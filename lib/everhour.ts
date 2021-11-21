import dayjs from 'dayjs'

const request = async (route: string, method: 'GET' | 'POST', apiKey: string, body?: any) => {
	const res = await fetch(`https://api.everhour.com/${route}`, {
		headers: {
			'Content-Type': 'application/json',
			'X-Api-Key': apiKey
		},
		method,
		body: JSON.stringify(body)
	})

	if (res.ok) {
		const data = await res.json()
		return data
	} else {
		throw Error(`${res.status} - ${res.statusText}`)
	}
}

const get = async (route: string, apiKey: string) => {
	const data = await request(route, 'GET', apiKey)
	return data
}

export interface User {
	id: number
	name: string
	email: string
}

export interface Task {
	id: number
	name: string
	project: Project
}

export interface Timer {
	duration: number
	today: number
	startedAt: string
	task: Task
}

export interface Project {
	id: string
	name: string
}

export interface Time {
	id: number
	createdAt: string
	date: string
	history: History[]
	isLocked: boolean
	task?: {
		name: string
	}
	time: number
}

export interface History {
	id: number
	action: 'TIMER' | 'EDIT'
	createdAt: string
	// user id
	createdBy: User['id']
	// time in seconds
	previousTime: number
	// time in seconds
	time: number
}

export const getUser = async (apiKey: string) => {
	const user = await get('users/me', apiKey)
	return user as User
}

export const getTimesheet = async (apiKey: string, date?: dayjs.Dayjs) => {
	const user = await getUser(apiKey)

	const dateString = dayjs(date).format('YYYY-MM-DD')

	const data = (await get(
		`users/${user.id}/time?limit=100&offset=0&from=${dateString}&to=${dateString}`,
		apiKey
	)) as Time[]

	data.reverse()

	return data
}
