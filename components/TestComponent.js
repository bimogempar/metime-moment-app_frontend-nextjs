import { UserContext } from "../components/context/userContext";
import { useContext } from "react"

export default function TestComponent() {
    const userContext = useContext(UserContext)
    return (
        <div>
            {userContext.user.name}
        </div>
    )
}