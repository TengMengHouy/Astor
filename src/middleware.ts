// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
    const protectedPaths = [ "/cart", "/checkout"]; // protect these

    const pathname = request.nextUrl.pathname;

    if (
        protectedPaths.some((path) => pathname.startsWith(path)) &&
        !token
    ) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/product/:path*", "/cart/:path*", "/checkout/:path*"],
};
