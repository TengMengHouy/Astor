'use client';

import {useEffect, useState} from "react";
import {AuthGateUser, getAuthGateMeUrl, normalizeAuthGateUser} from "@/lib/authgate";

type AuthGateUserState = {
    loading: boolean;
    user: AuthGateUser | null;
};

export function useAuthGateUser() {
    const [state, setState] = useState<AuthGateUserState>({
        loading: true,
        user: null,
    });

    useEffect(() => {
        let active = true;

        const loadUser = async () => {
            try {
                const response = await fetch(getAuthGateMeUrl(), {
                    credentials: "include",
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("No active AuthGate session");
                }

                const payload = await response.json();
                const user = normalizeAuthGateUser(payload);

                if (active) {
                    setState({loading: false, user});
                }
            } catch {
                if (active) {
                    setState({loading: false, user: null});
                }
            }
        };

        void loadUser();

        return () => {
            active = false;
        };
    }, []);

    return state;
}
