import React from 'react'

export async function getServerSideProps(context) {
    console.log(context.query.token_reset_pass)
    return {
        props: {}, // will be passed to the page component as props
    }
}

export default function Testing() {
    return (
        <div>Testing</div>
    )
}
