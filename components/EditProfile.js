import React, { useContext, useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik';
import { UserContext } from './context/userContext'
import nookies from "nookies"
import Layout from './Layout'
import toast, { Toaster } from 'react-hot-toast'
import Image from 'next/image'
import axios from 'axios';
import * as Yup from 'yup'
import UserPlaceholder from "../public/img/userplaceholder.png";
import { BiLoader } from 'react-icons/bi';


export default function EditProfile(props) {
    const [authUser, setAuthUser] = useState(props.data.authUser);
    const [updatePassword, setUpdatePassword] = useState(true);
    const [avatar, setAvatar] = useState(process.env.NEXT_PUBLIC_URL + '/storage/img_user/' + authUser.img);
    const userCtx = useContext(UserContext);

    const updateUserCtx = (user) => {
        userCtx.setUser(user);
    }

    const cookies = nookies.get()
    const token = cookies.token

    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

    const formikUpdateUser = useFormik({
        initialValues: {
            name: authUser.name,
            username: authUser.username,
            email: authUser.email,
            no_hp: authUser.no_hp,
            img: '',
            role: authUser.role,
            old_password: '',
            new_password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Name must be at least 3 characters')
                .max(40, 'Name must be less than 40 characters'),
            username: Yup.string()
                .min(3, 'Username must be at least 3 characters')
                .max(20, 'Username must be less than 20 characters'),
            email: Yup.string()
                .email('Invalid email address'),
            no_hp: Yup.string()
                .max(13, 'Username must be less than 13 characters'),
            new_password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(/[0-9]/, 'Password must contain at least one number'),
            img: Yup.mixed()
                .nullable()
                .notRequired()
                .test('fileSize', 'File too large', value => {
                    if (value && value.size > 5000000) {
                        return false;
                    }
                    return true;
                })
                .test('fileFormat', 'Unsupported Format', value => {
                    if (value) {
                        const format = value.type;
                        if (!SUPPORTED_FORMATS.includes(format)) {
                            return false;
                        }
                        return true;
                    }
                    return true;
                }),
        }),
        onSubmit: values => {
            const img = values.img
            const formData = new FormData()
            formData.append('img', img)
            formData.append('name', values.name)
            formData.append('username', values.username)
            formData.append('email', values.email)
            formData.append('no_hp', values.no_hp)

            if (updatePassword == false) {
                if (values.old_password != '') {
                    formData.append('old_password', values.old_password)
                }
                if (values.new_password != '') {
                    formData.append('new_password', values.new_password)
                }
            }

            axios.post(`${process.env.NEXT_PUBLIC_URL}/api/user/${authUser.username}/updateprofile`, formData, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then(res => {
                    // console.log(res)
                    // return
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
                    updateUserCtx(res.data.user)
                    imageRef.current.value = null
                    formikUpdateUser.setFieldValue('img', '')
                    formikUpdateUser.setFieldValue('old_password', '')
                    formikUpdateUser.setFieldValue('new_password', '')
                    formikUpdateUser.resetForm({ authUser })
                    toast.success('Update User Successfully')
                })
        }
    })

    const imageRef = useRef()
    const handleChangeAvatar = (e) => {
        const file = e.target.files[0]
        if (file) {
            setAvatar(URL.createObjectURL(file))
            setAuthUser({ ...authUser, img: file })
            formikUpdateUser.setFieldValue('img', file)
        }
    }

    return (
        <div>
            <Toaster />
            <h1 className="mb-5 text-2xl font-extralight">Setting Profile</h1>
            <div className="grid grid-cols-2 gap-5">
                <div className="rounded-xl bg-white col-span-2 md:col-span-1 justify-center">

                    <div className="flex p-5 justify-center">
                        <Image className="rounded-full" src={authUser.img ? avatar : UserPlaceholder} alt="User Metime Moment" width={100} height={100} />
                    </div>

                    <div className="flex m-5 justify-center">
                        <input
                            type="file"
                            className="text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100
                                "
                            ref={imageRef}
                            onChange={e => { handleChangeAvatar(e) }}
                        />
                    </div>
                    <div className="flex justify-center">
                        {formikUpdateUser.errors.img ? <label className="block text-sm text-red-600">{formikUpdateUser.errors.img}</label> : null}
                    </div>

                    <form className='p-5 w-full md:w-full' onSubmit={formikUpdateUser.handleSubmit}>
                        <div>
                            <label className="block text-sm text-gray-600  my-2" htmlFor="name">Name</label>
                            <input type="text" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="name" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.name} />
                            {formikUpdateUser.errors.name ? <label className="block text-sm text-red-600 my-2">{formikUpdateUser.errors.name}</label> : null}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600  my-2" htmlFor="username">Username</label>
                            <input type="text" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="username" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.username} />
                            {formikUpdateUser.errors.username ? <label className="block text-sm text-red-600 my-2">{formikUpdateUser.errors.username}</label> : null}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600  my-2" htmlFor="email">Email</label>
                            <input type="email" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="email" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.email} />
                            {formikUpdateUser.errors.email ? <label className="block text-sm text-red-600 my-2">{formikUpdateUser.errors.email}</label> : null}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600  my-2" htmlFor="no_hp">Nomor Telephone</label>
                            <input type="text" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="no_hp" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.no_hp} />
                            {formikUpdateUser.errors.no_hp ? <label className="block text-sm text-red-600 my-2">{formikUpdateUser.errors.no_hp}</label> : null}
                        </div>
                        {
                            updatePassword ? <div className='my-3'>
                                <button type='button' className='text-sm bg-gray-200 hover:bg-gray-300 p-2 rounded-lg text-gray-600' onClick={() => setUpdatePassword(false)}>Change password ?</button>
                            </div> :
                                <div>
                                    <button type='button' className='text-sm bg-gray-200 hover:bg-gray-300 mt-2 p-2 rounded-lg text-gray-600' onClick={() => setUpdatePassword(true)}>Cancel</button>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="old_password">Old Password</label>
                                        <input type="password" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" id="old_password" placeholder="Old Password" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.old_password} />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold my-2" htmlFor="new_password">New Password</label>
                                        <input type="password" className="border rounded-lg px-3 py-2 mt-1 text-sm w-full" id="new_password" placeholder="New Password" onChange={formikUpdateUser.handleChange} value={formikUpdateUser.values.new_password} />
                                        {formikUpdateUser.errors.new_password ? <label className="block text-sm text-red-600 my-2">{formikUpdateUser.errors.new_password}</label> : null}
                                    </div>
                                </div>
                        }
                        <div className='mt-4 flex justify-end'>
                            <button type="submit" className={!(formikUpdateUser.dirty && formikUpdateUser.isValid) ? `text-white bg-blue-300 p-2 rounded-lg` : `text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-lg`} disabled={!(formikUpdateUser.dirty && formikUpdateUser.isValid)}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
