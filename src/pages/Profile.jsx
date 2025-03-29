import React from 'react'
import Sidebar1 from '../components/Sidebar1'
import ProfileSection from '../components/Profile/ProfileSection'
import PostSection from '../components/Profile/PostSection'

const Profile = () => {
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
