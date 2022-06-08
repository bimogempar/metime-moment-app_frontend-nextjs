import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function ModalNewEmployee({ setIsOpen, isOpen, buttonRef, formikUsers, title }) {
    return (
        <Transition as={Fragment} show={isOpen}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setIsOpen(false)} initialFocus={buttonRef}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
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
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="relative bg-white rounded max-w-3xl md:mx-auto p-5 md:my-5 m-5">
                            <h1 className="mb-5 text-2xl font-extralight">
                                {title}
                            </h1>
                            <form className='w-full md:w-full' onSubmit={formikUsers.handleSubmit}>
                                <div>
                                    <label className="block text-sm text-gray-600  my-2" htmlFor="name">Name</label>
                                    <input type="text" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="name" onChange={formikUsers.handleChange} value={formikUsers.values.name} />
                                    {formikUsers.errors.name ? <label className="block text-sm text-red-600 my-2">{formikUsers.errors.name}</label> : null}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600  my-2" htmlFor="username">Username</label>
                                    <input type="text" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="username" onChange={formikUsers.handleChange} value={formikUsers.values.username} />
                                    {formikUsers.errors.username ? <label className="block text-sm text-red-600 my-2">{formikUsers.errors.username}</label> : null}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600  my-2" htmlFor="email">Email</label>
                                    <input type="email" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="email" onChange={formikUsers.handleChange} value={formikUsers.values.email} />
                                    {formikUsers.errors.email ? <label className="block text-sm text-red-600 my-2">{formikUsers.errors.email}</label> : null}
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600  my-2" htmlFor="role">Role</label>
                                    <select className='text-gray-500 bg-gray-200 rounded-lg p-2' name="role" id="role" onChange={e => formikUsers.setFieldValue('role', e.target.value)} value={formikUsers.values.role}>
                                        <option value="1">Employee</option>
                                        <option value="2">Manager</option>
                                        <option value="3">Admin</option>
                                    </select>
                                    {formikUsers.errors.role ? <label className="block text-sm text-red-600 my-2">{formikUsers.errors.email}</label> : null}
                                </div>
                                <div className='mt-4 flex justify-end'>
                                    <button className='bg-blue-500 text-white p-2 rounded-lg' type='submit'>Create</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}