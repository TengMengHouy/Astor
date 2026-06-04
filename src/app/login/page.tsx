'use client';

import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, BadgeCheck, LockKeyhole, LogIn, ShieldCheck, Sparkles} from "lucide-react";
import {getAuthGateLoginUrl} from "@/lib/authgate";
import {mockProducts} from "@/app/data/productData";

const previewProducts = mockProducts.slice(0, 3);

export default function LoginPage() {
    const loginUrl ="/oauth2/authorization/admin";

    return (
        <main className="min-h-screen bg-[#f8fafc] text-slate-950 dark:bg-[#09090b] dark:text-white">
            <section className="grid min-h-screen lg:grid-cols-[1fr_0.92fr]">
                <div className="relative hidden overflow-hidden bg-slate-950 text-white lg:block">
                    <Image
                        fill
                        priority
                        unoptimized
                        src={previewProducts[0].image}
                        alt={previewProducts[0].tittle}
                        sizes="50vw"
                        className="object-cover opacity-45"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.98)_0%,rgba(15,23,42,0.78)_48%,rgba(20,184,166,0.30)_100%)]"/>

                    <div className="relative z-10 flex min-h-screen flex-col justify-between p-10">
                        <Link href="/" className="flex w-fit items-center gap-3">
                            <Image src="/img.png" alt="Astro Shop logo" width={42} height={42}/>
                            <span>
                                <span className="block text-xl font-bold">Astro Shop</span>
                                <span className="text-xs font-bold uppercase tracking-wide text-emerald-200">Member access</span>
                            </span>
                        </Link>

                        <div className="max-w-xl space-y-6">
                            <div className="inline-flex items-center gap-2 border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-emerald-100 backdrop-blur">
                                <Sparkles className="h-4 w-4" aria-hidden="true"/>
                                Curated gear, one session
                            </div>
                            <h1 className="text-6xl font-bold leading-tight">
                                Welcome back to the shop.
                            </h1>
                            <p className="max-w-lg text-base leading-8 text-white/68">
                                Sign in once, browse faster, and keep your Astro Shop session on the gateway.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {previewProducts.map((product) => (
                                <Link
                                    href={`/product/${product.uuid}`}
                                    key={product.id}
                                    className="group overflow-hidden border border-white/10 bg-white/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
                                >
                                    <div className="relative aspect-square bg-slate-900">
                                        <Image
                                            fill
                                            unoptimized
                                            src={product.image}
                                            alt={product.tittle}
                                            sizes="160px"
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <p className="truncate p-3 text-sm font-bold">{product.tittle}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex min-h-screen items-center justify-center px-5 py-28 sm:px-8">
                    <section className="w-full max-w-md">
                        <Link
                            href="/"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-950 dark:text-zinc-400 dark:hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true"/>
                            Back to shop
                        </Link>

                        <div className="border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-zinc-950 dark:shadow-black/25 sm:p-8">
                            <div className="flex items-center justify-between gap-4">
                                <div className="grid h-12 w-12 place-items-center bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                                    <LockKeyhole className="h-6 w-6" aria-hidden="true"/>
                                </div>
                                <div className="inline-flex items-center gap-2 bg-emerald-50 px-3 py-2 text-xs font-bold uppercase text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
                                    <ShieldCheck className="h-4 w-4" aria-hidden="true"/>
                                    AuthGate
                                </div>
                            </div>

                            <div className="mt-8 space-y-3">
                                <h2 className="text-4xl font-bold leading-tight">Sign in</h2>
                                <p className="text-sm leading-6 text-slate-600 dark:text-zinc-400">
                                    Continue with AuthGate to access your Astro Shop account.
                                </p>
                            </div>

                            <a
                                href={loginUrl}
                                className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 bg-emerald-400 px-5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                            >
                                <LogIn className="h-5 w-5" aria-hidden="true"/>
                                Continue with AuthGate
                            </a>

                            <div className="mt-6 flex items-start gap-3 border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-400">
                                <BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" aria-hidden="true"/>
                                <p>Your browser session stays on the AuthGate gateway for safer same-origin shopping.</p>
                            </div>

                            <div className="mt-6 text-center text-sm text-slate-500 dark:text-zinc-500">
                                New here?{" "}
                                <Link href="/product" className="font-bold text-slate-950 hover:underline dark:text-white">
                                    Browse products first
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}
