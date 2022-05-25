import React from 'react'
import { BiAddToQueue } from 'react-icons/bi'
import { BsTrash } from 'react-icons/bs'

export default function Checklist({ permissions, features, deleteFeature, handleClickCB, formikFeatures, }) {
    return (
        <div className="p-5">
            <h1 className="text-gray-600 text-2xl font-extralight">
                Checklist
            </h1>
            {permissions ? features.map((feature) => {
                return (
                    <div className="mt-3 gap-3" key={feature.id}>
                        <div className="flex text-gray-600 items-center gap-3 bg-gray-100 p-2 px-4 inline-flex rounded-lg">
                            <input
                                type="checkbox"
                                id={feature.id}
                                name={feature.feature}
                                value={feature.feature}
                                defaultChecked={feature.status === 1}
                                onChange={() => handleClickCB(feature)}
                            />
                            <p>{feature.feature}</p>
                            <button type="button" className="ml-5" onClick={() => deleteFeature(feature.id)}><BsTrash /></button>
                        </div>
                    </div>
                )
            }) :
                features.map((feature) => {
                    return (
                        <div className="mt-3 gap-3" key={feature.id}>
                            <div className="flex text-gray-600 items-center gap-3 bg-gray-100 p-2 px-4 inline-flex rounded-lg">
                                <input
                                    type="checkbox"
                                    id={feature.id}
                                    name={feature.feature}
                                    value={feature.feature}
                                    defaultChecked={feature.status === 1}
                                    onChange={() => handleClickCB(feature)}
                                    disabled
                                />
                                <p>{feature.feature}</p>
                            </div>
                        </div>
                    )
                })}
            {permissions &&
                <form onSubmit={formikFeatures.handleSubmit}>
                    <div className="flex items-center mt-3 gap-3">
                        <input id="features" name="feature" value={formikFeatures.values.feature} onChange={formikFeatures.handleChange} type="text" placeholder="Add new feature" className="p-2 bg-gray-100 rounded-lg w-full sm:w-1/2 md:w-1/2" />
                        <button type="submit" className="bg-blue-500 p-3 rounded-lg"> <BiAddToQueue className="text-white" /> </button>
                    </div>
                </form>
            }
        </div>
    )
}
