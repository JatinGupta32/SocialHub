import React, { useEffect, useState } from 'react'
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineCircle } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { createGroupApi, createPrivateChatApi } from '../../apis/messageAPI';

const MessageModal = ({onClose}) => {

    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.profile)

    useEffect(()=>{
        const fetchUsers = async () => {
          try {
            await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/getAllUsers`)
            .then((res)=>{setUsers(res.data.userDetails); console.log(res)})
            .catch((err)=>console.log(err));
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        }
        fetchUsers();   
      },[]);

      const handleOncreate = () => {
        if(selectedUsers.length===0) return;
        if(selectedUsers.length===1){
          dispatch(createPrivateChatApi(selectedUsers));
        }
        else{
          dispatch(createGroupApi(selectedUsers));
        }
        onClose();
      }

  return (
    <div className='fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'>
        <div className='absolute z-10 w-[38%] h-[70%] rounded-lg bg-gray-800 flex flex-col items-center'>
            <div className='h-[2rem] w-full px-[1rem] py-[1.5rem] border-b border-gray-400 flex items-center '>
                <div className='flex-1 text-center font-sans font-bold'>Create a New Group</div>
                <RxCross2 onClick={onClose} size={27} className='hover:text-purple-500 cursor-pointer'/>
            </div>
            <div className=' w-full px-[1rem] py-[0.5rem] border-b border-gray-400 flex gap-4 items-center '>
                <div className='font-sans font-bold'>To: </div>
                <input
                    type='text'
                    placeholder='Search..'
                    className='text-sm outline-none placeholder:text-gray-300'
                />
            </div>
            <div className='w-full font-sans font-bold text-sm px-[1rem] py-[0.7rem]'>Suggested</div>
            <div className='w-full h-[65%] flex-col items-center justify-center overflow-y-auto '>
                {users?.map((User,i)=>
                    (
                      user._id!==User._id && (
                        <div onClick={() => {
                          if (selectedUsers?.includes(User)) {
                            setSelectedUsers(selectedUsers.filter(u => u !== User));
                          } else {
                            setSelectedUsers([...selectedUsers, User]);
                          }
                        }}
                         className='flex items-center justify-between w-full hover:bg-gray-900 px-[1rem] py-[0.4rem] cursor-pointer'>
                          <div className='flex items-center justify-center gap-3'>
                              <img src={User?.image} className='w-[3rem] h-[3rem] rounded-full object-cover'/>
                              <div className='font-[Segoe_UI] text-zinc-100'>{User?.fullname}</div>
                          </div>
                          {
                              selectedUsers?.includes(User) ? 
                              <MdCheckCircle className='w-[2rem] h-[2rem]'/> : 
                              <MdOutlineCircle className='w-[2rem] h-[2rem] '/>
                          }
                      </div>
                      )                      
                    )
                    
                )}
            </div>
            <div className='px-[1rem] w-full py-[1rem]'>
                <button onClick={handleOncreate} className='w-full px-[1rem] py-[0.5rem] rounded-xl font-sans text-lg font-semibold bg-purple-500 hover:bg-purple-700 hover:font-bold cursor-pointer hover:text-white transition-all'>Create</button>
            </div>
        </div>
      
    </div>
  )
}

export default MessageModal
