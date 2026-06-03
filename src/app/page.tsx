import Image from "next/image";
import Link from "next/link";
import {ArrowRight, PackageCheck, ShieldCheck, ShoppingBag, Sparkles, Star, Truck} from "lucide-react";
import {mockProducts} from "@/app/data/productData";

const heroProduct = mockProducts[0];
const featuredProducts = mockProducts.slice(1, 5);
const shopStats = [
    {label: "Curated drops", value: "24+"},
    {label: "Avg. rating", value: "4.6"},
    {label: "Ready to ship", value: "Today"},
];

export default function Home() {
    return (
        <main className="bg-slate-50 text-slate-950 dark:bg-zinc-950 dark:text-white">
            <section className="relative min-h-[88dvh] overflow-hidden bg-slate-950 text-white">
                <Image
                    fill
                    priority
                    unoptimized
                    src={heroProduct.image}
                    alt={heroProduct.tittle}
                    sizes="100vw"
                    className="object-cover opacity-45"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20"/>

                <div className="relative z-10 mx-auto flex min-h-[88dvh] max-w-7xl flex-col justify-between gap-10 px-6 pb-8 pt-28 sm:px-8 lg:px-10">
                    <div className="max-w-3xl space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-200 backdrop-blur">
                            <Sparkles className="h-4 w-4" aria-hidden="true"/>
                            Fresh tech, desk, and daily carry picks
                        </div>

                        <div className="space-y-5">
                            <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                                Astro Shop
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                                Smart gear for desk setups, travel days, and everyday upgrades without the clutter.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/product"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                            >
                                <ShoppingBag className="h-5 w-5" aria-hidden="true"/>
                                Shop products
                            </Link>
                            <Link
                                href="/product?search=smart"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
                            >
                                Smart picks
                                <ArrowRight className="h-5 w-5" aria-hidden="true"/>
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
                        <div className="grid grid-cols-3 gap-3 rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur">
                            {shopStats.map((stat) => (
                                <div key={stat.label} className="min-w-0">
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="truncate text-xs text-slate-300">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {featuredProducts.map((product) => (
                                <Link
                                    href={`/product/${product.uuid}`}
                                    key={product.id}
                                    className="group overflow-hidden rounded-lg border border-white/15 bg-white/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-slate-900">
                                        <Image
                                            fill
                                            unoptimized
                                            src={product.image}
                                            alt={product.tittle}
                                            sizes="(max-width: 640px) 50vw, 180px"
                                            className="object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="space-y-1 p-3">
                                        <p className="line-clamp-1 text-sm font-bold">{product.tittle}</p>
                                        <div className="flex items-center gap-1 text-xs text-amber-200">
                                            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true"/>
                                            <span>{product.rating}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-7xl gap-4 px-6 py-10 sm:px-8 md:grid-cols-3 lg:px-10">
                <div className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                    <Truck className="mt-1 h-6 w-6 text-sky-600" aria-hidden="true"/>
                    <div>
                        <h2 className="font-bold">Fast delivery</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-300">Popular items are highlighted and ready to move.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                    <ShieldCheck className="mt-1 h-6 w-6 text-emerald-600" aria-hidden="true"/>
                    <div>
                        <h2 className="font-bold">Clear quality signals</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-300">Shop with steady ratings, fair prices, and clear item details.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                    <PackageCheck className="mt-1 h-6 w-6 text-rose-600" aria-hidden="true"/>
                    <div>
                        <h2 className="font-bold">Better browsing</h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-300">Desk-ready gear, travel tools, and active essentials stay close at hand.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
