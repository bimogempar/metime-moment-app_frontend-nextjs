import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calendar() {
    return (
        <div className="mb-5">
            <h1 className="mb-5 text-2xl font-extralight">Calendar</h1>
            <div className="bg-white p-5 rounded-xl">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    locale="id"
                    initialView="dayGridMonth"
                    initialEvents={[{ title: 'initial event', start: new Date() }]}
                />
            </div>
        </div>
    )
}