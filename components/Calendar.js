import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import nookies from 'nookies';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

export default function Calendar() {
    const [projects, setProjects] = useState([])
    const router = useRouter();

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

    const handleClick = (e) => {
        // console.log(e.event._def.extendedProps.slug)
        // router.push(`/projects/${e.event._def.extendedProps.slug}`)
        window.open(`/projects/${e.event._def.extendedProps.slug}`, '_blank', 'noopener,noreferrer')
    }

    const handleMouseEnter = (info) => {
        // if (info.event.extendedProps.slug) {
        //     console.log(info.event.extendedProps.slug)
        // }
        // console.log(info)
    };

    const handleMouseLeave = (info) => {
        // console.log('leave')
    };

    const toolTip = (e) => {
        <div className="relative flex flex-col items-center group">
            children
            <div className="absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">message</span>
                <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-600"></div>
            </div>
        </div>
    }

    return (
        <div className="mb-5">
            <h1 className="mb-5 text-2xl font-extralight">Calendar</h1>
            <div className="w-full sm:w-3/4 bg-white p-5 rounded-xl">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    locale="id"
                    initialView="dayGridMonth"
                    // dateClick={(info) => console.log(info)}
                    nowIndicator={true}
                    eventClick={(info) => handleClick(info)}
                    eventMouseEnter={handleMouseEnter}
                    eventMouseLeave={handleMouseLeave}
                    eventSources={
                        [
                            projects.map(project => {
                                return {
                                    key: project.id,
                                    slug: project.slug,
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