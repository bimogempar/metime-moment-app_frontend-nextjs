import React from 'react'

export default function testDetail(props) {
    return (
        <div>{props.data}</div>
    )
}

export async function getServerSideProps(ctx) {
    const data = ctx.query.test
    return {
        props: { data }
    }
}