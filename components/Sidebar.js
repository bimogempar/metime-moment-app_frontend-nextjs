import { useContext } from "react";
import { UserContext } from "../components/context/userContext";
import NavLink from "./NavLink";
import LogoMetimeMoment from "../public/img/logo-metime.png";
import ProfilUser from "../public/img/ade.png";
import Image from "next/image";

export default function Sidebar() {
    const userContext = useContext(UserContext)
    return (
        <div className="bg-white rounded-xl col-span-3 lg:block hidden p-5 h-min">
            <div className="flex justify-center">
                <Image src={LogoMetimeMoment} alt="Logo Metime Moment" />
            </div>
            <div className="flex justify-center mt-2">
                <Image src={ProfilUser} alt="Logo Metime Moment" />
            </div>
            <div className="text-center">
                <h1 className="text-xl mt-4 font-light break-word">{userContext.user.name}</h1>
                <h1 className="text-md text-gray-500 mb-1 font-light break-all">{userContext.user.username}</h1>
                <h3 className="text-md text-gray-500 mb-1 font-light break-all">081898475675</h3>
                <h1 className="text-md text-gray-500 mb-5 font-light break-all">{userContext.user.email}</h1>
                <a className="bg-yellow-200 px-5 py-3 w-full text-center lg:w-auto rounded-lg text-yellow-600 text-xs tracking-wider font-semibold uppercase">
                    {userContext.user.role == 2 && "Admin" || userContext.user.role == 1 && "Employee"}
                </a>
                <NavLink />
            </div>
        </div>
    )
}