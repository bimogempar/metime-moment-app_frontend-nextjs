import Image from "next/image";
import { FcInspection, } from "react-icons/fc"
import UserPlaceHolder from "../public/img/userplaceholder.png";

export default function TopEmployee() {
    return (
        <div className="mb-5">
            <h1 className="mb-5 text-2xl font-extralight">Top Employee</h1>
            <div className="grid grid-cols-12 gap-5">
                <div className="bg-white xl:col-span-4 lg:col-span-6 col-span-6 rounded-xl p-3 flex gap-5 items-center">
                    <Image src={UserPlaceHolder} alt="User Metime Moment" className="rounded-full" width={50} height={50} />
                    <div className="w-full">
                        <h1 className="text-sm md:text-sm font-extralight">Ade Novan Guliano</h1>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-400 text-xs md:text-sm">Most Project</p>
                            <div className="bg-green-200 text-green-800 font-medium md:flex items-center p-2 rounded-xl">
                                <p className="text-xs">25</p>
                                <FcInspection size={15} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}