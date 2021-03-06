/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext, useRef } from 'react'
import nookies from 'nookies';
import axios from 'axios';
import { BsChevronLeft } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { UserContext } from '../context/userContext';
import { Toaster, toast } from 'react-hot-toast'
import HeadProject from './components-detailProject/HeadProject';
import Date from './components-detailProject/Date';
import Assignees from './components-detailProject/Assignees';
import Location from './components-detailProject/Location';
import Checklist from './components-detailProject/Checklist';
import Progress from './components-detailProject/Progress';
import AddAssignees from './components-detailProject/AddAssignees';
import ThumbnailProject from './components-detailProject/ThumbnailProject';
import FilesGDrive from './components-detailProject/FilesGDrive';
import PrintInvoice from './components-detailProject/PrintInvoice';

export default function DetailsProject({ data }) {
    const [project, setProject] = useState(data.project);
    const [filesGDrive, setFilesGDrive] = useState(data.files_gdrive)
    const [dirGDrive, setDirGDrive] = useState(data.dir ? data.dir : '')
    const [features, setFeatures] = useState(data.project.features);
    const [progress, setProgress] = useState(data.project.progress);
    const [users, setUsers] = useState(data.project.users);
    const [inputClient, setInputClient] = useState(false);
    const [addUserProject, setAddUserProject] = useState(false);
    const [permissions, setPermissions] = useState(false);
    const [allUsers, setAllUsers] = useState([]);

    const userContext = useContext(UserContext)
    const imageRef = useRef()

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
                                icon: '????'
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
            const assignment_user = values.assignment_user.map(u => u.value)
            const thumbnail_img = values.thumbnail_img
            const formData = new FormData()
            formData.append('assignment_user', JSON.stringify(assignment_user))
            formData.append('thumbnail_img', thumbnail_img)
            formData.append('client', values.client)
            formData.append('status', values.status)
            formData.append('date', values.date)
            formData.append('phone_number', values.phone_number)
            formData.append('location', values.location)
            // console.log('without json decode',{ ...values, assignment_user });
            // console.log(formData.get('assignment_user'))
            const updateProjectsPromise = axios.post(`${process.env.NEXT_PUBLIC_URL}/api/projects/update/${project.slug}`, formData, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .catch(err => {
                    // console.log(err)
                })
                .then(res => {
                    // console.log(res)
                    setInputClient(false);
                    setAddUserProject(false);
                    setProject(res.data.project);
                    setUsers(res.data.project.users);
                    // setProject({ ...project, ...values });
                    formikFeatures.resetForm();
                })
            toast.promise(updateProjectsPromise, {
                loading: 'Loading',
                error: 'Failed to update project',
                success: 'Update project successfully',
            });
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
        axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users/react-select`, {
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

                    <ThumbnailProject
                        inputClient={inputClient}
                        project={project}
                        imageRef={imageRef}
                        formikProjects={formikProjects}
                    />

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

                    {/* Files GDrive */}
                    <FilesGDrive
                        dirGDrive={dirGDrive}
                        filesGDrive={filesGDrive}
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

                <div className="col-span-3 xl:col-span-1 lg:col-span-2 md:col-span-2 rounded-xl space-y-4">
                    {/* Print Invoice */}
                    <PrintInvoice
                        project={project}
                    />

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

            </div>
        </>
    )
}
