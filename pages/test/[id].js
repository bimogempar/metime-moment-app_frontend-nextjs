import React from 'react'

export default function testDetail({ data }) {
    return (
        <div>{data.title}</div>
    )
}

export async function getServerSideProps(ctx) {
    const req = await fetch(`https://jsonplaceholder.typicode.com/posts/${ctx.query.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const data = await req.json()
    console.log(data)
    return {
        props: { data }
    }
}