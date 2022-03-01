/* eslint-disable @next/next/no-img-element */
import { Popover } from "@headlessui/react";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

export default function Testing() {
    return (
        <div className="grid grid-cols-12 gap-5 p-20">
            <div className="bg-white xl:col-span-4 lg:col-span-6 col-span-12 rounded-xl p-4 text-sm" >
                <div className="mb-2 flex justify-between items-center">
                    <div className="p-1 px-2 rounded-lg text-xs text bg-yellow-200 text-yellow-800 flex items-center gap-2">
                        On Scheduled
                    </div>
                    <Popover>
                        <Popover.Button> <BsThreeDots /></Popover.Button>
                        <Popover.Panel className="absolute z-10 bg-white rounded-lg drop-shadow-xl">
                            <div className="grid grid-cols-1 rounded-xl p-3 gap-y-2">
                                <Link href="/">View Detail</Link>
                                <Link href="/">Delete Project</Link>
                            </div>
                        </Popover.Panel>
                    </Popover>
                </div>
                <div className="mb-2 grid grid-rows-1 gap-2">
                    <div className="-mx-4 my-2">
                        <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2Fyc3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="" />
                    </div>
                    <div className="text-md font-light">testing</div>
                    <div className="text-xs font-extralight text-gray-500 flex items-center gap-2">testing</div>
                    <div className="text-xs font-extralight text-gray-500 flex items-center gap-2">testing</div>
                    <div className="text-xs font-extralight text-gray-500 flex items-center gap-2">testing</div>
                    <div className="text-xs font-extralight text-gray-500 flex items-center gap-2">testing</div>
                </div>
            </div>
        </div>
    )
}