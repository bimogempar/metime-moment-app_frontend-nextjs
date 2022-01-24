/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react'
import { UserContext } from "../pages/context/user";

function AuthUser(props) {
    const { user } = useContext(UserContext)
    return (
        <div>
            hello {user.name}
        </div>
    )
}

export default AuthUser