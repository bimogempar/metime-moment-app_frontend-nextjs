import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import nookies from 'nookies'
import Link from 'next/link'
import Image from 'next/image'
import UserPlaceholder from '../../../public/img/userplaceholder.png'
import ModalNewEmployee from './Modal/ModalNewEmployee'
import ModalDeleteEmployee from './Modal/ModalDeleteEmployee'
import { BsTrash } from 'react-icons/bs'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik';
import * as Yup from 'yup'

export default function Employee() {
    const [search, setSearch] = useState({
        s: '',
    })
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [employees, setEmployees] = useState([])
    const [empDelete, setEmpDelete] = useState()

    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const buttonRef = useRef(null);

    const cookies = nookies.get()
    const token = cookies.token

    const handleSearchEvent = (e) => {
        setSearch({
            s: e
        })
    }

    useEffect(() => {
        const searchUser = async () => {
            const arr = []

            if (search.s == '') {
                setPage(1)
            }

            if (search.s) {
                arr.push(`s=${search.s}`)
                setPage(1)
            }

            axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users?${arr.join('&')}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(res => {
                    const responseData = res.data.users
                    setEmployees(responseData)
                    setLastPage(res.data.last_page)
                })
        }
        searchUser()
    }, [search.s, token])

    const handleLoadMore = (e) => {
        setPage(page + 1)
        axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users?page=${page + 1}`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                setEmployees([...employees, ...res.data.users])
            })
    }

    const handleDeleteEmployee = (e) => {
        setEmpDelete(e)
        setIsOpenDelete(true)
    }

    const deleteEmployee = (id) => {
        axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/users/${id}/delete`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => {
                setEmployees(employees.filter(employee => employee.id !== id))
                setIsOpenDelete(false)
                toast.success(res.data.message)
            }).catch(err => {
                toast.error(err.response.data.message)
            })
    }

    const handleNewEmployee = (e) => {
        setIsOpenCreate(true)
    }

    const formikUsers = useFormik({
        initialValues: {
            name: '',
            email: '',
            username: '',
            role: '1',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Name must be at least 3 characters')
                .max(40, 'Name must be less than 40 characters'),
            username: Yup.string()
                .min(3, 'Username must be at least 3 characters')
                .max(20, 'Username must be less than 20 characters'),
            email: Yup.string()
                .email('Invalid email address'),
            role: Yup.string()
                .required('Role is required'),
        }),
        onSubmit: values => {
            const register = axios.post(`${process.env.NEXT_PUBLIC_URL}/api/register`, values, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
                .catch(err => {
                    setIsOpenCreate(false)
                })
                .then(res => {
                    if (res.data.error) {
                        setIsOpenCreate(false)
                        return catchError(res.data.error)
                    }
                    setEmployees([...employees, res.data.user])
                    setIsOpenCreate(false)
                    formikUsers.resetForm()
                })
            toast.promise(register, {
                loading: 'Loading',
                error: 'Failed to create user',
                success: 'User created successfully',
            });
        }
    })

    return (
        <div className="grid grid-cols-1 gap-5 bg-white p-5 rounded-xl">
            <Toaster />
            <div className="flex gap-x-3 justify-between align-items-center">
                <div className="flex bg-gray-100 p-2 w-2/5 xl:w-1/4 space-x-4 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input className="bg-gray-100 w-full outline-none text-gray-500" type="text" placeholder="Search" onKeyUp={e => handleSearchEvent(e.target.value)} />
                </div>
                <button className="bg-gray-100 text-gray-500 p-2 rounded-xl" onClick={handleNewEmployee}>New Employee</button>
            </div>
            <div className="p-2">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Nama</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Username</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Email</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">No Telepon</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Role</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Projects</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Action</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            {
                                employees.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1).map(employee => (
                                    <tr key={employee.id}>
                                        <Link href={'/userprofile/' + employee.username} passHref>
                                            <td className="p-2 whitespace-nowrap cursor-pointer">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                        <Image className="rounded-full" src={!employee.img ? UserPlaceholder : process.env.NEXT_PUBLIC_URL + '/storage/img_user/' + employee.img
                                                        } alt="Alex Shatov" width={40} height={40} />
                                                    </div>
                                                    <div className="font-medium text-gray-800">{employee.name}</div>
                                                </div>
                                            </td>
                                        </Link>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left font-medium">{employee.username}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{employee.email}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-sm text-center">{employee.no_hp}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-sm text-center bg-yellow-200 text-yellow-700 py-1 rounded-lg">{employee.role == 1 && "Employee" || employee.role == 2 && "Manager" || employee.role == 3 && "Admin"}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-center text-amber-600">{employee.projects.length}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap flex justify-center">
                                            <div className="text-md text-center inline-flex p-1 rounded-md bg-red-500 text-white cursor-pointer" onClick={e => handleDeleteEmployee(employee)}><BsTrash /></div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-end">
                {
                    page < lastPage || page != lastPage ?
                        <button className='bg-gray-200 text-gray-500 rounded-lg p-2' onClick={handleLoadMore}>Load more</button>
                        : null
                }
            </div>
            <ModalDeleteEmployee setIsOpen={setIsOpenDelete} isOpen={isOpenDelete} buttonRef={buttonRef} data={empDelete} deleteEmployee={deleteEmployee} title="Are you sure to delete?" />
            <ModalNewEmployee setIsOpen={setIsOpenCreate} isOpen={isOpenCreate} buttonRef={buttonRef} formikUsers={formikUsers} title="Create New Employee" />
        </div >
    )
}
