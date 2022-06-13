import Link from 'next/link'
import React from 'react'

export default function Custom404() {
    return (
        <div className='bg-white w-full flex justify-center items-center min-h-screen text-3xl font-extralight'>
            Yah 404 kawan... 😰😰😰😰
            <Link href={'/'}>
                <a className='ml-4 text-blue-500'>
                    <span className='font-extralight'>
                        Back!
                    </span>
                </a>
            </Link>
        </div>
    )
}
