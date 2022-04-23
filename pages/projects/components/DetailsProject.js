import React, { useState, useEffect, useContext } from 'react'
import nookies from 'nookies';
import axios from 'axios';
import { BsChevronLeft } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Layout from '../../../components/Layout';
import { UserContext } from '../../../components/context/userContext';

export default function DetailsProject({ data }) {

    const [project, setProject] = useState(data.project);
    const [features, setFeatures] = useState(data.project.features);
    const [inputClient, setInputClient] = useState(false);
    const [permissions, setPermissions] = useState(false);


    const userContext = useContext(UserContext)
    // console.log(userContext.user.role)
    useEffect(() => {
        if (userContext.user.role === 3 || userContext.user.role === 2) {
            setPermissions(true)
        } else if (project.users.filter(f => f.id !== userContext.user.id)) {
            setPermissions(false)
        }
    }, [project.users, userContext.user.id, userContext.user.role])

    // console.log(project.users.filter(f => f.id == userContext.user.id))

    const router = useRouter();

    const cookies = nookies.get()
    const token = cookies.token

    const deleteFeature = (feature) => {
        console.log(feature);
        axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/features/${feature}/delete`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then(res => {
                const arrayDelete = features.filter(item => item.id !== feature);
                setFeatures(arrayDelete)
            })
            .catch(err => {
            })
    }

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

    const formikProjects = useFormik({
        initialValues: {
            client: project.client,
            status: project.status,
            date: project.date,
        },
        onSubmit: values => {
            axios.patch(`${process.env.NEXT_PUBLIC_URL}/api/projects/update/${project.slug}`, values, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then(res => {
                    setInputClient(false);
                    setProject(res.data.project);
                    // setProject({ ...project, ...values });
                })
        }
    })

    const formikFeatures = useFormik({
        initialValues: {
            feature: '',
            project_id: project.id
        },
        onSubmit: values => {
            // console.log(values)
            if (values.feature.length > 0) {
                axios.post(`${process.env.NEXT_PUBLIC_URL}/api/projects/${project.id}/features/store`, values, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then(res => {
                        // setFeatures(...features, res.data.feature);
                        setProject({ ...project, features: [...project.features, res.data.feature] });
                        setFeatures([...features, res.data.feature]);
                        formikFeatures.resetForm();
                    })
            }
            else {
                return false
            }
        }
    })

    return (
        <>
            <div className="mb-4">
                <button className="bg-white rounded-xl p-2 px-4" onClick={() => { router.back() }}>
                    <div className="flex gap-x-3 items-center">
                        <BsChevronLeft /> Back
                    </div>
                </button>
            </div>

            {/* edit status */}
            <select name="status" id="status" onChange={formikProjects.handleChange} onChangeCapture={formikProjects.handleSubmit} defaultValue={project.status}>
                <option value="1">On Scheduled</option>
                <option value="2">On Progress</option>
                <option value="3">Done</option>
            </select>

            {/* edit date */}
            <label htmlFor="date"></label>
            <input type="date" id="date" name="date" onChange={formikProjects.handleChange} onBlur={formikProjects.handleSubmit} />

            {/* edit client */}
            {permissions &&
                <button onClick={() => { inputClient ? setInputClient(false) : setInputClient(true) }}>Edit</button>
            }
            {
                inputClient ?
                    <div>
                        <input type="text" name="client" id="client" value={formikProjects.values.client} onChange={formikProjects.handleChange} />
                        <button type="button" onClick={formikProjects.handleSubmit}>Simpan</button>
                    </div>
                    :
                    <h1>{project.client}</h1>
            }

            {
                permissions ?
                    features.map((feature) => {
                        return (
                            <div key={feature.id}>
                                <input
                                    type="checkbox"
                                    id={feature.id}
                                    name={feature.feature}
                                    value={feature.feature}
                                    defaultChecked={feature.status === 1}
                                    onChange={() => handleClickCB(feature)}
                                />
                                {feature.feature}
                                <button className="mx-5 text-red-500" onClick={() => deleteFeature(feature.id)}>Delete</button>
                            </div>
                        )
                    }) :
                    features.map((feature) => {
                        return (
                            <div key={feature.id}>
                                <input
                                    type="checkbox"
                                    id={feature.id}
                                    name={feature.feature}
                                    value={feature.feature}
                                    defaultChecked={feature.status === 1}
                                    onChange={() => handleClickCB(feature)}
                                    disabled
                                />
                                {feature.feature}
                            </div>
                        )
                    })
            }

            {/* add new features */}
            {permissions &&
                <form onSubmit={formikFeatures.handleSubmit}>
                    <label htmlFor="features"></label>
                    <input type="text" id="features" name="feature" placeholder="New feature..." value={formikFeatures.values.feature} onChange={formikFeatures.handleChange} />
                    <button type="submit">Simpan</button>
                </form>
            }
        </>
    )
}
