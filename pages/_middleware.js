import { NextResponse } from "next/server"

export function middleware(req) {
    const token = req.cookies.token
    const url = req.url

    if (!token && url == `${req.nextUrl.pathname}/`) {
        return NextResponse.redirect('/login')
    }

    if (token && url == `${req.nextUrl.pathname}/login`) {
        return NextResponse.redirect('/')
    }

    if (!token && url == `${req.nextUrl.pathname}/register`) {
        return NextResponse.redirect('/login')
    }

    if (!token && url == `${req.nextUrl.pathname}/user`) {
        return NextResponse.redirect('/login')
    }
}