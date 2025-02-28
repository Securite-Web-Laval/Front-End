import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    const protectedRoutes = ['/test', '/dashboard', '/add-meal', '/recipes'];

    if (!token && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/test/:path*', '/dashboard/:path*', '/add-meal/:path*', '/recipes/:path*'],
};