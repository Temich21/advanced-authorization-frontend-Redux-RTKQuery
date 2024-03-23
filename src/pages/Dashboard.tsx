import { RootState, useAppDispatch, useAppSelector } from "../redux/store"
import { logout, tokenRemoved } from '../redux/reducers/AuthSlice'
import { useLogoutUserMutation } from '../redux/services/AuthServices'
import { useGetLinksMutation } from '../redux/services/UserServices'
import { UserData } from "../models/UserData"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


function Dashboard() {
    const { isAuth, user } = useAppSelector((state: RootState) => state.authReducer)
    const dispatch = useAppDispatch()

    const [logoutUser] = useLogoutUserMutation()
    const [getUser] = useGetLinksMutation()

    const [users, setUsers] = useState<UserData[]>([])

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutUser()
            dispatch(logout())
            dispatch(tokenRemoved())
            toast.success("Logout successful")
            navigate('/auth')
        } catch (e) {
            console.log(e)
        }
    }

    const handleGetUsers = async () => {
        try {
            const response = await getUser().unwrap()
            setUsers(response)
        } catch (e) {

        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>{isAuth ? `User ${user.email} is autorised` : 'PLEASE AUTHORISE!'}</h2>
            <h2>{user.isActivated ? `User was confirmed by email` : 'PLEASE ACTIVATE YOUR ACCOUNT!'}</h2>
            <button
                className="text-sm text-black bg-gray-400 p-2 mr-4 rounded-lg"
                onClick={handleLogout}
            >
                Logout
            </button>
            <div>
                <button onClick={handleGetUsers}>Get users</button>
            </div>
            {users.map(user => (
                <div key={user.email}>{user.email}</div>
            ))}
        </div>
    );
}

export default Dashboard;