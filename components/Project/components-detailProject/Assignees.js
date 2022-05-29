/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function Assignees({ users }) {
    return (
        <div>
            <h2 className="text-sm font-light text-gray-500 uppercase">Assignees</h2>
            {
                users.map(user => {
                    return (
                        <img key={user.id} className="relative z-1 inline object-cover w-8 h-8 border-2 border-white rounded-full mt-2" src="../../../img/ade.png" alt="Profile image" />
                    )
                })
            }
        </div>
    )
}
