import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function Calendar() {
    return (
        <div className="mb-5">
            <h1 className="mb-5 text-2xl font-extralight">Calendar</h1>
            <div className="bg-white p-5 rounded-xl">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    locale="id"
                    initialView="dayGridMonth"
                    initialEvents={[{ title: 'initial event', start: new Date() }]}
                    dateClick={(info) => console.log(info)}
                />
            </div>
        </div>
    )
}