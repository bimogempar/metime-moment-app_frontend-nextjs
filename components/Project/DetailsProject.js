/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from 'react'
import nookies from 'nookies';
import axios from 'axios';
import { BsChevronLeft, BsTrash, BsPlusCircle } from 'react-icons/bs';
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { UserContext } from '../context/userContext';
import { FiSend } from 'react-icons/fi';
import ReactSelect from 'react-select'
import moment from 'moment';
import { Toaster, toast } from 'react-hot-toast'
import HeadProject from './components-detailProject/HeadProject';
import ImageHeader from './components-detailProject/ImageHeader';
import Date from './components-detailProject/Date';
import Assignees from './components-detailProject/Assignees';
import Location from './components-detailProject/Location';
import Checklist from './components-detailProject/Checklist';
import Progress from './components-detailProject/Progress';
import AddAssignees from './components-detailProject/AddAssignees';

export default function DetailsProject({ data }) {
    const [project, setProject] = useState(data.project);
    const [features, setFeatures] = useState(data.project.features);
    const [progress, setProgress] = useState(data.project.progress);
    const [users, setUsers] = useState(data.project.users);
    const [inputClient, setInputClient] = useState(false);
    const [addUserProject, setAddUserProject] = useState(false);
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
                        toast.success('Progress added successfully', {
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

    const handleButtonSubmitProject = () => {
        if (formikProjects.dirty) {
            formikProjects.handleSubmit()
        }
        if (!formikProjects.dirty) {
            // console.log('belum diedit')
            setInputClient(false)
        }
    }

    const handleSubmitAddAssign = (e) => {
        e.preventDefault()
        if (formikProjects.dirty) {
            formikProjects.handleSubmit()
        }
        if (!formikProjects.dirty) {
            setAddUserProject(false)
        }
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
                    <HeadProject
                        clientName={project.client}
                        projectStatus={project.status}
                        projectPhone={project.phone_number}
                        formikProjects={formikProjects}
                        inputClient={inputClient}
                        permissions={permissions}
                        setInputClient={setInputClient}
                        handleButtonSubmitProject={handleButtonSubmitProject}
                    />

                    <ImageHeader />

                    <div className="p-5 grid grid-cols-2 gap-3 justify-items-start">
                        <Date
                            valueDate={project.date}
                            formikProjects={formikProjects}
                            inputClient={inputClient}
                        />
                        <Assignees users={users} />
                        <Location
                            inputClient={inputClient}
                            valueLocation={project.location}
                            formikProjects={formikProjects}
                        />
                    </div>

                    <Checklist
                        permissions={permissions}
                        features={features}
                        deleteFeature={deleteFeature}
                        handleClickCB={handleClickCB}
                        resetForm={formikFeatures.resetForm}
                        formikFeatures={formikFeatures}
                    />

                    {/* Comment */}
                    <Progress
                        permissions={permissions}
                        progress={progress}
                        authUser={userContext.user}
                        deleteProgress={deleteProgress}
                        formikComments={formikComments}
                    />
                </div>

                {/* Sidebar */}
                <AddAssignees
                    permissions={permissions}
                    addUserProject={addUserProject}
                    users={users}
                    allUsers={allUsers}
                    formikProjects={formikProjects}
                    fetchAllUser={fetchAllUser}
                    deleteEachUser={deleteEachUser}
                    handleSubmitAddAssign={handleSubmitAddAssign}
                />

            </div>
        </>
    )
}
