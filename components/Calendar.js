import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import nookies from 'nookies';
import axios from 'axios';
import { useState, useEffect } from 'react'

export default function Calendar() {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchProjects = async () => {
            const cookies = nookies.get()
            const token = cookies.token

            axios.get(`${process.env.NEXT_PUBLIC_URL}/api/projects`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
                .then(function (response) {
                    const fetchProjects = response.data
                    setProjects(fetchProjects.data)
                })
                .catch(function (error) {
                    // console.log(error);
                })
        }

        fetchProjects()
    }, [])

    return (
        <div className="mb-5">
            <h1 className="mb-5 text-2xl font-extralight">Calendar</h1>
            <div className="bg-white p-5 rounded-xl">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    locale="id"
                    initialView="dayGridMonth"
                    dateClick={(info) => console.log(info)}
                    nowIndicator={true}
                    eventSources={
                        [
                            projects.map(project => {
                                return {
                                    key: project.id,
                                    title: project.client,
                                    start: project.date,
                                }
                            })
                        ]
                    }
                />
            </div>
        </div>
    )
}