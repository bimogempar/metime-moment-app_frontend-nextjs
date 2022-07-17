import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import nookies from 'nookies';
import { UserContext } from './context/userContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Statistics() {
    const cookies = nookies.get()
    const token = cookies.token
    const { user } = useContext(UserContext);

    const [data, setData] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
        datasets: [{
            label: 'Statistic of Projects',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderWidth: 1,
        }],
    },
    )

    useEffect(() => {
        if (user.length !== 0) {
            ((user.length === 0) ? console.log('user is empty') :
                axios.get(`${process.env.NEXT_PUBLIC_URL}/api/count-project-by-month`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }).then(res => {
                    // console.log(res.data)
                    setData({
                        ...data,
                        datasets: [{
                            ...data.datasets[0],
                            data: Object.values(res.data)
                        }]
                    })
                    return
                })
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, user.id, user])

    return (
        <div className="mb-5">
            <h1 className="mb-5 text-2xl font-extralight">Statistic Project</h1>
            <div className="grid grid-cols-4">
                {/* Statistic */}
                <div className="bg-white col-span-4 lg:col-span-3 rounded-xl p-5">
                    <Bar
                        data={data}
                        height={250}
                        options={
                            {
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false
                                    }
                                }
                            }
                        }
                    />
                </div>
            </div>
        </div>
    )
}