import { React, useState, useEffect } from 'react'
import nookies from 'nookies';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function ProjectDetails({ data }) {
    const [project, setProject] = useState(data.project);
    const [features, setFeatures] = useState(data.project.features);

    const cookies = nookies.get()
    const token = cookies.token
    // console.log(features)

    return (
        <Layout title={project.client}>
            <h1>{project.client}</h1>

            {project.features.map((feature) => {
                return (
                    <div key={feature.id}>
                        <input
                            type="checkbox"
                            id={feature.id}
                            name={feature.feature}
                            value={feature.feature}
                            defaultChecked={feature.status === 1}
                            onChange={() => {
                                const newFeatures = features.map((f) => {
                                    if (f.id === feature.id) {
                                        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/features/${feature.id}`,
                                            {
                                                status: f.status === 1 ? 0 : 1 || f.status === 0 ? 1 : 0,
                                            },
                                            {
                                                headers: {
                                                    Authorization: 'Bearer ' + token,
                                                },
                                            }
                                        )
                                            .then(res => {
                                                // console.log(res)
                                            })
                                        return {
                                            ...f,
                                            status: f.status === 1 ? 0 : 1 || f.status === 0 ? 1 : 0,
                                        };
                                    }
                                    return f
                                });
                                setFeatures(newFeatures);
                            }}
                        />
                        {feature.feature}
                    </div>
                )
            })}

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