import React, { useState } from 'react'
import ReactSelect from 'react-select'

export default function App({ data, setOrdered }) {
    const [option, setOption] = useState(null)
    const [defOption, setDefOption] = useState(
        [{ value: 'chocolate', label: 'Chocolate' }]
    )

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    console.log(option)
    return (
        <div className="m-10">
            Lorem ipsum dolor sit amet.
            <ReactSelect
                options={options}
                instanceId="react-select-single"
                defaultValue={defOption}
                onChange={(e) => setOption(e)}
                isMulti
            />
        </div>
    )
}
