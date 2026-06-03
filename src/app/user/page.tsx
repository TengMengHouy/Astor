import Image from "next/image";
import Link from "next/link";
import {BadgeCheck, Clock3, CreditCard, Heart, MapPin, PackageCheck, Settings, ShoppingBag, Star, Truck, UserRound} from "lucide-react";
import {mockProducts} from "@/app/data/productData";

const user = {
    name: "Astro Member",
    email: "member@astro.shop",
    tier: "Gear Insider",
    location: "Phnom Penh",
    joined: "Joined 2026",
};

const accountStats = [
    {label: "Orders", value: "12"},
    {label: "Saved", value: "8"},
    {label: "Rating avg.", value: "4.7"},
];

const recentOrders = [
    {id: "AS-2048", label: "Wireless Bluetooth Headphones", status: "Arriving today", icon: Truck},
    {id: "AS-2039", label: "Portable Charger 20000mAh", status: "Delivered", icon: PackageCheck},
    {id: "AS-2027", label: "Smart LED Desk Lamp", status: "Paid", icon: CreditCard},
];

const savedProducts = mockProducts.slice(0, 4);

export default function UserPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-zinc-950 dark:text-white">
            <section className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
                    <aside className="space-y-5">
                        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
                            <div className="h-24 bg-slate-950 dark:bg-white"/>
                            <div className="px-6 pb-6">
                                <div className="-mt-10 flex items-end justify-between gap-4">
                                    <div className="grid h-20 w-20 place-items-center rounded-lg border-4 border-white bg-emerald-400 text-slate-950 shadow-sm dark:border-zinc-900">
                                        <UserRound className="h-9 w-9" aria-hidden="true"/>
                                    </div>
                                    <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200">
                                        <BadgeCheck className="h-4 w-4" aria-hidden="true"/>
                                        {user.tier}
                                    </span>
                                </div>

                                <div className="mt-5 space-y-3">
                                    <div>
                                        <h1 className="text-3xl font-bold">{user.name}</h1>
                                        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">{user.email}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-sm font-bold text-slate-500 dark:text-zinc-400">
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin className="h-4 w-4" aria-hidden="true"/>
                                            {user.location}
                                        </span>
                                        <span>{user.joined}</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    {accountStats.map((stat) => (
                                        <div key={stat.label} className="rounded-lg bg-slate-50 p-3 text-center dark:bg-white/10">
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                            <p className="mt-1 truncate text-xs font-bold uppercase text-slate-400">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="text-lg font-bold">Account</h2>
                                <Settings className="h-5 w-5 text-slate-400" aria-hidden="true"/>
                            </div>
                            <div className="mt-4 grid gap-2">
                                <Link href="/product" className="flex h-11 items-center justify-between rounded-lg bg-slate-50 px-3 text-sm font-bold transition hover:bg-emerald-50 hover:text-emerald-700 dark:bg-white/10 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-200">
                                    Shop products
                                    <ShoppingBag className="h-4 w-4" aria-hidden="true"/>
                                </Link>
                                <Link href="/login" className="flex h-11 items-center justify-between rounded-lg bg-slate-50 px-3 text-sm font-bold transition hover:bg-sky-50 hover:text-sky-700 dark:bg-white/10 dark:hover:bg-sky-400/10 dark:hover:text-sky-200">
                                    Sign in
                                    <UserRound className="h-4 w-4" aria-hidden="true"/>
                                </Link>
                            </div>
                        </section>
                    </aside>

                    <div className="space-y-6">
                        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                                <div>
                                    <p className="text-sm font-bold uppercase text-emerald-700 dark:text-emerald-300">Dashboard</p>
                                    <h2 className="mt-2 text-3xl font-bold">Your shopping hub</h2>
                                </div>
                                <Link
                                    href="/product"
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-zinc-200"
                                >
                                    <ShoppingBag className="h-4 w-4" aria-hidden="true"/>
                                    Browse gear
                                </Link>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                <div className="rounded-lg border border-slate-200 p-4 dark:border-white/10">
                                    <Truck className="h-7 w-7 text-sky-600" aria-hidden="true"/>
                                    <h3 className="mt-3 font-bold">Next delivery</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">Headphones are marked for arrival today.</p>
                                </div>
                                <div className="rounded-lg border border-slate-200 p-4 dark:border-white/10">
                                    <Heart className="h-7 w-7 text-rose-600" aria-hidden="true"/>
                                    <h3 className="mt-3 font-bold">Saved picks</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">Your favorite items are ready for a second look.</p>
                                </div>
                                <div className="rounded-lg border border-slate-200 p-4 dark:border-white/10">
                                    <Star className="h-7 w-7 text-amber-500" aria-hidden="true"/>
                                    <h3 className="mt-3 font-bold">Member rating</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">Highly rated items are pushed to the top.</p>
                                </div>
                            </div>
                        </section>

                        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-xl font-bold">Recent orders</h2>
                                    <Clock3 className="h-5 w-5 text-slate-400" aria-hidden="true"/>
                                </div>
                                <div className="mt-4 space-y-3">
                                    {recentOrders.map((order) => {
                                        const Icon = order.icon;

                                        return (
                                            <div key={order.id} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 dark:bg-white/10">
                                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white text-slate-950 shadow-sm dark:bg-zinc-950 dark:text-white">
                                                    <Icon className="h-5 w-5" aria-hidden="true"/>
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-bold">{order.label}</p>
                                                    <p className="mt-1 text-xs font-bold uppercase text-slate-400">{order.id}</p>
                                                </div>
                                                <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200">
                                                    {order.status}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                                <div className="flex items-center justify-between gap-3">
                                    <h2 className="text-xl font-bold">Saved products</h2>
                                    <Heart className="h-5 w-5 text-rose-500" aria-hidden="true"/>
                                </div>
                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {savedProducts.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.uuid}`}
                                            className="group flex gap-3 rounded-lg bg-slate-50 p-3 transition hover:-translate-y-0.5 hover:bg-emerald-50 dark:bg-white/10 dark:hover:bg-emerald-400/10"
                                        >
                                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-slate-200 dark:bg-zinc-950">
                                                <Image
                                                    fill
                                                    unoptimized
                                                    src={product.image}
                                                    alt={product.tittle}
                                                    sizes="80px"
                                                    className="object-cover transition duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="line-clamp-2 font-bold leading-snug">{product.tittle}</p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
                                                    <span className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-300">
                                                        <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true"/>
                                                        {product.rating}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}
