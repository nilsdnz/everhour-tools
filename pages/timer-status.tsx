import { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import * as everhour from '../lib/everhour'
import { useStore } from '../store/store'
import { Page } from '../components/page'

const TimerStatus: NextPage = () => {
	const apiKey = useStore(state => state.apiKey)

	const [timer, setTimer] = useState<everhour.Timer>()

	const cursorElement = useRef<HTMLDivElement>(null)
	const backdropElement = useRef<HTMLDivElement>(null)
	const interval = useRef<NodeJS.Timer>()

	const run = async () => {
		if (apiKey) {
			try {
				const data = await everhour.getCurrentTimer(apiKey)
				setTimer(data)

				if (!interval.current) {
					interval.current = setInterval(run, 2000)
					localStorage.setItem('kikerikey', apiKey)
				}
			} catch (err) {
				console.error(err)
				alert(err)

				if (interval.current) {
					clearInterval(interval.current)
				}
			}
		} else if (interval.current) {
			clearInterval(interval.current)
		}
	}

	useEffect(() => {
		run()
	}, [apiKey])

	useEffect(() => {
		document.onmousemove = e => {
			if (cursorElement.current) {
				cursorElement.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
			}
			if (backdropElement.current) {
				backdropElement.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
			}
		}
	}, [])

	return (
		<Page>
			<div className='relative w-screen h-screen flex justify-center items-center'>
				<div
					className={`w-full h-full transition-all duration-300 ${
						timer ? (timer.status === 'active' ? 'bg-green-400' : 'bg-red-400 bg-fade') : ''
					}`}
				>
					<div className='absolute top-2 right-4 text-white text-sm'>
						{timer?.status === 'active' && timer.user.name}
					</div>
				</div>
			</div>
		</Page>
	)
}

export default TimerStatus
