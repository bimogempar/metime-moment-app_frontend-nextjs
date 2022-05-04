/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from 'react'
import nookies from 'nookies';
import axios from 'axios';
import { BsChevronLeft, BsFillTelephoneOutboundFill, BsTrash, BsCalendarDate, BsPlusCircle } from 'react-icons/bs';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Layout from '../../../components/Layout';
import { UserContext } from '../../../components/context/userContext';
import { TiLocationOutline } from 'react-icons/ti';
import { BiAddToQueue } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';
import ReactSelect from 'react-select'

export default function DetailsProject({ data }) {
    const [project, setProject] = useState(data.project);
    const [features, setFeatures] = useState(data.project.features);
    const [users, setUsers] = useState(data.project.users);
    const [inputClient, setInputClient] = useState(false);
    const [addUserProject, setAddUserProject] = useState(false);
    const [permissions, setPermissions] = useState(false);

    const [allUsers, setAllUsers] = useState([]);

    console.log(users)

    const userContext = useContext(UserContext)

    useEffect(() => {
        if (userContext.user.role === 3 || userContext.user.role === 2) {
            setPermissions(true)
        } else {
            project.users.filter(f => f.id === userContext.user.id).length === 0 ? setPermissions(false) : setPermissions(true)
        }
    }, [project.users, userContext.user.id, userContext.user.role])

    const router = useRouter();

    const cookies = nookies.get()
    const token = cookies.token

    const deleteFeature = (feature) => {
        // console.log(feature);
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
            phone_number: project.phone_number,
            location: project.location,
            assignment_user: users.map(u => u.id),
        },
        onSubmit: values => {
            console.log(values);
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

    const deleteEachUser = (user) => {
        // console.log("user id " + user);
        // console.log("project id " + project.id);
        axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/projects/${project.id}/user/${user}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then(res => {
                const arrayDelete = users.filter(item => item.id !== user);
                setUsers(arrayDelete)
            })
            .catch(err => {
            })
    }

    const fetchAllUser = () => {
        // console.log('clicked')
        axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then(res => {
                setAllUsers(res.data.users)
                setAddUserProject(true)
            })
            .catch(err => {
            })
    }

    return (
        <>
            <div className="mb-4">
                <button className="bg-white rounded-xl p-2 px-4" onClick={() => { router.back() }}>
                    <div className="flex gap-x-3 items-center">
                        <BsChevronLeft /> Back
                    </div>
                </button>
            </div>

            <div className="grid grid-cols-3 gap-5 mb-5">
                <div className="col-span-3 xl:col-span-2 bg-white rounded-xl">
                    <div className="p-5">
                        <div className="flex items-center justify-between">
                            {/* Client Name */}
                            <div className="flex w-2/3 gap-2 text-2xl font-light">
                                {
                                    inputClient ?
                                        <div className="flex w-full gap-2">
                                            <input className="p-2 bg-gray-100 w-full rounded-lg font-light" type="text" name="client" id="client" value={formikProjects.values.client} onChange={formikProjects.handleChange} />
                                        </div>
                                        :
                                        <h1>{project.client}</h1>
                                }
                            </div>
                            {/* Status */}
                            <div className="flex items-center gap-2">
                                <select className="p-2 bg-gray-200 text-gray-500 rounded-lg appearance-none" name="status" id="status" onChange={formikProjects.handleChange} onChangeCapture={formikProjects.handleSubmit} defaultValue={project.status}>
                                    <option value="1">On Scheduled</option>
                                    <option value="2">On Progress</option>
                                    <option value="3">Done</option>
                                </select>
                                {/* Button Edit or Submit */}
                                {inputClient ?
                                    <button className="bg-blue-500 p-3 rounded-lg text-white" type="button" onClick={formikProjects.handleSubmit}><FiSend /></button>
                                    :
                                    permissions ?
                                        <button onClick={() => { inputClient ? setInputClient(false) : setInputClient(true) }} className="bg-yellow-400 text-white p-2 rounded-lg"><FaRegEdit size={20} /></button>
                                        : null
                                }
                            </div>
                        </div>
                        {/* Phone Number */}
                        {
                            inputClient ?
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <BsFillTelephoneOutboundFill /><input className="p-2 bg-gray-100 w-1/3 mt-2 rounded-lg" type="text" name="phone_number" id="phone_number" value={formikProjects.values.phone_number} onChange={formikProjects.handleChange} />
                                </div>
                                :
                                <p className="text-sm text-gray-500 mt-2 flex items-center gap-3"><BsFillTelephoneOutboundFill /> {project.phone_number}</p>
                        }
                    </div>

                    {/* Image Header */}
                    <h1 className="p-5 text-2xl font-light">
                        This is for image header
                    </h1>

                    <div className="p-5 grid grid-cols-2 gap-3 justify-items-start">
                        <div>
                            {/* Date */}
                            <h2 className="text-sm font-light text-gray-500 uppercase">Date</h2>
                            {
                                inputClient ?
                                    <input className="text-sm p-2 bg-gray-200 text-gray-600 rounded-lg mt-2" type="date" id="date" name="date" defaultValue={project.date} onChange={formikProjects.handleChange} onBlur={formikProjects.handleSubmit} />
                                    :
                                    <p className="flex items-center gap-2 text-sm p-2 bg-gray-200 text-gray-600 rounded-lg mt-2">{project.date} <BsCalendarDate /></p>
                            }
                        </div>
                        <div>
                            <h2 className="text-sm font-light text-gray-500 uppercase">Assignees</h2>
                            {
                                users.map(user => {
                                    return (
                                        <img key={user.id} className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full mt-2" src="../../../img/ade.png" alt="Profile image" />
                                    )
                                })
                            }
                        </div>
                        <div>
                            {/* Location */}
                            <h2 className="text-sm font-light text-gray-500 uppercase">Location</h2>
                            {
                                inputClient ?
                                    <div className="flex gap-2 items-center">
                                        <TiLocationOutline className="text-2xl text-gray-500" /><input className="p-2 bg-gray-100 w-full text-gray-500 mt-2 rounded-lg" type="text" name="location" id="location" value={formikProjects.values.location} onChange={formikProjects.handleChange} />
                                    </div>
                                    :
                                    <h2 className="text-sm p-2 text-gray-600 rounded-lg mt-2 flex items-center gap-2"><TiLocationOutline className="text-lg" /> {project.location}</h2>
                            }
                        </div>
                    </div>

                    {/* Chekclist */}
                    <div className="p-5">
                        <h1 className="text-gray-600 text-2xl font-extralight">
                            Checklist
                        </h1>
                        {permissions ? features.map((feature) => {
                            return (
                                <div className="mt-3 gap-3" key={feature.id}>
                                    <div className="flex text-gray-600 items-center gap-3 bg-gray-100 p-2 px-4 inline-flex rounded-lg">
                                        <input
                                            type="checkbox"
                                            id={feature.id}
                                            name={feature.feature}
                                            value={feature.feature}
                                            defaultChecked={feature.status === 1}
                                            onChange={() => handleClickCB(feature)}
                                        />
                                        <p>{feature.feature}</p>
                                        <button type="button" className="ml-5" onClick={() => deleteFeature(feature.id)}><BsTrash /></button>
                                    </div>
                                </div>
                            )
                        }) :
                            features.map((feature) => {
                                return (
                                    <div className="mt-3 gap-3" key={feature.id}>
                                        <div className="flex text-gray-600 items-center gap-3 bg-gray-100 p-2 px-4 inline-flex rounded-lg">
                                            <input
                                                type="checkbox"
                                                id={feature.id}
                                                name={feature.feature}
                                                value={feature.feature}
                                                defaultChecked={feature.status === 1}
                                                onChange={() => handleClickCB(feature)}
                                                disabled
                                            />
                                            <p>{feature.feature}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        {permissions &&
                            <form onSubmit={formikFeatures.handleSubmit}>
                                <div className="flex items-center mt-3 gap-3">
                                    <input id="features" name="feature" value={formikFeatures.values.feature} onChange={formikFeatures.handleChange} type="text" placeholder="Add new feature" className="p-2 bg-gray-100 rounded-lg w-full sm:w-1/2 md:w-1/2" />
                                    <button type="submit" className="bg-blue-500 p-3 rounded-lg"> <BiAddToQueue className="text-white" /> </button>
                                </div>
                            </form>
                        }
                    </div>

                    {/* Comment */}
                    <div className="p-5">
                        <h1 className="text-gray-600 text-2xl font-extralight">
                            Comment
                        </h1>
                        <div className="flex gap-3 items-start mt-3">
                            <img className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full" src="../../../img/ade.png" alt="Profile image" />
                            <div>
                                <div>
                                    <textarea className="bg-gray-100 rounded-lg p-3 text-gray-600 w-full md:w-7/8" placeholder="Input your progress..." cols="50" name="" id="" />
                                </div>
                                <div className="flex justify-end mt-1">
                                    <button className="bg-green-500 p-2 rounded-lg flex items-center gap-2 text-white text-sm"> <FiSend /> Send</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-3/4 gap-3 items-start mt-4">
                            <img className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full" src="../../../img/ade.png" alt="Profile image" />
                            <div className="g">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-gray-700">Ade Novan Guliaano</h4>
                                    <h4 className="text-sm text-gray-500">4 min ago</h4>
                                </div>
                                <p className="text-gray-500 text-sm mt-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae temporibus ex perspiciatis? Nemo blanditiis quasi commodi obcaecati facere, quia unde.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-span-3 xl:col-span-1 lg:col-span-2 md:col-span-2 rounded-xl">
                    <div className="p-5 bg-white rounded-xl">
                        <div className="grid grid-cols-1">
                            <h2 className="text-sm font-light text-gray-500 uppercase">Assignees</h2>
                            {
                                addUserProject ?
                                    <div className="flex items-center gap-2">
                                        <div className="w-full">
                                            <ReactSelect
                                                className='my-2'
                                                defaultValue={users.map(user => {
                                                    return { value: user.id, label: user.name }
                                                })}
                                                options={allUsers.map(user => {
                                                    return { value: user.id, label: user.name }
                                                })}
                                                isMulti
                                            />
                                        </div>
                                        <button type="button" className="p-2 rounded-lg flex items-center gap-2 text-sm bg-blue-500 text-white" onClick={() => { setAddUserProject(false) }}><FiSend /></button>
                                    </div>
                                    :
                                    <button className="flex items-center justify-center gap-2 text-sm p-2 bg-gray-200 text-gray-600 rounded-lg mt-2 mb-2" onClick={() => { fetchAllUser() }}><BsPlusCircle />Add Assignees</button>
                            }
                            {
                                users.map((user) => {
                                    return (
                                        <div key={user.id} className="flex items-center justify-between p-3 gap-4">
                                            <div className='flex items-center justify-center gap-4'>
                                                <img className="w-9 h-9 rounded-full" src="../../../img/ade.png" alt="Profile image" />
                                                <div>
                                                    <p className="text-gray-600 text-xs">{user.name}</p>
                                                    <p className="text-gray-400 text-xs">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className='text-gray-500'>
                                                {/* Delete each user */}
                                                <button type="button" className="p-2 rounded-lg flex items-center gap-2 text-sm" onClick={() => deleteEachUser(user.id)}><AiOutlineClose /></button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
