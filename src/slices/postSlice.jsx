import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    socialPosts: null,
}

const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        setSocialPosts(state,action){
            state.socialPosts = action.payload;
        }
    }
})

export const {setSocialPosts} = postSlice.actions;
export default postSlice.reducer