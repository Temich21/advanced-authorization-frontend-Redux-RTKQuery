import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/AuthSlice'
import eyeReducer from './reducers/EyeSlice'
import { authAPI } from './services/AuthServices'
import { refreshAPI } from './services/RefreshServices'
import { userAPI } from './services/UserServices'

export const rootReducer = combineReducers({
    authReducer,
    eyeReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [refreshAPI.reducerPath]: refreshAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
