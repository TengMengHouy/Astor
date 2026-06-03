import {Product} from "@/app/types/productTypes";
import Image from "next/image";
import {ArrowUpRight, Heart, ShoppingBag, Star} from "lucide-react";

export default function card ({id,tittle,price,description,image,rating}:Product){
    const accentIndex = Number.isFinite(Number(id)) ? Number(id) % 3 : tittle.length % 3;
    const aspectRatio = accentIndex === 0 ? "4 / 5" : accentIndex === 1 ? "3 / 4" : "1 / 1.22";

    return (
        <article
            key={id}
            className="group relative isolate w-full overflow-hidden rounded-lg bg-slate-200 text-white shadow-sm shadow-slate-950/10 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/25 focus-within:-translate-y-1 dark:bg-zinc-900 dark:shadow-black/25"
            style={{aspectRatio}}
        >
            <Image
                fill
                unoptimized
                src={image}
                alt={tittle}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                className="object-cover transition duration-700 group-hover:scale-105 group-focus-within:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/12 to-slate-950/25 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100"/>

            <div className="absolute left-3 right-3 top-3 flex translate-y-2 items-center justify-between gap-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-active:translate-y-0 group-active:opacity-100">
                <span className="min-w-0 truncate rounded-full bg-slate-950/70 px-3 py-2 text-sm font-bold text-white shadow-sm backdrop-blur">
                    {tittle}
                </span>
                <span className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-red-600 px-4 text-sm font-bold text-white shadow-lg shadow-red-950/25">
                    Save
                </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 translate-y-3 space-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-active:translate-y-0 group-active:opacity-100">
                <div className="rounded-lg border border-white/15 bg-slate-950/72 p-3 shadow-xl backdrop-blur-md">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="line-clamp-2 text-base font-bold leading-snug">{tittle}</h3>
                            <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/72">{description}</p>
                        </div>
                        <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-300 px-2 py-1 text-xs font-bold text-slate-950">
                            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true"/>
                            {rating}
                        </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-xl font-bold">${price.toFixed(2)}</span>
                        <span className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-white px-3 text-xs font-bold text-slate-950">
                            <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true"/>
                            Visit item
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-3 text-xs font-bold text-slate-950 shadow-md">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true"/>
                        Open
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 shadow-md">
                        <Heart className="h-4 w-4" aria-hidden="true"/>
                    </span>
                </div>
            </div>
        </article>
    )
}
