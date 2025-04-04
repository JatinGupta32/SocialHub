import React, { useState } from "react";
import { FiMail, FiMoreHorizontal } from "react-icons/fi";
import { RiUserFollowFill } from "react-icons/ri";
import { GrLinkNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getUserApi, updateFollowApi } from "../../apis/profileAPI";
import { useEffect } from "react";
import ModalPortal from "../Common/ModalPortal";

const ProfileSection = ({User,setProfileUser}) => {
  const {user} = useSelector((state)=>state.profile);
  console.log("User: ",User);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [action, setAction] = useState(false);
  // console.log("Logined User: ", user?._id);
  // console.log("Profile User: ", User._id);
  const handleOnfollow = (e) =>{
    e.preventDefault();
    dispatch(updateFollowApi(User._id))
    .then((res)=>setProfileUser(res))
    .catch((err) => console.log(err));
  }

  // useEffect(()=>{
  //         dispatch(getUserApi())
  //       },[])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">

        <div className="bg-white/10 h-fit backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col items-center border border-white/20">
          {/* Profile Image */}
          <img
            src={User.image}
            alt="Profile"
            onClick={()=>setAction(true)}
            className="w-32 h-32 rounded-full cursor-pointer object-cover  shadow-md border-3 border-purple-800"
          />

          {/* Name & Username */}
          <div className="text-2xl font-[Segoe_UI] font-bold text-white mt-3">{User.fullname}</div>
          <div className="brightness-75 text-md font-serif ">{User.username}</div>

          {/* Stats */}
          <div className="flex justify-center gap-5 my-4 text-gray-300 text-sm">
            <div>
              <span className="font-bold text-white">{User?.posts?.length || 0}</span> Posts
            </div>
            <div className="cursor-pointer">
              <span className="font-bold text-white">{User?.followers?.length || 0}</span> Followers
            </div>
            <div className="cursor-pointer">
              <span className="font-bold text-white">{User?.following?.length || 0}</span> Following
            </div>
          </div>

          {/* Buttons */}
          {
            (user?._id!==User._id) ? 
              <div className="flex items-center gap-3 mt-2">
                {
                  user?.following?.some((follower) => follower._id === User._id) ? 
                    <button onClick={handleOnfollow} className="flex items-center bg-purple-500 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-purple-700 transition">
                      <RiUserFollowFill className="mr-1"/>Following
                    </button> :
                    <button onClick={handleOnfollow} className="flex items-center bg-purple-900 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-purple-700 transition">
                      <RiUserFollowFill className="mr-1"/>Follow
                    </button>
                }
                
                <button className="p-2 bg-white/20 cursor-pointer rounded-full shadow-md hover:bg-white/30 transition">
                  <FiMail size={18} className="text-white" />
                </button>
                <button className="p-2 bg-white/20 cursor-pointer rounded-full shadow-md hover:bg-white/30 transition">
                  <FiMoreHorizontal size={18} className="text-white" />
                </button>
              </div>  :
              <div className="flex items-center gap-3 mt-2">
                <button onClick={()=>(navigate('/edit-profile'))} className="flex items-center bg-purple-500 cursor-pointer text-white px-3 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-purple-700 transition">
                  <MdEdit size={19} className="mr-1"/>Edit Profile
                </button>
                <button className="flex items-center bg-purple-500 cursor-pointer text-white px-3 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-purple-700 transition">
                  <IoShareSocialSharp size={19} className="mr-1"/>Share Profile
                </button>
                <button className="p-2 bg-white/20 cursor-pointer rounded-full shadow-md hover:bg-white/30 transition">
                  <FiMoreHorizontal size={18} className="text-white" />
                </button>
              </div>
          }
          

          {/* About Section */}
          <div className="w-full mt-6 text-left">
            <h3 className="text-gray-300 font-[Segoe_UI] font-bold text-sm">ABOUT</h3>
            <p className="text-gray-400 text-sm leading-relaxed mt-1">
              {User?.additionalDetails?.bio}
            </p>
          </div>

          {/* Friends List */}
          <div className="w-full mt-5 flex-col space-y-5">
            <div className="flex-col space-y-2">
              <h3 className="text-gray-300 font-[Segoe_UI] font-bold text-md">Followers</h3>
              <div className="grid grid-cols-6 gap-3">

                  {
                    User?.followers?.map((follower,i)=>(
                      <img onClick={() => navigate(`/profile/${follower?._id}`)}
                        src={follower.image ? follower.image : `https://api.dicebear.com/5.x/initials/svg?seed=${follower.fullname}`} alt="Photo"
                        className="w-12 h-12 cursor-pointer rounded-full object-cover hover:brightness-75" />
                    ))
                  }

                  <button className="w-12 h-12 flex justify-center items-center bg-white/20 cursor-pointer rounded-full shadow-md hover:bg-white/30 transition">
                      <GrLinkNext size={18} className="text-white" />
                  </button>
              </div>
            </div>
            <div className="flex-col space-y-2">
              <h3 className="text-gray-300 font-[Segoe_UI] font-bold text-md">Following</h3>
              <div className="grid grid-cols-6 gap-3 mt-3">
                  {
                    User?.following?.map((f,i)=>(
                      <img onClick={() => navigate(`/profile/${f?._id}`)}
                        src={f.image ? f.image : `https://api.dicebear.com/5.x/initials/svg?seed=${f.fullname}`}
                        alt="Photo"
                        className="w-12 h-12 cursor-pointer rounded-full object-cover hover:brightness-75" />
                    ))
                  }

                  <button className="w-12 h-12 flex justify-center items-center bg-white/20 cursor-pointer rounded-full shadow-md hover:bg-white/30 transition">
                      <GrLinkNext size={18} className="text-white" />
                  </button>
              </div>
            </div>
            
          </div>

        </div>
        {
          action && (
            <ModalPortal onClose={()=>setAction(false)}>
              <div className="inset fixed  bg-opacity-50 z-50 flex justify-center items-center" >
              <img src={User.image}
                alt="Profile" 
                className="flex w-80 h-80 bg-black rounded-full cursor-pointer object-cover shadow-md border-5 border-purple-800"></img>
            </div>
            </ModalPortal>
            
          )
        }
    </div>
  );
};

export default ProfileSection;
