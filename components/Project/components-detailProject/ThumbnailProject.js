import Image from 'next/image'
import React from 'react'
import notYetImg from './../../../public/img/not-yet.png'

export default function ThumbnailProject({ project, inputClient, imageRef, formikProjects }) {
    const [thumbnail, setThumbnail] = React.useState(project.thumbnail_img == null ? notYetImg : process.env.NEXT_PUBLIC_URL + '/storage/thumbnail_img/' + project.thumbnail_img)

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0]
        if (file) {
            setThumbnail(URL.createObjectURL(file))
            formikProjects.setFieldValue('thumbnail_img', file)
        }
    }
    return (
        <div className="p-5 text-2xl font-light">
            <Image className='rounded-lg' src={thumbnail} alt="Thumbnail Project" width={1080} height={720} objectFit="cover" objectPosition="center" />
            {inputClient &&
                <div className="flex m-5 justify-center">
                    <input
                        type="file"
                        className="text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100
                                "
                        ref={imageRef}
                        onChange={e => { handleChangeAvatar(e) }}
                    />
                </div>
            }
        </div>
    )
}
