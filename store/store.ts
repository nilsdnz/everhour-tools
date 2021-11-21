import create, { SetState } from 'zustand'
import * as everhour from '../lib/everhour'

interface State {
	authorized: boolean
	user: everhour.User | null
	apiKey: string | null
	authorize: (apiKey: string) => Promise<void>
	removeAuth: () => void
	init: () => Promise<void>
}

export const useStore = create<State>(set => ({
	authorized: false,
	user: null,
	apiKey: null,
	authorize: apiKey => authorize(set, apiKey),
	removeAuth: () => {
		set({ apiKey: null, user: null, authorized: false })
		localStorage.removeItem('api_key')
	},
	init: async () => {
		const key = localStorage.getItem('api_key')
		if (key) {
			return authorize(set, key)
		}
	}
}))

const authorize = async (set: SetState<State>, apiKey: string) => {
	try {
		const user = await everhour.getUser(apiKey)
		set({ apiKey, user, authorized: true })
		localStorage.setItem('api_key', apiKey)
	} catch (err) {
		console.error(err)
		set({ apiKey: null, user: null, authorized: false })
		localStorage.removeItem('api_key')
	}
}
