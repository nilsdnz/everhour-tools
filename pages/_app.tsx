import type { AppProps } from 'next/app'
import '../public/styles.css'

const App = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />
}

export default App
