/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { BiLoader, BiPhoneCall } from 'react-icons/bi'
import { AiFillSchedule } from 'react-icons/ai'
import { MdFileDownloadDone } from 'react-icons/md'
import { Popover } from '@headlessui/react'
import { BsCalendarDate, BsClock, BsInfoLg, BsThreeDots, BsTrash } from 'react-icons/bs'
import Link from 'next/link'
import { HiOutlineLocationMarker } from 'react-icons/hi'

export default function Profile(props) {
    const userContext = useContext(UserContext)
    if (userContext.user.username === undefined) {
        return <div className="flex justify-center items-center h-screen">
            <BiLoader className="text-6xl" />
        </div>
    }
    return (
        <div className="mb-5">
            {
                userContext.user.name === props.data.user.username ?
                    <h1 className="mb-5 text-2xl font-extralight">My Profile</h1>
                    : <h1 className="mb-5 text-2xl font-extralight">User Profile</h1>
            }
            <div className="grid grid-cols-1 gap-5 bg-white p-5 rounded-xl mb-5">
                {props.data.user.name}
            </div>

            <div className="grid grid-cols-12 gap-5">

                {props.data.projects.map((project, id) => (
                    <div project={project} key={id} className="bg-white xl:col-span-4 lg:col-span-6 col-span-12 rounded-xl p-4 text-sm" >
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
                            <Popover className="invisible lg:visible">
                                <Popover.Button> <BsThreeDots /></Popover.Button>
                                <Popover.Panel className="absolute z-10 bg-white rounded-lg drop-shadow-xl">
                                    <div className="grid grid-cols-1 rounded-xl p-2">
                                        <Link href={"/projects/" + project.slug}><a className="hover:bg-gray-200 hover:rounded-lg p-2 flex items-center"><BsInfoLg className="mr-2" />View Detail</a></Link>
                                        <Link href="/"><a className="hover:bg-red-500 hover:text-white  hover:rounded-lg p-2 flex items-center"><BsTrash className="mr-2" />Delete Project</a></Link>
                                    </div>
                                </Popover.Panel>
                            </Popover>
                        </div>
                        <div className="mb-2 grid grid-rows-1 gap-2">
                            <Link href={"/projects/" + project.slug} passHref>
                                <a>
                                    <div className="-mx-4 my-2 flex items-center">
                                        {project.img ? <img src={project.img} alt="" /> : <img src="/img/not-yet.png" alt="" />}
                                    </div>
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
                                        <img key={user.id} className="relative z-10 inline object-cover w-8 h-8 border-2 border-white rounded-full" src="/img/ade.png" alt="Profile image" />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
