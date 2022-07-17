import { Dialog, Transition } from '@headlessui/react'
import moment from 'moment'
import React, { Fragment } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function ModalNotifications({ isOpenNotifications, setIsOpenNotifications, buttonRef, notifications }) {
    console.log(notifications)
    return (
        <Transition as={Fragment} show={isOpenNotifications} >
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setIsOpenNotifications(false)} initialFocus={buttonRef}>
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
                        <div className="relative w-4/5 md:w-1/2 xl:w-1/3 bg-white my-5 rounded-md p-5">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex justify-between">
                                    <h1 className="text-gray-700 font-light text-2xl">Notifications</h1>
                                    <button></button>
                                </div>
                                <hr />
                                {
                                    notifications.length !== 0 ? notifications.map((notification, index) => {
                                        return (
                                            <div key={index}>
                                                <div>{notification.message}</div>
                                                <div className=''>{moment(notification.created_at).calendar()}</div>
                                            </div>
                                        )
                                    }) : <div className='text-gray-500'>Tidak ada notifikasi baru kawan!</div>
                                }
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </ Transition>
    )
}
