import nookies from 'nookies'
import { useContext } from 'react'
import Navbar from '../components/navbar'
import { UserContext, UserProvider } from './context/user'

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx)
    const token = cookies.token
    if (token) {
        const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        const data = await req.json()
        return {
            props: {
                userData: data
            }
        }
    }

    return {
        redirect: {
            destination: '/login'
        }
    }
}

function user({ userData }) {
    return (
        <div>
            <UserProvider>
                <Navbar />
                <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
                    <div className="card w-96 mx-auto bg-white pb-5 shadow-xl hover:shadow">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" src="https://i.pravatar.cc/" alt="" />
                        <div className="text-center mt-2 text-3xl font-medium">{userData.name}</div>
                        <div className="text-center mt-2 font-light text-sm">{userData.email}</div>
                        <div className="text-center font-normal text-lg">Role : {userData.role}</div>
                    </div>
                </div>
            </UserProvider>
        </div>
    )
}

export default user