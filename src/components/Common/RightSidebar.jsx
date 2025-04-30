import React, { useEffect, useState } from 'react'
import { getUnfollowUserApi, updateFollowApi} from '../../apis/profileAPI'
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationModal from './ConfirmationModal';
import { logout } from '../../apis/authAPI';
import { useNavigate } from 'react-router-dom';

const RightSidebar = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const [unfollowedUsers, setUnfollowedUsers] = useState(null);
    // useEffect(()=>{
    //     getUserApi();
    // })
    const [confirmationModal, setConfirmationModal] = useState(null)
    useEffect(()=>{
        dispatch(getUnfollowUserApi())
        .then(setUnfollowedUsers)
        .catch((err)=>console.log(err));
    },[user,dispatch])

  return (
    <div className='flex-col w-full h-full space-y-[0.75rem] items-center bg-gradient-to-b from-gray-900 to-black py-[1rem] shadow-lg '>
        <div className="flex w-4/5 mx-auto h-fit justify-between items-center py-[1rem] border-b-[1px] border-gray-700">
            <div className='flex gap-[0.75rem]'>
                <img src={user?.image ? user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.fullname}`} className="w-[2.75rem] h-[2.75rem] mb-auto rounded-full object-cover cursor-pointer"></img>
                <div className='flex-col justify-center'>
                    <div className='font-[Segoe_UI] font-semibold text-md hover:text-purple-500 cursor-pointer'>{user?.username}</div>
                    <div className='font-serif brightness-75 text-sm '>{user?.fullname}</div>
                </div>
            </div>
            
            <div className="text-sm w-fit">
                  <button 
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Are you sure?",
                      text2: "You will be logged out of your account.",
                      btn1Text: "Logout",
                      btn2Text: "Cancel",
                      btn1Handler: () => dispatch(logout(navigate)),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }
                  className="font-sans cursor-pointer hover:text-white font-semibold text-purple-500">Logout</button>
            </div>
        </div>
        <div className="flex-col h-fit w-4/5 mx-auto py-[1rem]">
            <div className='font-[Segoe_UI] font-semibold text-sm brightness-75'>People You May Know</div>
            <div>
                {
                    unfollowedUsers?.map((User,i) => (
                        <div className="flex justify-between items-center mt-[1rem] mb-[0.75rem]">
                            <div className='flex gap-[0.75rem]'>
                                <img onClick={()=>{navigate(`/profile/:${User?._id}`)}} src={User?.image ? User?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${User?.fullname}`} className="w-11 h-11 mb-auto rounded-full object-cover cursor-pointer"></img>
                                <div className='flex-col justify-center'>
                                    <div onClick={()=>{navigate(`/profile/:${User?._id}`)}} className='font-[Segoe_UI] font-semibold text-md hover:text-purple-500 cursor-pointer'>{User?.username}</div>
                                    <div className='font-serif brightness-75 text-sm '>{User?.fullname}</div>
                                </div>
                            </div>
                            <div className="text-sm w-fit">
                                <button onClick={()=>(dispatch(updateFollowApi(User?._id)))} className="font-sans cursor-pointer hover:text-white font-semibold text-purple-500">Follow</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default RightSidebar
