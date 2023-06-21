import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const { data: session, status } = useSession()
	const [currentlyPlaying, setCurrentlyPlaying] = useState(null)

	if (status === 'unauthenticated') signIn()

	useEffect(() => {
		if (status === 'authenticated') {
			async function getSpotifyData() {
				const res = await fetch('https://api.spotify.com/v1/me/player', {
					headers: {
						Authorization: 'Bearer ' + session.accessToken,
					},
				})
				const data = await res.json()
				setCurrentlyPlaying(data)
			}

			getSpotifyData()
		}
	}, [status])
	return (
		<main>
			{currentlyPlaying ? (
				<>
					<h1>Currently Playing</h1>
					<Image
						src={currentlyPlaying.item.album.images[0].url}
						alt={currentlyPlaying.item.album.name}
						width={currentlyPlaying.item.album.images[0].width}
						height={currentlyPlaying.item.album.images[0].height}
					/>
				</>
			) : (
				<>
					<h1>Loading..</h1>
				</>
			)}
		</main>
	)
}
