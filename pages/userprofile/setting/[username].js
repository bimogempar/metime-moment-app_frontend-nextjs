import React from 'react'
import nookies from "nookies"
import { useFormik } from 'formik';
import Layout from '../../../components/Layout'
import Image from 'next/image'
import UserPlaceholder from "../../../public/img/userplaceholder.png";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup'
import { UserContext } from '../../../components/context/userContext';
import EditProfile from '../../../components/EditProfile';

export default function Username({ data }) {
    return (
        <Layout title="Setting Profile">
            <EditProfile data={data} />
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
        props: { data: data }
    }
}