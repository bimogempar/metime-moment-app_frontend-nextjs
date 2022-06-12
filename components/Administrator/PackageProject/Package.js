import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import nookies from 'nookies'
import ModalEditPackage from './Modal/ModalEditPackage'
import { useFormik } from 'formik'
import ModalNewPackage from './Modal/ModalNewPackage'
import MdOutlineCreateNewFolder from 'react-icons/md'
import toast, { Toaster } from 'react-hot-toast'

export default function Package() {
    const [packagesProject, setPackagesProject] = useState([])
    const [eachPackage, setEachPackage] = useState(null)
    const [isOpenEdit, setIsOpenEdit] = useState(false)
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const buttonRef = useRef(null);

    const cookies = nookies.get()
    const token = cookies.token

    useEffect(() => {
        const getPackagesProject = async () => {
            axios.get(`${process.env.NEXT_PUBLIC_URL}/api/packages`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then(res => {
                    setPackagesProject(res.data.packages.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        getPackagesProject()
    }, [token])

    const handleShowList = (e) => {
        setIsOpenEdit(true)
        setEachPackage(e)
    }

    const handleDeletePackage = (e) => {
        if (confirm('Hapus package beserta package list?')) {
            const deletePackage = axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/packages/${e.id}/delete`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            })
                .catch(err => {
                    console.log(err)
                })
                .then(res => {
                    // console.log(res)
                    setPackagesProject(packagesProject.filter(item => item.id !== e.id))
                    setIsOpenEdit(false)
                })
            toast.promise(deletePackage, {
                loading: 'Loading',
                error: 'Failed to delete package',
                success: 'Package deleted successfully',
            });
        } else {
            return
        }
    }

    return (
        <div>
            <Toaster />
            <button onClick={() => setIsOpenCreate(true)} className="bg-white p-2 rounded-lg text-gray-500 mb-4 text-sm">Create new package</button>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    packagesProject && packagesProject.map((item, index) => {
                        return (
                            <div key={index} className="w-full p-4 bg-white rounded-xl flex flex-col">
                                <div className="flex justify-between items-start">
                                    <div className="text-xl font-light">{item.name}</div>
                                    <div className="font-light bg-green-200 text-green-800 p-1 rounded-lg text-sm">{item.price}</div>
                                </div>
                                <div className="flex-1 px-4 py-2 font-extralight">
                                    {item.package_list && item.package_list.map((subitem, index) => {
                                        return (
                                            <div key={index}>
                                                <li className="my-1">{subitem.name}</li>
                                            </div>
                                        )
                                    })}
                                </div>
                                <button className="bg-gray-100 mt-2 text-center p-2 text-gray-500 rounded-xl" onClick={(e) => handleShowList(item)}>Show</button>
                            </div>
                        )
                    })
                }
                <ModalEditPackage
                    isOpenEdit={isOpenEdit}
                    setIsOpenEdit={setIsOpenEdit}
                    buttonRef={buttonRef}
                    eachPackage={eachPackage}
                    packagesProject={packagesProject}
                    setPackagesProject={setPackagesProject}
                    handleDeletePackage={handleDeletePackage}
                />
                <ModalNewPackage
                    isOpenCreate={isOpenCreate}
                    setIsOpenCreate={setIsOpenCreate}
                    buttonRef={buttonRef}
                    packagesProject={packagesProject}
                    setPackagesProject={setPackagesProject}
                />
            </div>
        </div>
    )
}
