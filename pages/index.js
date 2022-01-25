import Link from "next/link";
import { FcAddImage, FcExport, FcFolder, FcHome, FcInspection, FcSettings, FcTimeline } from "react-icons/fc";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-200">
            <div className="grid grid-cols-12 gap-10 p-10 lg:p-10 lg:px-20">

                {/* sidebar */}
                <div className="bg-white rounded-xl col-span-3 lg:block hidden p-5 h-min sticky top-10">
                    <div className="flex justify-center">
                        <img src="/img/logo-metime.png" width="100" />
                    </div>
                    <div className="flex justify-center">
                        <img src="/img/ade.png" className="rounded-full" width="200" />
                    </div>
                    <div className="text-center my-5">
                        <h1 className="text-3xl mb-3 font-light break-word">Ade Novan Guliano</h1>
                        <h1 className="text-xl text-gray-500 mb-1 font-light break-all">novanguliano</h1>
                        <h3 className="text-xl text-gray-500 mb-1 font-light break-all">081898475675</h3>
                        <h1 className="text-xl text-gray-500 mb-10 font-light break-all">novanguliano@example.com</h1>
                        <a className="bg-yellow-200 px-5 py-3 w-full text-center lg:w-auto rounded-lg text-yellow-600 text-xs tracking-wider font-semibold uppercase">
                            Employee
                        </a>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <div className="flex justify-left">
                            <ul>
                                <li className="mt-2">
                                    <Link href="/">
                                        <a className="flex items-center gap-4 p-4 w-full text-center lg:w-auto rounded-full text-medium tracking-wider text-white bg-sky-800 ">
                                            <FcHome /> Home
                                        </a>
                                    </Link>
                                </li>
                                <li className="mt-2">
                                    <Link href="/">
                                        <a className="flex items-center gap-4 p-4 w-full text-center lg:w-auto rounded-full text-lg tracking-wider text-sky-900 hover:bg-sky-800 hover:text-white">
                                            <FcTimeline /> List Project
                                        </a>
                                    </Link>
                                </li>
                                <li className="mt-2">
                                    <Link href="/">
                                        <a className="flex items-center gap-4 p-4 w-full text-center lg:w-auto rounded-full text-lg tracking-wider text-sky-900 hover:bg-sky-800 hover:text-white">
                                            <FcFolder /> Favorite Project
                                        </a>
                                    </Link>
                                </li>
                                <li className="mt-2">
                                    <Link href="/test/test1">
                                        <a className="flex items-center gap-4 p-4 w-full text-center lg:w-auto rounded-full text-lg tracking-wider text-sky-900 hover:bg-sky-800 hover:text-white">
                                            <FcHome /> My Profile
                                        </a>
                                    </Link>
                                </li>
                                <li className="mt-2">
                                    <Link href="/test/test1">
                                        <a className="flex items-center gap-4 p-4 w-full text-center lg:w-auto rounded-full text-lg tracking-wider text-sky-900 hover:bg-sky-800 hover:text-white">
                                            <FcAddImage /> Register
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-10 flex items-center justify-between">
                        <Link href="/">
                            <a className="text-2xl hover:scale-150 transition ease-in-out">
                                <FcSettings />
                            </a>
                        </Link>
                        <Link href="/logout">
                            <button className="flex items-center bg-gray-100 p-2 rounded-xl hover:scale-110 transition ease-in-out">
                                <a className="text-2xl">
                                    <FcExport />
                                </a>
                                <p className="mx-2">Logout</p>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* main */}
                <div className="rounded-xl col-span-12 lg:col-span-9">
                    <div className="flex gap-5">
                        {/* greeting */}
                        <div className="bg-white lg:w-6/12 w-full rounded-xl p-5">
                            <div className="bg-white rounded-2xl p-5 flex justify-between">
                                <div>
                                    <h1 className="text-4xl font-extralight mb-5">Good night, novanvguliano!</h1>
                                    <p className="text-lg text-gray-500 font-extralight">Udah sampe mana ya bosku garapannya?</p>
                                    <p className="text-lg text-gray-500 font-extralight">Yuk bisa yuk!</p>
                                </div>
                                <img src="/img/headline.png" className="-mb-10" alt="" width="150" height="auto"></img>
                            </div>
                        </div>
                        <div className="bg-white w-1/4 hidden lg:grid grid-cols-1 gap-4 place-items-center rounded-xl p-5 grid">
                            <h1 className="text-3xl font-extralight">TODAY</h1>
                            <h1 className="text-9xl font-extralight text-amber-600">12</h1>
                            <h1 className="text-lg font-extralight">JAN 2022</h1>
                        </div>
                    </div>
                    <h1 className="mt-4 mb-2 text-4xl font-extralight">Statistic</h1>
                    <div className="flex gap-5">
                        {/* Statistic */}
                        <div className="bg-white lg:w-8/12 w-full rounded-xl p-5">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum ipsam voluptatem et ratione expedita doloremque sit qui cupiditate reprehenderit pariatur quaerat commodi a error architecto, ipsa quibusdam quo porro beatae deleniti. Explicabo sed, in provident nam libero obcaecati unde porro dolorem recusandae deserunt odit. Aperiam blanditiis dolorem consequuntur voluptatum quasi.
                        </div>
                    </div>
                    <h1 className="mt-4 mb-2 text-4xl font-extralight">Top Employee</h1>
                    <div className="grid grid-cols-12 gap-5">
                        {/* Top Employee */}
                        <div className="bg-white lg:col-span-3 lg:col-span-4 col-span-6 rounded-xl p-5 flex gap-5 items-center">
                            <img src="/img/ade.png" width="75" alt="" />
                            <div className="w-full">
                                <h1 className="text-md md:text-xl">Ade Novan Guliano</h1>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-400">Most Project</p>
                                    <div className="bg-green-100 md:flex items-center p-2 rounded-xl">
                                        <p className="text-xs">25</p>
                                        <FcInspection size={15} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white lg:col-span-3 lg:col-span-4 col-span-6 rounded-xl p-5 flex gap-5 items-center">
                            <img src="/img/ade.png" width="75" alt="" />
                            <div className="w-full">
                                <h1 className="text-md md:text-xl">Ade Novan Guliano</h1>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-400">Most Project</p>
                                    <div className="bg-green-100 md:flex items-center p-2 rounded-xl">
                                        <p className="text-xs">25</p>
                                        <FcInspection size={15} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="mt-3 mb-2">Projects</h1>
                    <div className="grid grid-cols-12 gap-5">
                        {/* Projects */}
                        <div className="bg-white lg:col-span-4 lg:col-span-6 col-span-12 rounded-xl p-5">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem necessitatibus quaerat sit! Nulla, magni tempora. Dolorum corrupti eius magnam rerum illo. Excepturi odio sapiente quam, eveniet labore inventore est nesciunt vitae obcaecati magnam voluptatum minus itaque placeat aspernatur ullam enim voluptatem voluptates sequi illum sit quos. Cupiditate tenetur sapiente architecto magni a? Voluptate enim aliquam amet a at sit tempora, voluptates quas ipsum dolor, labore magni laboriosam neque obcaecati accusamus impedit? Perspiciatis ipsam ipsum expedita cum id iusto. Molestiae delectus similique doloribus dicta atque cum sed deserunt enim explicabo nulla velit repudiandae consequatur, sapiente autem vitae minima nihil? Eius dolore, debitis expedita facere explicabo ullam reiciendis provident facilis maiores enim harum illum officiis repellendus! Quod asperiores obcaecati quidem aperiam consequuntur officia delectus reiciendis error quasi labore, nemo quaerat dolore at quia quisquam corporis sapiente sequi unde, eligendi dolorem ea! Ipsum aliquam quidem, est sunt soluta fugit impedit modi? Eos, esse. Suscipit, iste distinctio ut voluptates adipisci nobis optio eaque sapiente beatae libero nesciunt aliquid dolor reprehenderit consequatur natus nam repellat laborum nostrum fugit qui possimus dolores esse doloribus error. Debitis laboriosam atque culpa, assumenda dolorum iusto rerum! Iste possimus vero perferendis nam optio numquam, dolor molestias placeat ipsum neque excepturi.
                        </div>
                        <div className="bg-white lg:col-span-4 lg:col-span-6 col-span-12 rounded-xl p-5">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem necessitatibus quaerat sit! Nulla, magni tempora. Dolorum corrupti eius magnam rerum illo. Excepturi odio sapiente quam, eveniet labore inventore est nesciunt vitae obcaecati magnam voluptatum minus itaque placeat aspernatur ullam enim voluptatem voluptates sequi illum sit quos. Cupiditate tenetur sapiente architecto magni a? Voluptate enim aliquam amet a at sit tempora, voluptates quas ipsum dolor, labore magni laboriosam neque obcaecati accusamus impedit? Perspiciatis ipsam ipsum expedita cum id iusto. Molestiae delectus similique doloribus dicta atque cum sed deserunt enim explicabo nulla velit repudiandae consequatur, sapiente autem vitae minima nihil? Eius dolore, debitis expedita facere explicabo ullam reiciendis provident facilis maiores enim harum illum officiis repellendus! Quod asperiores obcaecati quidem aperiam consequuntur officia delectus reiciendis error quasi labore, nemo quaerat dolore at quia quisquam corporis sapiente sequi unde, eligendi dolorem ea! Ipsum aliquam quidem, est sunt soluta fugit impedit modi? Eos, esse. Suscipit, iste distinctio ut voluptates adipisci nobis optio eaque sapiente beatae libero nesciunt aliquid dolor reprehenderit consequatur natus nam repellat laborum nostrum fugit qui possimus dolores esse doloribus error. Debitis laboriosam atque culpa, assumenda dolorum iusto rerum! Iste possimus vero perferendis nam optio numquam, dolor molestias placeat ipsum neque excepturi.
                        </div>
                        <div className="bg-white lg:col-span-4 lg:col-span-6 col-span-12 rounded-xl p-5">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem necessitatibus quaerat sit! Nulla, magni tempora. Dolorum corrupti eius magnam rerum illo. Excepturi odio sapiente quam, eveniet labore inventore est nesciunt vitae obcaecati magnam voluptatum minus itaque placeat aspernatur ullam enim voluptatem voluptates sequi illum sit quos. Cupiditate tenetur sapiente architecto magni a? Voluptate enim aliquam amet a at sit tempora, voluptates quas ipsum dolor, labore magni laboriosam neque obcaecati accusamus impedit? Perspiciatis ipsam ipsum expedita cum id iusto. Molestiae delectus similique doloribus dicta atque cum sed deserunt enim explicabo nulla velit repudiandae consequatur, sapiente autem vitae minima nihil? Eius dolore, debitis expedita facere explicabo ullam reiciendis provident facilis maiores enim harum illum officiis repellendus! Quod asperiores obcaecati quidem aperiam consequuntur officia delectus reiciendis error quasi labore, nemo quaerat dolore at quia quisquam corporis sapiente sequi unde, eligendi dolorem ea! Ipsum aliquam quidem, est sunt soluta fugit impedit modi? Eos, esse. Suscipit, iste distinctio ut voluptates adipisci nobis optio eaque sapiente beatae libero nesciunt aliquid dolor reprehenderit consequatur natus nam repellat laborum nostrum fugit qui possimus dolores esse doloribus error. Debitis laboriosam atque culpa, assumenda dolorum iusto rerum! Iste possimus vero perferendis nam optio numquam, dolor molestias placeat ipsum neque excepturi.
                        </div>
                        <div className="bg-white lg:col-span-4 lg:col-span-6 col-span-12 rounded-xl p-5">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem necessitatibus quaerat sit! Nulla, magni tempora. Dolorum corrupti eius magnam rerum illo. Excepturi odio sapiente quam, eveniet labore inventore est nesciunt vitae obcaecati magnam voluptatum minus itaque placeat aspernatur ullam enim voluptatem voluptates sequi illum sit quos. Cupiditate tenetur sapiente architecto magni a? Voluptate enim aliquam amet a at sit tempora, voluptates quas ipsum dolor, labore magni laboriosam neque obcaecati accusamus impedit? Perspiciatis ipsam ipsum expedita cum id iusto. Molestiae delectus similique doloribus dicta atque cum sed deserunt enim explicabo nulla velit repudiandae consequatur, sapiente autem vitae minima nihil? Eius dolore, debitis expedita facere explicabo ullam reiciendis provident facilis maiores enim harum illum officiis repellendus! Quod asperiores obcaecati quidem aperiam consequuntur officia delectus reiciendis error quasi labore, nemo quaerat dolore at quia quisquam corporis sapiente sequi unde, eligendi dolorem ea! Ipsum aliquam quidem, est sunt soluta fugit impedit modi? Eos, esse. Suscipit, iste distinctio ut voluptates adipisci nobis optio eaque sapiente beatae libero nesciunt aliquid dolor reprehenderit consequatur natus nam repellat laborum nostrum fugit qui possimus dolores esse doloribus error. Debitis laboriosam atque culpa, assumenda dolorum iusto rerum! Iste possimus vero perferendis nam optio numquam, dolor molestias placeat ipsum neque excepturi.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
