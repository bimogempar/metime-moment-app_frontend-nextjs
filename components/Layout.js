import Head from "next/head";
import Link from "next/link";
import Sidebar from "./Sidebar";

export default function Layout(props) {
    return (
        <div className="grid grid-cols-1 place-items-start">
            <Head>
                <title>{props.title} | Metime Moment</title>
                <link rel="icon" href="/img/logo-metime.png"></link>
            </Head>
            <div className="grid grid-cols-12 gap-10 p-10 lg:p-20 lg:pt-10">
                <Sidebar />
                <div className="rounded-xl col-span-12 lg:col-span-9">
                    {props.children}
                </div>
            </div>
        </div>
    )
}