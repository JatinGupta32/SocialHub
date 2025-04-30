import React from 'react'
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { TbMessageFilled } from "react-icons/tb";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import logo from '../../assets/logo1.png';
import "@fontsource/pacifico";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const {user} = useSelector((state)=>state.profile)
    const navigate = useNavigate();
    return (
      <div className="w-1/6 bg-gradient-to-b from-gray-900 to-black h-screen fixed left-0 top-0 flex flex-col items-center border-r border-gray-700 shadow-lg">
          <div className="flex justify-center mt-[2.5rem] cursor-pointer">
              <img src={logo} alt="Logo" className="w-[6.25rem] " />
          </div>
          <h2 className='text-3xl text-white font-bold mb-[2rem] font-[Pacifico] mt-[0.5rem] cursor-pointer'>SocialHub</h2>
          <div className="flex flex-col w-full gap-y-[0.5rem]">
              {/* Home Button */}
              <div className="w-full px-[0.5rem]"> 
                  <button onClick={()=>navigate('/home')} className="flex items-center cursor-pointer gap-[1rem] w-full px-[1rem] py-[0.5rem] rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                      <AiFillHome className="w-[1.75] h-[1.75]" />
                      <p>Home</p>
                  </button>
              </div>
              <div className="w-full px-[0.5rem]"> 
                  <button className="flex items-center cursor-pointer gap-[1rem] w-full px-[1rem] py-[0.5rem] rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                      <IoSearch className="w-[1.75rem] h-[1.75rem]" />
                      <p>Search</p>
                  </button>
              </div>
              <div className="w-full px-[0.5rem]"> 
                  <button onClick={()=>navigate('/message')} className="flex items-center cursor-pointer gap-[1rem] w-full px-[1rem] py-[0.5rem] rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                      <TbMessageFilled className="w-[1.75rem] h-[1.75rem]" />
                      <p>Messages</p>
                  </button>
              </div>
              <div className="w-full px-[0.5rem]"> 
                  <button className="flex items-center cursor-pointer gap-[1rem] w-full px-[1rem] py-[0.5rem] rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                      <IoNotificationsSharp className="w-[1.75rem] h-[1.75rem]" />
                      <p>Notifications</p>
                  </button>
              </div>
              <div className="w-full px-[0.5rem]"> 
                  <button onClick={()=>navigate('/create-post')} className="flex items-center cursor-pointer gap-[1rem] w-full px-[1rem] py-[0.5rem] rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                      <IoMdCreate className="w-[1.75rem] h-[1.75rem]" />
                      <p>Create</p>
                  </button>
              </div>
              <div className="w-full px-[0.5rem]"> 
                  <button onClick={()=>navigate(`/profile/:${user?._id}`)} className="flex items-center cursor-pointer gap-[1rem] w-full px-[1rem] py-[0.5rem] rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                      <FaUserCircle className="w-[1.75rem] h-[1.75rem]" />
                      <p>Profile</p>
                  </button>
              </div>
          </div>
          <div className="w-full px-[0.5rem] mt-auto mb-[1.5rem]">
              <button className="flex items-center cursor-pointer gap-[1rem] w-full px-[1rem] py-[0.5rem] rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                  <CgDetailsMore className="w-[1.75rem] h-[1.75rem]" />
                  <p>More</p>
              </button>
          </div>
          
      </div>
    )
  }

export default Sidebar
