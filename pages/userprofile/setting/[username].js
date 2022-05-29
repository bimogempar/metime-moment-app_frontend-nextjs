import React from 'react'
import nookies from "nookies"
import { useFormik } from 'formik';
import Layout from '../../../components/Layout'
import Image from 'next/image'
import UserPlaceholder from "../../../public/img/userplaceholder.png";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Username({ data }) {
    const [authUser, setAuthUser] = React.useState(data.authUser)
    const [updatePassword, setUpdatePassword] = React.useState(true)

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
            old_password: '',
            new_password: '',
        },
        onSubmit: values => {
            axios.patch(`${process.env.NEXT_PUBLIC_URL}/api/user/${authUser.username}/updateprofile`, values, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then(res => {
                    if (res.data.error) {
                        console.log(res.data.error)
                        formikUpdateUser.setFieldValue('name', authUser.name)
                        formikUpdateUser.setFieldValue('username', authUser.username)
                        formikUpdateUser.setFieldValue('email', authUser.email)
                        formikUpdateUser.setFieldValue('no_hp', authUser.no_hp)
                        formikUpdateUser.setFieldValue('old_password', '')
                        formikUpdateUser.setFieldValue('new_password', '')
                        toast.error(res.data.error)
                        return
                    }
                    setAuthUser(res.data.user)
                    formikUpdateUser.setFieldValue('old_password', '')
                    formikUpdateUser.setFieldValue('new_password', '')
                    toast.success('Update User Successfully')
                })
        }
    })

    return (
        <Layout title={'Setting Profile'}>
            <Toaster />
            <h1 className="mb-5 text-2xl font-extralight">Employee</h1>
            <div className="grid grid-cols-2 gap-5">
                <div className="rounded-xl bg-white col-span-2 md:col-span-1 justify-center">

                    <div className="flex p-5 justify-center">
                        {authUser.img ? <Image onMouseOver={() => console.log('this image')} className="rounded-full" src={process.env.NEXT_PUBLIC_URL + '/' + authUser.img} alt="User Metime Moment" width={100} height={100} /> : <Image onMouseOver={() => console.log('this image')} className="rounded-full" src={UserPlaceholder} alt="User Metime Moment" width={100} height={100} />}
                    </div>

                    <form className='p-5 w-full md:w-full' onSubmit={formikUpdateUser.handleSubmit}>
                        <div>
                            <label className="block text-sm text-gray-600  my-2" htmlFor="name">Name</label>
                            <input type="text" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="name" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.name} />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600  my-2" htmlFor="username">Username</label>
                            <input type="text" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="username" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.username} />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600  my-2" htmlFor="email">Email</label>
                            <input type="email" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="email" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.email} />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600  my-2" htmlFor="no_hp">Nomor Telephone</label>
                            <input type="text" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="no_hp" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.no_hp} />
                        </div>
                        {
                            updatePassword ? <div className='my-3'>
                                <button type='button' className='text-sm bg-gray-200 p-2 rounded-lg text-gray-600' onClick={() => setUpdatePassword(false)}>Change password ?</button>
                            </div> :
                                <div>
                                    <button type='button' className='text-sm bg-gray-200 mt-2 p-2 rounded-lg text-gray-600' onClick={() => setUpdatePassword(true)}>Cancel</button>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="old_password">Old Password</label>
                                        <input type="password" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" id="old_password" placeholder="Old Password" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.old_password} />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="new_password">New Password</label>
                                        <input type="password" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" id="new_password" placeholder="New Password" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.new_password} />
                                    </div>
                                </div>
                        }
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