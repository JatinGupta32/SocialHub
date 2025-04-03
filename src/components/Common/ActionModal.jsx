import React from 'react'
import { useNavigate } from 'react-router-dom'

const ActionModal = () => {
  const navigate = useNavigate()
  return (
    <div className='fixed inset-0 rounded-2xl bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'>
        <div className='absolue z-10 w-[23vw] h-fit rounded-lg bg-gradient-to-b from-gray-900 to-black flex flex-col items-center'>
            <div className='font-[Segoe_UI] font-semibold w-full pt-5 pb-3 flex justify-center hover:bg-white/10'>Unfollow</div>
            <div onClick={()=>navigate('/edit-post')} className='font-[Segoe_UI] font-semibold w-full py-3 flex justify-center border-y-1 border-white/20 hover:bg-white/10'>Edit Post</div>
            <div className='font-[Segoe_UI] font-semibold w-full py-3 flex justify-center border-y-1 border-white/20 hover:bg-white/10'>Share to</div>
            <div className='font-[Segoe_UI] font-semibold w-full py-3 flex justify-center border-y-1 border-white/20 hover:bg-white/10'>About this account</div>
            <div className='font-[Segoe_UI] font-semibold w-full pt-3 pb-5 flex justify-center hover:bg-white/10'>Cancel</div>
        </div>
      
    </div>
  )
}

export default ActionModal
