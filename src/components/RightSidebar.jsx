import React, { useEffect } from 'react'
import { getUserApi } from '../apis/profileAPI'
import { useSelector } from 'react-redux';

const RightSidebar = () => {
    const {user} = useSelector((state) => state.profile);
    // useEffect(()=>{
    //     getUserApi();
    // })

  return (
    <div className='flex-col w-full h-full my-4 space-y-6 items-center'>
        <div className="flex bg-amber-300 w-8/9 h-fit justify-between items-center -2 ">
            <div className='flex gap-3'>
                <img src={user?.image ? user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.fullname}`} className="w-11 h-11 mb-auto rounded-full object-cover cursor-pointer"></img>
                <div className='flex-col space-y-2 justify-center'>
                    <div>{user.username}</div>
                    <div>{user.fullname}</div>
                </div>
            </div>
            
            <div className="text-sm w-fit">
                  <span onClick={()=>{navigate(`/profile/:${user?._id}`)}} className="font-bold cursor-pointer hover:brightness-50">{user?.username}</span>
                </div>
        </div>
        <div className="flex-col w-full items-center space-x-4 pt-3 pb-2 ">
            <img src={user?.image ? user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.fullname}`} className="w-9 h-9 mb-auto rounded-full object-cover cursor-pointer"></img>
            <div className="text-sm w-fit">
                  <span onClick={()=>{navigate(`/profile/:${user?._id}`)}} className="font-bold cursor-pointer hover:brightness-50">{user?.username}</span>
                </div>
        </div>
    </div>
  )
}

export default RightSidebar
// onClick={()=>{navigate(`/profile/:${p?.user?._id}`)}}
