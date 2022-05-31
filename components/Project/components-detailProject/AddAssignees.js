import Image from 'next/image'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BsPlusCircle } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi'
import ReactSelect from 'react-select'
import UserPlaceholder from "../../../public/img/userplaceholder.png"

export default function AddAssignees({ permissions, addUserProject, users, allUsers, formikProjects, formikProjectsHandleSubmit, formikProjectsValueAssignment, fetchAllUser, deleteEachUser }) {
    return (
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
                                        <Image className="w-9 h-9 rounded-full" src={!user.img ? UserPlaceholder : process.env.NEXT_PUBLIC_URL + '/storage/img_user/' + user.img} alt="Profile image" width={30} height={30} />
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
    )
}
