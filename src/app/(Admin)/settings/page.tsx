import {Bell, CreditCard, Database, LockKeyhole, Mail, Save, ShieldCheck, Store, ToggleRight, Truck, UserCog} from "lucide-react";

const settingCards = [
    {
        title: "Store Profile",
        description: "Public store identity and support details.",
        icon: Store,
        values: ["Astro Shop", "support@astro.shop", "Phnom Penh"],
    },
    {
        title: "Notifications",
        description: "Order, stock, and admin alert channels.",
        icon: Bell,
        values: ["Order alerts on", "Low stock alerts on", "Weekly digest"],
    },
    {
        title: "Security",
        description: "Admin access and account protection.",
        icon: ShieldCheck,
        values: ["Two-step review", "Session guard", "Staff roles"],
    },
];

const toggles = [
    {label: "Accept new orders", checked: true, icon: CreditCard},
    {label: "Delivery tracking", checked: true, icon: Truck},
    {label: "Admin email alerts", checked: true, icon: Mail},
    {label: "Maintenance mode", checked: false, icon: LockKeyhole},
];

export default function SettingsPage() {
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 dark:bg-zinc-950 dark:text-white sm:px-6 lg:px-8">
            <section className="mx-auto max-w-7xl space-y-6">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                    <div>
                        <p className="text-sm font-bold uppercase text-emerald-700 dark:text-emerald-300">Admin</p>
                        <h1 className="mt-2 text-4xl font-bold">Settings</h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-zinc-400">
                            Tune store operations, account safety, and notification preferences from one place.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-zinc-200"
                    >
                        <Save className="h-4 w-4" aria-hidden="true"/>
                        Save changes
                    </button>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {settingCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <section key={card.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                                <div className="flex items-start gap-4">
                                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-slate-50 dark:bg-white/10">
                                        <Icon className="h-6 w-6 text-emerald-600" aria-hidden="true"/>
                                    </span>
                                    <div>
                                        <h2 className="text-lg font-bold">{card.title}</h2>
                                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">{card.description}</p>
                                    </div>
                                </div>
                                <div className="mt-5 space-y-2">
                                    {card.values.map((value) => (
                                        <div key={value} className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-600 dark:bg-white/10 dark:text-zinc-300">
                                            {value}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>

                <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-bold">Store controls</h2>
                                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">Mock switches for the admin workflow.</p>
                            </div>
                            <ToggleRight className="h-6 w-6 text-emerald-600" aria-hidden="true"/>
                        </div>

                        <div className="mt-5 space-y-3">
                            {toggles.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div key={item.label} className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-3 dark:bg-white/10">
                                        <div className="flex items-center gap-3">
                                            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white shadow-sm dark:bg-zinc-950">
                                                <Icon className="h-5 w-5 text-slate-600 dark:text-zinc-300" aria-hidden="true"/>
                                            </span>
                                            <p className="font-bold">{item.label}</p>
                                        </div>
                                        <span className={`h-6 w-11 rounded-full p-1 transition ${item.checked ? "bg-emerald-400" : "bg-slate-300 dark:bg-zinc-700"}`}>
                                            <span className={`block h-4 w-4 rounded-full bg-white transition ${item.checked ? "translate-x-5" : ""}`}/>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h2 className="text-xl font-bold">Admin access</h2>
                                <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">Role permissions and system data snapshot.</p>
                            </div>
                            <UserCog className="h-6 w-6 text-sky-600" aria-hidden="true"/>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            <div className="rounded-lg border border-slate-200 p-4 dark:border-white/10">
                                <Database className="h-7 w-7 text-amber-600" aria-hidden="true"/>
                                <h3 className="mt-3 font-bold">Data mode</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">Mock fallback data is enabled for preview pages.</p>
                            </div>
                            <div className="rounded-lg border border-slate-200 p-4 dark:border-white/10">
                                <LockKeyhole className="h-7 w-7 text-rose-600" aria-hidden="true"/>
                                <h3 className="mt-3 font-bold">Staff access</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-zinc-400">Admin-only routes use the sidebar workspace.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}
