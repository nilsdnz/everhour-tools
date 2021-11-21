import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useStore } from '../store/store'
import '../public/styles.css'

const App = ({ Component, pageProps }: AppProps) => {
	const authorized = useStore(state => state.authorized)

	const router = useRouter()

	useEffect(() => {
		if (!authorized) {
			router.replace('/')
		} else {
			router.push('/timeline')
		}
	}, [authorized])

	return <Component {...pageProps} />
}

export default App
