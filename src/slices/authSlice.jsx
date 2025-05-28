import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    signUpData: null,
    token: null,
    loading: false,
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
        },
        setLoading(state,action){
            state.loading = action.payload;
        }
    }
})

export const {setSignUpData,setToken,setLoading} = authSlice.actions;
export default authSlice.reducer;
