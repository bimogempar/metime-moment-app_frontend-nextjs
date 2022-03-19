import React from 'react'

export async function getServerSideProps(context) {
    // console.log(context.query.token_reset_pass)
    const token_initial_password = context.query.token_reset_pass

    const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/set-pass/${token_initial_password}`, {
        method: 'GET'
    })
    const response = await req.json()
    // console.log(response)

    if (response.error) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
        }
    }

    return {
        props: {
            response,
            token_initial_password
        }
    }
}

export default function Testing({ response, token_initial_password }) {
    // console.log(response.user)
    return (
        <div>This token {token_initial_password} for user {response.user.email}</div>
    )
}
