import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { useEffect, useState } from "react";

export default function Test() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState({ s: '' })

    const searchData = (s) => {
        setSearch({ s })
        // console.log(search)
    }

    useEffect(() => {
        const fetchData = async () => {
            const arr = []

            if (search.s) {
                arr.push(`s=${search.s}`)
            }

            const response = await fetch(`http://127.0.0.1:8000/api/testing/projects?${arr.join('&')}`)
            const data = await response.json()
            setData(data)
            // console.log(data)
        }

        fetchData()
    }, [search])

    return (
        <div>
            <input type="text" placeholder="Enter your name" onKeyUp={e => searchData(e.target.value)} />
            <ul>
                {data.map(project => (
                    <li key={project.id}>
                        {project.client}
                    </li>
                ))}
            </ul>
        </div>
    )
}