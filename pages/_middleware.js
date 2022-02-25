import { NextResponse } from "next/server"

export function middleware(req) {
    const token = req.cookies.token
    const url = req.url

    if (!token && url == 'https://metime-moment-app-frontend-nextjs.vercel.app/') {
        return NextResponse.redirect('/login')
    }

    if (token && url == 'https://metime-moment-app-frontend-nextjs.vercel.app/login') {
        return NextResponse.redirect('/')
    }

    if (!token && url == 'https://metime-moment-app-frontend-nextjs.vercel.app/register') {
        return NextResponse.redirect('/login')
    }

    if (!token && url == 'https://metime-moment-app-frontend-nextjs.vercel.app/user') {
        return NextResponse.redirect('/login')
    }
}