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
    <div className="flex ">
      <div className='w-1/19'>
        <Sidebar1/>
      </div>
      <CreatePostForm/>
    </div>
  )
}

export default CreatePost
