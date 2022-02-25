import { NextResponse } from "next/server"

export function middleware(req) {
    const token = req.cookies.token
    const url = req.url

    if (!token && url == `${url}/`) {
        return NextResponse.redirect('/login')
    }

    if (token && url == `${url}/login`) {
        return NextResponse.redirect('/')
    }

    if (!token && url == `${url}/register`) {
        return NextResponse.redirect('/login')
    }

    if (!token && url == `${url}/user`) {
        return NextResponse.redirect('/login')
    }
}