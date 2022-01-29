/* eslint-disable @next/next/no-img-element */
import { BsThreeDots, BsCalendarDate, BsClock } from 'react-icons/bs'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { AiFillSchedule } from 'react-icons/ai'
import { MdFileDownloadDone } from 'react-icons/md'
import { BiLoader, BiCommentDetail, BiPhoneCall } from 'react-icons/bi'
import { RiAttachment2 } from 'react-icons/ri'
import { useEffect } from 'react'
import nookies from 'nookies';
import axios from 'axios';
import { useState } from 'react'

export default function Project(props) {
    const [projects, setProjects] = useState([])

    const fetchProjects = async () => {
        const cookies = nookies.get()
        const token = cookies.token

        axios.get(`${process.env.NEXT_PUBLIC_URL}/api/projects`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
            .then(function (response) {
                const projects = response.data
                setProjects(projects)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <div className="mb-5">
            <h1 className="mb-5 text-2xl font-extralight">{props.head}</h1>
            <div className="grid grid-cols-12 gap-5">

                {projects.map((project) => (
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
                            <button>
                                <BsThreeDots />
                            </button>
                        </div>
                        <div className="mb-2 grid grid-rows-1 gap-2">
                            <div className="-mx-4 my-2">
                                {project.img ? <img src={project.img} alt="" /> : <img src="/img/not-yet.png" alt="" />}
                            </div>
                            <div className="text-md font-light">{project.client}</div>
                            <div className="text-xs font-extralight text-gray-500 flex items-center gap-2"><BsClock /> {project.time}</div>
                            <div className="text-xs font-extralight text-gray-500 flex items-center gap-2"><BsCalendarDate /> {project.date}</div>
                            <div className="text-xs font-extralight text-gray-500 flex items-center gap-2"><HiOutlineLocationMarker /> {project.location}</div>
                            <div className="text-xs font-extralight text-gray-500 flex items-center gap-2"><BiPhoneCall /> {project.phone_number}</div>
                        </div>
                        <div className="flex justify-end items-center">
                            <div className="-space-x-3">
                                <img className="relative z-10 inline object-cover w-8 h-8 border-2 border-white rounded-full" src="/img/ade.png" alt="Profile image" />
                                <img className="relative z-20 inline object-cover w-8 h-8 border-2 border-white rounded-full" src="/img/ade.png" alt="Profile image" />
                                <img className="relative z-30 inline object-cover w-8 h-8 border-2 border-white rounded-full" src="/img/ade.png" alt="Profile image" />
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}