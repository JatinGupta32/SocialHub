import React from 'react'
import Sidebar1 from '../components/Sidebar1'
import ProfileSection from '../components/Profile/ProfileSection'
import PostSection from '../components/Profile/PostSection'
import { getUserDetailsApi } from '../apis/profileAPI'
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../slices/profileSlice'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.profile);
  const {token} = useSelector((state) => state.auth);

  useEffect(()=>{
    if(!token) navigate('/');
  },[])

  useEffect(() => {
    dispatch(getUserDetailsApi(navigate));
  }, [dispatch]);

  useEffect(()=>{
    console.log('userDetails: ',user);
  },[user]);

  return (
    <div className="w-full min-h-screen flex overflow-x-hidden scrollbar-hide">
      <div className='w-1/19'>
        <Sidebar1/>
      </div>
      <div className='w-6/19 h-screen overflow-y-scroll custom-scrollbar'>
        <ProfileSection/>    
      </div>
      <div className='w-12/19 h-screen overflow-y-scroll custom-scrollbar'>
        <PostSection/>
      </div>
      
    </div>
  )
}

export default Profile
