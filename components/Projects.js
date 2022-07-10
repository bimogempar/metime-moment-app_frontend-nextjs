import { BiLoader, BiAddToQueue } from 'react-icons/bi'
import { useContext, useEffect } from 'react'
import nookies from 'nookies';
import axios from 'axios';
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import toast, { Toaster } from 'react-hot-toast'
import { UserContext } from './context/userContext'
import ModalCreateProject from '../components/Project/ModalCreateProject'
import ModalDeleteProject from '../components/Project/ModalDeleteProject'
import CardProject from './CardProject'
import Pusher from 'pusher-js'

export default function Project(props) {
    const userContext = useContext(UserContext)

    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(2)
    const [projects, setProjects] = useState([])
    const [search, setSearch] = useState({
        s: '',
        category: '',
    })
    const [projectsData, setProjectsData] = useState([])
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [dataModalDelete, setDataModalDelete] = useState([{}])

    const cookies = nookies.get()
    const token = cookies.token

    const searchData = (s) => {
        setSearch({ s })
        setPage(1)
    }

    const filterCategory = (category) => {
        setSearch({ category })
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
            auth: {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            },
            authEndpoint: `${process.env.NEXT_PUBLIC_URL}/api/broadcasting/auth`,
            cluster: 'ap1',
            encrypted: true,
        });

        var channel = pusher.subscribe('project-channel');
        channel.bind('project-event', function (data) {
            // alert(JSON.stringify(data));
            // console.log(data.project.message)
            toast(data.project.message, { icon: '🔥' })
            fetchProjects()
        });

        const fetchProjects = async () => {
            const arr = []

            if (search.s === '' || search.category === '') {
                arr.push(`page=1`)
            }

            if (search.s) {
                arr.push(`s=${search.s}`)
            }

            if (search.category) {
                arr.push(`category=${search.category}`)
            }

            if (startDate && endDate) {
                arr.pop()
                arr.push(`start=${startDate.toISOString().slice(0, 10)}`)
                arr.push(`end=${endDate.toISOString().slice(0, 10)}`)
            }

            axios.get(`${process.env.NEXT_PUBLIC_URL}/api/projects?${arr.join('&')}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
                .then(function (response) {
                    const fetchProjects = response.data
                    setProjects(fetchProjects)
                    setProjectsData(fetchProjects.data)
                    setLastPage(response.data.last_page)
                })
                .catch(function (error) {
                    // console.log(error);
                })
        }

        return () => {
            fetchProjects()
            channel.unbind('project-event')
            channel.unsubscribe('project-channel')
        }

    }, [search, startDate, endDate, token, userContext.user.id])

    const handleLoadMore = async (e) => {
        setPage(page + 1)
        await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/projects?page=${page + 1}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
            .then(function (response) {
                setLastPage(response.data.last_page)
                setProjectsData(projectsData.concat(response.data.data))
            })
            .catch(function (error) {
                // console.log(error);
            })
    }

    if (projects.data === undefined) {
        return <div className="flex justify-center items-center h-screen">
            <BiLoader className="text-6xl text-gray-400" />
        </div>
    }

    const deleteProject = (id) => {
        const deletePromise = axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/projects/${id}/delete`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
            .catch(function (error) {
                // console.log(error);
            })
            .then(function (response) {
                // console.log(response)
                setLastPage(lastPage)
                setProjectsData(projectsData.filter(project => project.id !== id))
                setIsOpenDelete(false)
            })
        toast.promise(deletePromise, {
            loading: 'Loading',
            error: 'Failed delete project',
            success: 'Delete project successfully',
        });
    }

    const handleClickDeleteProject = (data) => {
        setDataModalDelete(data)
        setIsOpenDelete(true)
    }

    const handleClickCreateProject = () => {
        setIsOpenCreate(true)
    }

    return (
        <div className="mb-5" >
            <Toaster />

            <h1 className="mb-5 text-2xl font-extralight">{props.head}</h1>

            <div className="mb-5">
                <button onClick={() => handleClickCreateProject()} className="transition ease-in-out duration-200 text-gray-500 bg-gray-100 hover:bg-white p-2 rounded-lg flex items-center"><BiAddToQueue className="mr-2" />Create new project</button>
            </div>

            <div className="flex flex-wrap align-items-center justify-between items-center mb-5 gap-3">
                <div className="flex gap-x-3 justify-between align-items-center">
                    <div className="flex bg-gray-100 p-2 w-72 space-x-4 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input className="bg-gray-100 outline-none" type="text" placeholder="Search" onKeyUp={e => searchData(e.target.value)} />
                    </div>
                </div>
                <div className="flex gap-x-3 justify-between">
                    <select className="bg-gray-100 p-2 rounded-xl text-gray-500" onChange={e => filterCategory(e.target.value)}>
                        <option value="">Filter Status</option>
                        <option value="1">On Scheduled</option>
                        <option value="2">On Progress</option>
                        <option value="3">Done</option>
                    </select>
                    <div>
                        <ReactDatePicker
                            className="bg-gray-100 p-2 rounded-xl text-gray-500"
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Search by date"
                            selectsRange
                        />
                    </div>
                </div>
            </div>

            {/* Modal Create Project */}
            <ModalCreateProject token={token} isOpenCreate={isOpenCreate} setIsOpenCreate={setIsOpenCreate} setProjectsData={setProjectsData} projectsData={projectsData} />

            {/* Modal Delete Project */}
            <ModalDeleteProject isOpenDelete={isOpenDelete} setIsOpenDelete={setIsOpenDelete} dataModalDelete={dataModalDelete} deleteProject={deleteProject} />

            {/* Card Project */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {
                    projectsData.sort((a, b) => (a.created_at < b.created_at) ? 1 : -1).map((project, index) => (
                        <CardProject key={index} project={project} handleClickDeleteProject={handleClickDeleteProject} />
                    ))
                }
            </div>

            <div className="flex justify-center my-5 gap-x-2">
                {
                    page < lastPage && projects.total != 0 ?
                        <button className="bg-white rounded-xl p-2" onClick={handleLoadMore}>
                            Load more
                        </button> : null
                }
            </div>

        </div >
    )
}