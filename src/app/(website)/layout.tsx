"use client"

import Header from "@/components/header/header";
import { SessionProvider } from "next-auth/react";
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <Header>
                {children}
            </Header>
        </SessionProvider>
    );
}