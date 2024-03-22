import { RootState, useAppDispatch,useAppSelector } from "../redux/store"
import { logout, tokenRemoved } from '../redux/reducers/AuthSlice'
import { useLogoutUserMutation } from '../redux/services/AuthServices'
import { useGetLinksMutation } from '../redux/services/UserServices'
import { UserData } from "../models/UserData"
import { useState } from "react"


function Dashboard() {
    const { isAuth, user } = useAppSelector((state: RootState) => state.authReducer)
    const dispatch = useAppDispatch()
    const [logoutUser] = useLogoutUserMutation()
    const [getUser] = useGetLinksMutation()
    const [users, setUsers] = useState<UserData[]>([])

    const handleLogout = async () => {
        try {
            await logoutUser()
            console.log(isAuth, user)
            dispatch(logout())
            dispatch(tokenRemoved())
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