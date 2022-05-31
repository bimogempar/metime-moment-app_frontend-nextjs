import Image from 'next/image'
import React from 'react'
import UserPlaceholder from '../../../public/img/userplaceholder.png'

export default function Assignees({ users }) {
    return (
        <div>
            <h2 className="text-sm font-light text-gray-500 uppercase">Assignees</h2>
            {
                users.map(user => {
                    return (
                        <Image key={user.id} className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full mt-2" src={!user.img ? UserPlaceholder : process.env.NEXT_PUBLIC_URL + '/storage/img_user/' + user.img
                        } alt="Profile image" width={25} height={25} />
                    )
                })
            }
        </div>
    )
}
