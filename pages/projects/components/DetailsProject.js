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
import moment from 'moment';
import { Toaster, toast } from 'react-hot-toast'

export default function DetailsProject({ data }) {
    const [project, setProject] = useState(data.project);
    const [features, setFeatures] = useState(data.project.features);
    const [progress, setProgress] = useState(data.project.progress);
    const [users, setUsers] = useState(data.project.users);
    const [inputClient, setInputClient] = useState(false);
    const [addUserProject, setAddUserProject] = useState(false);
    const [addComment, setAddComment] = useState(false);
    const [permissions, setPermissions] = useState(false);

    const [allUsers, setAllUsers] = useState([]);
    const userContext = useContext(UserContext)

    useEffect(() => {
        if (userContext.user.role === 3 || userContext.user.role === 2) {
            setPermissions(true)
        } else {
            project.users.filter(f => f.id === userContext.user.id).length === 0 ? setPermissions(false) : setPermissions(true)
        }
    }, [project.users, userContext.user, userContext.user.id, userContext.user.role])

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
                        console.log(res)
                        if (res.data.features.status === 1) {
                            toast.success("List done", {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                        if (res.data.features.status === 0) {
                            toast("List on progress", {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                icon: '😓'
                            });
                        }
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
            assignment_user: users.map(u => {
                return { value: u.id, label: u.name }
            }),
        },
        onSubmit: values => {
            // console.log(values);
            const assignment_user = values.assignment_user.map(u => u.value)
            // console.log({ ...values, assignment_user });
            axios.patch(`${process.env.NEXT_PUBLIC_URL}/api/projects/update/${project.slug}`, { ...values, assignment_user }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then(res => {
                    // console.log(res)
                    setInputClient(false);
                    setAddUserProject(false);
                    setProject(res.data.project);
                    setUsers(res.data.project.users);
                    // setProject({ ...project, ...values });
                    toast.success('Project updated successfully', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    formikFeatures.resetForm();
                })
                .catch(err => {
                    toast.error(err.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
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
                        toast.success('Feature added successfully', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        formikFeatures.resetForm();
                    })
            }
            else {
                toast.error('Fail add feature, is empty', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return false
            }
        }
    })

    const formikComments = useFormik({
        initialValues: {
            description: '',
            user_id: userContext.user.id,
            project_id: project.id
        },
        onSubmit: values => {
            if (values.description.length > 0) {
                axios.post(`${process.env.NEXT_PUBLIC_URL}/api/projects/${project.id}/progress/store`, values, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                    .then(res => {
                        setProgress(res.data.project.progress);
                        toast.success('Comment added successfully', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        formikComments.resetForm();
                    })
            }
            else {
                toast.error('Comment is empty', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return false
            }
        },
    })

    const deleteEachUser = (user) => {
        if (users.length === 1) {
            toast.error("User can't be null", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false
        }
        if (user === userContext.user.id) {
            toast.error("You can't delete yourself", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false
        }
        axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/projects/${project.id}/user/${user}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then(res => {
                const arrayDelete = users.filter(item => item.id !== user);
                setUsers(arrayDelete)
                formikProjects.setFieldValue('assignment_user', arrayDelete.map(u => {
                    return { value: u.id, label: u.name }
                }))
                toast.success('Assign users deleted successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(err => {
                console.log(err)
                toast.error("Failed assign users", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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

    const deleteProgress = (id_progress) => {
        axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/projects/${project.id}/progress/${id_progress}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then(res => {
                setProgress(progress.filter(item => item.id !== id_progress))
                toast.success('Progress deleted successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(err => {
                toast.error('Error', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    return (
        <>
            <Toaster />
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
                                {permissions ? <select className="p-2 bg-gray-200 text-gray-500 rounded-lg appearance-none" name="status" id="status" onChange={formikProjects.handleChange} onChangeCapture={formikProjects.handleSubmit} defaultValue={project.status} >
                                    <option value="1">On Scheduled</option>
                                    <option value="2">On Progress</option>
                                    <option value="3">Done</option>
                                </select> : <h1 className="p-2 bg-gray-200 text-gray-500 rounded-lg appearance-none">{project.status === 1 ? 'On Scheduled' : project.status === 2 ? 'On Progress' : 'Done'}</h1>}
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
                                    <input className="text-sm p-2 bg-gray-200 text-gray-600 rounded-lg mt-2" type="date" id="date" name="date" defaultValue={project.date} onChange={formikProjects.handleChange} />
                                    :
                                    <p className="flex items-center gap-2 text-sm p-2 bg-gray-200 text-gray-600 rounded-lg mt-2">{moment(project.date).format('D MMM YY')} <BsCalendarDate /></p>
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
                        {
                            permissions ?
                                <div className="flex gap-3 items-start mt-3">
                                    <img className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full" src="../../../img/ade.png" alt="Profile image" />
                                    <form onSubmit={formikComments.handleSubmit}>
                                        <div>
                                            <textarea className="bg-gray-100 rounded-lg p-3 text-gray-600 w-full md:w-7/8" placeholder="Input your progress..." cols="50" name="description" id="description" value={formikComments.values.description} onChange={formikComments.handleChange} />
                                        </div>
                                        <div className="flex justify-end mt-1">
                                            <button type='submit' className="bg-green-500 p-2 rounded-lg flex items-center gap-2 text-white text-sm" onClick={() => formikComments.setFieldValue('user_id', userContext.user.id)}> <FiSend /> Send</button>
                                        </div>
                                    </form>
                                </div> : null
                        }
                        {
                            progress.map((p, index) => {
                                return (
                                    <div className="flex sm:w-3/4 gap-3 items-start mt-4 bg-gray-200 p-2 rounded-xl" key={index}>
                                        <img className="relative z-1 inline object-cover w-8 h-8 border-2 rounded-full" src="../../../img/ade.png" alt="Profile image" />
                                        <div className='w-full'>
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-gray-700">{p.name}</h4>
                                                <h4 className="text-sm text-gray-500">{moment(p.created_at).fromNow()}</h4>
                                            </div>
                                            <p className="text-gray-500 text-sm mt-2">{p.description}</p>
                                        </div>
                                        {
                                            permissions ?
                                                <button type="button" className="p-2 text-gray-500" onClick={() => deleteProgress(p.id)}><BsTrash /></button>
                                                : null
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-span-3 xl:col-span-1 lg:col-span-2 md:col-span-2 rounded-xl">
                    <div className="p-5 bg-white rounded-xl">
                        <div className="grid grid-cols-1">
                            <h2 className="text-sm font-light text-gray-500 uppercase">Assignees</h2>
                            {
                                addUserProject ?
                                    <form onSubmit={formikProjects.handleSubmit} className="flex items-center gap-2">
                                        <div className="w-full">
                                            <ReactSelect
                                                className='my-2'
                                                options={allUsers.map(user => {
                                                    return { value: user.id, label: user.name }
                                                })}
                                                value={formikProjects.values.assignment_user}
                                                onChange={value => formikProjects.setFieldValue('assignment_user', value)}
                                                isMulti
                                            />
                                        </div>
                                        <button type="submit" className="p-2 rounded-lg flex items-center gap-2 text-sm bg-blue-500 text-white" ><FiSend /></button>
                                    </form>
                                    :
                                    permissions ?
                                        <button className="flex items-center justify-center gap-2 text-sm p-2 bg-gray-200 text-gray-600 rounded-lg mt-2 mb-2" onClick={() => { fetchAllUser() }}><BsPlusCircle />Add Assignees</button>
                                        : null
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
                                                {
                                                    permissions ?
                                                        <button type="button" className="p-2 rounded-lg flex items-center gap-2 text-sm" onClick={() => deleteEachUser(user.id)}><AiOutlineClose /></button>
                                                        : null
                                                }
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
