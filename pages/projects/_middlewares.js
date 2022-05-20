import { NextResponse } from "next/server"

export default function middleware(req) {
    const token = req.cookies.token
    const url = req.nextUrl.pathname

    if (!token && url == '/projects/[slug]') {
        return NextResponse.redirect('/')
    }

}