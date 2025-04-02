import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"
import postReducer from "../slices/postSlice"

const rootreducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
})

export default rootreducer;