import NextAuth from 'next-auth/next'
import SpotifyProvider from 'next-auth/providers/spotify'

export default NextAuth({
	// Configure one or more authentication providers
	session: {
		strategy: 'jwt',
	},
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
		async session({ session, token }) {
			session.user.id = token.id
			session.accessToken = token.accessToken
			return session
		},
		async jwt({ token, user, account }) {
			if (user) {
				token.id = user.id
			}
			if (account) {
				token.accessToken = account.access_token
			}
			return token
		},
	},
})
