/* eslint-disable @next/next/no-img-element */
import { FcInspection, } from "react-icons/fc"

export default function TopEmployee() {
    return (
        <>
            <h1 className="my-5 text-2xl font-extralight">Top Employee</h1>
            <div className="grid grid-cols-12 gap-5">
                {/* Top Employee */}
                <div className="bg-white xl:col-span-4 lg:col-span-6 col-span-6 rounded-xl p-3 flex gap-5 items-center">
                    <img src="/img/ade.png" width="50" alt="" />
                    <div className="w-full">
                        <h1 className="text-sm md:text-sm font-extralight">Ade Novan Guliano</h1>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400 text-sm">Most Project</p>
                            <div className="bg-green-100 md:flex items-center p-2 rounded-xl">
                                <p className="text-xs">25</p>
                                <FcInspection size={15} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white xl:col-span-4 lg:col-span-6 col-span-6 rounded-xl p-3 flex gap-5 items-center">
                    <img src="/img/ade.png" width="50" alt="" />
                    <div className="w-full">
                        <h1 className="text-sm md:text-sm font-extralight">Ade Novan Guliano</h1>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400 text-sm">Most Project</p>
                            <div className="bg-green-100 md:flex items-center p-2 rounded-xl">
                                <p className="text-xs">25</p>
                                <FcInspection size={15} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}