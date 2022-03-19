/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useState } from 'react'
import nookies from 'nookies'
import Router from 'next/router'
import axios from 'axios'

export default function Home() {
    const [field, setField] = useState({})
    const [errorResp, setError] = useState('')

    function setValue(e) {
        // console.log(e.target.value)
        const target = e.target;
        const name = target.name;
        const value = target.value;

        // console.log({ name, value })

        setField({
            ...field,
            [name]: value
        })

        setError('')
    }

    // async function doLogin(e) {
    //     e.preventDefault()
    //     const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(field)
    //     })
    //     const res = await req.json()
    //     console.log(res)
    //     if (res.access_token) {
    //         nookies.set(null, 'token', res.access_token)
    //         Router.replace('/')
    //     }
    // }

    async function doLogin(e) {
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/login`, field)
            .then(res => {
                // console.log(res);
                const response = res.data
                const token = response.access_token
                setError(response.error)
                // console.log(response)
                if (token) {
                    nookies.set(null, 'token', token)
                    Router.replace('/')
                }
            })
    }

    return (
        <div className="min-h-screen flex flex-col justify-center">
            <Head>
                <title>Login Page | Metime Moment</title>
                <link rel="icon" href="/img/logo-metime.png"></link>
            </Head>
            <div className="grid grid-cols-1 place-items-center p-10">
                <form onSubmit={doLogin}>
                    <div className="bg-white rounded-xl">
                        <div className="px-5 py-7">
                            <h1 className="font-light text-center text-xl mb-5">Metime Moment</h1>
                            <label className="font-light text-sm text-gray-600 pb-1 block">Username</label>
                            <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name="username" onChange={setValue} />
                            <label className="font-light text-sm text-gray-600 pb-1 block">Password</label>
                            <input autoComplete="on" type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name="password" onChange={setValue} />
                            {errorResp && <p className="text-red-500 text-sm mb-5">{errorResp}</p>}
                            <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                <span className="inline-block mr-2">Login</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
