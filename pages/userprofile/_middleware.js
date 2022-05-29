import { NextResponse } from "next/server"

export default function middleware(req) {
    const token = req.cookies.token
    const urlPathname = req.nextUrl.pathname
    const url = req.nextUrl.origin

    if (!token && urlPathname == '/userprofile/[username]') {
        return NextResponse.redirect(`${url}`)
    }

}