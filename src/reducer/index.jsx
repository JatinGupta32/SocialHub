import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"

const rootreducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
})

export default rootreducer;