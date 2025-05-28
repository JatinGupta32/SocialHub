import React, { useEffect, useRef, useState } from 'react';
import { FaPaperPlane, FaMicrophone, FaSmile } from 'react-icons/fa';
import { AiOutlineVideoCamera } from "react-icons/ai";
import { TbPhoneCall } from "react-icons/tb";
import { FiImage } from 'react-icons/fi';
import { BsThreeDotsVertical } from "react-icons/bs";
import userImage from '../../assets/Profile Photos/user.png'
import { useDispatch, useSelector } from 'react-redux';
import { format, isToday, isYesterday } from 'date-fns';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { MdEmojiEmotions } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import {saveGroupNameApi, saveGroupPhotoApi} from '../../apis/messageAPI'

const ChatSection = ({socket}) => {

  const [msg,setMsg] = useState('');
  const [chats,setChats] = useState([]);
  const [chatDetail,setChatDetail] = useState(null);
  const [roomId,setRoomId] = useState(null);
  const {user} = useSelector((state)=>state.profile);
  const {chatData} = useSelector((state)=>state.message)
  const dispatch = useDispatch();
  const bottomRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [photoAction, setPhotoAction] = useState(null);
  const [nameAction, setNameAction] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [grpName, setGrpName] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    setShowSidebar(false);
    console.log(chatData);
    if (chatData) {
      setChats(chatData?.messages);
      console.log("chatData:", chatData);
      if(chatData?.users.length===2){
        setChatDetail({
          'id': chatData.users[0]?.username===user?.username?chatData.users[1]?._id:chatData.users[0]?._id,
          'name': chatData.users[0]?.username===user?.username?chatData.users[1]?.fullname:chatData.users[0]?.fullname,
          'photo': chatData.users[0]?.username===user?.username?chatData.users[1]?.image:chatData.users[0]?.image,
        })
      }
      else{
        setChatDetail({
          'name': chatData?.groupName?chatData?.groupName:'Group',
          'photo': chatData?.groupPhoto,
        })
        setGrpName(chatData?.groupName);
      }
      setRoomId(chatData?.roomId); // Triggers next useEffect
    }
  }, [chatData]);
  
  useEffect(() => {
    if (socket && roomId) {
      socket.emit('joinRoom', { roomId });
      console.log("Joined room:", roomId);
    }
  }, [roomId, socket]);

  const handleOnSendMsg = () => {
    if (!msg.trim()) return;

    socket.emit('sendMessage', {
      roomId,
      sender: user,
      message: msg.trim(),
      noOfUsers: chatData?.users?.length || 2,
    });

    setMsg('');
  }

  useEffect(() => {
    if (!socket) return;

    const handleIncoming = (message) => {
      console.log('Received message:', message);
      setChats((prev) => [...prev, message]);
    };

    socket.on('sendMessage', handleIncoming);

    return () => {
      socket.off('sendMessage', handleIncoming);
    };
  },[socket]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chats]);

  const addEmoji = (emoji) => {
    setMsg((prev) => prev + emoji.native);
  };

  if(!chatData) {
    return (
      <div className="w-full h-screen flex flex-col bg-gradient-to-b from-gray-800 to-black/70"></div>
    )
  }

  const handleOnClick = () => {
    if(chatData?.users.length===2){
      navigate(`/profile/:${chatDetail?.id}`)
    }
    else{
      setShowSidebar(!showSidebar);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file)); // For preview
    }
  };

  const handleOnSavePhoto = () => {
    dispatch(saveGroupPhotoApi(chatData._id,imageFile));
    setSelectedImage(null);
    setPhotoAction(null);
  }
  
  const handleOnSaveName = () => {
    dispatch(saveGroupNameApi(chatData._id,grpName));
    setGrpName(chatData?.groupName)
    setNameAction(null);
  }

  return (
    <div className="w-full h-screen flex ">
      <div className={`h-full ${showSidebar ? 'w-[66%]' : 'w-[100%]'} flex flex-col transition-all duration-300`}>
        {/* Header */}
        <div className="h-[5rem] flex items-center px-[2rem] bg-[#12121a] backdrop-blur-md border-b border-gray-700">
          <div className='flex justify-between items-center w-full'>
            <div onClick={handleOnClick} className='flex gap-[1rem] items-center cursor-pointer'>
              <img src={chatDetail?.photo || userImage} className='w-[2.5rem] h-[2.5rem] rounded-full object-cover'/>
              <div>
                <h1 className="font-semibold text-white text-lg">{chatDetail?.name}</h1>
                {chatData?.users.length==2 && <p className="text-sm text-gray-400">{chatData.users[0]?.username}</p>}
              </div>
            </div>
            <div className='flex gap-[1rem]'>
              <AiOutlineVideoCamera size={27} className='hover:text-purple-500 cursor-pointer'/>
              <TbPhoneCall size={27} className='hover:text-purple-500 cursor-pointer'/>
              <BsThreeDotsVertical size={27} className='hover:text-purple-500 cursor-pointer'/>
            </div>
          </div>        
        </div>

  {/* bg-[url('/bg-pattern.svg')] bg-cover bg-no-repeat */}
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 relative bg-gradient-to-b from-gray-800 to-black/70 custom-scrollbar1">
          {(() => {
            let lastDate = null;

            return chats?.map((chat, i) => {
              const chatDate = new Date(chat.sendAt);

              let dateLabel;
              if (isToday(chatDate)) {
                dateLabel = "Today";
              } else if (isYesterday(chatDate)) {
                dateLabel = "Yesterday";
              } else {
                dateLabel = format(chatDate, 'dd/MM/yyyy'); // e.g., 24/05/2025
              }

              const timeLabel = format(chatDate, 'HH:mm'); // like 14:03

              const showDateHeader = lastDate !== dateLabel;
              lastDate = dateLabel;

              return (
                <div key={i} className="space-y-3">
                  {showDateHeader && (
                    <div className="flex justify-center">
                      <span className="bg-purple-800/30 text-purple-300 text-sm px-4 py-1 rounded-full font-medium shadow-md">
                        {dateLabel}
                      </span>
                    </div>
                  )}

                  {/* Outgoing vs Incoming Message */}
                  {chat?.sender._id === user?._id ? (
                  // Outgoing (Your) message
                  <div className="flex justify-end w-full">
                    <div className="flex gap-3 w-2/3 justify-end">
                      <div className="text-right">
                        <div className="text-sm text-white/90">
                          <div>
                            <span className='font-semibold font-sans'>You</span>
                            <span className="text-xs text-gray-400 ml-2">{timeLabel}</span>
                          </div>
                          <div className="bg-purple-600 text-white px-4 py-2 rounded-b-3xl rounded-l-3xl inline-block mt-2 shadow-md">
                            {chat?.message}
                          </div>
                        </div>
                      </div>
                      <img src={chat.sender?.image} alt="avatar" className="w-9 h-9 rounded-full flex-shrink-0 mt-1" />
                    </div>
                  </div>
                ) : (
                  // Incoming (Other's) message
                  <div className="flex justify-start w-full">
                    <div className="flex gap-3 w-2/3">
                      <img src={chat.sender?.image} alt="avatar" className="w-9 h-9 rounded-full flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-sm text-white/90">
                          <span className='font-semibold font-sans'>{chat?.sender?.fullname}</span>
                          <span className="text-xs text-gray-400 ml-2">{timeLabel}</span>
                        </div>
                        <div className="bg-[#2e2e42] text-white text-sm px-4 py-2 rounded-b-3xl rounded-r-3xl inline-block mt-2 shadow-md">
                          {chat?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                </div>
              );
            });
          })()}
        <div ref={bottomRef} />
        </div>


        {/* Message Input */}
        <div className="h-[5rem] px-6 border-t border-[#2e2e42] flex items-center gap-3 shadow-inner bg-[#12121a]">
            <div className='relative '>
              <button 
                  onClick={(e) => { e.preventDefault();
                                  setShowEmojiPicker(!showEmojiPicker)
                                  }}
                  className="px-1.5 py-1.5 cursor-pointer rounded-full border border-gray-200 bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg"
              >
                  <MdEmojiEmotions size={25}/>
              </button>
              {showEmojiPicker && (
                  <div className="absolute mt-2 bottom-0 translate-y-[-11%] z-2 bg-gray-800 shadow-xl rounded-lg p-1">
                      <Picker data={data} onEmojiSelect={addEmoji} theme="dark"/>
                  </div>
              )}
            </div>
          <label className='flex items-center justify-between h-[60%] w-full bg-[#31314f] border border-[#3a3a50] rounded-bl-2xl rounded-r-4xl px-1 py-1 shadow-md transition-all duration-200'>
            
            <input
              type="text"
              value={msg}
              onChange={(e)=>setMsg(e.target.value)}
              name='message'
              placeholder="Type a message..."
              className="flex-1 px-3 text-white placeholder:text-[#aaa] font-sans placeholder:text-md text-base bg-transparent outline-none"
            />
            <div onClick={()=>handleOnSendMsg()} className='z-50 bg-gradient-to-br from-purple-500 to-purple-600 w-9 h-9 flex items-center justify-center rounded-full hover:from-white hover:to-white hover:text-purple-600 transition-all duration-200 shadow-lg cursor-pointer'>
              <FaPaperPlane size={17} className="" />
            </div>
          </label>
          <div className="flex gap-4 text-lg text-gray-400">
            <FaMicrophone size={23} className="cursor-pointer hover:text-purple-500 transition-colors duration-150" />
            <FiImage size={23} className="cursor-pointer hover:text-purple-500 transition-colors duration-150" />
          </div>
        </div>
      </div>
      <div className={`h-full ${
        showSidebar ? 'w-[34%]' : 'w-0'
        } flex flex-col border-l border-gray-700 transition-all duration-300 overflow-hidden`}>
        <div className='h-[5rem] flex items-center px-[1.5rem] bg-[#12121a] backdrop-blur-md border-b border-gray-700 font-[Segoe_UI] font-semibold text-xl'>Details</div>
        <div className='flex-1 w-full overflow-y-auto custom-scrollbar1'>
          <div className='w-full h-fit bg-gradient-to-b from-gray-800 to-black/70'>
            <div className='w-full h-[45%] px-[1.5rem] py-[1.5rem] flex flex-col items-center space-y-4'>
              <div className='flex flex-col justify-center items-center w-full space-y-2'>
                <img src={chatDetail?.photo || userImage} className='object-cover w-[7rem] h-[7rem] rounded-full cursor-pointer'/>
                <div className='font-sans font-semibold text-md'>{chatData?.groupName}</div>
              </div>
              <div className=' flex justify-between items-center w-full'>
                <div className='font-[Segoe_UI] text-md'>Change profile photo</div>
                <button onClick={()=>setPhotoAction(1)} className='px-[0.75rem] py-[0.25rem] bg-gray-700 rounded-lg text-sm font-[Segoe_UI] font-semibold cursor-pointer hover:bg-purple-600'>Change</button>
              </div>
              <div className=' flex justify-between items-center w-full'>
                <div className='font-[Segoe_UI] text-md'>Change group name</div>
                <button onClick={()=>setNameAction(1)} className='px-[0.75rem] py-[0.25rem] bg-gray-700 rounded-lg text-sm font-[Segoe_UI] font-semibold cursor-pointer hover:bg-purple-600'>Change</button>
              </div>
            </div>
            <div className="flex-col w-full mx-auto py-[1rem] px-[1.5rem] border-y border-gray-700">
              <div className='flex justify-between items-center pb-[1rem]'>
                <div className='font-[Segoe_UI] font-semibold text-md brightness-75'>Members</div>
                <div className='font-sans cursor-pointer hover:text-white font-semibold text-purple-500 text-sm'>Add people</div>
              </div>              
              <div className='h-[20rem] overflow-y-auto custom-scrollbar flex flex-col space-y-[1rem]'>
                  {
                      chatData?.users?.map((User,i) => (
                          <div className="flex justify-between items-center ">
                              <div className='flex gap-[0.75rem]'>
                                  <img onClick={()=>{navigate(`/profile/:${User?._id}`)}} src={User?.image ? User?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${User?.fullname}`} className="w-13 h-13 mb-auto rounded-full object-cover cursor-pointer"></img>
                                  <div className='flex-col justify-center'>
                                      <div onClick={()=>{navigate(`/profile/:${User?._id}`)}} className='font-[Segoe_UI] font-semibold text-md hover:text-purple-500 cursor-pointer'>{User?.username}</div>
                                      <div className='font-serif brightness-75 text-sm'>{User?.fullname}</div>
                                  </div>
                              </div>
                              <BsThreeDotsVertical size={18} className='hover:text-purple-500 cursor-pointer'/>
                          </div>
                      ))
                  }
              </div>
            </div>
          </div>
          <div className='h-fit bg-black backdrop-blur-md w-full flex flex-col justify-center px-[1.5rem] py-[1rem] space-y-2'>
              <div className='text-red-500 text-md font-[Segoe_UI] cursor-pointer hover:brightness-75'>Leave chat</div>
              <div className='text-sm text-neutral-400 font-[Segoe_UI]'>You won't be able to send or receive messages unless someone adds you back to the chat. No one will be notified that you left the chat.</div>
              <div className='text-red-500 text-md font-[Segoe_UI] cursor-pointer hover:brightness-75'>Delete chat</div>
          </div>
        </div>
        
      </div>

      {
        photoAction && (
          <div className='fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className="absolute z-10 w-[28%] h-fit rounded-lg bg-gray-800 shadow-lg flex flex-col">
              <div className="h-[20%] flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <h2 className="text-center w-full text-lg font-semibold text-white font-sans">Change Group Photo</h2>
                <RxCross2 onClick={() => setPhotoAction(0)} size={22} className="text-gray-300 hover:text-purple-500 cursor-pointer"/>
              </div>
              <div className="flex flex-col px-4 py-3 flex-1 space-y-5">
                <p className="text-md text-gray-400 font-[Segoe_UI]">Changing the photo of a group chat changes it for everyone.</p>
                <div className='flex flex-col justify-center items-center w-full space-y-2'>
                  <label htmlFor="group-photo">
                    <img
                      src={selectedImage || chatDetail?.photo || userImage}
                      className='object-cover w-[7rem] h-[7rem] rounded-full cursor-pointer'
                      alt="Group"
                    />
                  </label>
                  <input
                    type="file"
                    id="group-photo"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <div className='font-sans font-semibold text-md'>Profile photo</div>
                </div>
                <button
                  onClick={handleOnSavePhoto} className="mt-auto w-full bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-medium py-2 rounded-md transition duration-200"
                > Save </button>
              </div>
            </div>
          </div>
        )
      }

      {
        nameAction && (
          <div className='fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className="absolute z-10 w-[28%] h-[15rem] rounded-lg bg-gray-800 shadow-lg flex flex-col">
              <div className="h-[20%] flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <h2 className="text-center w-full text-lg font-semibold text-white font-sans">Change Group Name</h2>
                <RxCross2 onClick={() => setNameAction(0)} size={22} className="text-gray-300 hover:text-purple-500 cursor-pointer"/>
              </div>
              <div className="flex flex-col px-4 py-3 flex-1 space-y-3">
                <p className="text-md text-gray-400 font-[Segoe_UI]">Changing the name of a group chat changes it for everyone.</p>
                <input
                  type="text"
                  name="name"
                  value={grpName}
                  onChange={(e)=>setGrpName(e.target.value)}
                  placeholder="Enter group name"
                  className="border border-gray-600 font-sans bg-gray-900 text-white placeholder-gray-500 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button
                  onClick={handleOnSaveName} className="mt-auto w-full bg-purple-600 hover:bg-purple-700 cursor-pointer text-white font-medium py-2 rounded-md transition duration-200"
                > Save </button>
              </div>
            </div>
          </div>
        )
      }


    </div>
  );
};

export default ChatSection;

          {/* Audio Message */}
          {/* <div className="flex justify-end">
            <div className="bg-purple-600 px-4 py-3 rounded-[20px] text-white w-fit shadow-md">
              <div className="flex items-center space-x-3">
                <button className="w-6 h-6 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold">
                  ▶
                </button>
                <div className="flex-1 w-32 h-1 bg-white/50 rounded"></div>
                <span className="text-sm">0:30</span>
              </div>
            </div>
          </div> */}
  
          {/* Image Message */}
          {/* <div className="flex justify-end">
            <div className="rounded-xl overflow-hidden mt-2 w-64 shadow-md">
              <img src="/room-setup.jpg" alt="setup" className="w-full object-cover" />
              <div className="flex gap-4 px-3 py-2 text-sm text-white bg-[#2e2e42] border-t border-[#3a3a50]">
                <span>😍 6</span>
                <span>👍 3</span>
              </div>
            </div>
          </div> */}
  
          {/* Typing Indicator */}
          {/* <div className="flex items-center gap-3">
            <img src="/avatar2.png" className="w-8 h-8 rounded-full" />
            <div className="text-sm text-purple-400">Abel is typing...</div>
          </div>
        </div> */}








      //   <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 relative bg-gradient-to-b from-gray-800 to-black/70 custom-scrollbar1">
      //   {/* System Message */}
      //   <div className="flex justify-center">
      //     <span className="bg-purple-800/30 text-purple-300 text-sm px-[1rem] py-1 rounded-full font-medium shadow-md">
      //       Schedule UI/UX Class on May
      //     </span>
      //   </div>

      //   {
      //     chats?.map((chat,i)=>{
      //       if(chat?.sender._id===user?._id){
      //         {/* Outgoing Message */}
      //         return(
      //         <div className="flex justify-end gap-3">
      //           <div className="text-right">
      //             <div className="text-sm text-white/90">
      //               <div>
      //                 <span className='font-semibold font-sans'>You</span>
      //                 <span className="text-xs text-gray-400 ml-2">{chat.sendAt}</span>
      //               </div>
      //               <div className="bg-purple-600 text-white px-[1rem] py-[0.5rem] rounded-b-3xl rounded-l-3xl inline-block mt-2 shadow-md">
      //                 {chat?.message}
      //               </div>
      //             </div>
      //           </div>
      //           <img src={chat.sender?.image} alt="avatar" className="w-[2.25rem] h-[2.25rem] rounded-full" />
      //         </div>
      //         )
      //       }
      //       else{
      //         {/* Incoming Message */}
      //         return(
      //         <div className="flex items-start gap-3">
      //           <img src={chat.sender.image} alt="avatar" className="w-[2.25rem] h-[2.25rem] rounded-full" />
      //           <div>
      //             <div className="text-sm text-white/90 ">
      //               <span className='font-semibold font-sans'>{chat?.sender?.fullname}</span>
      //               <span className="text-xs text-gray-400 ml-2">24/05</span>
      //             </div>
      //             <div className="bg-[#2e2e42] px-[1rem] py-[0.5rem] rounded-b-3xl rounded-r-3xl text-sm text-white mt-2 inline-block shadow-md">
      //             {chat?.message}
      //             </div>
      //           </div>
      //         </div>
      //         )

      //       }
      //     })
      //   }

      // </div>