import { useState } from 'react'
import dayjs from 'dayjs'
import * as everhour from '../lib/everhour'

const COLORS = ['#083D77', '#DA4167', '#2A9D8F', '#2E4057', '#BFAE48']

interface Props {
	timesheet: everhour.Time[]
}

export const Timesheet = ({ timesheet }: Props) => {
	const [zoom, setZoom] = useState(1)

	const firstTimerStart = dayjs(timesheet[0]?.history[0]?.createdAt).subtract(
		timesheet ? timesheet[0]?.history[0]?.time : 0,
		'seconds'
	)

	return (
		<div>
			<div className='my-6 px-10 h-full w-screen overflow-x-scroll no-scrollbar'>
				{timesheet.map((item, index) => {
					const backgroundColor = COLORS[index % COLORS.length]

					return (
						<div key={index} className='relative h-12 my-4'>
							{item.history.map((history, index) => {
								const end = dayjs(history.createdAt)
								const start = end.subtract(history.time, 'seconds')
								const left = (end.diff(firstTimerStart, 'seconds') - history.time) / 10
								const width = history.time / 10

								const minutes = Math.round(history.time / 60)
								const hours = Math.floor(minutes / 60)

								return (
									<div
										key={index}
										style={{ width: width * zoom, left: left * zoom, backgroundColor }}
										className='absolute top-0 h-8 rounded-sm hover-reveal-child transition-all'
									>
										<p className='-mt-7 w-max leading-8 opacity-0 transition-opacity'>
											{start.add(1, 'hour').format('HH:mm')} /{' '}
											{hours > 0
												? `${hours}:${minutes.toString().padStart(2, '0')}h`
												: `${minutes}m`}{' '}
											/ {item.task?.name}
										</p>
									</div>
								)
							})}
						</div>
					)
				})}
			</div>
			<div className='fixed bottom-0 inset-x-0 h-14 flex flex-row justify-between items-center'>
				<button
					onClick={() => setZoom(zoom => zoom - 0.1)}
					className='h-full bg-white text-indigo-400 hover:bg-gray-100'
				>
					-
				</button>
				{zoom !== 1 && (
					<div
						onClick={() => setZoom(1)}
						className='text-lg cursor-pointer hover:opacity-70 transition-opacity'
					>
						{zoom.toFixed(1)}x
					</div>
				)}
				<button
					onClick={() => setZoom(zoom => zoom + 0.1)}
					className='h-full bg-white text-indigo-400 hover:bg-gray-100'
				>
					+
				</button>
			</div>
		</div>
	)
}
