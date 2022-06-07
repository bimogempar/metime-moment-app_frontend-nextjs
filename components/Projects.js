/* eslint-disable @next/next/no-img-element */
import { BsThreeDots, BsCalendarDate, BsClock, BsTrash, BsInfoLg, BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { AiFillSchedule } from 'react-icons/ai'
import { MdFileDownloadDone } from 'react-icons/md'
import { BiLoader, BiCommentDetail, BiPhoneCall, BiAddToQueue } from 'react-icons/bi'
import { useContext, useEffect } from 'react'
import nookies from 'nookies';
import axios from 'axios';
import { useState } from 'react'
import { Menu } from '@headlessui/react'
import Link from 'next/link'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Image from 'next/image'
import notYetImageProject from '../public/img/not-yet.png'
import toast, { Toaster } from 'react-hot-toast'
import { UserContext } from './context/userContext'
import ModalCreateProject from '../components/Project/ModalCreateProject'
import ModalDeleteProject from '../components/Project/ModalDeleteProject'
import UserPlaceholder from '../public/img/userplaceholder.png'

export default function Project(props) {
    const userContext = useContext(UserContext)

    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(2)
    const [projects, setProjects] = useState([])
    const [search, setSearch] = useState({
        s: '',
        category: '',
    })
    const [projectsData, setProjectsData] = useState([])
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [dataModalDelete, setDataModalDelete] = useState([{}])

    const cookies = nookies.get()
    const token = cookies.token

    const searchData = (s) => {
        setSearch({ s })
        setPage(1)
    }

    const filterCategory = (category) => {
        setSearch({ category })
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        const fetchProjects = async () => {
            const arr = []

            if (search.s === '' || search.category === '') {
                arr.push(`page=1`)
            }

            if (search.s) {
                arr.push(`s=${search.s}`)
            }

            if (search.category) {
                arr.push(`category=${search.category}`)
            }

            if (startDate && endDate) {
                arr.pop()
                arr.push(`start=${startDate.toISOString().slice(0, 10)}`)
                arr.push(`end=${endDate.toISOString().slice(0, 10)}`)
            }

            axios.get(`${process.env.NEXT_PUBLIC_URL}/api/projects?${arr.join('&')}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
                .then(function (response) {
                    // console.log(response.data.last_page)
                    const fetchProjects = response.data
                    setProjects(fetchProjects)
                    setProjectsData(fetchProjects.data)
                    setLastPage(response.data.last_page)
                })
                .catch(function (error) {
                    // console.log(error);
                })
        }

        fetchProjects()
    }, [search, startDate, endDate, token])

    const handleLoadMore = async (e) => {
        setPage(page + 1)
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/projects?page=${page + 1}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
            .then(function (response) {
                setLastPage(response.data.last_page)
                setProjectsData(projectsData.concat(response.data.data))
            })
            .catch(function (error) {
                // console.log(error);
            })
    }

    if (projects.data === undefined) {
        return <div className="flex justify-center items-center h-screen">
            <BiLoader className="text-6xl text-gray-400" />
        </div>
    }
    // console.log(startDate)
    // console.log(endDate)

    // console.log('page : ' + page)
    // console.log('lastPage : ' + lastPage)

    const deleteProject = (id) => {
        // console.log(id)
        // return
        const deletePromise = axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/projects/${id}/delete`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }).then(function (response) {
            // console.log(response)
            setLastPage(response.data.last_page)
            setProjectsData(projectsData.filter(project => project.id !== id))
            setIsOpenDelete(false)
            toast.success('Project deleted')
        }).catch(function (error) {
            console.log(error);
        })
    }

    const handleClickDeleteProject = (data) => {
        setDataModalDelete(data)
        setIsOpenDelete(true)
    }

    const handleClickCreateProject = () => {
        setIsOpenCreate(true)
    }

    return (
        <div className="mb-5" >
            <Toaster />

            <h1 className="mb-5 text-2xl font-extralight">{props.head}</h1>

            <div className="mb-5">
                <button onClick={() => handleClickCreateProject()} className="transition ease-in-out duration-200 text-gray-500 bg-gray-100 hover:bg-white p-2 rounded-lg flex items-center"><BiAddToQueue className="mr-2" />Create new project</button>
            </div>

            <div className="flex flex-wrap align-items-center justify-between items-center mb-5 gap-3">
                <div className="flex gap-x-3 justify-between align-items-center">
                    <div className="flex bg-gray-100 p-2 w-72 space-x-4 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input className="bg-gray-100 outline-none" type="text" placeholder="Search" onKeyUp={e => searchData(e.target.value)} />
                    </div>
                </div>
                <div className="flex gap-x-3 justify-between">
                    <select className="bg-gray-100 p-2 rounded-xl text-gray-500" onChange={e => filterCategory(e.target.value)}>
                        <option value="">None</option>
                        <option value="1">On Scheduled</option>
                        <option value="2">On Progress</option>
                        <option value="3">Done</option>
                    </select>
                    <div>
                        <ReactDatePicker
                            className="bg-gray-100 p-2 rounded-xl text-gray-500"
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Search by date"
                            selectsRange
                        />
                    </div>
                </div>
            </div>

            {/* Modal Create Project */}
            <ModalCreateProject isOpenCreate={isOpenCreate} setIsOpenCreate={setIsOpenCreate} />

            {/* Modal Delete Project */}
            <ModalDeleteProject isOpenDelete={isOpenDelete} setIsOpenDelete={setIsOpenDelete} dataModalDelete={dataModalDelete} deleteProject={deleteProject} />

            <div className="grid grid-cols-12 gap-5">
                {projectsData.map((project, index) => (
                    <div key={index} className="bg-white xl:col-span-4 lg:col-span-6 col-span-12 rounded-xl p-4 text-sm" >

                        <div className="mb-2 flex justify-between items-center">
                            {project.status == 1 &&
                                <div className="p-1 px-2 rounded-lg text-xs text bg-yellow-200 text-yellow-800 flex items-center gap-2">
                                    <AiFillSchedule size={20} /> On Scheduled
                                </div>
                            }
                            {project.status == 2 &&
                                <div className="p-1 px-2 rounded-lg text-xs text bg-blue-200 text-blue-800 flex items-center gap-2">
                                    <BiLoader size={20} /> On Progress
                                </div>
                            }
                            {project.status == 3 &&
                                <div className="p-1 px-2 rounded-lg text-xs text bg-green-200 text-green-800 flex items-center gap-2">
                                    <MdFileDownloadDone size={20} /> Done
                                </div>
                            }
                            <Menu as="div" className="invisible lg:visible">
                                <Menu.Button> <BsThreeDots /></Menu.Button>
                                <Menu.Items className="absolute z-10 bg-white rounded-lg drop-shadow-xl">
                                    <div className="grid grid-cols-1 rounded-xl p-2">
                                        <Menu.Item>
                                            <Link href={"/projects/" + project.slug}><a className="hover:bg-gray-200 hover:rounded-lg p-2 flex items-center"><BsInfoLg className="mr-2" />View Detail</a></Link>
                                        </Menu.Item>
                                        {
                                            userContext.user.role == 2 || userContext.user.role == 3 ?
                                                <Menu.Item key={project.id}>
                                                    <button onClick={() => handleClickDeleteProject([project.client, project.id])} className="hover:bg-red-500 hover:text-white  hover:rounded-lg p-2 flex items-center"><BsTrash className="mr-2" />Delete Project</button>
                                                </Menu.Item>
                                                : project.users.map(user => {
                                                    if (user.id == userContext.user.id) {
                                                        return (
                                                            <Menu.Item key={user.id}>
                                                                <button onClick={() => handleClickDeleteProject([project.client, project.id])} className="hover:bg-red-500 hover:text-white  hover:rounded-lg p-2 flex items-center"><BsTrash className="mr-2" />Delete Project</button>
                                                            </Menu.Item>
                                                        )
                                                    }
                                                })
                                        }
                                    </div>
                                </Menu.Items>
                            </Menu>

                        </div>
                        <div className="mb-2 grid grid-rows-1 gap-2">
                            <Link href={"/projects/" + project.slug} passHref>
                                <button className="-mx-4 my-2 flex items-center">
                                    {project.img ? <Image src={process.env.NEXT_PUBLIC_URL + '/' + project.img} alt="Image Project" width={1080} height={768} priority /> : <Image src={notYetImageProject} alt="Image Project" width={1080} height={768} priority />}
                                </button>
                            </Link>
                            <Link href={"/projects/" + project.slug} passHref>
                                <a>
                                    <div className="text-lg font-light">{project.client}</div>
                                </a>
                            </Link>
                            <div className="text-xs font-extralight text-gray-500 flex items-center gap-2"><BsClock /> {project.time}</div>
                            <div className="text-xs font-extralight text-gray-500 flex items-center gap-2"><BsCalendarDate /> {project.date}</div>
                            <div className="text-xs font-extralight text-gray-500 flex items-center gap-2"><HiOutlineLocationMarker /> {project.location}</div>
                            <div className="text-xs font-extralight text-gray-500 flex items-center gap-2"><BiPhoneCall /> {project.phone_number}</div>
                        </div>
                        <div className="flex justify-end items-center">
                            <div className="-space-x-3">
                                {project.users.map((user) => {
                                    return (
                                        <Image key={user.id} className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full" src={!user.img ? UserPlaceholder : process.env.NEXT_PUBLIC_URL + '/storage/img_user/' + user.img
                                        } alt="User Metime Moment" width={25} height={25} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className="flex justify-center my-5 gap-x-2">
                {
                    page < lastPage && projects.total != 0 ?
                        <button className="bg-white rounded-xl p-2" onClick={handleLoadMore}>
                            Load more
                        </button> : null
                }
            </div>

        </div >
    )
}