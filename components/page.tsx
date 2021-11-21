interface Props {
	children?: React.ReactNode
}

export const Page = ({ children }: Props) => <div className='w-scren min-h-screen'>{children}</div>
