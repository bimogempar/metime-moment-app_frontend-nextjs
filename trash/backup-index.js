/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import AuthUser from '../components/authuser'
import { UserProvider } from '../pages/context/user'
import Navbar from '../components/navbar'
import Image from 'next/image'
import { FcSettings, FcExport, FcHome, FcTimeline, FcInspection } from "react-icons/fc";
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <div className="min-h-screen bg-gray-200 p-20">

                <div className="flex gap-10 lg:justify-start md:justify-center">
                    <div className="bg-white sticky top-10 rounded-2xl xl:w-3/12 lg:w-4/12 md:w-5/12 hidden lg:block h-full p-10">
                        <div className="flex justify-center resize mb-5">
                            <Image src="/img/ade.png" className="rounded-full" width="200" height="200" alt=""></Image>
                        </div>
                        <div className="text-center">
                            <h1 className="text-3xl mb-3 font-light">Ade Novan Guliano</h1>
                            <h1 className="text-xl text-gray-500 mb-1 font-light">novanguliano</h1>
                            <h3 className="text-xl text-gray-500 mb-1 font-light">081898475675</h3>
                            <h1 className="text-xl text-gray-500 mb-10 font-light">novanguliano@example.com</h1>
                            <a className="bg-yellow-200 px-5 py-3 w-full text-center md:w-auto rounded-lg text-yellow-600 text-xs tracking-wider font-semibold uppercase">
                                Employee
                            </a>
                        </div>
                        <div className="mt-10 flex justify-center">
                            <div className="flex justify-left">
                                <ul>
                                    <li className="mt-2">
                                        <Link href="/test/test1">
                                            <a className="flex items-center gap-4 p-4 w-full text-center md:w-auto rounded-full text-medium tracking-wider text-white bg-sky-800 ">
                                                <FcHome /> Home
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/test/test1">
                                            <a className="flex items-center gap-4 p-4 w-full text-center md:w-auto rounded-full text-lg tracking-wider text-sky-900 hover:bg-sky-800 hover:text-white">
                                                <FcTimeline /> List Project
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/test/test1">
                                            <a className="flex items-center gap-4 p-4 w-full text-center md:w-auto rounded-full text-lg tracking-wider text-sky-900 hover:bg-sky-800 hover:text-white">
                                                <FcInspection /> Favorite Project
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="/test/test1">
                                            <a className="flex items-center gap-4 p-4 w-full text-center md:w-auto rounded-full text-lg tracking-wider text-sky-900 hover:bg-sky-800 hover:text-white">
                                                <FcHome /> My Profile
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-10 flex items-center justify-between">
                            <Link href="/test/test1">
                                <button className="text-2xl hover:scale-150 transition ease-in-out">
                                    <FcSettings />
                                </button>
                            </Link>
                            <Link href="/test/test1">
                                <button className="flex items-center bg-gray-100 p-2 rounded-xl hover:scale-110 transition ease-in-out">
                                    <button className="text-2xl">
                                        <FcExport />
                                    </button>
                                    <p className="mx-2">Logout</p>
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="rounded-2xl ">
                            <div className="bg-white rounded-2xl p-5 flex justify-between">
                                <div>
                                    <h1 className="text-4xl font-extralight mb-5">Good night, novanvguliano!</h1>
                                    <p className="text-lg text-gray-500 font-extralight">Udah sampe mana ya bosku garapannya?</p>
                                    <p className="text-lg text-gray-500 font-extralight">Yuk bisa yuk!</p>
                                </div>
                                <img src="/img/headline.png" className="rounded-full -mb-6" alt=""></img>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}
