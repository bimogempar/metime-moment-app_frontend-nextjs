import React from 'react'
import { BsFillPrinterFill } from 'react-icons/bs'

export default function PrintInvoice({ project }) {
    return (
        <div className="p-5 bg-white rounded-xl">
            <div className="grid grid-cols-1">
                <h2 className="text-sm font-light text-gray-500 uppercase">Print Invoices</h2>
                <div className="mt-2 text-gray-500 hover:text-gray-600">
                    <a className='flex items-center space-x-2 cursor-pointer' href={`/projects/${project.slug}/print`} target={"_blank"} rel="noreferrer"><BsFillPrinterFill />
                        <div className="text-gray-500 hover:text-gray-700 text-sm">#{project.slug}</div>
                    </a>
                </div>
            </div>
        </div>
    )
}
