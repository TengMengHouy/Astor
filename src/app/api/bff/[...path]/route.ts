import {NextRequest, NextResponse} from "next/server";
import {getBackendUrl} from "@/lib/backend";
import {createMockProduct, getMockProduct, getMockProducts} from "@/lib/mock-products";

type BffRouteContext = {
    params: Promise<{ path?: string[] }>;
};

const authPaths = new Set(["users/login", "users/create"]);

function getCookieOptions() {
    return {
        httpOnly: true,
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    };
}

function buildForwardHeaders(request: NextRequest) {
    const headers = new Headers();
    const contentType = request.headers.get("content-type");
    const token = request.cookies.get("token")?.value;

    headers.set("accept", "application/json");

    if (contentType) {
        headers.set("content-type", contentType);
    }

    if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("cookie", `token=${encodeURIComponent(token)}`);
    }

    return headers;
}

function getMockProductResponse(path: string[], method: string, body?: string) {
    const [resource, idOrAction] = path;

    if (resource !== "product") {
        return null;
    }

    if (method === "GET" && !idOrAction) {
        return NextResponse.json(getMockProducts());
    }

    if (method === "GET" && idOrAction) {
        const product = getMockProduct(idOrAction);

        return product
            ? NextResponse.json(product)
            : NextResponse.json({message: "Product not found"}, {status: 404});
    }

    if (method === "POST" && idOrAction === "create") {
        let payload = {};

        if (body) {
            try {
                payload = JSON.parse(body);
            } catch {
                return NextResponse.json({message: "Invalid JSON body"}, {status: 400});
            }
        }

        const product = createMockProduct(payload);

        return NextResponse.json(product, {status: 201});
    }

    return null;
}

async function proxy(request: NextRequest, context: BffRouteContext) {
    const {path = []} = await context.params;
    const hasBody = !["GET", "HEAD"].includes(request.method);
    const requestBody = hasBody ? await request.text() : undefined;
    let backendResponse: Response;

    try {
        backendResponse = await fetch(getBackendUrl(path, request.nextUrl.search), {
            method: request.method,
            headers: buildForwardHeaders(request),
            body: requestBody,
        });
    } catch (error) {
        if (error instanceof Error && error.message === "API_URL is not configured") {
            const mockResponse = getMockProductResponse(path, request.method, requestBody);

            if (mockResponse) {
                return mockResponse;
            }
        }

        const message = error instanceof Error ? error.message : "Backend request failed";

        return NextResponse.json({message}, {status: 502});
    }

    const contentType = backendResponse.headers.get("content-type") ?? "application/json";
    const responseText = await backendResponse.text();
    const routePath = path.join("/");
    let body = responseText;
    let token: string | undefined;

    if (contentType.includes("application/json") && responseText) {
        try {
            const data = JSON.parse(responseText);

            if (authPaths.has(routePath) && typeof data?.token === "string") {
                token = data.token;
                const {token: _token, ...safeData} = data;
                body = JSON.stringify(safeData);
            }
        } catch {
            body = responseText;
        }
    }

    const response = new NextResponse(body, {
        status: backendResponse.status,
        headers: {
            "content-type": contentType,
        },
    });

    if (token) {
        response.cookies.set("token", token, getCookieOptions());
    }

    return response;
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
