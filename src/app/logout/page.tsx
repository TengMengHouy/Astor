'use client';

import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import Loading from "@/components/Loading";
import api from "@/lib/axios";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        api.post('logout')
            .finally(() => router.push('/'));
    }, [router]);

    return <>
        <Loading/>
    </>;
}
