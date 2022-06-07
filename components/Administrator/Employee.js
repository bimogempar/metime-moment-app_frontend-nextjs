import React from 'react'
import axios from 'axios'
import nookies from 'nookies'
import Link from 'next/link'
import Image from 'next/image'
import UserPlaceholder from '../../public/img/userplaceholder.png'

export default function Employee() {
    const [search, setSearch] = React.useState({
        s: '',
    })
    const [page, setPage] = React.useState(1)
    const [lastPage, setLastPage] = React.useState(1)
    const [employees, setEmployees] = React.useState([])

    const cookies = nookies.get()
    const token = cookies.token

    const handleSearchEvent = (e) => {
        setSearch({
            s: e
        })
    }

    React.useEffect(() => {
        const searchUser = async () => {
            const arr = []

            if (search.s == '') {
                setPage(1)
            }

            if (search.s) {
                arr.push(`s=${search.s}`)
                setPage(2)
            }

            axios.get(`${process.env.NEXT_PUBLIC_URL}/api/users?${arr.join('&')}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(res => {
                    const responseData = res.data.users
                    setEmployees(responseData)
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

    return (
        <div className="grid grid-cols-1 gap-5 bg-white p-5 rounded-xl">
            <div className="flex gap-x-3 justify-between align-items-center">
                <div className="flex bg-gray-100 p-2 w-2/5 xl:w-1/4 space-x-4 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input className="bg-gray-100 w-full outline-none" type="text" placeholder="Search" onKeyUp={e => handleSearchEvent(e.target.value)} />
                </div>
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
                                employees.map(employee => (
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
                                            <div className="text-left font-medium text-green-500">{employee.username}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{employee.email}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-sm text-center">{employee.no_hp}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-sm text-center bg-yellow-200 text-yellow-700 py-1 rounded-lg">{employee.role}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-center text-amber-600">{employee.projects.length}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-sm text-center">This Button</div>
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
                    page < lastPage || page == lastPage ?
                        <button className='bg-gray-200 rounded-lg p-2' onClick={handleLoadMore}>Load more</button>
                        : null
                }
            </div>
        </div >
    )
}
