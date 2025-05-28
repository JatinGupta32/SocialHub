import React, { useEffect } from 'react';
import Sidebar1 from '../components/Common/Sidebar1'
import CreatePostForm from '../components/Post/CreatePostForm'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import NotificationBar from '../components/Common/NotificationBar';

const CreatePost = () => {
  const navigate = useNavigate()
  const {token,loading} = useSelector((state) => state.auth);
  const {notificationBar} = useSelector((state) => state.profile);
  useEffect(()=>{
    if(!token) navigate('/');
  },[])

  return (
    // loading ? <Spinner/> : 
    <div className="flex w-full min-h-[100dvh]">
      <div className='w-[5%]'>
        <Sidebar1/>
      </div>
      <div className='w-full h-screen px-4 bg-gradient-to-b from-gray-900 to-black text-amber-50 flex flex-col items-center'>
        <CreatePostForm/>
      </div>

      {
        notificationBar && (
          <NotificationBar />
        )
      }
    </div>
  )
}
export default CreatePost
//pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]