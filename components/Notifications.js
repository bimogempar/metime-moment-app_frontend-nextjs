import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Pusher from 'pusher-js'
import nookies from 'nookies';
import { MdOutlineNotifications } from 'react-icons/md'
import { UserContext } from './context/userContext';
import ModalNotifications from './ModalNotifications';

export default function Notifications() {
    const [message, setMessage] = useState('')
    const [countMessage, setCountMessage] = useState(0)
    const cookies = nookies.get()
    const token = cookies.token
    const { user } = useContext(UserContext);

    const [isOpenNotifications, setIsOpenNotifications] = useState(false)
    const buttonRef = useRef();

    useEffect(() => {
        if (user.length !== 0) {
            ((user.length === 0) ? console.log('user is empty') :
                axios.get(`${process.env.NEXT_PUBLIC_URL}/api/notifications/${user.id}`, {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }).then(res => {
                    // console.log(res.data)
                    setMessage(res.data.notifications)
                    setCountMessage(res.data.notifications.length)
                })
            )

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

            var channel = pusher.subscribe('private-notif-user.' + user.id);
            channel.bind('notif-user', function (data) {
                // alert(JSON.stringify(data));
                setMessage((prev) => [...prev, data.message])
                setCountMessage((countMessage) => countMessage + 1)
            });

            return () => {
                channel.unbind('private-notif-user')
                channel.unsubscribe('notif-user')
            }
        }
    }, [token, user, user.id])

    return (
        <div className="mb-5">
            <h1 className="mb-5 text-2xl font-extralight">Notifications</h1>
            <div className="bg-white rounded-lg p-3 w-3/5 md:w-2/5 xl:w-1/5 space-y-2 cursor-pointer" onClick={() => setIsOpenNotifications(true)}>
                {
                    countMessage !== 0 &&
                    <div className="text-right">
                        <span className="bg-red-400 text-red-600 text-md font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">{countMessage}</span>
                    </div>
                }
                <div className='flex justify-center text-gray-400'>
                    <MdOutlineNotifications size={100} />
                </div>
                <div className="text-center">
                    <h1 className="text-sm md:text-lg font-extralight">Notification</h1>
                    <p className="text-gray-400 text-xs md:text-sm">
                        {
                            countMessage === 0 ?
                                "You have no notification"
                                :
                                "You have " + countMessage + " notification"
                        }
                    </p>
                </div>
            </div>
            <ModalNotifications setIsOpenNotifications={setIsOpenNotifications} isOpenNotifications={isOpenNotifications} buttonRef={buttonRef} notifications={message} />
        </div >
    )
}
