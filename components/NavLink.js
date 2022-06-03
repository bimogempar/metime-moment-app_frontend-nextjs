import { FcAddImage, FcExport, FcFolder, FcHome, FcInspection, FcSettings, FcTimeline } from "react-icons/fc";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useContext, useState, useRef } from "react";
import { UserContext } from "../components/context/userContext";
import nookies, { destroyCookie } from "nookies";
import axios from 'axios';
import { route } from "next/dist/server/router";
import ModalDialog from "./ModalDialog";

export default function NavLink() {
    const userContext = useContext(UserContext)
    const router = useRouter()
    const token = nookies.get()

    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);

    const doLogout = async () => {
        router.replace('/login')
        destroyCookie(null, 'token')
        await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/logout`, {}, {
            headers: {
                'Authorization': 'Bearer ' + token.token
            }
        })
    }

    const inactive = "flex items-center gap-4 p-2 w-full text-center lg:w-auto rounded-full text-sm font-medium tracking-wider hover:bg-blue-200 hover:text-blue-800 transition ease-in-out duration-150"
    const active = "flex items-center gap-4 p-2 w-full text-center lg:w-auto rounded-full text-sm font-medium tracking-wider hover:text-blue-800 bg-blue-200 text-blue-800 transition ease-in-out duration-150"

    return (
        <div>
            <div className="mt-5 flex justify-center">
                <div className="flex justify-left">
                    <ul>
                        <li className="mt-2">
                            <Link href="/">
                                <a className={router.pathname == "/" ? active : inactive}>
                                    <FcHome /> Home
                                </a>
                            </Link>
                        </li>
                        <li className="mt-2">
                            <Link href="/projects">
                                <a className={router.pathname == "/projects" || router.pathname == "/projects/[slug]" ? active : inactive}>
                                    <FcTimeline /> Project
                                </a>
                            </Link>
                        </li>
                        {/* <li className="mt-2">
                            <Link href="/fav-projects">
                                <a className={router.pathname == "/fav-projects" ? active : inactive}>
                                    <FcFolder /> Favorite
                                </a>
                            </Link>
                        </li> */}
                        <li className="mt-2">
                            <Link href={"/userprofile/" + userContext.user.username}>
                                <a className={router.pathname == "/userprofile/[username]" || router.pathname == "/userprofile/setting/[username]" ? active : inactive}>
                                    <FcHome /> Profile
                                </a>
                            </Link>
                        </li>
                        {userContext.user.role == 2 || userContext.user.role == 3 ?
                            <li className="mt-2">
                                <Link href="/employee">
                                    <a className={router.pathname == "/employee" ? active : inactive}>
                                        <FcAddImage /> HR
                                    </a>
                                </Link>
                            </li>
                            : null
                        }
                    </ul>
                </div>
            </div>
            {/* setting and logout */}
            <div className="mt-10 -mb-2 flex items-center justify-between">
                <Link href={'/userprofile/setting/' + userContext.user.username} passHref>
                    <a className="text-2xl">
                        <FcSettings />
                    </a>
                </Link>
                <button onClick={() => { setIsOpen(true) }} className="flex items-center hover:bg-blue-200 hover:text-blue-800 transition ease-in-out duration-200 p-2 rounded-xl">
                    <a className="text-2xl">
                        <FcExport />
                    </a>
                    <p className="mx-2">Logout</p>
                </button>
            </div>
            <ModalDialog setIsOpen={setIsOpen} isOpen={isOpen} buttonRef={buttonRef} doLogout={doLogout} description="Are u sure to logout ?" />
        </div >
    )
}