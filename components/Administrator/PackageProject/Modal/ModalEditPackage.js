import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { BsTrash } from 'react-icons/bs';
import { BiAddToQueue, BiTrash } from 'react-icons/bi';

export default function ModalEditPackage({ setIsOpen, isOpen, buttonRef, eachPackage, setPackagesProject }) {
    // console.log(formikPackage.values.package_list)
    // console.log(eachPackage)
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
                        <div className="relative bg-white w-3/5 my-5 rounded-md p-5">
                            <div className="flex justify-between">
                                <h1 className="text-gray-700 font-light text-2xl">Edit Package</h1>
                                <h4 className="text-white font-light text-md p-2 rounded-lg flex items-center gap-2 bg-red-500 hover:bg-red-600k cursor-pointer" onClick={(e) => alert('Hapus package!')}><BiTrash /> Hapus Package</h4>
                            </div>
                            <Formik
                                initialValues={{
                                    name: eachPackage ? eachPackage.name : '',
                                    price: eachPackage ? eachPackage.price : '',
                                    package_list: eachPackage ? eachPackage.package_list.map(item => ({ name: item.name, price: item.price })) : [],
                                }}
                                onSubmit={values => alert(JSON.stringify(values, null, 2))}
                            >
                                {({ values }) => (
                                    <Form>
                                        <div className='grid grid-cols-3 gap-3'>
                                            <div className='col-span-2'>
                                                <label className="block text-sm text-gray-600  my-2" htmlFor="name">Name Package</label>
                                                <Field placeholder="Package name" name={`name`} className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="name" />
                                                <ErrorMessage name={`name`} />
                                            </div>
                                            <div className='col-span-1'>
                                                <label className="block text-sm text-gray-600  my-2" htmlFor="price">Harga Package</label>
                                                <Field placeholder="Package name" name={`price`} className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" />
                                                <ErrorMessage name={`price`} />
                                            </div>
                                        </div>

                                        <h1 className="text-gray-700 font-light text-lg my-4">Package List</h1>

                                        <FieldArray
                                            name="package_list"
                                            render={arrayHelpers => {
                                                const package_list = values.package_list;
                                                // console.log(package_list)
                                                return (
                                                    <div>
                                                        {package_list && package_list.length > 0
                                                            ? package_list.map((item, index) => (
                                                                <div key={index}>
                                                                    <div className='grid grid-cols-8 gap-3'>
                                                                        <div className="col-span-1 justify-self-center">
                                                                            <label className="block text-sm text-gray-600 my-2" htmlFor="name">Action</label>
                                                                            <button type="button" onClick={() => arrayHelpers.remove(index)} className="bg-gray-400 hover:bg-gray-600 text-white font-bold p-2 rounded-lg text-white"><BsTrash /></button>
                                                                        </div>
                                                                        <div className='col-span-5'>
                                                                            <label className="block text-sm text-gray-600  my-2" htmlFor="name">Name Package List</label>
                                                                            <Field placeholder="Package name" name={`package_list[${index}].name`} className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="name" />
                                                                            <ErrorMessage name={`package_list[${index}].name`} />
                                                                        </div>
                                                                        <div className="col-span-2">
                                                                            <label className="block text-sm text-gray-600  my-2" htmlFor="name">Price Package List</label>
                                                                            <Field placeholder="price" name={`package_list.${index}.price`} className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" />
                                                                            <ErrorMessage name={`item.${index}.price`} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                            : null}
                                                        <h1 className="text-gray-700 font-light text-lg mt-4 mb-2">Add new package list... </h1>
                                                        <div className='flex m-5'>
                                                            <button className='bg-blue-500 hover:bg-blue-700 p-2 rounded-lg text-white' type="button" onClick={() => arrayHelpers.push({ name: "", price: "" })}>
                                                                <BiAddToQueue />
                                                            </button>
                                                        </div>
                                                        <div className='flex justify-end'>
                                                            <button type="submit" className='bg-green-500 hover:bg-green-600 rounded-lg text-white p-2'>Submit</button>
                                                        </div>
                                                    </div>
                                                );
                                            }}
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition >
    )
}
