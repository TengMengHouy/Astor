'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import api from '@/lib/axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await api.post('users/login', {
                email,
                password,
            });

            router.push('/product');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl mb-4">Login</h1>

                {error && <p className="text-red-500 mb-2">{error}</p>}

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

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
