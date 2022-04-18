import { useContext, useState } from "react";
import { UserContext } from "../components/context/userContext";
import NavLink from "./NavLink";
import LogoMetimeMoment from "../public/img/logo-metime.png";
import UserPlaceholder from "../public/img/userplaceholder.png";
import Image from "next/image";

export default function Sidebar() {
    const userContext = useContext(UserContext);
    return (
        <div className="bg-white rounded-xl col-span-3 lg:block hidden p-5 h-min" >
            <div className="flex justify-center">
                <Image src={LogoMetimeMoment} alt="Logo Metime Moment" />
            </div>
            {userContext.user.username === undefined ?
                <div className="animate-pulse">
                    <div className="flex justify-center">
                        <div className="bg-gray-300 rounded-full w-24 h-24"></div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 place-items-center mt-4">
                        <div className="bg-gray-300 rounded-lg w-4/5 h-8"></div>
                        <div className="bg-gray-300 rounded-lg w-2/3 h-8"></div>
                        <div className="bg-gray-300 rounded-lg w-1/3 h-8"></div>
                        <div className="bg-gray-300 rounded-lg w-2/4 h-8"></div>
                        <div className="bg-gray-300 rounded-lg w-1/3 h-8 mt-4"></div>
                        <div className="bg-gray-300 rounded-lg w-1/3 h-8"></div>
                        <div className="bg-gray-300 rounded-lg w-1/3 h-8"></div>
                        <div className="bg-gray-300 rounded-lg w-1/3 h-8"></div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div className="bg-gray-300 rounded-lg xl:w-24 lg:w-12 h-8 mt-4"></div>
                        <div className="bg-gray-300 rounded-lg xl:w-24 lg:w-12 h-8 mt-4"></div>
                    </div>
                </div>
                :
                <div>
                    <div className="flex justify-center mt-2">
                        {userContext.user.img ? <Image className="rounded-full" src={process.env.NEXT_PUBLIC_URL + '/' + userContext.user.img} alt="User Metime Moment" width={100} height={100} /> : <Image className="rounded-full" src={UserPlaceholder} alt="User Metime Moment" width={100} height={100} />}
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl mt-4 font-light break-word">{userContext.user.name}</h1>
                        <h1 className="text-md text-gray-500 mb-1 font-light break-all">{userContext.user.username}</h1>
                        <h3 className="text-md text-gray-500 mb-1 font-light break-all">{userContext.user.no_hp}</h3>
                        <h1 className="text-md text-gray-500 mb-5 font-light break-all">{userContext.user.email}</h1>
                        <a className="bg-yellow-200 px-5 py-3 w-full text-center lg:w-auto rounded-lg text-yellow-600 text-xs tracking-wider font-semibold uppercase">
                            {userContext.user.role == 2 && "Manager" || userContext.user.role == 1 && "Employee" || userContext.user.role == 3 && "Admin"}
                        </a>
                        <NavLink />
                    </div>
                </div>
            }
        </div>
    )
}