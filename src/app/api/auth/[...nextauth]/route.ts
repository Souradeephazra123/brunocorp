import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET!,
  callbacks: {
    async jwt({ token, account }) {
      console.log("JWT Callback", { token, account });
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expires = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback", { session, token });
      // Send properties to the client, like an access_token from a provider
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  // pages: {
  //   signIn: "/",
  //   error: "/",
  // },

  //  secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //     signIn: "/",
  //     error: "/",
  // },
  // callbacks: {
  //     async jwt({ token, account }) {
  //         if (account) {
  //             token.accessToken = account.access_token;
  //         }
  //         return token;
  //     },
  //     async session({ session, token }) {
  //         session.accessToken = token.accessToken;
  //         return session;
  //     },
  // },
  session: {
    strategy: "jwt",
    // maxAge: 24 * 60 * 60, // 30 days
  },
  // theme: {
  //     colorScheme: "auto",
  //     brandColor: "#0070f3",
  //     logo: "/logo.png",
  // },
  // events: {
  //     signIn: async (message) => {
  //         console.log("User signed in", message);
  //     },
  //     signOut: async (message) => {
  //         console.log("User signed out", message);
  //     },
  //     error: async (message) => {
  //         console.error("Error", message);
  //     },
  // },
  // debug: process.env.NODE_ENV === "development",
  // // Enable debug messages in development
  // logger: {
  //     error(code, metadata) {
  //         console.error(code, metadata);
  //     },
  //     debug(code, metadata) {
  //         console.debug(code, metadata);
  //     },
  // },
  // // Enable debug messages in development
  // logger: {
  //     error(code, metadata) {
  //         console.error(code, metadata);
  //     },
  //     debug(code, metadata) {
  //         console.debug(code, metadata);
  //     },
  // },
  // // Enable debug messages in development
};

const handler = NextAuth(authOptions);
// export default NextAuth;
export { handler as GET, handler as POST };
