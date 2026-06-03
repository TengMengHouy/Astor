export function getBackendBaseUrl() {
    const baseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
        throw new Error("API_URL is not configured");
    }

    return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}

export function getBackendUrl(path: string[], search = "") {
    const url = new URL(path.join("/"), getBackendBaseUrl());
    url.search = search;

    return url;
}
