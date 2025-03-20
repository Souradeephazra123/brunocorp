import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // secret: process.env.NEXTAUTH_SECRET,
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
  // session: {
  //     strategy: "jwt",
  //     maxAge: 30 * 24 * 60 * 60, // 30 days
  // },
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
});
// export default NextAuth;
export { handler as GET, handler as POST };
