import Head from 'next/head'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import Image from "next/image"
import LogoMetimeMoment from "../../public/img/logo-metime.png"
import axios from 'axios'
import * as Yup from 'yup'
import Router from 'next/router'
import { Toaster, toast } from 'react-hot-toast'

export default function Testing({ response, token_initial_password }) {

    const formik = useFormik({
        initialValues: {
            email: response.user.email,
            token_initial_password: token_initial_password,
            password: '',
        },
        // validation schema
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .required('Required'),
        }),
        // onsubmit form
        onSubmit: values => {
            // console.log(values)
            const toastId = toast.loading('Loading...')
            axios.post(`${process.env.NEXT_PUBLIC_URL}/api/set-pass`, values)
                .then(res => {
                    formik.setSubmitting(true)
                    toast.dismiss(toastId)
                    toast.success('Set Password Successfully')
                    setTimeout(() => {
                        Router.push('/login')
                    }, 1000)
                })
                .catch(err => {
                    // console.log(err)
                })
        },
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
                            <h4 className="mb-3">Set your password first!</h4>
                            <label htmlFor="email"></label>
                            <input className="border rounded-lg px-3 py-2 text-gray-600 text-sm w-full" type="email" id="email" defaultValue={response.user.email} disabled={true} />
                        </div>
                        <div className="my-2">
                            <label htmlFor="password"></label>
                            <input className="border rounded-lg px-3 py-2 text-gray-600 text-sm w-full" type="password" id="password" placeholder="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                        </div>
                        <div className="my-2">
                            {formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
                        </div>
                        <div className="flex justify-end">
                            <button className="p-2 my-2 text-white bg-sky-600 rounded-xl" type="submit" disabled={formik.isSubmitting}>Set password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    // console.log(context.query.token_reset_pass)
    const token_initial_password = context.query.token_reset_pass

    const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/set-pass/${token_initial_password}`, {
        method: 'GET'
    })
    const response = await req.json()
    // console.log(response)

    if (response.error) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        }
    }

    if (response.token.status === 1) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        }
    }

    return {
        props: {
            response,
            token_initial_password
        }
    }
}
