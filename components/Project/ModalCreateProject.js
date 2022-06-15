import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useRef } from 'react'
import { BsCalendarDate } from 'react-icons/bs'
import ReactSelect from 'react-select'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Field, FieldArray, Form, Formik } from 'formik'
import axios from 'axios'

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
                        <div className="relative w-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white my-5 rounded-md p-5">
                            <div className="flex justify-between mb-3">
                                <h1 className="text-gray-700 font-light text-2xl">Create New Project</h1>
                            </div>
                            <hr />
                            <div className="grid grid-cols-1 gap-4">
                                <Formik
                                    initialValues={
                                        {
                                            client: '',
                                            phone_number: '',
                                            date: '',
                                            time: '07:00:00',
                                            location: '',
                                            status: 1,
                                            thumbnail_img: '',
                                            package_id: '',
                                            assignment_user: ''
                                        }
                                    }
                                    onSubmit={values => {
                                        // console.log(values)
                                        const formData = new FormData()
                                        formData.append('client', values.client)
                                        formData.append('phone_number', values.phone_number)
                                        formData.append('date', values.date)
                                        formData.append('time', values.time)
                                        formData.append('location', values.location)
                                        formData.append('status', values.status)
                                        formData.append('thumbnail_img', values.thumbnail_img)
                                        formData.append('package_id', values.package_id)
                                        formData.append('assignment_user', values.assignment_user)
                                        // formData.append('assignment_user', JSON.stringify(values.assignment_user))
                                        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/test`, formData)
                                            .then(res => {
                                                console.log(res.data)
                                            })
                                    }}
                                >
                                    {({ values }) => (
                                        <Form>
                                            <div className="col-span-1">
                                                <div>
                                                    <label className="block text-sm text-gray-600  my-2" htmlFor="client">Client Name</label>
                                                    <Field type="text" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-2/3" id="client" placeholder="Nama Client" name={`client`} />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600  my-2" htmlFor="no_hp">Phone Number</label>
                                                    <PhoneInput
                                                        enableSearch={true}
                                                        containerClass='rounded-lg text-gray-600 text-sm'
                                                        containerStyle={{ width: '70%', }}
                                                        country={'id'}
                                                        value={'+62'}
                                                        onChange={phone =>
                                                            values.phone_number = phone
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600  my-2" htmlFor="date">Date</label>
                                                    <div className="flex items-center space-x-3">
                                                        <input type="date" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-1/3" id="date" onChange={date => values.date = date.target.value} />
                                                        <span className='text-gray-500'>
                                                            <BsCalendarDate size={30} className="mt-1" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600  my-2" htmlFor="location">Location</label>
                                                    <Field type="text" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-1/2" id="location" name={`location`} />
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <div>
                                                    <label className="block text-sm text-gray-600  my-2" htmlFor="username">Thumbnail Project</label>
                                                    <input
                                                        type="file"
                                                        className="text-sm my-1 text-slate-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-full file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-blue-50 file:text-blue-700
                                                        hover:file:bg-blue-100
                                                        "
                                                        onChange={e => {
                                                            const file = e.target.files[0]
                                                            values.thumbnail_img = file
                                                        }
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600  my-2" htmlFor="package">Package</label>
                                                    <ReactSelect
                                                        className='w-4/5'
                                                        placeholder="Select Package..."
                                                        options={
                                                            [
                                                                { value: '1', label: 'User 1' },
                                                                { value: '2', label: 'User 2' },
                                                                { value: '3', label: 'User 3' },
                                                            ]
                                                        }
                                                        onChange={e => values.package_id = e.value}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600  my-2" htmlFor="user_assignment">Assign to</label>
                                                    <ReactSelect
                                                        className='w-4/5'
                                                        placeholder="Select Users..."
                                                        options={
                                                            [
                                                                { value: '1', label: 'User 1' },
                                                                { value: '2', label: 'User 2' },
                                                                { value: '3', label: 'User 3' },
                                                            ]
                                                        }
                                                        onChange={e => {
                                                            values.assignment_user = e.map(item => item.value)
                                                        }}
                                                        isMulti
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end mt-4">
                                                <button className='text-white bg-blue-500 p-2 rounded-lg' type='submit'>Create</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}
