"use client"

import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('test_user');
    const [password, setPassword] = useState('1234');

    const handleLogin = async () => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                username,
                password,
            });
            if (result && result.ok)
                router.push('/test')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 mr-2 text-black"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 mr-2 text-black"
            />
            <button onClick={handleLogin} className="bg-green-500 text-white p-2 rounded">Login</button>
        </>
    )
}