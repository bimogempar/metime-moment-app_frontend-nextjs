import Image from 'next/image'
import React from 'react'
import UserPlaceholder from '../../../public/img/userplaceholder.png'

export default function Assignees({ users }) {
    return (
        <div>
            <h2 className="text-sm font-light text-gray-500 uppercase">Assignees</h2>
            <div className="grid grid-cols-6 gap-1 mt-2">
                {
                    users.map(user => {
                        return (
                            <Image key={user.id} className="rounded-full" src={!user.img ? UserPlaceholder : process.env.NEXT_PUBLIC_URL + '/storage/img_user/' + user.img
                            } alt="Profile image" width={25} height={25} />
                        )
                    })
                }
            </div>
        </div>
    )
}
