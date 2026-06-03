'use client';

import {useEffect, useState} from 'react';
import Loading from "@/components/Loading";
import {getAuthGateLogoutUrl, isOnAuthGateOrigin} from "@/lib/authgate";

export default function LogoutPage() {
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const logout = async () => {
            try {
                await fetch(getAuthGateLogoutUrl(), {
                    method: "POST",
                    credentials: "include",
                });
            } catch {
                setFailed(true);
            } finally {
                window.location.assign(isOnAuthGateOrigin() ? "/" : "https://astor-shop.authgate.site/");
            }
        };

        void logout();
    }, []);

    if (failed) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
                <section className="max-w-md border border-white/10 bg-white/10 p-8 text-center">
                    <h1 className="text-2xl font-bold">Finishing logout</h1>
                    <p className="mt-3 text-sm leading-6 text-white/65">
                        Redirecting back to Astro Shop.
                    </p>
                </section>
            </main>
        );
    }

    return <Loading/>;
}
