import React, { useContext, useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import nookies from 'nookies';
import { UserContext } from '../../components/context/userContext';

export default function NotifUserPusher() {
    const [message, setMessage] = useState('')
    const cookies = nookies.get()
    const token = cookies.token
    const userContext = useContext(UserContext);

    useEffect(() => {
        // Enable pusher logging - don't include this in production
        // Pusher.logToConsole = true;
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

        var channel = pusher.subscribe('private-notif-user.' + userContext.user.id);
        channel.bind('notif-user', function (data) {
            // alert(JSON.stringify(data));
            // console.log(data.message.message)
            setMessage(data.message.message)
        });
    }, [cookies.user_id, token, userContext.user.id])

    return (
        <div>{message}</div>
    )
}