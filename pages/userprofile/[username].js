import React from 'react'
import Layout from '../../components/Layout'
import nookies from "nookies"
import { useContext } from "react";
import { UserContext } from "../../components/context/userContext";
import Profile from '../../components/userprofile/Profile';

const Username = ({ data }) => {
    return (
        <Layout title="User Profile ">
            <Profile data={data} />
        </Layout >
    )
}

export default Username

export async function getServerSideProps(ctx) {
    const cookies = nookies.get(ctx)
    const token = cookies.token
    const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${ctx.query.username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    const data = await req.json()
    if (data.error) {
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