import Head from 'next/head'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import Image from "next/image"
import LogoMetimeMoment from "../../public/img/logo-metime.png"
import axios from 'axios'
import * as Yup from 'yup'

export default function Testing({ response, token_initial_password }) {
    const [message, setMessage] = useState('')

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
            setMessage('Loading...')
            axios.post(`${process.env.NEXT_PUBLIC_URL}/api/set-pass`, values)
                .then(res => {
                    const respMessage = res.data.message
                    setMessage(respMessage)
                    formik.setSubmitting(true)
                })
                .catch(err => {
                    // console.log(err)
                })
        },
    })

    return (
        <div className="grid p-5" >
            <Head>
                <title>Set Init Password | Metime Moment</title>
                <link rel="icon" href="/img/logo-metime.png"></link>
            </Head>
            <div>
                <Image src={LogoMetimeMoment} alt="Logo Metime Moment" />
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="my-2">
                    <h4 className="mb-3">Set your password first!</h4>
                    <label htmlFor="email"></label>
                    <input className="bg-white p-2 rounded-xl" type="email" id="email" defaultValue={response.user.email} disabled={true} />
                </div>
                <div className="my-2">
                    <label htmlFor="password"></label>
                    <input className="bg-white p-2 rounded-xl" type="password" id="password" placeholder="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                </div>
                <div className="my-2">
                    {formik.errors.password ? <div className="text-red-500">{formik.errors.password}</div> : null}
                    {message ? <div className="text-gray-500">{message}</div> : null}
                </div>
                <button className="p-2 my-2 text-white bg-sky-600 rounded-xl" type="submit" disabled={formik.isSubmitting}>Set password</button>
            </form>
        </div >
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
