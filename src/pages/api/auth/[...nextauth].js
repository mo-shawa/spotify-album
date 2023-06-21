import NextAuth from 'next-auth/next'
import SpotifyProvider from 'next-auth/providers/spotify'

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		SpotifyProvider({
			authorization: {
				params: {
					scope:
						'user-read-email user-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing',
				},
			},
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			profile: (profile) => {
				return {
					id: profile.id,
					name: profile.display_name,
					email: profile.email,
				}
			},
		}),

		// ...add more providers here
	],
	debug: false,
	callbacks: {
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			console.log({ token, user, session })
			session.accessToken = token.accessToken
			session.user.id = token.sub

			return session
		},
	},
})
