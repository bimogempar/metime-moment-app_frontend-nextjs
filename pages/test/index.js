import Image from "next/image"
import { FcSettings, FcExport } from "react-icons/fc";

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-300 to-indigo-300 p-5">
            <div className="bg-white rounded-xl p-10 shadow-xl w-full sm:w-6/12 lg:w-6/12 xl:w-4/12 2xl:w-3/12 mb-5">
                <div className="flex justify-center resize mb-5">
                    <Image src="/img/ade.png" className="rounded-full" width="200" height="200" alt=""></Image>
                </div>
                <div className="text-center">
                    <h1 className="text-3xl mb-3">Ade Novan Guliano</h1>
                    <h3 className="text-xl text-gray-500 mb-1">novanguliano</h3>
                    <h3 className="text-xl text-gray-500 mb-1">081898475675</h3>
                    <h3 className="text-xl text-gray-500 mb-10">novanguliano@example.com</h3>
                    <a className="bg-yellow-200 px-5 py-3 w-full text-center md:w-auto rounded-lg text-yellow-600 text-xs tracking-wider font-semibold uppercase">
                        Employee
                    </a>
                </div>
            </div>

            <div className="bg-white rounded-xl p-3 w-6/12 sm:w-4/12 xl:w-2/12 shadow-xl flex justify-between items-center">
                <button className="text-2xl hover:scale-150 transition ease-in-out">
                    <FcSettings />
                </button>
                <button className="flex items-center bg-gray-100 p-2 rounded-xl hover:scale-110 transition ease-in-out">
                    <button className="text-2xl">
                        <FcExport />
                    </button>
                    <p className="mx-2">Logout</p>
                </button>
            </div>
        </div>
    )
}

export default Home