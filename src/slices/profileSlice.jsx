import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    notificationBar: false,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setUser(state,action){
            state.user = action.payload;
        },
        setNotificationBar(state,action){
            state.notificationBar = action.payload;
        },
    }
})

export const {setUser,setNotificationBar} = profileSlice.actions;
export default profileSlice.reducer