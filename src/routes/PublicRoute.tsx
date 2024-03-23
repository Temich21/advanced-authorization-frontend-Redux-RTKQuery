import { Outlet, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/store"
import { useRefreshUserMutation } from "../redux/services/RefreshServices"
import { useEffect } from "react"
import { tokenReceived } from "../redux/reducers/AuthSlice"
import Loading from "../components/Loading/Loading"

const PublicRoute = () => {
    const dispatch = useAppDispatch()
    const [refresh, { isLoading: isRefreshLoading }] = useRefreshUserMutation()
    const navigate = useNavigate()

    useEffect(() => {
        const refreshData = async () => {
            try {
                const response = await refresh().unwrap()
                dispatch(tokenReceived(response))
                navigate('/dashboard')
            } catch (e) {
                console.log(e)
            }
        }

        if (localStorage.getItem('accessToken')) {
            refreshData()
        }
    }, [])


    if (isRefreshLoading) {
        return <Loading />
    }

    return (
        <Outlet />
    )
}

export default PublicRoute