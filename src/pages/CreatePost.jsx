import React, { useEffect } from 'react';
import Sidebar1 from '../components/Common/Sidebar1'
import CreatePostForm from '../components/Post/CreatePostForm'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate()
  const {token} = useSelector((state) => state.auth);
  useEffect(()=>{
    if(!token) navigate('/');
  },[])

  return (
    <div className="flex w-full min-h-[100dvh]">
      <div className='w-[5%]'>
        <Sidebar1/>
      </div>
      <div className='w-full pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] h-screen px-4 bg-gradient-to-b from-gray-900 to-black text-amber-50 flex flex-col items-center'>
        <CreatePostForm/>
      </div>

    </div>
  )
}

export default CreatePost
