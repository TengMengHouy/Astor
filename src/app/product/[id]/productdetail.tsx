"use client"

import Image from "next/image";
import Link from "next/link";
import {useParams} from "next/navigation";
import React, {useEffect, useMemo, useState} from "react";
import type {Product} from "@/app/types/productTypes";
import api from "@/lib/axios";
import {getMockProduct} from "@/lib/mock-products";
import {mockProducts} from "@/app/data/productData";
import {ArrowLeft, BadgeCheck, CreditCard, Heart, PackageCheck, ShoppingBag, Star, Truck} from "lucide-react";

export default function ProductDetail() {
    const {id} = useParams();
    const productId = Array.isArray(id) ? id[0] : id;
    const [product, setProduct] = useState<Product | null>(null);
    const [notice, setNotice] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) {
            setProduct(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setNotice("");

        api.get(`product/${productId}`)
            .then((res) => {
                const remoteProduct: Product | null = res.data?.tittle ? res.data : null;
                const fallbackProduct = getMockProduct(productId);

                if (remoteProduct) {
                    setProduct(remoteProduct);
                    return;
                }

                setProduct(fallbackProduct);
                setNotice(fallbackProduct ? "Showing a featured product while the shop service finishes loading this item." : "");
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                const fallbackProduct = getMockProduct(productId);
                setProduct(fallbackProduct);
                setNotice(fallbackProduct ? "Showing mock product details while the shop service warms up." : "");
            })
            .finally(() => setLoading(false));
    }, [productId]);

    const relatedProducts = useMemo(() => (
        mockProducts
            .filter((item) => item.uuid !== product?.uuid)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3)
    ), [product?.uuid]);

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-28 text-slate-950 dark:bg-zinc-950 dark:text-white sm:px-6 lg:px-8">
                <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
                    <div className="aspect-[4/3] animate-pulse rounded-lg bg-slate-200 dark:bg-zinc-900"/>
                    <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                        <div className="h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-zinc-800"/>
                        <div className="h-12 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-zinc-800"/>
                        <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-zinc-800"/>
                        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-zinc-800"/>
                        <div className="h-12 w-full animate-pulse rounded bg-slate-200 dark:bg-zinc-800"/>
                    </div>
                </section>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-28 text-slate-950 dark:bg-zinc-950 dark:text-white">
                <section className="max-w-lg rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-zinc-900">
                    <PackageCheck className="mx-auto h-12 w-12 text-slate-400" aria-hidden="true"/>
                    <h1 className="mt-4 text-3xl font-bold">Product not found</h1>
                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-zinc-400">
                        This item is not in the live catalog or the local featured product list.
                    </p>
                    <Link
                        href="/product"
                        className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true"/>
                        Back to products
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 text-slate-950 dark:bg-zinc-950 dark:text-white">
            <section className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
                <Link
                    href="/product"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-300"
                >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true"/>
                    Back to products
                </Link>

                {notice && (
                    <div className="mb-6 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-800 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200">
                        {notice}
                    </div>
                )}

                <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
                        <div className="relative aspect-[4/3] bg-slate-100 dark:bg-zinc-950">
                            <Image
                                fill
                                priority
                                unoptimized
                                src={product.image}
                                alt={product.tittle}
                                sizes="(max-width: 1024px) 100vw, 55vw"
                                className="object-cover"
                            />
                            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase text-slate-950 shadow-sm">
                                Featured item
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200">
                                    <BadgeCheck className="h-4 w-4" aria-hidden="true"/>
                                    In stock
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-700 dark:bg-amber-400/15 dark:text-amber-200">
                                    <Star className="h-4 w-4 fill-current" aria-hidden="true"/>
                                    {product.rating}
                                </span>
                            </div>

                            <div className="mt-5 space-y-4">
                                <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{product.tittle}</h1>
                                <p className="text-base leading-8 text-slate-600 dark:text-zinc-300">{product.description}</p>
                            </div>

                            <div className="mt-8 flex flex-col gap-4 border-t border-slate-100 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-bold uppercase text-slate-400">Price</p>
                                    <p className="mt-1 text-4xl font-bold">${product.price.toFixed(2)}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                                    >
                                        <ShoppingBag className="h-5 w-5" aria-hidden="true"/>
                                        Add to bag
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 transition hover:-translate-y-0.5 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:border-white/10 dark:hover:border-rose-400/30 dark:hover:bg-rose-400/10 dark:hover:text-rose-200"
                                        aria-label="Save product"
                                    >
                                        <Heart className="h-5 w-5" aria-hidden="true"/>
                                    </button>
                                </div>
                            </div>
                        </section>

                        <section className="grid gap-3 sm:grid-cols-3">
                            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                                <Truck className="h-6 w-6 text-sky-600" aria-hidden="true"/>
                                <h2 className="mt-3 font-bold">Fast delivery</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">Ready for local checkout.</p>
                            </div>
                            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                                <CreditCard className="h-6 w-6 text-emerald-600" aria-hidden="true"/>
                                <h2 className="mt-3 font-bold">Secure pay</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">Clear pricing before order.</p>
                            </div>
                            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                                <PackageCheck className="h-6 w-6 text-rose-600" aria-hidden="true"/>
                                <h2 className="mt-3 font-bold">Quality pick</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">Rated by the catalog.</p>
                            </div>
                        </section>
                    </div>
                </div>

                <section className="mt-12">
                    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-bold uppercase text-emerald-700 dark:text-emerald-300">More picks</p>
                            <h2 className="mt-2 text-3xl font-bold">Related products</h2>
                        </div>
                        <Link href="/product" className="text-sm font-bold text-slate-500 transition hover:text-emerald-700 dark:text-zinc-400 dark:hover:text-emerald-300">
                            View all products
                        </Link>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {relatedProducts.map((item) => (
                            <Link
                                href={`/product/${item.uuid}`}
                                key={item.id}
                                className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md dark:border-white/10 dark:bg-zinc-900"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-zinc-950">
                                    <Image
                                        fill
                                        unoptimized
                                        src={item.image}
                                        alt={item.tittle}
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="space-y-3 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="line-clamp-1 font-bold">{item.tittle}</h3>
                                        <span className="flex shrink-0 items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-300">
                                            <Star className="h-4 w-4 fill-current" aria-hidden="true"/>
                                            {item.rating}
                                        </span>
                                    </div>
                                    <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </section>
        </main>
    );
}
