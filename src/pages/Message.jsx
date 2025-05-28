import React, { useEffect } from 'react'
import RecentChats from '../components/Messages/RecentChats'
import ChatSection from '../components/Messages/ChatSection'
import Sidebar1 from '../components/Common/Sidebar1'
import { getUser1Api } from '../apis/messageAPI'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner';

const Message = ({socket}) => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.auth);
  useEffect(()=>{
    dispatch(getUser1Api());
  },[])

  return (
    // loading ? <Spinner/> : 
    <div className="w-full min-h-screen flex overflow-x-hidden scrollbar-hide">
      <div className='w-1/19'>
        <Sidebar1/>
      </div>
      <div className='flex w-18/19'>
        <div className='w-[29%] h-screen overflow-y-scroll custom-scrollbar'>
            <RecentChats socket={socket}/>    
        </div>
        <div className='w-[71%] h-screen overflow-y-scroll custom-scrollbar'>
            <ChatSection socket={socket}/>
        </div>
      </div>
      
    </div>
  )
}

export default Message
