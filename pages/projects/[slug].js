import React from 'react'
import nookies from 'nookies';
import Layout from '../../components/Layout';

export default function ProjectDetails({ data }) {
    const project = data.project
    return (
        <Layout title={project.client}>
            <h1>{project.client}</h1>
        </Layout>
    )
}

export async function getServerSideProps(params) {
    const { slug } = params.query

    const cookies = nookies.get(params)
    const token = cookies.token

    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

    const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    const data = await req.json()
    // console.log(data)

    if (data.project == null) {
        return {
            redirect: {
                permanent: false,
                destination: "/projects"
            }
        }
    }

    return {
        props: { data }
    }

}