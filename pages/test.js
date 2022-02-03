export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/test`)
    const projects = await res.json()
    return {
        props: { projects }
    }
}


export default function Test({ projects }) {
    return (
        <div>
            {
                projects.map((project) => {
                    return (
                        <div key={project.id}>
                            <p className="text-red-500">{project.client}</p>
                            {project.users.map((user) => {
                                return (
                                    <p key={user.id}>
                                        {user.name}
                                    </p>
                                )
                            })}
                        </div>
                    )
                })
            }
        </div>
    )
}