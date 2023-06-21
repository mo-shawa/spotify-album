import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const session = useSession()
	console.log(session.data)
	return (
		<main>
			{session.status === 'authenticated' ? (
				<>
					<h1>Hi, !</h1>
					<button onClick={() => signOut()}>Sign out</button>
				</>
			) : (
				<>
					<h1>Hi, !</h1>
					<button onClick={() => signIn()}>Sign in</button>
				</>
			)}
		</main>
	)
}
