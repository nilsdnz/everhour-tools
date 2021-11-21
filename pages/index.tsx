import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import * as everhour from '../lib/everhour'
import dayjs from 'dayjs'
import { Timesheet } from '../components/timesheet'

const Home: NextPage = () => {
	const [apiKeyInput, setApiKeyInput] = useState('')
	const [apiKey, setApiKey] = useState<string>()
	const [ready, setReady] = useState(false)
	const [timesheet, setTimesheet] = useState<everhour.Time[]>()
	const [day, setDay] = useState<dayjs.Dayjs>(dayjs())

	useEffect(() => {
		async function fetchTimesheet(apiKey: string) {
			try {
				const timesheet = await everhour.getTimesheet(apiKey, day)
				setTimesheet(timesheet)
				localStorage.setItem('api_key', apiKey)
			} catch (err) {
				console.log(err)
				setApiKey(undefined)
				setApiKeyInput('')
				setTimesheet(undefined)
				setReady(false)
			}
		}

		if (ready && apiKey) {
			fetchTimesheet(apiKey)
		}
	}, [ready, apiKey, day])

	useEffect(() => {
		const key = localStorage.getItem('api_key')
		if (key) {
			setApiKey(key)
			setApiKeyInput('*******')
		}
	}, [])

	const noFuture = day.isSame(dayjs(), 'day') || day.isAfter(dayjs(), 'day')

	return (
		<div>
			{ready && (
				<div className='w-screen fixed z-50 h-14 flex flex-row justify-between items-center bg-gray-300'>
					<button onClick={() => setDay(day => day.subtract(1, 'day'))} className='h-full'>
						{'<'}
					</button>
					<div className='text-lg'>{day.format('ddd, DD.MM.')}</div>
					<button
						onClick={() => setDay(day => day.add(1, 'day'))}
						disabled={noFuture}
						className={`h-full ${
							noFuture ? 'bg-indigo-200 hover:bg-indigo-200 cursor-default' : ''
						}`}
					>
						{'>'}
					</button>
				</div>
			)}
			<div className='relative w-screen h-screen flex justify-center items-center'>
				{ready ? (
					timesheet?.length ? (
						<Timesheet timesheet={timesheet} />
					) : (
						<div className='w-screen text-center -mt-14'>no data</div>
					)
				) : (
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
									setApiKey(apiKeyInput)
								}
								setReady(true)
							}}
							className='w-full max-w-[570px] text-4xl py-8 px-8 md:ml-[170px] bg-green-200 h-40 mt-8 cursor-pointer transition-all hover:bg-indigo-400 hover:text-green-300 active:bg-indigo-600 active:text-green-400'
						>
							ok
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
