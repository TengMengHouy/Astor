'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import api from '@/lib/axios';

export default function SignUpPage() {
    const [userName, setUserName] = useState('');
    const [userRoles, setUserRoles] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await api.post('users/create', {
                userName,
                email,
                password,
                userRoles,
            });

            router.push('/product');
        } catch (err: any) {
            setError(err.response?.data?.message || 'SignUp failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl mb-4">Login</h1>

                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="username"
                    placeholder="Username"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    className="w-full border px-4 py-2 mb-3"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border px-4 py-2 mb-3"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border px-4 py-2 mb-4"
                    required
                />
                <input
                    type="checkbox"
                    placeholder="admin"
                    value="admin"
                    onChange={e => setUserRoles(e.target.value)}
                    className="w-full border px-4 py-2 mb-4"
                    required
                />

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
