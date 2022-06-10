import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import nookies from 'nookies'
import ModalEditPackage from './Modal/ModalEditPackage'
import { useFormik } from 'formik'

export default function Package() {
    const [packagesProject, setPackagesProject] = useState([])
    const [eachPackage, setEachPackage] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
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
        setIsOpen(true)
        setEachPackage(e)
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {
                packagesProject && packagesProject.map((item, index) => {
                    return (
                        <div key={index} className="w-full p-4 bg-white rounded-xl flex flex-col">
                            <div className="flex justify-between items-start">
                                <div className="text-xl font-light">{item.name}</div>
                                <div className="font-light bg-green-200 text-green-800 p-1 rounded-lg text-sm">5.430</div>
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
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                buttonRef={buttonRef}
                eachPackage={eachPackage}
                setPackagesProject={setPackagesProject}
            />
        </div>
    )
}
