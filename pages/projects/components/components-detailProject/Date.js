import React from 'react'
import { BsCalendarDate } from 'react-icons/bs'
import moment from 'moment';

export default function Date({ valueDate, formikProjectHandleChange, inputClient }) {
    return (
        <div>
            {/* Date */}
            <h2 className="text-sm font-light text-gray-500 uppercase">Date</h2>
            {
                inputClient ?
                    <input className="text-sm p-2 bg-gray-200 text-gray-600 rounded-lg mt-2" type="date" id="date" name="date" defaultValue={valueDate} onChange={formikProjectHandleChange} />
                    :
                    <p className="flex items-center gap-2 text-sm p-2 bg-gray-200 text-gray-600 rounded-lg mt-2">{moment(valueDate).format('D MMM YY')} <BsCalendarDate /></p>
            }
        </div>
    )
}
