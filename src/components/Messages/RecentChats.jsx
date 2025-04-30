import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setReceiver, setRoomId } from '../../slices/messageSlice';
import { BiEdit } from "react-icons/bi";
import MessageModal from '../Common/MessageModal';
import GroupChats from './GroupChats';
import { getPrivateMessageApi } from '../../apis/messageAPI';

const RecentChats = ({socket}) => {
  
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState(0);
  const {user} = useSelector((state)=>state.profile)
  const dispatch = useDispatch();
  const [action, setAction] = useState(false);  
  // const {roomId} = useSelector((state)=>state.message);

  const handleClick = (privateId) => {
    dispatch(getPrivateMessageApi(privateId));
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-black border-r border-gray-700 text-white flex flex-col">
        {/* from-gray-900 to-black */}
        {/* bg-gradient-to-b from-gray-800 to-black/70 */}
    {/* Header */}
    <div className="px-[1.5rem] py-[1.5rem] flex justify-between items-center">
      <h2 className="text-2xl font-sans font-bold text-neutral-100 bg-clip-text tracking-wide drop-shadow-[0_1px_2px_rgba(128,0,255,0.5)]">
        Messages
      </h2>
      <BiEdit onClick={()=>setAction(1)} size={30} className='hover:text-purple-500 cursor-pointer text-neutral-100'/>
    </div>

    {/* Search */}
    <div className="px-[1.5rem] ">
      <div className="flex items-center gap-[0.75rem] bg-[#1a1a1d] border border-[#2e2e33] px-[1rem] py-[0.5rem] rounded-full focus-within:border-violet-500 shadow-inner shadow-black transition-all">
        <IoSearchOutline size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-full text-sm placeholder-gray-500 text-white"
        />
      </div>
    </div>

    <div className='flex items-center gap-[0.5rem] px-[1.5rem] py-[1rem]'>
      <button onClick={()=>setGroup(0)} className='px-[1rem] py-[0.25rem] bg-white/10 rounded-3xl text-gray-400 text-sm hover:bg-purple-800/30 hover:text-purple-300 cursor-pointer'>Direct</button>
      <button className='px-[1rem] py-[0.25rem] bg-white/10 rounded-3xl text-gray-400 text-sm hover:bg-purple-800/30 hover:text-purple-300 cursor-pointer'>All</button>
      <button onClick={()=>setGroup(1)} className='px-[1rem] py-[0.25rem] bg-white/10 rounded-3xl text-gray-400 text-sm hover:bg-purple-800/30 hover:text-purple-300 cursor-pointer'>Groups</button>
    </div>

    {/* Chat List */}
    {
      group ? <GroupChats/> : 
      <div className="flex-1 overflow-y-auto custom-scrollbar1">
        {user?.privateChats ? (
          user?.privateChats?.slice().reverse().map((privateChat, i) => {
            const otherUser = Array.isArray(privateChat.users) ? privateChat.users.find(u => u._id !== user._id) : null;
            return (
              <div
                key={i}
                className="group flex items-center justify-between px-[1.5rem] py-[0.75rem] border-b border-[#1d1d20] hover:bg-[#1c1c22] hover:shadow-[0_2px_10px_rgba(168,85,247,0.2)] transition-all duration-200 cursor-pointer"
                onClick={()=>handleClick(privateChat._id)}
              >
                {/* Avatar & Name */}
                <div className="flex items-center gap-[1rem]">
                  <img src={otherUser?.image} alt="avatar" className="w-[3.2rem] h-[3.2rem] rounded-full shadow-md object-cover" />
                  <div className="max-w-[11rem] flex-col justify-center space-y-[0.25rem] ">
                    <p className="text-sm font-semibold font-[Segoe_UI] text-zinc-100 group-hover:text-violet-400 truncate">
                      {otherUser?.fullname}
                    </p>
                    <p className="text-xs text-gray-400 font-[Segoe_UI] truncate">
                      Last message here...
                    </p>
                  </div>
                </div>
      
                {/* Time */}
                <span className="text-xs text-gray-500 group-hover:text-violet-300 transition duration-150 font-mono">
                  10:{20 + i}
                </span>
              </div>
            )
            
          })
        ) : (
          <div className="text-center text-gray-400 p-4">No users found</div>
        )}
      </div>
      
    }
    
      {
        action && <MessageModal onClose={()=>setAction(null)}></MessageModal>
      }
  </div>
  )
}

export default RecentChats
