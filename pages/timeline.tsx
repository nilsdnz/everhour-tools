import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import * as everhour from '../lib/everhour'
import { useStore } from '../store/store'
import { Page } from '../components/page'
import { Timesheet } from '../components/timesheet'

const Timeline: NextPage = () => {
	const authorized = useStore(state => state.authorized)
	const apiKey = useStore(state => state.apiKey)

	const [timesheet, setTimesheet] = useState<everhour.Time[]>()
	const [day, setDay] = useState<dayjs.Dayjs>(dayjs())

	const router = useRouter()

	useEffect(() => {
		if (authorized && apiKey) {
			everhour.getTimesheet(apiKey, day).then(setTimesheet)
		}
	}, [authorized, apiKey, day])

	const noFuture = day.isSame(dayjs(), 'day') || day.isAfter(dayjs(), 'day')

	return (
		<Page>
			<div className='w-screen h-screen flex flex-col justify-start items-center'>
				<div className='w-screen h-14 fixed z-50 flex flex-row justify-between items-center bg-gray-300'>
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
				<div className='relative w-screen h-screen'>
					{timesheet?.length ? (
						<Timesheet timesheet={timesheet} />
					) : (
						<div className='w-full text-center -mt-14'>no data</div>
					)}
				</div>
			</div>
		</Page>
	)
}

export default Timeline
