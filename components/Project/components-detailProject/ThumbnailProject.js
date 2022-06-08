/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import notYetImg from './../../../public/img/not-yet.png'

export default function ThumbnailProject({ project }) {
    return (
        <div className="p-5 text-2xl font-light">
            <img className='rounded-lg' src={project.thumbnail_img == null ? notYetImg : process.env.NEXT_PUBLIC_URL + '/storage/thumbnail_img/' + project.thumbnail_img} alt="Thumbnail Project" />
        </div>
    )
}
