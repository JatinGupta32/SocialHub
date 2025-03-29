import React from 'react'
import Sidebar1 from '../components/Sidebar1'
import CreatePostForm from '../components/Profile/CreatePostForm'

const CreatePost = () => {
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
