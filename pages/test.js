/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { BsChevronLeft, BsFillTelephoneOutboundFill, BsThreeDots, BsTrash } from 'react-icons/bs'
import { TiLocationOutline } from "react-icons/ti";
import { AiFillSchedule } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import Layout from '../components/Layout'
import { BiAddToQueue } from 'react-icons/bi';

const Test = () => {
    return (
        <Layout>
            <div className="mb-4">
                <button className="bg-white rounded-xl p-2 px-4" onClick={() => { router.back() }}>
                    <div className="flex gap-x-3 items-center">
                        <BsChevronLeft /> Back
                    </div>
                </button>
            </div>

            <div className="grid grid-cols-3 gap-5 mb-5">
                <div className="col-span-3 md:col-span-2 bg-white rounded-xl">
                    <div className="p-5">
                        <div className="flex items-center justify-between">
                            <h1 className=" text-2xl font-light">
                                This is client name
                            </h1>
                            <div className="mr-4">
                                <select name="" id="" className="p-2 bg-gray-200 text-gray-500 rounded-lg appearance-none">
                                    <option value="">On Schedule</option>
                                    <option value="">On Progress</option>
                                    <option value="">Done</option>
                                </select>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2 flex items-center gap-3"><BsFillTelephoneOutboundFill /> +62881-9417-402</p>
                    </div>

                    <h1 className="p-5 text-2xl font-light">
                        This is for image header
                    </h1>

                    <div className="p-5 grid grid-cols-2 gap-3 justify-items-start">
                        <div>
                            <h2 className="text-sm font-light text-gray-500 uppercase">Date</h2>
                            <h2 className="text-sm p-2 bg-gray-200 text-gray-600 rounded-lg mt-2">Kamis, 24 Juni 2022</h2>
                        </div>
                        <div>
                            <h2 className="text-sm font-light text-gray-500 uppercase">Team</h2>
                            <img className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full mt-2" src="img/ade.png" alt="Profile image" />
                            <img className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full mt-2" src="img/ade.png" alt="Profile image" />
                        </div>
                        <div>
                            <h2 className="text-sm font-light text-gray-500 uppercase">Location</h2>
                            <h2 className="text-sm p-2 text-gray-600 rounded-lg mt-2 flex items-center gap-2"><TiLocationOutline className="text-lg" /> Aston Hotel Madiun</h2>
                        </div>
                    </div>

                    <div className="p-5">
                        <h1 className="text-gray-600 text-2xl font-extralight">
                            Checklist
                        </h1>
                        <div className="mt-3 gap-3">
                            <div className="flex text-gray-600 items-center gap-3 bg-gray-100 p-2 px-4 inline-flex rounded-lg">
                                <input
                                    type="checkbox"
                                // id={feature.id}
                                // name={feature.feature}
                                // value={feature.feature}
                                // defaultChecked={feature.status === 1}
                                // onChange={() => handleClickCB(feature)}
                                // disabled
                                />
                                <p>This is checkbox </p>
                                <button className="ml-5"><BsTrash /></button>
                            </div>
                        </div>
                        <div className="flex items-center mt-3 gap-3">
                            <input type="text" placeholder="Add new feature" className="p-2 bg-gray-100 rounded-lg w-full sm:w-1/2 md:w-1/2" />
                            <button className="bg-blue-500 p-3 rounded-lg"> <BiAddToQueue className="text-white" /> </button>
                        </div>
                    </div>

                    <div className="p-5">
                        <h1 className="text-gray-600 text-2xl font-extralight">
                            Comment
                        </h1>
                        <div className="flex gap-3 items-start mt-3">
                            <img className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full" src="img/ade.png" alt="Profile image" />
                            <div>
                                <div>
                                    <textarea className="bg-gray-100 rounded-lg p-3 text-gray-600 w-full md:w-7/8" placeholder="Input your progress..." cols="50" name="" id="" />
                                </div>
                                <div className="flex justify-end mt-1">
                                    <button className="bg-green-500 p-2 rounded-lg flex items-center gap-2 text-white text-sm"> <FiSend /> Send</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-3/4 gap-3 items-start mt-4">
                            <img className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full" src="img/ade.png" alt="Profile image" />
                            <div className="g">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-gray-700">Ade Novan Guliaano</h4>
                                    <h4 className="text-sm text-gray-500">4 min ago</h4>
                                </div>
                                <p className="text-gray-500 text-sm mt-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae temporibus ex perspiciatis? Nemo blanditiis quasi commodi obcaecati facere, quia unde.</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-span-2 md:col-span-1 sm:col-span-2 rounded-xl">
                    <div className="p-5 bg-white rounded-xl">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque, atque?
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Test