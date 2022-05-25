import React from 'react'
import { TiLocationOutline } from 'react-icons/ti'

export default function Location({ inputClient, valueLocation, formikProjects }) {
    return (
        <div>
            {/* Location */}
            <h2 className="text-sm font-light text-gray-500 uppercase">Location</h2>
            {
                inputClient ?
                    <div className="flex gap-2 items-center">
                        <TiLocationOutline className="text-2xl text-gray-500" /><input className="p-2 bg-gray-100 w-full text-gray-500 mt-2 rounded-lg" type="text" name="location" id="location" value={formikProjects.values.location} onChange={formikProjects.handleChange} />
                    </div>
                    :
                    <h2 className="text-sm p-2 text-gray-600 rounded-lg mt-2 flex items-center gap-2"><TiLocationOutline className="text-lg" /> {valueLocation}</h2>
            }
        </div>
    )
}
