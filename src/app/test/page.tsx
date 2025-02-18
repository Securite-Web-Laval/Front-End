"use client"

import { useEffect, useState } from 'react';
import { register, login, logout } from '@/lib/services/auth';
import { userGet } from '@/lib/services/user';

export default function ServicesPage() {
    const [username, setUsername] = useState('test_user');
    const [password, setPassword] = useState('1234');
    const [email, setEmail] = useState('test_user@gmail.com');
    const [response, setResponse] = useState<unknown>();
    const [id, setId] = useState<string | null>(null)

    useEffect(() => {
        if (localStorage.getItem('id')) setId(localStorage.getItem('id'))
    }, [])

    const handleRegister = async () => {
        try {
            const result = await register('auth/register', { username, password, email });
            setResponse(result);
        } catch (error) {
            setResponse(error);
        }
    };

    const handleLogin = async () => {
        try {
            const result = await login('auth/login', { username, password });
            setResponse(result);
            setId(localStorage.getItem('id'))
        } catch (error) {
            setResponse(error);
        }
    };

    const handleLogout = () => {
        logout();
        setId(null);
        setResponse('Logged out successfully');
    };

    const handleUserGet = async () => {
        try {
            const result = await userGet('users');
            setResponse(result);
        } catch (error) {
            setResponse(error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Services Page</h1>

            <div className="mb-4 flex-col">
                <h2 className="text-xl">Authentication</h2>
                {id ? (<button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded ml-2">Logout</button>) : (
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
                )}
            </div>

            <div className="mb-4">
                <h2 className="text-xl">User Operations</h2>
                <button onClick={handleUserGet} className="bg-blue-500 text-white p-2 rounded">Get Users</button>
            </div>

            <div className="mt-4">
                <h2 className="text-xl">Response</h2>
                <pre className="bg-gray-100 p-4 rounded text-black">{JSON.stringify(response, null, 2)}</pre>
            </div>
        </div>
    );
}