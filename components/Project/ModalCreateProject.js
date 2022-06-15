import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { BsCalendarDate } from 'react-icons/bs'
import ReactSelect from 'react-select'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Field, FieldArray, Form, Formik } from 'formik'
import ReactDatePicker from 'react-datepicker'
import axios from 'axios'
import moment from 'moment'

export default function ModalCreateProject({ token, isOpenCreate, setIsOpenCreate, setProjectsData, projectsData }) {
    let closeModalRef = useRef(null)
    const [packages, setPackages] = useState([])
    const [users, setUsers] = useState([])
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const fetchPackages = async () => {
            axios.get(`${process.env.NEXT_PUBLIC_URL}/api/packages/fetch/react-select`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(res => {
                    // console.log(res.data.packages)
                    setPackages(res.data.packages)
                })
        }

        const fetchUsers = async () => {
            axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users/react-select`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(res => {
                    // console.log(res.data.packages)
                    setUsers(res.data.users)
                })
        }
        fetchUsers()
        fetchPackages()
    }, [token])

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
                                            time: moment(new Date()).format('HH:mm:ss'),
                                            location: '',
                                            status: 1,
                                            thumbnail_img: '',
                                            package_id: '',
                                            assignment_user: ''
                                        }
                                    }
                                    onSubmit={values => {
                                        // console.log(values)
                                        // return
                                        const formData = new FormData()
                                        formData.append('client', values.client)
                                        formData.append('phone_number', values.phone_number)
                                        formData.append('date', values.date)
                                        formData.append('time', values.time)
                                        formData.append('location', values.location)
                                        formData.append('status', values.status)
                                        formData.append('thumbnail_img', values.thumbnail_img)
                                        formData.append('package_id', values.package_id)
                                        // formData.append('assignment_user', values.assignment_user)
                                        formData.append('assignment_user', JSON.stringify(values.assignment_user))
                                        axios.post(`${process.env.NEXT_PUBLIC_URL}/api/projects/store`, formData, {
                                            headers: {
                                                'Authorization': 'Bearer ' + token,
                                            }
                                        })
                                            .then(res => {
                                                console.log(res.data.project)
                                                // merge project with new response
                                                const newProjects = [...projectsData, res.data.project]
                                                setProjectsData(newProjects)
                                            })
                                    }}
                                >
                                    {({ values }) => (
                                        <Form>
                                            <div className="col-span-1">
                                                <div>
                                                    <label className="block text-sm text-gray-600 my-2" htmlFor="status">Status Project</label>
                                                    <ReactSelect
                                                        className='w-3/5 sm:w-2/5 md:w-1/3 lg:w-1/2'
                                                        placeholder="Select status project"
                                                        options={
                                                            [
                                                                { value: '1', label: 'On Scheduled' },
                                                                { value: '2', label: 'On Progress' },
                                                                { value: '3', label: 'Done' },
                                                            ]
                                                        }
                                                        onChange={e => values.status = e.value}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600 my-2" htmlFor="client">Client Name</label>
                                                    <Field type="text" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full sm:w-1/2 md:w-2/3" id="client" placeholder="Nama Client" name={`client`} />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600 my-2" htmlFor="no_hp">Phone Number</label>
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
                                                    <label className="block text-sm text-gray-600 my-2" htmlFor="date">Date</label>
                                                    <div className="flex items-center space-x-3">
                                                        <input type="date" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-1/2 md:w-1/3" id="date" onChange={date => values.date = date.target.value} />
                                                        <span className='text-gray-500'>
                                                            <BsCalendarDate size={30} className="mt-1" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600 my-2" htmlFor="time">Time</label>
                                                    <div className="flex items-center space-x-3">
                                                        <ReactDatePicker
                                                            className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-1/2 md:w-1/3"
                                                            selected={time}
                                                            onChange={(date) => {
                                                                setTime(date)
                                                                values.time = moment(date).format('HH:mm:ss')
                                                            }}
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            timeIntervals={15}
                                                            dateFormat="h:mm aa"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600 my-2" htmlFor="location">Location</label>
                                                    <Field type="text" className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-4/5 md:w-1/2" id="location" name={`location`} />
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <div>
                                                    <label className="block text-sm text-gray-600 my-2" htmlFor="username">Thumbnail Project</label>
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
                                                    <label className="block text-sm text-gray-600 my-2" htmlFor="package">Package</label>
                                                    <ReactSelect
                                                        className='w-4/5 md:w-2/3 lg:w-1/2'
                                                        placeholder="Select Package..."
                                                        options={
                                                            packages.map(item => {
                                                                return {
                                                                    value: item.id,
                                                                    label: item.name
                                                                }
                                                            })
                                                        }
                                                        onChange={e => values.package_id = e.value}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm text-gray-600 my-2" htmlFor="user_assignment">Assign to</label>
                                                    <ReactSelect
                                                        className='w-4/5 md:w-2/3 lg:w-1/2'
                                                        placeholder="Select Users..."
                                                        options={
                                                            users.map(item => {
                                                                return {
                                                                    value: item.id,
                                                                    label: item.name
                                                                }
                                                            })
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
