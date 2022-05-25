/* eslint-disable @next/next/no-img-element */
import moment from 'moment'
import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi'

export default function Progress({ progress, permissions, authUser, deleteProgress, formikComments, }) {
    return (
        <div className="p-5">
            <h1 className="text-gray-600 text-2xl font-extralight">
                Progress
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
                                <button type='submit' className="bg-green-500 p-2 rounded-lg flex items-center gap-2 text-white text-sm" onClick={() => formikComments.setFieldValue('user_id', authUser)}> <FiSend /> Send</button>
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
    )
}
