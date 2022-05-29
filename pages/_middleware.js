import { NextResponse } from "next/server"

export default function middleware(req) {
    const token = req.cookies.token
    const urlPathname = req.nextUrl.pathname
    const url = req.nextUrl.origin

    if (!token && urlPathname == '/') {
        return NextResponse.redirect(`${url}/login`)
    }

    if (token && urlPathname == '/login') {
        return NextResponse.redirect(`${url}`)
    }

    if (!token && urlPathname == '/logout') {
        return NextResponse.redirect(`${url}/login`)
    }

    if (!token && urlPathname == '/userprofile') {
        return NextResponse.redirect(`${url}/login`)
    }

    if (!token && urlPathname == '/projects') {
        return NextResponse.redirect(`${url}/login`)
    }

}