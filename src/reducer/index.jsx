import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"
import postReducer from "../slices/postSlice"
import messageReducer from "../slices/messageSlice"

const rootreducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    message: messageReducer,
})

export default rootreducer;