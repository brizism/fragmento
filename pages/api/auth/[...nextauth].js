import NextAuth from 'next-auth';
import TwitterProvider from "next-auth/providers/twitter";


export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
      id: "twitter",
    })
  ],
  callbacks: {
    jwt: async ({token, profile }) => {
      if (profile?.data) {
        token.profile = profile.data;
      }
      return token
    },
    session: async ({ session, token }) => {
      console.log({
        session,
        token
      })
      return {
        ...session,
        user: token.profile
      };
    }
  }
});