"use client"

import { useState } from 'react';
import { signOut } from "next-auth/react";
import { userGet } from '@/lib/services/user';

export default function ServicesPage() {
    const [response, setResponse] = useState<unknown>();

    const handleLogout = () => {
        signOut()
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
                <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded ml-2">Logout</button>
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