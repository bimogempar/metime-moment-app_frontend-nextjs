import React from 'react'
import nookies from 'nookies';
import moment from 'moment';
import Image from 'next/image';
import LogoMetimeSquare from '../../../public/img/metime-moment.jpeg'

export default function PrintProject({ data }) {
    const date = new Date()
    if (typeof window !== "undefined") {
        // window.print()
    }
    return (
        <div style={{ fontSize: 12 }} className="flex bg-white justify-center min-h-screen">
            <div className="grid grid-cols-1 content-between">
                <div className="max-w-2xl">
                    <div className="grid grid-cols-2">
                        <div className="grid justify-items-start content-center">
                            <div><span className="text-xl">
                                Invoice #{data.project.slug}
                            </span>
                                <br />
                                {data.project.client}
                                <br /><span className="font-medium">Project Created :</span>
                                {moment(data.project.created_at).format('D MMM YY')}
                            </div>
                        </div>
                        <div className="grid justify-items-end text-right">
                            <Image className='rounded-lg' src={LogoMetimeSquare} alt="Thumbnail Project" width={150} height={150} objectFit="cover" objectPosition="center" />
                            <div className="text-lg">Metime Moment</div>
                            <div>Jl. Kendedes, Ploso, Tambakrejo, Kec. Magetan, Kabupaten Magetan,
                                Jawa Timur 63319</div>
                        </div>
                        <div className="grid justify-items-start text-start mt-5">
                            <div><span className="font-medium">*Issued</span> :
                                {moment(date).format('D MMM YY')}
                            </div>
                            <div className="text-lg font-normal">
                                BILL TO :
                            </div>
                            <div className="italic">
                                {data.project.client}
                                <br />
                                {data.project.phone_number}
                                <br />Perum Citramas Raya Blok C19
                            </div>
                        </div>
                    </div>
                    <table className="table-auto w-full border-collapse border border-slate-500 mt-5">
                        <thead>
                            <tr>
                                <th className="p-2 border border-slate-500 font-medium">Quantity</th>
                                <th className="p-2 border border-slate-500 font-medium">Description</th>
                                <th className="p-2 border border-slate-500 font-medium">Price</th>
                                <th className="p-2 border border-slate-500 font-medium">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center align-top p-2">
                                    {[data.project.package].length}
                                </td>
                                <td className="p-2">
                                    <div className="text-start">
                                        {data.project.package.name}
                                        {data.project.features.map((feature, index) => (
                                            <li key={index}>{feature.feature}</li>
                                        ))}
                                    </div>
                                </td>
                                <td className="text-end align-top p-2">
                                    Rp. {data.project.package.price}
                                </td>
                                <td className="text-end align-top p-2">
                                    Rp. {data.project.package.price}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="grid grid-cols-8 mt-5">
                        <div className="grid col-span-3 justify-items-start">
                            <div>Payment Information
                                <br />BCA - Asyraf Shalahudin
                                <br />1231325321
                            </div>
                        </div>
                        <div className="grid col-span-5 justify-items-end">
                            <table>
                                <tbody><tr>
                                    <td className="text-end font-medium">Subtotal</td>
                                    <td>
                                        <div className="mx-2">:</div>
                                    </td>
                                    <td>
                                        Rp. {data.project.package.price}
                                    </td>
                                </tr>
                                    <tr>
                                        <td className="text-end font-medium">Total</td>
                                        <td>
                                            <div className="mx-2">:</div>
                                        </td>
                                        <td>
                                            Rp. {data.project.package.price}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-end font-medium">Payment on 2 Juni 2022</td>
                                        <td>
                                            <div className="mx-2">:</div>
                                        </td>
                                        <td>Rp. 0</td>
                                    </tr>
                                    <tr className="border-b-2 border-gray-500">
                                        <td>
                                            <div />
                                        </td>
                                        <td>
                                            <div />
                                        </td>
                                        <td>
                                            <div />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-end font-medium">Balance Due</td>
                                        <td>
                                            <div className="mx-2">:</div>
                                        </td>
                                        <td>
                                            Rp. {data.project.package.price}
                                        </td>
                                    </tr>
                                </tbody></table>
                        </div>
                    </div>
                </div>
                <div className="grid justify-center p-5">
                    <div className="text-center">
                        Powered by Metime Moment<br />
                        <span style={{ fontSize: 8 }}>Made with ❤️ rudikelelawar</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(params) {
    const { slug } = params.query

    const cookies = nookies.get(params)
    const token = cookies.token

    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: "/login"
            }
        }
    }

    const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects/${slug}/get-project-pdf`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
    const data = await req.json()
    // console.log(data)

    if (data.project == null) {
        return {
            redirect: {
                permanent: false,
                destination: "/projects"
            }
        }
    }

    return {
        props: { data }
    }

}