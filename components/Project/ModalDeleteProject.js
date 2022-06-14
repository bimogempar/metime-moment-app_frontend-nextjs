import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useRef } from 'react'

export default function ModalDeleteProject({ isOpenDelete, setIsOpenDelete, dataModalDelete, deleteProject }) {
    let closeModalRef = useRef(null)
    // console.log(deleteProject)
    // console.log(setIsOpenDelete)
    return (
        <Transition as={Fragment} show={isOpenDelete}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setIsOpenDelete(false)} >
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
                        <div className="relative w-1/2 xl:w-1/3 bg-white my-5 rounded-md p-4">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex justify-between">
                                    <h1 className="text-gray-700 font-light text-2xl">Delete Project</h1>
                                </div>
                                <hr />
                                <p className="text-gray-700 font-light text-md">Are you sure to delete? Client : <span className="font-medium">{dataModalDelete[0]}</span></p>
                                <div className="flex justify-end">
                                    <div className="flex gap-x-3 justify-end items-center mt-6">
                                        <button ref={closeModalRef} className="py-2 px-3 bg-red-50 text-red-500 rounded-lg" onClick={() => setIsOpenDelete(false)}>Cancel</button>
                                        <button className="py-2 px-3 bg-blue-50 text-blue-500 rounded-lg" onClick={() => deleteProject(dataModalDelete[1])} >Yes!</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}
