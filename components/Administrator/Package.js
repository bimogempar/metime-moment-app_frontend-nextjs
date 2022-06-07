import React from 'react'

export default function Package() {
    return (
        <div className="w-full p-3 bg-white rounded-xl flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <div className="text-xl font-light">Simple Wedding Package</div>
                <div className="font-light bg-green-200 text-green-800 p-1 rounded-lg text-sm">5.430</div>
            </div>
            <div className="flex-1 font-extralight">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, magni?
            </div>
            <div className="bg-gray-100 mt-2 text-center p-2 text-gray-500 rounded-xl">Show</div>
        </div>
    )
}
