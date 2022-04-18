import { React, useState, useEffect } from 'react'
import nookies from 'nookies';
import Layout from '../../components/Layout';
import axios from 'axios';
import { BsChevronLeft } from 'react-icons/bs';
import { useRouter } from 'next/router';

export default function ProjectDetails({ data }) {
    const [project, setProject] = useState(data.project);
    const [features, setFeatures] = useState(data.project.features);
    // const [permissions, setPermissions] = useState(false);

    const router = useRouter();

    const cookies = nookies.get()
    const token = cookies.token

    const handleClickCB = (feature) => {
        // console.log(feature)
        const newFeatures = features.map((f) => {
            if (f.id === feature.id) {
                axios.patch(`${process.env.NEXT_PUBLIC_URL}/api/features/${feature.id}`,
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
    }

    return (
        <Layout title={'Project Details | ' + project.client}>
            <div className="mb-4">
                <button className="bg-white rounded-xl p-2 px-4" onClick={() => { router.back() }}>
                    <div className="flex gap-x-3 items-center">
                        <BsChevronLeft /> Back
                    </div>
                </button>
            </div>
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
                            // onChange={() => handleClickCB(feature)}
                            onChange={() => handleClickCB(feature)}
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