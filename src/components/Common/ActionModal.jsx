import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deletePostApi, getSocialPostsApi } from '../../apis/postAPI'
import { updateFollowApi } from '../../apis/profileAPI'

const ActionModal = ({postid,userid,profileUserid,setSelectedPost,onClose}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className='fixed inset-0 rounded-2xl bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'>
        <div className='absolute z-10 w-[23vw] cursor-pointer h-fit rounded-lg bg-gradient-to-b from-gray-900 to-black flex flex-col items-center'>
            {userid!==profileUserid && <div 
            onClick={() => {
              dispatch(updateFollowApi(profileUserid))
              onClose(); //  Close modal properly
              setSelectedPost(null); //  Reset state
            }} 
            className='font-[Segoe_UI] font-semibold w-full pt-5 pb-3 flex justify-center hover:bg-white/10'>Unfollow</div>}

            {userid===profileUserid && <div onClick={()=>navigate('/edit-post')} className='font-[Segoe_UI] font-semibold w-full py-3 flex justify-center border-y-1 border-white/20 hover:bg-white/10'>Edit Post</div>}

            <div className='font-[Segoe_UI] font-semibold w-full py-3 flex justify-center border-y-1 border-white/20 hover:bg-white/10'>Share to</div>

            {userid===profileUserid && <div onClick={()=>dispatch(deletePostApi(postid,navigate))} className='font-[Segoe_UI] font-semibold w-full py-3 flex justify-center border-y-1 border-white/20 hover:bg-white/10'>Delete Post</div>}

            <div className='font-[Segoe_UI] font-semibold w-full py-3 flex justify-center border-y-1 border-white/20 hover:bg-white/10'>About this account</div>

            <div onClick={onClose} className='font-[Segoe_UI] font-semibold w-full pt-3 pb-5 flex justify-center hover:bg-white/10'>Cancel</div>
        </div>
      
    </div>
  )
}

export default ActionModal
