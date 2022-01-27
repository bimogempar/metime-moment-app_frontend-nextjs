import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import nookies from 'nookies'
import { UserContext } from "../pages/context/userContext";

export default function Layout(props) {
    const [user, setUser] = useState([])

    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = async () => {
        const cookies = nookies.get()
        const token = cookies.token
        const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        const data = await req.json()
        setUser(data)
    }

    const userContext = {
        user
    }

    return (
        <UserContext.Provider value={userContext}>
            <div className="grid grid-cols-1 place-items-start">
                <Head>
                    <title>{props.title} | Metime Moment</title>
                    <link rel="icon" href="/img/logo-metime.png"></link>
                </Head>
                <div className="grid grid-cols-12 gap-10 p-10 lg:p-20 lg:pt-10">
                    <div className="col-span-3 rounded-xl h-min sticky top-10">
                        <Sidebar />
                    </div>
                    <div className="rounded-xl col-span-12 lg:col-span-9">
                        {props.children}
                    </div>
                </div>
            </div>
        </UserContext.Provider >
    )
}