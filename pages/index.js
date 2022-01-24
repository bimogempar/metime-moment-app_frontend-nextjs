import AuthUser from '../components/authuser'
import { UserProvider } from './context/user'
import Navbar from '../components/navbar'

export default function Home() {
    return (
        <UserProvider>
            <Navbar />
            <AuthUser />
        </UserProvider>
    )
}
