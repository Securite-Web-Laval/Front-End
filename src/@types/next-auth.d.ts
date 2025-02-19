import { DefaultSession } from "next-auth"

interface UserType {
    _id?: string,
    username?: string,
    email?: string,
    __v?: number
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user?: User & DefaultSession["user"]
        access_token?: string,
    }

    interface User {
        user?: User,
        access_token?: string,
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        accessToken?: string;
        user?: User;
    }
}