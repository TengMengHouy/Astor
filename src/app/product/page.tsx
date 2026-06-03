'use client'

import Card from "@/components/Card";
import Link from "next/link";
import Image from "next/image";
import {Product} from "@/app/types/productTypes";
import {Suspense, useEffect, useMemo, useState} from "react";
import api from "@/lib/axios";
import {useRouter, useSearchParams} from "next/navigation";
import Loading from "@/components/Loading";
import {mockProducts} from "@/app/data/productData";
import {ArrowRight, PackageSearch, Search, ShieldCheck, SlidersHorizontal, Sparkles, Star, Truck, X} from "lucide-react";

const categoryOptions = ["All", "Audio", "Desk", "Power", "Active"] as const;
type Category = (typeof categoryOptions)[number];

function getProductCategory(product: Product): Exclude<Category, "All"> {
    const name = product.tittle.toLowerCase();

    if (name.includes("headphone") || name.includes("earbud")) return "Audio";
    if (name.includes("charger") || name.includes("hub")) return "Power";
    if (name.includes("camera") || name.includes("tracker") || name.includes("bottle")) return "Active";

    return "Desk";
}

function ProductContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const [query, setQuery] = useState(search);
    const [selectedCategory, setSelectedCategory] = useState<Category>("All");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [notice, setNotice] = useState("");

    useEffect(() => {
        setQuery(search);
    }, [search]);

    useEffect(() => {
        setLoading(true);
        api.get("product/")
            .then((res) => {
                const remoteProducts: Product[] = Array.isArray(res.data) ? res.data : [];
                setProducts(remoteProducts.length ? remoteProducts : mockProducts);
                setNotice(remoteProducts.length ? "" : "Showing featured products while the catalog fills up.");
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setProducts(mockProducts);
                setNotice("Showing featured products while the shop service warms up.");
            })
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return products.filter((product) => {
            const matchesSearch = normalizedQuery
                ? `${product.tittle} ${product.description}`.toLowerCase().includes(normalizedQuery)
                : true;
            const matchesCategory = selectedCategory === "All" || getProductCategory(product) === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [products, query, selectedCategory]);

    const featured = products[0] ?? mockProducts[0];
    const topRated = useMemo(() => (
        [...products].sort((a, b) => b.rating - a.rating).slice(0, 3)
    ), [products]);
    const averageRating = products.length
        ? (products.reduce((sum, product) => sum + Number(product.rating || 0), 0) / products.length).toFixed(1)
        : "0.0";

    function updateSearch(value: string) {
        setQuery(value);
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set("search", value);
        } else {
            params.delete("search");
        }

        const href = params.toString() ? `/product?${params.toString()}` : "/product";
        router.push(href, {scroll: false});
    }

    function clearFilters() {
        setSelectedCategory("All");
        updateSearch("");
    }

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-zinc-950 dark:text-white">
            <section className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="flex flex-col justify-center gap-8">
                        <div className="space-y-5">
                            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200">
                                <Sparkles className="h-4 w-4" aria-hidden="true"/>
                                Product picks
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                                    Find the gear that fits your day.
                                </h1>
                                <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-zinc-300 sm:text-lg">
                                    Compare everyday tech, desk upgrades, power gear, and active essentials in one place.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                            <div className="flex flex-col gap-3 md:flex-row">
                                <label className="relative flex-1">
                                    <span className="sr-only">Search products</span>
                                    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true"/>
                                    <input
                                        className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100 dark:border-white/10 dark:bg-zinc-950 dark:text-white dark:focus:border-emerald-300 dark:focus:ring-emerald-400/10"
                                        type='text'
                                        value={query}
                                        onChange={(e) => updateSearch(e.target.value)}
                                        placeholder="Search headphones, lamps, chargers..."
                                    />
                                </label>
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-bold transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:border-white/10 dark:hover:border-rose-400/30 dark:hover:bg-rose-400/10 dark:hover:text-rose-200"
                                >
                                    <X className="h-4 w-4" aria-hidden="true"/>
                                    Clear
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <SlidersHorizontal className="h-4 w-4 text-slate-400" aria-hidden="true"/>
                                {categoryOptions.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setSelectedCategory(category)}
                                        className={`h-9 rounded-full px-4 text-sm font-bold transition ${
                                            selectedCategory === category
                                                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-zinc-300 dark:hover:bg-white/15"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link
                        href={`/product/${featured.uuid}`}
                        className="group relative min-h-[430px] overflow-hidden rounded-lg bg-slate-950 text-white shadow-xl"
                    >
                        <Image
                            fill
                            priority
                            unoptimized
                            src={featured.image}
                            alt={featured.tittle}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover opacity-70 transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"/>
                        <div className="relative flex min-h-[430px] flex-col justify-between p-6">
                            <div className="flex items-center justify-between gap-3">
                                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase text-slate-950">
                                    Featured
                                </span>
                                <span className="flex items-center gap-1 rounded-full bg-amber-300 px-3 py-1 text-sm font-bold text-slate-950">
                                    <Star className="h-4 w-4 fill-current" aria-hidden="true"/>
                                    {featured.rating}
                                </span>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold leading-tight">{featured.tittle}</h2>
                                    <p className="max-w-md text-sm leading-6 text-slate-200">{featured.description}</p>
                                </div>
                                <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-4">
                                    <p className="text-3xl font-bold">${featured.price.toFixed(2)}</p>
                                    <span className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-4 text-sm font-bold text-slate-950">
                                        View item
                                        <ArrowRight className="h-4 w-4" aria-hidden="true"/>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="grid gap-4 py-8 md:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                        <PackageSearch className="h-8 w-8 text-sky-600" aria-hidden="true"/>
                        <div>
                            <p className="text-2xl font-bold">{products.length}</p>
                            <p className="text-sm text-slate-500 dark:text-zinc-400">Products loaded</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                        <ShieldCheck className="h-8 w-8 text-emerald-600" aria-hidden="true"/>
                        <div>
                            <p className="text-2xl font-bold">{averageRating}</p>
                            <p className="text-sm text-slate-500 dark:text-zinc-400">Average rating</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                        <Truck className="h-8 w-8 text-rose-600" aria-hidden="true"/>
                        <div>
                            <p className="text-2xl font-bold">Today</p>
                            <p className="text-sm text-slate-500 dark:text-zinc-400">Ready picks</p>
                        </div>
                    </div>
                </div>

                {topRated.length > 0 && (
                    <div className="mb-8 grid gap-3 sm:grid-cols-3">
                        {topRated.map((product) => (
                            <Link
                                href={`/product/${product.uuid}`}
                                key={product.id}
                                className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md dark:border-white/10 dark:bg-zinc-900 dark:hover:border-amber-400/30"
                            >
                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-slate-100 dark:bg-zinc-800">
                                    <Image
                                        fill
                                        unoptimized
                                        src={product.image}
                                        alt={product.tittle}
                                        sizes="64px"
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate font-bold">{product.tittle}</p>
                                    <p className="mt-1 flex items-center gap-1 text-sm text-amber-600 dark:text-amber-300">
                                        <Star className="h-4 w-4 fill-current" aria-hidden="true"/>
                                        {product.rating}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {notice && (
                    <div className="mb-8 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-800 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200">
                        {notice}
                    </div>
                )}

                <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-bold uppercase text-emerald-700 dark:text-emerald-300">Catalog</p>
                        <h2 className="mt-2 text-3xl font-bold">Explore products</h2>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">
                        {filtered.length} result{filtered.length === 1 ? "" : "s"}
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({length: 8}).map((_, index) => (
                            <div key={index} className="min-h-[430px] animate-pulse rounded-lg bg-white shadow-sm dark:bg-zinc-900">
                                <div className="aspect-[4/3] rounded-t-lg bg-slate-200 dark:bg-zinc-800"/>
                                <div className="space-y-4 p-4">
                                    <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-zinc-800"/>
                                    <div className="h-4 w-full rounded bg-slate-200 dark:bg-zinc-800"/>
                                    <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-zinc-800"/>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filtered.length > 0 ? (
                    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {filtered.map((item) => (
                            <Link href={`/product/${item.uuid}`} key={item.id} className="h-full">
                                <Card
                                    id={item.id}
                                    uuid={item.uuid}
                                    tittle={item.tittle}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                    rating={item.rating}
                                />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center dark:border-white/15 dark:bg-zinc-900">
                        <PackageSearch className="h-12 w-12 text-slate-400" aria-hidden="true"/>
                        <h2 className="mt-4 text-2xl font-bold">No products found</h2>
                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-zinc-400">
                            Try another search or clear the category filter to bring more products back.
                        </p>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                        >
                            <X className="h-4 w-4" aria-hidden="true"/>
                            Clear filters
                        </button>
                    </div>
                )}
            </section>
        </main>
    )
}

export default function ProductPage() {
    return (
        <Suspense fallback={<Loading/>}>
            <ProductContent/>
        </Suspense>
    )
}
