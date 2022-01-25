import { NextResponse } from "next/server"

export function middleware(req) {
    const token = req.cookies.token
    const url = req.url

    // if (!token && url == 'http://localhost:3000/') {
    //     return NextResponse.redirect('/login')
    // }

    if (token && url == 'http://localhost:3000/login') {
        return NextResponse.redirect('/')
    }

    if (!token && url == 'http://localhost:3000/register') {
        return NextResponse.redirect('/login')
    }

    if (!token && url == 'http://localhost:3000/user') {
        return NextResponse.redirect('/login')
    }
}