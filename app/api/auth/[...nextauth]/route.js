
export const authOption = {
    provider: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
    ],
    session: {
        strategy: "jwt",
    }
}


const handler = NextAuth(authOption)

export {handler as GET, handler as POST}