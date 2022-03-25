import React from 'react'
import Layout from '../../components/Layout'
import nookies from "nookies"

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

export default function username({ data }) {
    return (
        <Layout title="User Profile ">
            <div className="mb-5">
                <h1 className="mb-5 text-2xl font-extralight">My Profile</h1>
                <div className="grid grid-cols-1 gap-5 bg-white p-5 rounded-xl">
                    {data.user.name}
                    {data.user.projects.map((project) => (
                        <div key={project}>
                            {project.client}
                        </div>
                    ))}
                </div>
            </div>
        </Layout >
    )
}
