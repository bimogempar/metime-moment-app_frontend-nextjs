import React from 'react'
import nookies from "nookies"
import { useFormik } from 'formik';
import Layout from '../../../components/Layout'
import Image from 'next/image'
import UserPlaceholder from "../../../public/img/userplaceholder.png";
import axios from 'axios';

export default function Username({ data }) {
    const [authUser, setAuthUser] = React.useState(data.authUser)

    const cookies = nookies.get()
    const token = cookies.token

    const formikUpdateUser = useFormik({
        initialValues: {
            name: authUser.name,
            username: authUser.username,
            email: authUser.email,
            no_hp: authUser.no_hp,
            img: authUser.img,
            role: authUser.role,
        },
        onSubmit: values => {
            axios.patch(`${process.env.NEXT_PUBLIC_URL}/api/user/${authUser.username}/updateprofile`, values, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }).
                then(res => {
                    // console.log(res.data.user)
                    setAuthUser(res.data.user)
                })
        }
    })

    return (
        <Layout title={'Setting Profile'}>
            <h1 className="mb-5 text-2xl font-extralight">Employee</h1>
            <div className="grid grid-cols-2 gap-5">
                <div className="rounded-xl bg-white col-span-2 md:col-span-1 justify-center">
                    <div className="flex p-5 justify-center">
                        {authUser.img ? <Image className="rounded-full" src={process.env.NEXT_PUBLIC_URL + '/' + authUser.img} alt="User Metime Moment" width={100} height={100} /> : <Image className="rounded-full" src={UserPlaceholder} alt="User Metime Moment" width={100} height={100} />}
                    </div>
                    <form className='p-5 w-full md:w-full' onSubmit={formikUpdateUser.handleSubmit}>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="name">Name</label>
                            <input type="text" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" id="name" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.name} />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="username">Username</label>
                            <input type="text" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" id="username" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.username} />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="email">Email</label>
                            <input type="email" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" id="email" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.email} />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="no_hp">Nomor Telephone</label>
                            <input type="text" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" id="no_hp" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.no_hp} />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="old_password">Old Password</label>
                            <input type="password" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" id="old_password" placeholder="Old Password" />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="new_password">New Password</label>
                            <input type="password" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" id="new_password" placeholder="New Password" />
                        </div>
                        <div className='mt-4 flex justify-end'>
                            <button type="submit" className='text-white bg-blue-500 p-2 rounded-lg'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx)
    const token = cookies.token

    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

    const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${ctx.query.username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    const data = await req.json()

    if (data.error || data.user.username !== data.authUser.username) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        }
    }

    return {
        props: { data }
    }
}