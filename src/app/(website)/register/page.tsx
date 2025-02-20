"use client"

import { useState } from 'react';
import { register } from '@/lib/services/auth';
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState('test_user');
    const [password, setPassword] = useState('1234');
    const [email, setEmail] = useState('test_user@gmail.com');

    const handleRegister = async () => {
        try {
            await register('auth/register', { username, password, email });
            router.push('/login')
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
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 mr-2 text-black"
            />
            <button onClick={handleRegister} className="bg-blue-500 text-white p-2 rounded">Register</button>
        </>
    )
}