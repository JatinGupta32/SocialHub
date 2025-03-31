import React, { useEffect } from 'react';
import Sidebar1 from '../components/Sidebar1'
import CreatePostForm from '../components/Profile/CreatePostForm'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate()
  const {token} = useSelector((state) => state.auth);
  useEffect(()=>{
    if(!token) navigate('/');
  },[])

  return (
    <div className="w-full min-h-screen flex ">
      <div className='w-1/19'>
        <Sidebar1/>
      </div>
      <CreatePostForm/>
    </div>
  )
}

export default CreatePost
