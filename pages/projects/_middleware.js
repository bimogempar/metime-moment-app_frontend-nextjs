import { NextResponse } from "next/server"

export default function middleware(req) {
    const token = req.cookies.token
    const urlPathname = req.nextUrl.pathname
    const url = req.nextUrl.origin

    if (!token && urlPathname == '/projects/[slug]') {
        return NextResponse.redirect(`${url}`)
    }

}