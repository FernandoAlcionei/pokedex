import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const publicRoutes = ['/']

export default async function middleware(req: NextRequest) {
    const cookie = cookies().get('authorization')?.value
    const path = req.nextUrl.pathname

    if (cookie || publicRoutes.includes(path)) {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/', req.nextUrl))
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}