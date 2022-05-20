import { NextResponse } from "next/server"

export default function middleware(req) {
    const token = req.cookies.token
    console.log(token)
    const url = req.nextUrl.pathname

    if (!token && url == '/') {
        return NextResponse.redirect('/login')
    }

    if (token && url == '/login') {
        return NextResponse.redirect('/')
    }

    if (!token && url == '/logout') {
        return NextResponse.redirect('/login')
    }

    if (!token && url == '/userprofile') {
        return NextResponse.redirect('/login')
    }

    if (!token && url == '/projects') {
        return NextResponse.redirect('/login')
    }

}