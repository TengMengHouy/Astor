import Image from "next/image";
import Link from "next/link";
import {ArrowRight, BadgeCheck, Boxes, HeartHandshake, Rocket, Sparkles, Store} from "lucide-react";

const stats = [
    {label: "Curated finds", value: "120+"},
    {label: "Fast mock-ready APIs", value: "BFF"},
    {label: "Shop mood", value: "Cosmic"},
];

const values = [
    {
        title: "Useful first",
        body: "Every product should feel easy to compare, quick to scan, and worth opening.",
        icon: BadgeCheck,
    },
    {
        title: "Playful polish",
        body: "Astro Shop keeps the interface light, colorful, and a little futuristic without getting noisy.",
        icon: Sparkles,
    },
    {
        title: "Built to grow",
        body: "The storefront is ready for real backend data, mock data, and future inventory workflows.",
        icon: Boxes,
    },
];

export default function AboutUsPage() {
    return (
        <main className="min-h-screen bg-[#101014] text-white">
            <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_10%,rgba(244,114,182,0.32),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(45,212,191,0.24),transparent_28%),linear-gradient(135deg,#111827_0%,#18181b_42%,#3f2a36_100%)] px-5 pt-32 pb-20">
                <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-7">
                        <div className="inline-flex items-center gap-2 border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/85 backdrop-blur">
                            <Store className="size-4 text-teal-200"/>
                            Astro Shop story
                        </div>
                        <div className="space-y-5">
                            <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
                                A sharper shop for curious buyers.
                            </h1>
                            <p className="max-w-2xl text-base leading-8 text-white/72 md:text-lg">
                                Astro Shop is a compact storefront for products that feel fun to discover and simple to choose. The experience is bright, direct, and ready for real inventory behind the scenes.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/product"
                                className="inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-teal-100"
                            >
                                Explore products
                                <ArrowRight className="size-4"/>
                            </Link>
                            <Link
                                href="/create-product"
                                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-amber-200 hover:text-amber-100"
                            >
                                Add product
                                <Rocket className="size-4"/>
                            </Link>
                        </div>
                    </div>

                    <div className="relative min-h-[360px] overflow-hidden border border-white/10 bg-black/20 p-6 shadow-2xl shadow-black/30">
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-400 via-teal-300 to-amber-300"/>
                        <div className="flex h-full flex-col justify-between gap-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white/55">Today&apos;s signal</p>
                                    <p className="text-2xl font-bold">Curated, not crowded</p>
                                </div>
                                <Image src="/img.png" alt="Astro Shop logo" width={54} height={54} className="h-14 w-14"/>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {stats.map((item) => (
                                    <div key={item.label} className="border border-white/10 bg-white/[0.06] p-4">
                                        <p className="text-2xl font-bold text-teal-100">{item.value}</p>
                                        <p className="mt-2 text-xs leading-5 text-white/55">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border border-white/10 bg-[#fef3c7] p-5 text-zinc-950">
                                <p className="text-sm font-semibold uppercase text-zinc-600">Mission</p>
                                <p className="mt-2 text-2xl font-bold leading-snug">
                                    Make product discovery feel quick, visual, and confidently human.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#f8fafc] px-5 py-16 text-zinc-950">
                <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.75fr_1.25fr]">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 border border-zinc-200 px-3 py-2 text-sm text-zinc-600">
                            <HeartHandshake className="size-4 text-pink-500"/>
                            What we care about
                        </div>
                        <h2 className="text-4xl font-bold leading-tight">A shop that respects attention.</h2>
                        <p className="leading-7 text-zinc-600">
                            Cool does not have to mean cluttered. Astro Shop leans into rhythm, contrast, and clear product moments so people can move from browsing to buying without friction.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {values.map((item) => {
                            const Icon = item.icon;

                            return (
                                <article key={item.title} className="border border-zinc-200 bg-white p-5 shadow-sm">
                                    <Icon className="size-7 text-pink-500"/>
                                    <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-zinc-600">{item.body}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-[#101014] px-5 py-16">
                <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_1fr]">
                    <div className="space-y-4">
                        <p className="text-sm font-semibold uppercase text-teal-200">Behind the storefront</p>
                        <h2 className="text-4xl font-bold leading-tight">Frontend sparkle, backend-ready bones.</h2>
                    </div>
                    <p className="text-base leading-8 text-white/66">
                        The shop now works through a BFF route, can fall back to mock products, and is ready to connect to a plain Spring Boot REST backend when you want live data.
                    </p>
                </div>
            </section>
        </main>
    );
}
