import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

interface User {
    _id: string,
    username: string,
    email: string,
    __v: number
}

interface Data {
    user: User,
    access_token: string,
}

interface Token extends JWT {
    accessToken?: string;
    user?: User;
}

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
        async jwt({ token, data }: { token: Token; data?: Data }) {
            if (data) {
                token.accessToken = data.access_token;
                token.user = data.user;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token?: Token }) {
            if (token) {
                session.user = token.user;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };