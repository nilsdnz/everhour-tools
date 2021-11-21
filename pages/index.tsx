import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useStore } from '../store/store'
import { Page } from '../components/page'

const Home: NextPage = () => {
	const init = useStore(state => state.init)
	const authorize = useStore(state => state.authorize)
	const removeAuth = useStore(state => state.removeAuth)
	const authorized = useStore(state => state.authorized)

	const [loading, setLoading] = useState(true)
	const [apiKeyInput, setApiKeyInput] = useState('')

	useEffect(() => {
		init().then(() => setLoading(false))
	}, [])

	return (
		<Page>
			{!loading && (
				<div className='w-screen h-screen flex flex-col justify-center items-center'>
					{authorized ? (
						<div>
							<div className='fixed top-0 inset-x-0 w-full h-14 flex justify-between items-center px-10'>
								<div />
								<a onClick={removeAuth}>sign out</a>
							</div>
							<div className='flex flex-col gap-12 text-3xl text-center'>
								<div>
									<Link href='/timeline' passHref>
										<a>Timeline</a>
									</Link>
								</div>
								<div>
									<Link href='/timer-status' passHref>
										<a>Timer Status</a>
									</Link>
								</div>
							</div>
						</div>
					) : (
						<>
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
								onClick={() => authorize(apiKeyInput)}
								className='w-full max-w-[570px] text-4xl py-8 px-8 md:ml-[170px] bg-green-200 h-40 mt-8 cursor-pointer transition-all hover:bg-indigo-400 hover:text-green-300 active:bg-indigo-600 active:text-green-400'
							>
								ok
							</button>
						</>
					)}
				</div>
			)}
		</Page>
	)
}

export default Home
