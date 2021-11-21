import dayjs from 'dayjs'

export const getUser = async (apiKey: string) => {
	const user = await get<User>('users/me', apiKey)
	return user
}

export const getTimesheet = async (apiKey: string, date?: dayjs.Dayjs) => {
	const user = await getUser(apiKey)

	const dateString = dayjs(date).format('YYYY-MM-DD')

	const data = await get<Time[]>(
		`users/${user.id}/time?limit=100&offset=0&from=${dateString}&to=${dateString}`,
		apiKey
	)

	data.reverse()

	return data
}

export const getCurrentTimer = async (apiKey: string) => {
	const data = await get<Timer>('timers/current', apiKey)
	return data
}

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

const get = async <T = any>(route: string, apiKey: string): Promise<T> => {
	const data = await request(route, 'GET', apiKey)
	return data
}

export interface User {
	avatarUrl: string
	avatarUrlLarge: string
	id: number
	email: string
	name: string
	headline?: string
	createdAt: string
	enableResourcePlanner: boolean
	capacity: number
	resourcePlannerAccess: {
		viewMine: boolean
		editMine: boolean
		viewAll: boolean
		editAll: boolean
	}
}

export interface Task {
	id: number
	name: string
	project: Project
}

interface Project {
	id: string
	name: string
}

export type Timer = TimerActive | TimerStopped

interface TimerActive {
	status: 'active'
	duration: number
	user: User
	startedAt: string
	userDate: string
	task: {
		projects: string[]
		completed: boolean
		// asana id
		id: string
		name: string
		// asana link
		url: string
		status: string
		createdAt: string
		time: {
			total: number
			users: {
				[id: string]: number
			}
			timerTime: number
		}
	}
	today: number
}

interface TimerStopped {
	status: 'stopped'
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
