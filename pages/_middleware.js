import { NextResponse } from "next/server"

export default function middleware(req) {
    const token = req.cookies.token
    const url = req.nextUrl.pathname

    console.log(url)

    if (!token && url == '/') {
        return NextResponse.redirect('/login')
    }

    if (token && url == '/login') {
        return NextResponse.redirect('/')
    }

    if (!token && url == '/logout') {
        return NextResponse.redirect('/login')
    }

    if (!token && url == '/user') {
        return NextResponse.redirect('/login')
    }
}