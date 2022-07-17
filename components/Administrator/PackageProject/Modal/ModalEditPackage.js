import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { BsTrash } from 'react-icons/bs';
import { BiAddToQueue, BiTrash } from 'react-icons/bi';
import axios from 'axios';
import nookies from 'nookies'
import toast, { Toaster } from 'react-hot-toast'
import CurrencyFormat from 'react-currency-format';

export default function ModalEditPackage({ setIsOpenEdit, isOpenEdit, buttonRef, eachPackage, setPackagesProject, packagesProject, handleDeletePackage }) {
    const id = eachPackage && eachPackage.id
    return (
        <Transition as={Fragment} show={isOpenEdit}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => setIsOpenEdit(false)} initialFocus={buttonRef}>
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
                        <div className="relative w-4/5 lg:w-1/2 xl:w-1/2 bg-white my-5 rounded-md p-5">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex justify-between">
                                    <h1 className="text-gray-700 font-light text-2xl">Edit package</h1>
                                    <button className='bg-red-500 hover:bg-red-600 p-2 text-white rounded-lg' onClick={() => handleDeletePackage(id)}><BsTrash /></button>
                                </div>
                                <hr />
                                <Formik
                                    initialValues={{
                                        name: eachPackage ? eachPackage.name : '',
                                        price: eachPackage ? eachPackage.price : '',
                                        package_list: eachPackage ? eachPackage.package_list.map(item => ({ name: item.name, price: item.price ? item.price : '' })) : [],
                                    }}
                                    validationSchema={Yup.object({
                                        name: Yup.string()
                                            .required('Nama package harus diisi'),
                                        price: Yup.number()
                                            .required('Harga package harus diisi'),
                                        package_list: Yup.string().required(
                                            "Package list harus diisi"
                                        ),
                                        package_list: Yup.array().of(
                                            Yup.object().shape({
                                                name: Yup.string().required("Name required"),
                                            })
                                        )
                                    })}
                                    onSubmit={
                                        values => {
                                            // console.log(values)
                                            // alert(JSON.stringify(values, null, 2))
                                            // return
                                            const updatePackage = axios.post(`${process.env.NEXT_PUBLIC_URL}/api/packages/${id}/update`, values, {
                                                headers: {
                                                    'Authorization': 'Bearer ' + nookies.get().token,
                                                }
                                            })
                                                .catch(err => {
                                                    // console.log(err)
                                                })
                                                .then(res => {
                                                    // console.log(res)
                                                    setPackagesProject(packagesProject.map(item => item.id === eachPackage.id ? res.data.package : item))
                                                    setIsOpenEdit(false)
                                                })
                                            toast.promise(updatePackage, {
                                                loading: 'Loading',
                                                error: 'Failed to update package',
                                                success: 'Package updated successfully',
                                            });
                                        }
                                    }
                                >
                                    {({ values, isValid, setFieldValue }) => (
                                        <Form>
                                            <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                                                <div className='col-span-2'>
                                                    <label className="block text-sm text-gray-600  my-2" htmlFor="name">Name Package <span className='badge text-red-500'>*</span></label>
                                                    <Field placeholder="Package name" name={`name`} className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="name" />
                                                    <div className="text-red-500 text-sm mt-2">
                                                        <ErrorMessage name={`name`} />
                                                    </div>
                                                </div>
                                                <div className='col-span-1'>
                                                    <label className="block text-sm text-gray-600  my-2" htmlFor="price">Harga Package <span className='badge text-red-500'>*</span></label>
                                                    <CurrencyFormat
                                                        placeholder="Harga package"
                                                        onValueChange={
                                                            (values) => {
                                                                const { value } = values;
                                                                setFieldValue('price', value)
                                                            }
                                                        }
                                                        className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-1/2 md:w-full"
                                                        name={`price`}
                                                        value={values.price}
                                                        thousandSeparator={true}
                                                        prefix={"Rp. "}
                                                    />
                                                    <div className="text-red-500 text-sm mt-2">
                                                        <ErrorMessage name={`price`} />
                                                    </div>
                                                </div>
                                            </div>

                                            <h1 className="text-gray-700 font-light text-lg my-4">Package List</h1>

                                            <FieldArray
                                                name="package_list"
                                                render={arrayHelpers => {
                                                    const package_list = values.package_list;
                                                    // console.log(package_list)
                                                    const handleDeleteRow = (index) => {
                                                        if (package_list.length > 1) {
                                                            arrayHelpers.remove(index);
                                                        } else {
                                                            alert('Package list harus ada')
                                                        }
                                                    }
                                                    return (
                                                        <div>
                                                            {package_list && package_list.length > 0
                                                                ? package_list.map((item, index) => (
                                                                    <div key={index}>
                                                                        <div className='grid grid-cols-1 md:grid-cols-6 gap-3'>
                                                                            <div className="justify-self-start md:justify-self-center md:col-span-1">
                                                                                <label className="block text-sm text-gray-600 my-2" htmlFor="name">Action</label>
                                                                                <button type="button" onClick={() => handleDeleteRow(index)} className="bg-gray-400 hover:bg-gray-600 text-white font-bold p-2 rounded-lg text-white"><BsTrash /></button>
                                                                            </div>
                                                                            <div className='md:col-span-3'>
                                                                                <label className="block text-sm text-gray-600  my-2" htmlFor="name">Name Package List <span className='badge text-red-500'>*</span></label>
                                                                                <Field placeholder="Package name" name={`package_list[${index}].name`} className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-full" id="name" />
                                                                                <div className="text-red-500 text-sm mt-2">
                                                                                    <ErrorMessage name={`package_list[${index}].name`} />
                                                                                </div>
                                                                            </div>
                                                                            <div className='md:col-span-2'>
                                                                                <label className="block text-sm text-gray-600  my-2" htmlFor="name">Price Package List</label>
                                                                                {/* <Field placeholder="price" name={`package_list.${index}.price`} className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-1/2 md:w-full" /> */}
                                                                                <CurrencyFormat
                                                                                    placeholder="price"
                                                                                    onValueChange={
                                                                                        (values) => {
                                                                                            const { value } = values;
                                                                                            setFieldValue(`package_list[${index}].price`, value)
                                                                                        }
                                                                                    }
                                                                                    className="border rounded-lg px-3 py-2 mt-1 text-gray-600 text-sm w-1/2 md:w-full"
                                                                                    name={`package_list[${index}].price`}
                                                                                    thousandSeparator={true}
                                                                                    prefix={"Rp. "}
                                                                                    value={values.package_list[index].price}
                                                                                />
                                                                                <div className="text-red-500 text-sm mt-2">
                                                                                    <ErrorMessage name={`package_list.${index}.price`} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                                : null}
                                                            <h1 className="text-gray-700 font-light text-lg mt-4 mb-2">Add new package list... </h1>
                                                            <div className='flex m-5'>
                                                                <button className='bg-green-500 hover:bg-green-600 p-2 rounded-lg text-white' type="button" onClick={() => arrayHelpers.push({ name: "", price: "" })}>
                                                                    <BiAddToQueue />
                                                                </button>
                                                            </div>
                                                            <div className='flex justify-end'>
                                                                <button type="submit" className={`bg-blue-500 rounded-lg text-white p-2 ` + (isValid && `hover:bg-blue-600 cursor-pointer`)} disabled={!isValid}>Submit</button>
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
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition >
    )
}
