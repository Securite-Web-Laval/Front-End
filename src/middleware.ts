import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    const protectedRoutes = ['/test', '/dashboard', '/add-meal'];

    if (!token && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/test/:path*', '/dashboard/:path*', '/add-meal/:path*'],
};