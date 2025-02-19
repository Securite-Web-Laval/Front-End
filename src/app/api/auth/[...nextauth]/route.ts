import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const res = await fetch("https://back-end-uhlyzq.fly.dev/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                });

                const user = await res.json();

                if (res.ok && user) {
                    return user;
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: { token: JWT; user?: User }) {
            if (user) {
                token.accessToken = user.access_token;
                token.user = user.user;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token?: JWT }) {
            if (token) {
                session.user = token.user;
                session.access_token = token.accessToken;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };