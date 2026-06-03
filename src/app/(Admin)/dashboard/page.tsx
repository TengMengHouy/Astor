'use client'

import React, {useEffect, useMemo, useState} from 'react'
import DataTable, {TableColumn} from 'react-data-table-component'
import {Activity, ArrowUpRight, Edit3, MoreHorizontal, Search, ShieldCheck, Trash2, TrendingUp, UserCheck, Users} from 'lucide-react'
import AdminOrbitScene from "@/components/admin/AdminOrbitScene";

type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    image: string;
    age: number;
    gender: string;
    birthDate: string;
}

const mockUsers: UserType[] = [
    {
        id: 1,
        firstName: "Lina",
        lastName: "Morgan",
        username: "lina.admin",
        email: "lina@astro.shop",
        image: "",
        age: 28,
        gender: "female",
        birthDate: "1998-04-18",
    },
    {
        id: 2,
        firstName: "Noah",
        lastName: "Chen",
        username: "noah.ops",
        email: "noah@astro.shop",
        image: "",
        age: 32,
        gender: "male",
        birthDate: "1994-11-05",
    },
    {
        id: 3,
        firstName: "Maya",
        lastName: "Stone",
        username: "maya.shop",
        email: "maya@astro.shop",
        image: "",
        age: 25,
        gender: "female",
        birthDate: "2001-02-22",
    },
    {
        id: 4,
        firstName: "Eli",
        lastName: "Rivera",
        username: "eli.support",
        email: "eli@astro.shop",
        image: "",
        age: 30,
        gender: "male",
        birthDate: "1996-08-13",
    },
];

export default function Dashboard() {
    const [users, setUsers] = useState<UserType[]>(mockUsers);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [notice, setNotice] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://dummyjson.com/users');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUsers(Array.isArray(data.users) ? data.users : mockUsers);
                setNotice('');
            } catch (error) {
                console.error('Error fetching users:', error);
                setUsers(mockUsers);
                setNotice('Showing mock admin users while the user service is unavailable.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) return users;

        return users.filter((user) => (
            `${user.firstName} ${user.lastName} ${user.email} ${user.username}`.toLowerCase().includes(query)
        ));
    }, [searchTerm, users]);

    const dashboardStats = [
        {label: 'Users', value: users.length.toString(), icon: Users, color: 'text-sky-600'},
        {label: 'Verified', value: Math.max(users.length - 2, 0).toString(), icon: UserCheck, color: 'text-emerald-600'},
        {label: 'Admin health', value: '98%', icon: TrendingUp, color: 'text-amber-600'},
        {label: 'Security', value: 'Good', icon: ShieldCheck, color: 'text-rose-600'},
    ];

    const handleEdit = (id: number) => {
        console.log('Edit user:', id);
    };

    const handleDelete = (id: number) => {
        console.log('Delete user:', id);
    };

    const handleUserDetail = (id: number) => {
        console.log('Open user detail:', id);
    };

    const columns: TableColumn<UserType>[] = [
        {
            name: 'Name',
            selector: (row) => `${row.firstName} ${row.lastName}`,
            sortable: true,
            minWidth: '220px',
            cell: (row) => (
                <div className="flex items-center gap-3 py-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-950 text-sm font-bold text-white dark:bg-white dark:text-slate-950">
                        {row.firstName[0]}{row.lastName[0]}
                    </span>
                    <div>
                        <p className="font-bold text-slate-950 dark:text-white">{row.firstName} {row.lastName}</p>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">@{row.username}</p>
                    </div>
                </div>
            ),
        },
        {
            name: 'Email',
            selector: (row) => row.email,
            minWidth: '240px',
            sortable: true,
        },
        {
            name: 'Age',
            selector: (row) => row.age,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Gender',
            selector: (row) => row.gender,
            width: '130px',
        },
        {
            name: 'Birth Date',
            selector: (row) => row.birthDate,
            width: '140px',
        },
        {
            name: 'Actions',
            width: '170px',
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => handleEdit(row.id)}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-sky-600 transition hover:bg-sky-50 dark:border-white/10 dark:hover:bg-sky-400/10"
                        aria-label={`Edit ${row.firstName}`}
                    >
                        <Edit3 className="h-4 w-4" aria-hidden="true"/>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDelete(row.id)}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-rose-600 transition hover:bg-rose-50 dark:border-white/10 dark:hover:bg-rose-400/10"
                        aria-label={`Delete ${row.firstName}`}
                    >
                        <Trash2 className="h-4 w-4" aria-hidden="true"/>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleUserDetail(row.id)}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/10"
                        aria-label={`Open ${row.firstName} details`}
                    >
                        <MoreHorizontal className="h-4 w-4" aria-hidden="true"/>
                    </button>
                </div>
            ),
        }
    ];

    return (
        <main className="min-h-screen w-full overflow-x-hidden bg-slate-50 px-4 py-6 text-slate-950 dark:bg-zinc-950 dark:text-white sm:px-6 lg:px-8">
            <section className="mx-auto w-full max-w-[calc(100vw-2rem)] space-y-6 sm:max-w-[calc(100vw-3rem)] lg:max-w-7xl">
                <section className="admin-dashboard-hero relative min-h-[430px] overflow-hidden rounded-lg bg-slate-950 text-white shadow-2xl shadow-slate-950/20">
                    <AdminOrbitScene/>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/82 to-slate-950/30"/>
                    <div className="admin-scanline absolute inset-0 opacity-30"/>

                    <div className="relative z-10 flex min-h-[430px] w-full max-w-[calc(100vw-5rem)] flex-col justify-between gap-8 p-6 sm:max-w-full sm:p-8 lg:max-w-2xl">
                        <div className="space-y-5">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-emerald-200 backdrop-blur">
                                <Activity className="h-4 w-4" aria-hidden="true"/>
                                Live operations
                            </div>
                            <div>
                                <p className="text-sm font-bold uppercase text-emerald-300">Admin</p>
                                <h1 className="mt-2 text-5xl font-bold leading-tight">Dashboard</h1>
                                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200">
                                    Track users, account health, and store operations from one focused workspace.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="relative block w-full max-w-lg">
                                <span className="sr-only">Search users</span>
                                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true"/>
                                <input
                                    type="text"
                                    placeholder="Search users, email, username..."
                                    className="h-12 w-full rounded-lg border border-white/15 bg-white/10 pl-12 pr-4 text-sm font-medium text-white outline-none backdrop-blur transition placeholder:text-slate-300 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-300/15"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </label>

                            <div className="grid w-full max-w-lg grid-cols-1 gap-3 min-[520px]:grid-cols-3">
                                <div className="rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur">
                                    <p className="text-2xl font-bold">{users.length}</p>
                                    <p className="truncate text-xs text-slate-300">Accounts</p>
                                </div>
                                <div className="rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur">
                                    <p className="text-2xl font-bold">24h</p>
                                    <p className="truncate text-xs text-slate-300">Monitor</p>
                                </div>
                                <div className="rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur">
                                    <p className="text-2xl font-bold">98%</p>
                                    <p className="truncate text-xs text-slate-300">Health</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-6 right-6 z-10 hidden items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-emerald-100 backdrop-blur lg:flex">
                        Core online
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true"/>
                    </div>
                </section>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {dashboardStats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <section
                                key={stat.label}
                                className="admin-stat-card rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-zinc-900"
                                style={{animationDelay: `${index * 90}ms`}}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-bold uppercase text-slate-400">{stat.label}</p>
                                        <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                                    </div>
                                    <span className="grid h-12 w-12 place-items-center rounded-lg bg-slate-50 dark:bg-white/10">
                                        <Icon className={`h-6 w-6 ${stat.color}`} aria-hidden="true"/>
                                    </span>
                                </div>
                            </section>
                        );
                    })}
                </div>

                {notice && (
                    <div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-800 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200">
                        {notice}
                    </div>
                )}

                <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-white/10">
                        <div>
                            <h2 className="text-xl font-bold">User management</h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                                {filteredUsers.length} matching user{filteredUsers.length === 1 ? '' : 's'}
                            </p>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={filteredUsers}
                        progressPending={loading}
                        pagination
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 30, 50]}
                        highlightOnHover
                        responsive
                    />
                </section>
            </section>
        </main>
    )
}
