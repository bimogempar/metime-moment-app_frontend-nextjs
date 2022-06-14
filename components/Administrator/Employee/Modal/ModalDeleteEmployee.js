import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function ModalDeleteEmployee({ setIsOpen, isOpen, buttonRef, data, title, deleteEmployee }) {
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
                        <div className="relative w-1/2 xl:w-1/3 bg-white my-5 rounded-md p-4">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex justify-between">
                                    <h1 className="text-gray-700 font-light text-2xl">{title}</h1>
                                </div>
                                <hr />
                                <p className="text-gray-700 font-light text-md">Yakin ingin menghapus user  <span className="font-medium">{data == undefined ? '' : data.name}</span> ?</p>
                                <div className="flex justify-end">
                                    <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg' onClick={e => deleteEmployee(data.id)}>Hapus</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}
