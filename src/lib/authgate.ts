export const authGateOrigin = process.env.NEXT_PUBLIC_AUTHGATE_ORIGIN ?? "https://astor-shop.authgate.site";

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
    return getAuthGateUrl(process.env.NEXT_PUBLIC_AUTHGATE_LOGIN_URL, "/bff/login?return_to=%2F");
}

export function getAuthGateLogoutUrl() {
    return getAuthGateUrl(process.env.NEXT_PUBLIC_AUTHGATE_LOGOUT_URL, "/bff/logout");
}

export function isOnAuthGateOrigin() {
    return typeof window !== "undefined" && window.location.origin === authGateOrigin;
}
