import Head from 'next/head'
import React from 'react'
import { useFormik } from 'formik'
import Image from "next/image"
import LogoMetimeMoment from "../../public/img/logo-metime.png"

export default function Testing({ response, token_initial_password }) {
    const formik = useFormik({
        initialValues: {
            email: response.user.email,
            token: token_initial_password,
            password: '',
        }
    })
    // console.log(formik.values)

    return (
        <div className="grid p-5" >
            <Head>
                <title>Set Init Password | Metime Moment</title>
                <link rel="icon" href="/img/logo-metime.png"></link>
            </Head>
            <div>
                <Image src={LogoMetimeMoment} alt="Logo Metime Moment" />
            </div>
            <form>
                <div className="my-2">
                    <h4 className="mb-3">Set your password first!</h4>
                    <label htmlFor="email"></label>
                    <input className="bg-white p-2 rounded-xl" type="email" id="email" defaultValue={response.user.email} disabled={true} />
                </div>
                <div className="my-2">
                    <label htmlFor="password"></label>
                    <input className="bg-white p-2 rounded-xl" type="password" id="password" placeholder="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                </div>
                <button className="p-2 my-2 text-white bg-sky-600 rounded-xl" type="submit">Set password</button>
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
