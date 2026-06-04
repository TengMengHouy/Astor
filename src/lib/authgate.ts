export const authGateOrigin = process.env.NEXT_PUBLIC_AUTHGATE_ORIGIN ?? "https://astor-shop.authgate.site";

export type AuthGateUser = {
    sub?: string;
    name?: string;
    email?: string;
    username?: string;
    preferred_username?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    [key: string]: unknown;
};

function getAuthGateUrl(envUrl: string | undefined, fallbackPath: string) {
    if (envUrl) {
        return envUrl;
    }

    if (typeof window !== "undefined" && window.location.origin === authGateOrigin) {
        return fallbackPath;
    }

    return `${authGateOrigin}${fallbackPath}`;
}

export function getAuthGateLoginUrl() {
    return getAuthGateUrl(process.env.NEXT_PUBLIC_AUTHGATE_LOGIN_URL, "");
}

export function getAuthGateLogoutUrl() {
    return getAuthGateUrl(process.env.NEXT_PUBLIC_AUTHGATE_LOGOUT_URL, "/bff/logout");
}

export function getAuthGateMeUrl() {
    return getAuthGateUrl(process.env.NEXT_PUBLIC_AUTHGATE_ME_URL, "/bff/me");
}

export function isOnAuthGateOrigin() {
    return typeof window !== "undefined" && window.location.origin === authGateOrigin;
}

export function normalizeAuthGateUser(payload: unknown): AuthGateUser | null {
    if (!payload || typeof payload !== "object") {
        return null;
    }

    const record = payload as Record<string, unknown>;
    const nested = record.user ?? record.principal ?? record.claims ?? record.profile;

    if (nested && typeof nested === "object") {
        return nested as AuthGateUser;
    }

    return record as AuthGateUser;
}

export function getAuthGateUserName(user: AuthGateUser | null) {
    if (!user) {
        return "Account";
    }

    const fullName = [user.given_name, user.family_name]
        .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
        .join(" ");

    return user.name ?? fullName ?? user.preferred_username ?? user.username ?? user.email ?? "Account";
}

export function getAuthGateUserEmail(user: AuthGateUser | null) {
    return typeof user?.email === "string" ? user.email : "";
}

export function getAuthGateUserInitials(user: AuthGateUser | null) {
    const name = getAuthGateUserName(user);
    const parts = name.replace(/@.*/, "").split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
        return "A";
    }

    return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
}
