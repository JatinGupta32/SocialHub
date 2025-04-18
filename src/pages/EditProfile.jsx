import React, { useEffect } from 'react';
import Sidebar1 from '../components/Common/Sidebar1'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditProfileForm from '../components/Profile/EditProfileForm';

const EditProfile = () => {
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
      <EditProfileForm/>
    </div>
  )
}

export default EditProfile
