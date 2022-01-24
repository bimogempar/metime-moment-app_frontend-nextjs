import axios from "axios";
import nookies from 'nookies'
import { createContext, useEffect, useState } from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const cookies = nookies.get()
    const token = cookies.token
    const [user, setUser] = useState([])
    const getUser = async () => {
        let response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        setUser(response.data)
    }

    useEffect(() => {
        getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }