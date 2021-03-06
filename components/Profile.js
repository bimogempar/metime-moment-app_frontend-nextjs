/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './context/userContext'
import { BiLike, BiLoader, BiPhoneCall, BiPhotoAlbum } from 'react-icons/bi'
import { AiFillSchedule } from 'react-icons/ai'
import { MdFileDownloadDone } from 'react-icons/md'
import { Popover } from '@headlessui/react'
import { BsCalendarDate, BsClock, BsInfoLg, BsThreeDots, BsTrash } from 'react-icons/bs'
import Link from 'next/link'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import UserPlaceHolder from '../public/img/userplaceholder.png'
import Image from 'next/image'
import ModalDeleteProject from '../components/Project/ModalDeleteProject'
import axios from 'axios'
import nookies from 'nookies';
import toast, { Toaster } from 'react-hot-toast'
import CardProject from './CardProject'

export default function Profile(props) {
    // console.log(props.data)
    const initProjects = props.data.projects
    const userContext = useContext(UserContext)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [dataModalDelete, setDataModalDelete] = useState([{}])
    const [projects, setProjects] = useState(initProjects)
    const [search, setSearch] = useState('')
    const [userSearch, setUserSearch] = useState('')
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(props.data.last_page)
    const [totalProject, setTotalProject] = useState(0)

    const cookies = nookies.get()
    const token = cookies.token

    const searchData = (e) => {
        setSearch({ s: e })
    }

    useEffect(() => {
        setProjects(props.data.projects)
        setTotalProject(props.data.totalProject)

        setLastPage(props.data.last_page)
        setPage(1)

        const searchUser = async () => {
            const arr = []

            if (search.s) {
                arr.push(`s=${search.s}`)
            }

            axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users?${arr.join('&')}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(res => {
                    const responseData = res.data.users
                    setUserSearch(responseData)
                })
        }
        searchUser()
    }, [props.data.last_page, props.data.projects, props.data.totalProject, search.s, token])

    const handleLoadMore = (e) => {
        setPage(page + 1)
        axios.get(`${process.env.NEXT_PUBLIC_URL}/api/user/${props.data.user.username}?page=${page + 1}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                const responseData = res.data.projects
                setLastPage(res.data.last_page)
                setProjects([...projects, ...responseData])
            })
    }

    // console.log('last page :' + lastPage)
    // console.log('page :' + page)

    if (userContext.user.username === undefined) {
        return <div className="flex justify-center items-center h-screen">
            <BiLoader className="text-6xl text-gray-400" />
        </div>
    }

    const deleteProject = (e) => {
        const id = e
        const deletePromise = axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/projects/${id}/delete`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
            .catch(function (error) {
                // console.log(error);
            })
            .then(function (response) {
                setIsOpenDelete(false)
                setProjects(projects.filter(project => project.id !== id))
            })
        toast.promise(deletePromise, {
            loading: 'Loading',
            error: 'Failed to create user',
            success: 'User created successfully',
        });
    }

    const handleClickOpen = (data) => {
        setDataModalDelete(data)
        setIsOpenDelete(true)
    }

    return (
        <div className="mb-5">
            <Toaster />
            <ModalDeleteProject isOpenDelete={isOpenDelete} setIsOpenDelete={setIsOpenDelete} dataModalDelete={dataModalDelete} deleteProject={deleteProject} />
            <div className="md:gap-5 grid grid-cols-1 md:grid-cols-3 mb-5">
                <div className="col-span-1">
                    {
                        userContext.user.username === props.data.user.username ?
                            <h1 className="mb-5 text-2xl font-extralight">My Profile</h1>
                            : <h1 className="mb-5 text-2xl font-extralight">User Profile</h1>
                    }
                    <div className="grid grid-cols-1 p-5 gap-5 mb-5 bg-white rounded-lg">
                        <div className="flex justify-center items-center">
                            <Image src={props.data.user.img ? process.env.NEXT_PUBLIC_URL + '/storage/img_user/' + props.data.user.img : UserPlaceHolder} className="rounded-full" height={100} width={100} alt="Profile Picture User" />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-lg font-light text-center">{props.data.user.name}</h1>
                            <h1 className="text-md font-extralight">{props.data.user.username}</h1>
                            <h1 className="text-md font-extralight">{props.data.user.email}</h1>
                            <h1 className="text-md font-extralight">{props.data.user.no_hp}</h1>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <a className="bg-yellow-200 px-3 py-2 w-1/4 text-center lg:w-auto rounded-lg text-yellow-600 text-xs tracking-wider font-semibold uppercase">
                                {props.data.user.role == 3 && "Admin" || props.data.user.role == 2 && "Manager" || props.data.user.role == 1 && "Employee"}
                            </a>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="col-span-1">
                                <div className="flex flex-col justify-center items-center gap-3">
                                    <BiPhotoAlbum className="text-2xl text-black/50" />
                                    <h1 className="font-extralight text-amber-600 text-6xl align-text-left text-center">{totalProject}</h1>
                                    <h1 className="font-light text-black/75 text-md text-center">Project</h1>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <div className="flex flex-col justify-center items-center gap-3">
                                    <BiLike className="text-2xl text-black/50" />
                                    <h1 className="font-extralight text-amber-600 text-6xl align-text-left text-center">9</h1>
                                    <h1 className="font-light text-black/75 text-md text-center">Loved</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 className="mb-5 text-2xl font-extralight">Search User</h1>
                    <div className="flex gap-x-3 mb-5 justify-between align-items-center">
                        <div className="flex bg-white p-2 w-72 space-x-4 rounded-xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input className="bg-white w-full outline-none" type="text" placeholder="Search" onKeyUp={e => { searchData(e.target.value) }} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-5">
                        {
                            !search.s ? null :
                                userSearch.map((user, index) => (
                                    <div key={user.id} className="col-span-1 bg-white rounded-lg p-3">
                                        <div className="flex justify-start space-x-5 items-center">
                                            <Image src={UserPlaceHolder} className="rounded-full" height={40} width={40} alt="Profile Picture User" />
                                            <Link href={"/userprofile/" + user.username} passHref>
                                                <a>
                                                    <h1 className="text-md font-light">{user.name}</h1>
                                                    <h1 className="text-sm font-extralight">{user.username}</h1>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>

                <div className="col-span-2">
                    <h1 className="mb-5 text-2xl font-extralight">
                        {
                            userContext.user.username === props.data.user.username ?
                                "My Projects" : "User Projects"
                        }</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                        {projects.map((project, id) => (
                            <CardProject
                                key={id} project={project}
                                handleClickDeleteProject={handleClickOpen}
                                deleteProject={deleteProject}
                            />
                        ))}

                    </div>
                    <div className="flex justify-center mt-5">
                        {
                            page < lastPage && totalProject != 0 ?
                                <button className='bg-white p-2 rounded-lg' onClick={handleLoadMore}>Load More</button>
                                : null
                        }
                    </div>
                </div>

            </div>
        </div >
    )
}
