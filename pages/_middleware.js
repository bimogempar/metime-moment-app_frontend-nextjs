import { NextResponse } from "next/server"

export function middleware(req) {
    const token = req.cookies.token
    const url = req.url
    console.log("ini url:" + url)
    console.log("ini token:" + token)
    console.log("ini req nexturl pathname" + req.nextUrl.pathname)

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