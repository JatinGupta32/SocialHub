import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    socialPosts: null,
    currentSelectedPost: null,
}

const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        setSocialPosts(state,action){
            state.socialPosts = action.payload;
        },
        setCurrentSelectedPost(state,action){
            state.currentSelectedPost = action.payload;
        },
    }
})

export const {setSocialPosts, setCurrentSelectedPost} = postSlice.actions;
export default postSlice.reducer