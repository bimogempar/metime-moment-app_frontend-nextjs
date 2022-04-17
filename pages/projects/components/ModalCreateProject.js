import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useRef } from 'react'

export default function ModalCreateProject({ isOpenCreate, setIsOpenCreate }) {
    let closeModalRef = useRef(null)

    return (
        <Transition as={Fragment} show={isOpenCreate}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setIsOpenCreate(false)} >
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
                            <Dialog.Title>Complete your order</Dialog.Title>

                            <Dialog.Description>

                                <button ref={closeModalRef} onClick={() => setIsOpenCreate(false)}>Close</button>
                            </Dialog.Description>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}
