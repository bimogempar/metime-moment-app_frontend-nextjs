import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import LogoMetimeMoment from "../public/img/logo-metime.png"
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Router from 'next/router'

export default function ForgotPassword() {
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
        }),
        onSubmit: values => {
            // console.log(values)
            const toastId = toast.loading('Loading...')
            axios.post(`${process.env.NEXT_PUBLIC_URL}/api/forgot-pass`, values)
                .then(res => {
                    // console.log(res)
                    if (res.data.error) {
                        toast.dismiss(toastId)
                        toast.error(res.data.error)
                    } else {
                        formik.setSubmitting(true)
                        toast.dismiss(toastId)
                        toast.success('Reset password sent')
                        setTimeout(() => {
                            Router.push('/login')
                        }, 1000)
                    }
                })
                .catch(err => {
                    // console.log(err)
                })
        }
    })

    return (
        <div className="flex h-screen">
            <Head>
                <title>Set Init Password | Metime Moment</title>
                <link rel="icon" href="/img/logo-metime.png"></link>
            </Head>
            <div className="m-auto">
                <div className="grid grid-cols-1 justify-items-center bg-white p-3 rounded-xl">
                    <div>
                        <Image src={LogoMetimeMoment} alt="Logo Metime Moment" />
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="my-2">
                            <h4 className="mb-3">Forgot Password</h4>
                            <label htmlFor="email"></label>
                            <input className="border rounded-lg px-3 py-2 text-gray-600 text-sm w-full" type="email" id="email" placeholder="Email" value={formik.values.email} onChange={formik.handleChange} />
                        </div>
                        <div className="my-2">
                            {formik.errors.email ? <div className="text-red-500">{formik.errors.email}</div> : null}
                        </div>
                        <button className="p-2 my-2 text-white bg-sky-600 rounded-xl" type="submit">Send</button>
                    </form>
                </div>
            </div>
            <Toaster />
        </div >
    )
}
