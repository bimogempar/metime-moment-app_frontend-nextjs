import Link from 'next/link';
import { useContext } from 'react'
import { UserContext } from "../pages/context/user";
import nookies from 'nookies'
import Router from 'next/router';
import axios from 'axios';

function Navbar() {
    const { user } = useContext(UserContext)
    const token = nookies.get()
    const doLogout = async () => {
        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/logout`, {}, {
            headers: {
                'Authorization': 'Bearer ' + token.token
            }
        })
        nookies.destroy(null, 'token')
        Router.push('/login')
    }
    return (
        <div>
            <ul>
                <li>
                    <Link href="/">
                        <a type="button">dashboard</a>
                    </Link>
                </li>
                <li>
                    <Link href="/myprofile">
                        <a type="button">profile page</a>
                    </Link>
                </li>
                <li>
                    {
                        user.role == 2 &&
                        <Link href="/register">
                            <a type="button">register</a>
                        </Link>
                    }
                </li>
                <li>
                    <button type="button" onClick={doLogout}>logout</button>
                </li>
            </ul>
        </div >
    )
}
export default Navbar