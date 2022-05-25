import React from 'react'
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

export default function HeadProject({ clientName, projectStatus, projectPhone, formikProjects, formikProjectValueClient, formikProjectValuePhone, inputClient, formikProjectHandleChange, formikProjectHandleSubmit, permissions, setInputClient }) {
    return (
        <div className="p-5">
            <div className="flex items-center justify-between">
                {/* Client Name */}
                <div className="flex w-2/3 gap-2 text-2xl font-light">
                    {
                        inputClient ?
                            <div className="flex w-full gap-2">
                                <input className="p-2 bg-gray-100 w-full rounded-lg font-light" type="text" name="client" id="client" value={formikProjects.values.client} onChange={formikProjects.handleChange} />
                            </div>
                            :
                            <h1>{clientName}</h1>
                    }
                </div>
                {/* Status */}
                <div className="flex items-center gap-2">
                    {permissions ? <select className="p-2 bg-gray-200 text-gray-500 rounded-lg appearance-none" name="status" id="status" onChange={formikProjects.handleChange} onChangeCapture={formikProjects.handleSubmit} defaultValue={projectStatus} >
                        <option value="1">On Scheduled</option>
                        <option value="2">On Progress</option>
                        <option value="3">Done</option>
                    </select> : <h1 className="p-2 bg-gray-200 text-gray-500 rounded-lg appearance-none">{projectStatus === 1 ? 'On Scheduled' : projectStatus === 2 ? 'On Progress' : 'Done'}</h1>}
                    {/* Button Edit or Submit */}
                    {inputClient ?
                        <button className="bg-blue-500 p-3 rounded-lg text-white" type="button" onClick={formikProjects.handleSubmit}><FiSend /></button>
                        :
                        permissions ?
                            <button onClick={() => { inputClient ? setInputClient(false) : setInputClient(true) }} className="bg-yellow-400 text-white p-2 rounded-lg"><FaRegEdit size={20} /></button>
                            : null
                    }
                </div>
            </div>
            {/* Phone Number */}
            {
                inputClient ?
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <BsFillTelephoneOutboundFill /><input className="p-2 bg-gray-100 w-1/3 mt-2 rounded-lg" type="text" name="phone_number" id="phone_number" value={formikProjects.values.phone_number} onChange={formikProjects.handleChange} />
                    </div>
                    :
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-3"><BsFillTelephoneOutboundFill /> {projectPhone}</p>
            }
        </div>
    )
}
