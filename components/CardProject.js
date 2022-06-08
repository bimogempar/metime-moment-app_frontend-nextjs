import { Menu } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { AiFillSchedule } from 'react-icons/ai'
import { BiPhoneCall } from 'react-icons/bi'
import { BsCalendarDate, BsClock, BsInfoLg, BsThreeDots, BsTrash } from 'react-icons/bs'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import notYetImageProject from '../public/img/not-yet.png'
import { UserContext } from './context/userContext'
import UserPlaceholder from '../public/img/userplaceholder.png'

export default function CardProject({ project, handleClickDeleteProject }) {
    const userContext = useContext(UserContext)

    return (
        <div className="w-full p-4 bg-white rounded-xl flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <div className="p-1 px-2 rounded-lg text-xs text bg-yellow-200 text-yellow-800 flex items-center gap-2">
                    <AiFillSchedule size={20} /> On Scheduled
                </div>
                <Menu as="div" className="invisible lg:visible">
                    <Menu.Button>
                        <BsThreeDots />
                    </Menu.Button>
                    <Menu.Items className="absolute z-10 bg-white rounded-lg drop-shadow-xl">
                        <div className="grid grid-cols-1 rounded-xl p-2">
                            <Menu.Item>
                                <div>
                                    <Link href={"/projects/" + project.slug}><a className="hover:bg-gray-200 hover:rounded-lg p-2 flex items-center"><BsInfoLg className="mr-2" />View Detail</a></Link>
                                </div>
                            </Menu.Item>
                            {
                                userContext.user.role == 2 || userContext.user.role == 3 ?
                                    <Menu.Item key={project.id}>
                                        <div>
                                            <button onClick={() => handleClickDeleteProject([project.client, project.id])} className="hover:bg-red-500 hover:text-white  hover:rounded-lg p-2 flex items-center"><BsTrash className="mr-2" />Delete Project</button>
                                        </div>
                                    </Menu.Item>
                                    : project.users.map(user => {
                                        if (user.id == userContext.user.id) {
                                            return (
                                                <Menu.Item key={user.id}>
                                                    <div>
                                                        <button onClick={() => handleClickDeleteProject([project.client, project.id])} className="hover:bg-red-500 hover:text-white  hover:rounded-lg p-2 flex items-center"><BsTrash className="mr-2" />Delete Project</button>
                                                    </div>
                                                </Menu.Item>
                                            )
                                        }
                                    })
                            }
                        </div>
                    </Menu.Items>
                </Menu>
            </div>

            <div className="flex-1 font-extralight">
                <Link href={"/projects/" + project.slug} passHref>
                    <button className="-mx-4 my-2 flex items-center">
                        <Image src={project.thumbnail_img == null ? notYetImageProject : process.env.NEXT_PUBLIC_URL + '/storage/thumbnail_img/' + project.thumbnail_img} alt="Thumbnail Project" objectFit='cover' objectPosition='center' width={1080} height={768} priority />
                    </button>
                </Link>
                <Link href={"/projects/" + project.slug} passHref>
                    <a>
                        <div className="text-lg font-light">{project.client}</div>
                    </a>
                </Link>
                <div className='mt-3'>
                    <h3 className="text-sm font-extralight text-gray-500 flex items-center my-1 gap-2"><BsClock /> {project.time}</h3>
                    <h3 className="text-sm font-extralight text-gray-500 flex items-center my-1 gap-2"><BsCalendarDate /> {project.date}</h3>
                    <h3 className="text-sm font-extralight text-gray-500 flex items-center my-1 gap-2"><HiOutlineLocationMarker /> {project.location}</h3>
                    <h3 className="text-sm font-extralight text-gray-500 flex items-center my-1 gap-2"><BiPhoneCall /> {project.phone_number}</h3>
                </div>
            </div>

            <div className="mt-4 rounded-xl flex justify-end">
                <div className="space-x-3">
                    {project.users.map((user) => {
                        return (
                            <Image key={user.id} className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full" src={!user.img ? UserPlaceholder : process.env.NEXT_PUBLIC_URL + '/storage/img_user/' + user.img
                            } alt="User Metime Moment" width={25} height={25} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
