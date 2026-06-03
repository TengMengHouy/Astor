import {Product} from "@/app/types/productTypes";
import Image from "next/image";
import {Eye, ShoppingBag, Sparkles, Star} from "lucide-react";

export default function card ({id,tittle,price,description,image,rating}:Product){
    return (
        <article
            key={id}
            className="group flex h-full min-h-[460px] w-full overflow-hidden rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl dark:border-white/10 dark:bg-zinc-950 dark:text-white"
        >
            <div className="flex w-full flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-zinc-900">
                    <Image
                        fill
                        unoptimized
                        src={image}
                        alt={tittle}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/5 to-transparent opacity-90"/>

                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-950 shadow-sm">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true"/>
                        Fresh pick
                    </div>

                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-300 px-3 py-1 text-sm font-bold text-slate-950 shadow-sm">
                        <Star className="h-4 w-4 fill-current" aria-hidden="true"/>
                        <span>{rating}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
                        <span className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-white px-3 text-sm font-bold text-slate-950 shadow-sm transition group-hover:bg-emerald-300">
                            <Eye className="h-4 w-4" aria-hidden="true"/>
                            Quick view
                        </span>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white shadow-sm transition group-hover:bg-slate-800">
                            <ShoppingBag className="h-4 w-4" aria-hidden="true"/>
                        </span>
                    </div>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-5 p-4">
                    <div className="space-y-3">
                        <h5 className="line-clamp-2 text-xl font-bold leading-snug">{tittle}</h5>
                        <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-zinc-300">{description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Now</p>
                            <p className="text-2xl font-bold">${price.toFixed(2)}</p>
                        </div>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
                            Details
                        </span>
                    </div>
                </div>
            </div>
        </article>
    )
}
