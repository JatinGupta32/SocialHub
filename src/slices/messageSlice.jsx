import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    roomId: null,
    receiver: null,
    chatData: null,
}

const messageSlice = createSlice({
    name: 'message',
    initialState: initialState,
    reducers: {
        setRoomId(state,action){
            state.roomId = action.payload;
        },
        setReceiver(state,action){
            state.receiver = action.payload;
        },
        setChatData(state,action){
            state.chatData = action.payload;
        },
    }
})

export const {setRoomId, setReceiver, setChatData} = messageSlice.actions;
export default messageSlice.reducer