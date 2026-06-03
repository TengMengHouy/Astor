'use client';

import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {LogIn, LogOut, Menu, ShoppingBag, UserRound, X} from "lucide-react";
import {navItems} from "@/app/data/rountPage";
import {ModeToggle} from "@/components/modeToggle";

export default function NavbarComponent() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    if (pathname === '/dashboard' || pathname === '/BlogTable') {
        return null;
    }

    const isActive = (path: string) => (
        path === "/" ? pathname === path : pathname.startsWith(path)
    );

    return (
        <nav className="fixed left-0 right-0 top-0 z-30 px-3 pt-3">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg border border-white/45 bg-white/55 px-4 py-3 text-slate-950 shadow-xl shadow-slate-950/10 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-zinc-950/55 dark:text-white dark:shadow-black/25">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80 dark:bg-white/25"/>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/35 via-white/10 to-emerald-100/25 dark:from-white/10 dark:via-white/5 dark:to-emerald-400/10"/>
                <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
                            <span className="grid h-11 w-11 shrink-0 place-items-center">
                                <Image src="/img.png" alt="Astro Shop logo" width={34} height={34} className="object-contain"/>
                            </span>
                            <span className="min-w-0">
                                <span className="block truncate text-lg font-bold leading-tight">Astro Shop</span>
                                <span className="hidden text-xs font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-300 sm:block">
                                    Daily gear
                                </span>
                            </span>
                        </Link>

                        <ul className="hidden items-center gap-1 md:flex">
                            {navItems.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={item.path}
                                        className={`inline-flex h-10 items-center rounded-lg px-4 text-sm font-bold transition ${
                                            isActive(item.path)
                                                ? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="hidden items-center gap-2 md:flex">
                            <ModeToggle/>
                            <Link
                                href="/user"
                                className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-bold transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 dark:border-white/10 dark:bg-white/10 dark:hover:border-emerald-300/40 dark:hover:bg-emerald-400/10"
                            >
                                <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-400 text-slate-950">
                                    <UserRound className="h-4 w-4" aria-hidden="true"/>
                                </span>
                                Account
                            </Link>
                            <Link
                                href="/login"
                                className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
                            >
                                <LogIn className="h-4 w-4" aria-hidden="true"/>
                                Login
                            </Link>
                            <Link
                                href="/logout"
                                className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-zinc-200"
                            >
                                <LogOut className="h-4 w-4" aria-hidden="true"/>
                                Logout
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={() => setOpen((value) => !value)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm md:hidden dark:border-white/10 dark:bg-white/10 dark:text-white"
                            aria-label="Toggle navigation"
                            aria-expanded={open}
                        >
                            {open ? <X className="h-5 w-5" aria-hidden="true"/> : <Menu className="h-5 w-5" aria-hidden="true"/>}
                        </button>
                    </div>

                    {open && (
                        <div className="mt-4 border-t border-slate-200 pt-4 dark:border-white/10 md:hidden">
                            <div className="grid gap-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.path}
                                        onClick={() => setOpen(false)}
                                        className={`flex h-11 items-center justify-between rounded-lg px-3 text-sm font-bold transition ${
                                            isActive(item.path)
                                                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                                                : "bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-white/10 dark:text-zinc-200 dark:hover:bg-white/15"
                                        }`}
                                    >
                                        {item.name}
                                        {item.path === "/product" && <ShoppingBag className="h-4 w-4" aria-hidden="true"/>}
                                        {item.path === "/user" && <UserRound className="h-4 w-4" aria-hidden="true"/>}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-2">
                                <ModeToggle/>
                                <div className="flex gap-2">
                                    <Link
                                        href="/login"
                                        onClick={() => setOpen(false)}
                                        className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-bold dark:border-white/10"
                                    >
                                        <LogIn className="h-4 w-4" aria-hidden="true"/>
                                        Login
                                    </Link>
                                    <Link
                                        href="/logout"
                                        onClick={() => setOpen(false)}
                                        className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-bold text-white dark:bg-white dark:text-slate-950"
                                    >
                                        <LogOut className="h-4 w-4" aria-hidden="true"/>
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
