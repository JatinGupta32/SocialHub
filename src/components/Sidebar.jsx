import React from 'react'
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { TbMessageFilled } from "react-icons/tb";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import logo from '../assets/logo1.png';
import "@fontsource/pacifico";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    return (
      <div className="w-1/6 bg-gradient-to-b from-gray-900 to-black h-screen fixed left-0 top-0 flex flex-col items-center border-r border-gray-700 shadow-lg">
          <div className="flex justify-center mt-10 cursor-pointer">
              <img src={logo} alt="Logo" className="w-25 " />
          </div>
          <h2 className='text-3xl text-white font-bold mb-8 font-[Pacifico] mt-2 cursor-pointer'>SocialHub</h2>
          <div className="flex flex-col w-full gap-y-2">
              {/* Home Button */}
              <div className="w-full px-2"> 
                  <button onClick={()=>navigate('/home')} className="flex items-center cursor-pointer gap-4 w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                      <AiFillHome className="w-7 h-7" />
                      <p>Home</p>
                  </button>
              </div>
              <div className="w-full px-2"> 
                  <button className="flex items-center cursor-pointer gap-4 w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                      <IoSearch className="w-7 h-7" />
                      <p>Search</p>
                  </button>
              </div>
              <div className="w-full px-2"> 
                  <button className="flex items-center cursor-pointer gap-4 w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                      <TbMessageFilled className="w-7 h-7" />
                      <p>Messages</p>
                  </button>
              </div>
              <div className="w-full px-2"> 
                  <button className="flex items-center cursor-pointer gap-4 w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                      <IoNotificationsSharp className="w-7 h-7" />
                      <p>Notifications</p>
                  </button>
              </div>
              <div className="w-full px-2"> 
                  <button onClick={()=>navigate('/create-post')} className="flex items-center cursor-pointer gap-4 w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                      <IoMdCreate className="w-7 h-7" />
                      <p>Create</p>
                  </button>
              </div>
              <div className="w-full px-2"> 
                  <button onClick={()=>navigate('/profile')} className="flex items-center cursor-pointer gap-4 w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                      <FaUserCircle className="w-7 h-7" />
                      <p>Profile</p>
                  </button>
              </div>
          </div>
          <div className="w-full px-2 mt-auto mb-6">
              <button className="flex items-center cursor-pointer gap-4 w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                  <CgDetailsMore className="w-7 h-7" />
                  <p>More</p>
              </button>
          </div>
          
      </div>
    )
  }

export default Sidebar
