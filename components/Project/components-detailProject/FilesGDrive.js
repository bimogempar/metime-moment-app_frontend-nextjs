/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import notYetImg from './../../../public/img/not-yet.png'

export default function FilesGDrive({ filesGDrive, dirGDrive }) {
    // console.log(filesGDrive)
    return (
        <div className="p-5">
            <h1 className="text-gray-600 my-5 text-2xl font-extralight">
                Gallery
            </h1>
            {
                filesGDrive == 'No such folder' || filesGDrive.length == 0 ?
                    <div className="grid grid-cols-3 gap-2">
                        <a href={`https://drive.google.com/drive/folders/${dirGDrive}`} target="_blank" rel="noopener noreferrer">
                            <Image alt='Add Files' className='rounded-lg' src={notYetImg} />
                        </a>
                    </div>
                    :
                    <div className='flex flex-col m-auto p-auto'>
                        <div className="flex overflow-x-auto hide-scroll-bar">
                            <div className="flex -ml-2 flex-nowrap cursor-grab" draggable="true">
                                {filesGDrive.map((file, index) => (
                                    <div className='px-2' key={index}>
                                        <a href={`https://drive.google.com/drive/folders/${file.dirname}`} target="_blank" rel="noopener noreferrer">
                                            <img className="h-56 object-cover max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out" src={file.path} alt="Files Google Drive" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                            <style dangerouslySetInnerHTML={{ __html: "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n" }} />
                        </div>
                    </div>
            }
        </ div>
    )
}
