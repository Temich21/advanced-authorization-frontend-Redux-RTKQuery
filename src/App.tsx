import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch, RootState } from "./redux/store"
import { setLoading, tokenReceived } from './redux/reducers/AuthSlice'
import { useRefreshUserMutation } from './redux/services/RefreshServices'
import { ToastContainer } from "react-toastify";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Loading from "./components/Loading/Loading";

function App() {
  const dispatch = useAppDispatch()
  const { isAuth, isLoading } = useAppSelector((state: RootState) => state.authReducer)
  const [refresh] = useRefreshUserMutation()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true))

      if (localStorage.getItem('accessToken')) {
        try {
          const response = await refresh().unwrap()
          tokenReceived(response)
        } catch (e) {
          console.log(e)
        }
      }

      dispatch(setLoading(false));
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (!isAuth) {
    return (
      <>
        <ToastContainer />
        <Routes>
          {/* <Route path="/" element={<Navigate to="/auth" replace />} /> */}
          <Route path="/" element={<Auth />} />
        </Routes>
      </>
    )
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  )

  // return (
  //   <div>
  //     <ToastContainer />
  //       <Routes>
  //         <Route path="/" element={<Navigate to="/auth" replace />} />
  //         <Route path="/auth" element={<Auth />} />
  //         <Route path="/dashboard" element={<Dashboard />} />
  //       </Routes>
  //   </div>
  // )
}

export default App;