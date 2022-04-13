/* eslint-disable @next/next/no-img-element */
import { BsThreeDots, BsCalendarDate, BsClock, BsTrash, BsInfoLg, BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { AiFillSchedule, AiOutlineSearch } from 'react-icons/ai'
import { MdConstruction, MdFileDownloadDone } from 'react-icons/md'
import { BiLoader, BiCommentDetail, BiPhoneCall } from 'react-icons/bi'
import { useEffect } from 'react'
import nookies from 'nookies';
import axios from 'axios';
import { useState } from 'react'
import { Dialog, Menu, Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Image from 'next/image'
import notYetImageProject from '../public/img/not-yet.png'
import { Fragment } from 'react'

export default function Project(props) {
    const [page, setPage] = useState(1)
    const [projects, setProjects] = useState([])
    const [search, setSearch] = useState({
        s: '',
        category: '',
    })
    const [projectsData, setProjectsData] = useState([])
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [isOpen, setIsOpen] = useState(false)
    const [dataModal, setDataModal] = useState([{}])

    const cookies = nookies.get()
    const token = cookies.token

    const searchData = (s) => {
        setSearch({ s })
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
                arr.push(`page=${page}`)
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
                    const fetchProjects = response.data
                    setProjects(fetchProjects)
                    setProjectsData(fetchProjects.data)
                })
                .catch(function (error) {
                    // console.log(error);
                })
        }

        fetchProjects()
    }, [search, page, startDate, endDate, token])

    if (projects.data === undefined) {
        return <div className="flex justify-center items-center h-screen">
            <BiLoader className="text-6xl" />
        </div>
    }
    // console.log(startDate)
    // console.log(endDate)

    const deleteProject = (id) => {
        axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/projects/${id}/delete`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }).then(function (response) {
            axios.get(`${process.env.NEXT_PUBLIC_URL}/api/projects?page=${page}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
                .then(function (response) {
                    const fetchProjects = response.data
                    setProjects(fetchProjects)
                    setProjectsData(fetchProjects.data)
                    setIsOpen(false)
                })
                .catch(function (error) {
                    // console.log(error);
                })
        }).catch(function (error) {
            console.log(error);
        })
    }

    const handleClickOpen = (data) => {
        // console.log(data)
        setDataModal(data)
        setIsOpen(true)
    }

    return (
        <div className="mb-5" >

            <h1 className="mb-5 text-2xl font-extralight">{props.head}</h1>

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

            <Transition as={Fragment} show={isOpen}>
                <Dialog as="div" className="fixed inset-0 flex items-center justify-center" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <div className="bg-white p-5 z-10 rounded-xl shadow-xl">
                            <Dialog.Title className="text-lg text-gray-500">Hapus Project ?</Dialog.Title>
                            <Dialog.Description className="mt-2">
                                Yakin hapus {dataModal[0]}
                            </Dialog.Description>

                            <div className="flex gap-x-3 justify-end items-center mt-6">
                                <button className="py-2 px-3 bg-red-50 text-red-500 rounded-lg" onClick={() => setIsOpen(false)}>Cancel</button>
                                <button className="py-2 px-3 bg-blue-50 text-blue-500 rounded-lg" onClick={() => deleteProject(dataModal[1])}>Yes!</button>
                            </div>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>

            <div className="grid grid-cols-12 gap-5">
                {projectsData.map((project) => (
                    <div key={project.id} className="bg-white xl:col-span-4 lg:col-span-6 col-span-12 rounded-xl p-4 text-sm" >

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
                                        <Menu.Item>
                                            <button onClick={() => handleClickOpen([project.client, project.id])} className="hover:bg-red-500 hover:text-white  hover:rounded-lg p-2 flex items-center"><BsTrash className="mr-2" />Delete Project</button>
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Menu>

                        </div>
                        <div className="mb-2 grid grid-rows-1 gap-2">
                            <div className="-mx-4 my-2 flex items-center">
                                {project.img ? <Image src={process.env.NEXT_PUBLIC_URL + '/' + project.img} alt="Image Project" width={1080} height={768} priority /> : <Image src={notYetImageProject} alt="Image Project" width={1080} height={768} priority />}
                            </div>
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
                                        <img key={user.id} className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full" src="img/ade.png" alt="Profile image" />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className="flex justify-center my-5 gap-x-2">
                {
                    page > 1 &&
                    <button className="bg-white rounded-xl p-2" onClick={() => {
                        setPage(page - 1)
                    }}>
                        <BsChevronLeft />
                    </button>
                }
                {
                    page < projects.last_page &&
                    <button className="bg-white rounded-xl p-2" onClick={() => {
                        setPage(page + 1)
                    }}>
                        <BsChevronRight />
                    </button>
                }
            </div>

        </div >
    )
}