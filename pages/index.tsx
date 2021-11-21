import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import * as everhour from '../lib/everhour'
import { useStore } from '../store/store'

const Home: NextPage = () => {
	const init = useStore(state => state.init)
	const authorize = useStore(state => state.authorize)

	const [apiKeyInput, setApiKeyInput] = useState('')

	useEffect(() => {
		init()
	}, [])

	return (
		<div className='w-screen h-screen flex flex-col justify-center items-center'>
			<div className='w-[90vw] max-w-[890px]'>
				<input
					type='text'
					value={apiKeyInput}
					onChange={e => setApiKeyInput(e.target.value)}
					placeholder='key'
					className='w-full max-w-[640px] text-3xl py-8 px-8 bg-white outline-none cursor-default transition-all hover:opacity-90'
				/>
			</div>
			<button
				onClick={() => {
					if (apiKeyInput !== '*******') {
						authorize(apiKeyInput)
					}
				}}
				className='w-full max-w-[570px] text-4xl py-8 px-8 md:ml-[170px] bg-green-200 h-40 mt-8 cursor-pointer transition-all hover:bg-indigo-400 hover:text-green-300 active:bg-indigo-600 active:text-green-400'
			>
				ok
			</button>
		</div>
	)
}

export default Home
