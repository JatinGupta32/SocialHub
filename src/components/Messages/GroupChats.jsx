import React, { useEffect, useState } from 'react'
import { getGroupMessageApi, getGroupsApi } from '../../apis/messageAPI';
import { useDispatch } from 'react-redux';

const GroupChats = () => {
    const dispatch = useDispatch();
    const [groups,setGroups] = useState([]);
    useEffect(()=>{
        dispatch(getGroupsApi())
        .then((res)=>setGroups(res))
        .catch((err)=>console.log(err)); 
    },[]);

    const handleClick = (groupId) => {
      dispatch(getGroupMessageApi(groupId));
    }
    
  return (
    <div>
      <div className="flex-1 overflow-y-auto custom-scrollbar1">
        {groups?.length > 0 ? (
          groups.map((group, i) => (
            <div
              key={i}
              onClick={()=>handleClick(group._id)}
              className="group flex items-center justify-between px-[1.5rem] py-[0.75rem] border-b border-[#1d1d20] hover:bg-[#1c1c22] hover:shadow-[0_2px_10px_rgba(168,85,247,0.2)] transition-all duration-200 cursor-pointer"
            //   onClick={()=>handleForJoinRoom(user)}
            >
              {/* Avatar & Name */}
              <div className="flex items-center gap-[1rem]">
                <img src={group.users[0].image} alt="avatar" className="w-[3rem] h-[3rem] border-3 border-purple-400 rounded-full shadow-md object-cover" />
                <img src={group.users[1].image} alt="avatar" className="absolute translate-x-4 border-purple-400 w-[3rem] h-[3rem] rounded-full shadow-md object-cover" />
                <div className="max-w-[11rem] flex-col justify-center space-y-[0.25rem] ">
                  <p className="text-sm font-semibold font-[Segoe_UI] text-zinc-100 group-hover:text-violet-400 truncate">
                    {group.roomid}
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
          ))
        ) : (
          <div className="text-center text-gray-400 p-4">No users found</div>
        )}
      </div>
    </div>
  )
}

export default GroupChats
