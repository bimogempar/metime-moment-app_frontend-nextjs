import React from 'react';
import Layout from "../components/Layout"
import Greeting from '../components/Greeting';
import Statistics from '../components/Statistics';
import TopEmployee from '../components/TopEmployee';
import Project from '../components/Projects';

// export async function getServerSideProps(ctx) {
//     const cookies = nookies.get(ctx)
//     const token = cookies.token
//     const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/projects`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + token
//         },
//     })
//     const data = await req.json()
//     return {
//         props: { data }
//     }
// }

export default function Home({ data }) {
    return (
        <Layout title="Dashboard">

            <Greeting />

            <Statistics />

            <TopEmployee />

        </Layout>
    )
}
