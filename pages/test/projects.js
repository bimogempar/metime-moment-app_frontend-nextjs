import React, { useEffect, useState } from 'react'
import nookies from 'nookies';
import axios from 'axios';

export default function Projects() {
    const cookies = nookies.get()
    const token = cookies.token

    const [projects, setProjects] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState({
        s: ''
    })

    const searchEvent = (s) => {
        setSearch({ s: s })
    }

    useEffect(() => {
        const fetchProjects = async () => {
            const arr = []

            if (search.s == '') {
                arr.push(`page=1`)
            }

            if (search.s) {
                arr.push(`s=${search.s}`)
            }

            axios.get(`${process.env.NEXT_PUBLIC_URL}/api/projects?${arr.join('&')}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
                .then(function (response) {
                    setProjects(response.data.data)
                })
                .catch(function (error) {
                })
        }
        fetchProjects()
    }, [search.s, token])

    const handlePage = (e) => {
        setPage(page + 1)

        axios.get(`${process.env.NEXT_PUBLIC_URL}/api/projects?page=${page}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
            .then(function (response) {
                console.log('handlepage')
                setProjects(projects.concat(response.data.data))
            })
            .catch(function (error) {
            })
    }

    // console.log(projects)

    return (
        <div>
            <label htmlFor="search">Search</label>
            <input type="text" id='search' onKeyUp={e => searchEvent(e.target.value)} />
            {projects.map((project, index) => {
                return (
                    <div key={index}>
                        <h1>{project.client}</h1>
                    </div>
                )
            })
            }
            <button className='bg-white p-2' onClick={handlePage}>Load More</button>
        </div>
    )
}
