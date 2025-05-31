import React, { useEffect, useRef } from 'react'
import Sidebar1 from './Sidebar1'
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationBar } from '../../slices/profileSlice';
import { acceptFollowRequestApi, cancelRequestApi, updateFollowApi } from '../../apis/profileAPI';
import { useNavigate } from 'react-router-dom';

const NotificationBar = () => {

    const ref = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.profile);

    useEffect(() => {
        function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            dispatch(setNotificationBar(false));
        }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dispatch]);

  return (
        <div className="fixed inset-0 z-50 flex">
          {/* Notification drawer */}
          <div
            ref={ref}
            className="w-[34.3%] h-full bg-gradient-to-b from-gray-900 to-black border-r border-gray-700 text-white flex"
          >
            {/* Sidebar section */}
            <div className="w-[15%]">
              <Sidebar1 />
            </div>

            {/* Notification content */}
            <div className="w-[85%] py-6 space-y-3">
              <h1 className="text-2xl font-sans font-bold text-neutral-100 px-7">Notifications</h1>
              <div className="w-full">
                {
                  user?.notifications?.map((notification, i) => (
                    <div key={i} className="flex justify-between items-start hover:bg-gradient-to-r hover:from-purple-700/50 hover:to-transparent cursor-pointer px-7 py-1.5">
                      <div className="flex gap-3 items-center justify-between w-full">
                        {/* Avatar */}
                        <img
                          onClick={() => navigate(`/profile/:${notification?.sender?._id}`)}
                          src={notification?.sender?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${notification?.sender?.username}`}
                          className="w-11 h-11 rounded-full object-cover mt-1"
                          alt="user avatar"
                        />

                        {/* Main Text */}
                        <div className="flex-1 flex-col text-white">
                          {
                            notification?.message === "liked" ? (
                              <div className="flex items-center justify-between w-full text-md`">
                                <div className="font-[Segoe_UI]">
                                  <span className="font-semibold hover:brightness-125 cursor-pointer">
                                    {notification?.sender?.username}
                                  </span>
                                  &nbsp;
                                  <span className="text-white">liked your post.</span>
                                </div>
                                <img
                                  src={notification?.photo}
                                  className="h-11 w-11 rounded-lg object-cover"
                                  alt="post"
                                />
                              </div>
                            ) : (["requested", "started", "accepted"].includes(notification?.message)) ? (
                              
                                <div className="flex items-center justify-between w-full text-md font-[Segoe_UI]">
                                  {
                                    notification?.message === "requested" && 
                                    <div className="w-full flex items-center justify-between gap-4 text-md font-[Segoe_UI]">
                                      {/* Left Text Section */}
                                      <div className="text-white break-words max-w-[70%] leading-snug">
                                        <span
                                          onClick={() => {
                                            navigate(`/profile/${notification?.sender?._id}`);
                                          }}
                                          className="font-semibold hover:brightness-125 cursor-pointer"
                                        >
                                          {notification?.sender?.username}
                                        </span>{" "}
                                        requested to follow you
                                      </div>

                                      {/* Right Buttons Section */}
                                      <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                          onClick={() =>
                                            dispatch(
                                              acceptFollowRequestApi(
                                                notification?.sender?._id,
                                                notification?._id
                                              )
                                            )
                                          }
                                          className="px-3 py-1 bg-purple-600 cursor-pointer hover:bg-purple-800 rounded-lg text-white text-sm font-semibold transition-all duration-300"
                                        >
                                          Confirm
                                        </button>
                                        <button onClick={()=>dispatch(cancelRequestApi(notification?._id,notification?.sender?._id))}
                                          className="px-3 py-1 bg-purple-600 cursor-pointer hover:bg-purple-800 rounded-lg text-white text-sm font-semibold transition-all duration-300"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  }
                                  {
                                    notification?.message === "started" && 
                                    <div className="flex items-center justify-between w-full">
                                      {/* Left Text Section */}
                                      <div className="flex-1">
                                        <span
                                          onClick={() => {
                                            navigate(`/profile/${notification?.sender?._id}`);
                                          }}
                                          className="font-semibold text-md hover:brightness-125 cursor-pointer"
                                        >
                                          {notification?.sender?.username}
                                        </span>
                                        &nbsp;
                                        <span className="text-md">started following you</span>
                                      </div>

                                      {/* Right Button with spacing */}
                                      {
                                        user?.following?.some((User) => User._id === notification?.sender?._id) ? 
                                        (<button onClick={()=>dispatch(updateFollowApi(notification?.sender?._id))} className="ml-4 px-3 py-1 bg-purple-600 cursor-pointer hover:bg-purple-800 rounded-lg text-white text-sm font-semibold transition-all duration-300">
                                          Following
                                        </button>) : 
                                        user?.requested?.some((follower) => follower === notification?.sender?._id) ? 
                                        (<button className="ml-4 px-3 py-1 bg-gray-600 cursor-pointer hover:bg-gray-800 rounded-lg text-white text-sm font-semibold transition-all duration-300">
                                          Requested
                                        </button>) :
                                        (<button onClick={()=>dispatch(updateFollowApi(notification?.sender?._id))} className="ml-4 px-3 py-1 bg-purple-600 cursor-pointer hover:bg-purple-800 rounded-lg text-white text-sm font-semibold transition-all duration-300">
                                          Follow
                                        </button>)                               
                                      }
                                    </div>
                                  }
                                  {
                                    notification?.message === "accepted" && 
                                    <div className="flex items-center justify-between w-full">
                                      <div className="flex-1">
                                        <span
                                          onClick={() => {
                                            navigate(`/profile/${notification?.sender?._id}`);
                                          }}
                                          className="font-semibold text-md hover:brightness-125 cursor-pointer"
                                        >
                                          {notification?.sender?.username}
                                        </span>
                                        &nbsp;
                                        <span className="text-md">accepted your follow request</span>
                                      </div>

                                      <button onClick={()=>dispatch(updateFollowApi(notification?.sender?._id))} className="ml-4 px-3 py-1 bg-purple-600 cursor-pointer hover:bg-purple-800 rounded-lg text-white text-sm font-semibold transition-all duration-300">
                                        Following
                                      </button>
                                    </div>
                                  }
                                </div>
                                
                            ) : (
                              <div className="flex items-center justify-between w-full gap-2">
                                <div className="flex-1 text-white font-[Segoe_UI] break-words text-md">
                                  <span className="font-semibold hover:brightness-125 cursor-pointer">
                                    {notification?.sender?.username}
                                  </span>
                                  &nbsp;
                                  <span>commented:&nbsp;</span> 
                                  
                                  <span className="mt-1">
                                    {notification?.message?.length > 31 ? notification?.message.slice(0, 31) + "..." : notification.message}
                                  </span>
                                </div>
                                <img
                                  src={notification?.photo}
                                  className="h-11 w-11 rounded-lg object-cover flex-shrink-0"
                                  alt="post"
                                />
                              </div>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>

            </div>
          </div>

          {/* Overlay */}
          <div className="flex-1" onClick={() => dispatch(setNotificationBar(false))} />
        </div>

  )
}

export default NotificationBar
