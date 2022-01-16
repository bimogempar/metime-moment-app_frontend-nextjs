import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [field, setField] = useState({})

    function setValue(e) {
        // console.log(e.target.value)
        const target = e.target;
        const name = target.name;
        const value = target.value;

        console.log({ name, value })

        setField({
            ...field,
            [name]: value
        })
    }

    async function doLogin(e) {
        e.preventDefault()

        const BACKEND_LARAVEL = 'http://127.0.0.1:8000'
        const req = await fetch(`${BACKEND_LARAVEL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(field)
        })
        const res = await req.json()
        if (res) {
            console.log(res.access_token)
        }
    }

    return (
        <div>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <h1 className="font-bold text-center text-2xl mb-5">Login</h1>
                    <form onSubmit={doLogin}>
                        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                            <div className="px-5 py-7">
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                                <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name="email" onChange={setValue} />
                                <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                                <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" name="password" onChange={setValue} />
                                <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                                    <span className="inline-block mr-2">Login</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    <span className="inline-block ml-1">Back</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
