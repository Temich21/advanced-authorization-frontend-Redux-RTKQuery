import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/AuthSlice'
import eyeReducer from './reducers/EyeSlice'
import { authAPI } from './services/AuthServices'

export const rootReducer = combineReducers({
    authReducer,
    eyeReducer,
    [authAPI.reducerPath]: authAPI.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
