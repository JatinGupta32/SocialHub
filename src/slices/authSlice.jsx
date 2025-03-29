import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    signUpData: null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignUpData(state,action){
            state.signUpData = action.payload;
        },
        setToken(state,action){
            state.token = action.payload;
        }
    }
})

export const {setSignUpData,setToken} = authSlice.actions;
export default authSlice.reducer;
