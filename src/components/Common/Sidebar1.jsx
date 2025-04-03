import React from 'react'
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { TbMessageFilled } from "react-icons/tb";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { CgDetailsMore } from "react-icons/cg";
import logo from '../../assets/logo1.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar1 = () => {
    const {user} = useSelector((state)=>state.profile)
    const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b h-screen fixed left-0 top-0 from-gray-900 to-black flex flex-col items-center border-r border-gray-700 shadow-lg">
        <div onClick={()=>(navigate("/home"))} className="mt-10 cursor-pointer">
            <img src={logo} alt="Logo" className="w-17 h-6" />
        </div>
        <div className="flex flex-col w-full mt-13 gap-y-2">
            {/* Home Button */}
            <div className="w-full px-2"> 
                <button onClick={()=>navigate('/home')} className="cursor-pointer w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                    <AiFillHome className="w-7 h-7" />
                </button>
            </div>
            <div className="w-full px-2"> 
                <button className="cursor-pointer w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                    <IoSearch className="w-7 h-7" />
                </button>
            </div>
            <div className="w-full px-2"> 
                <button className="cursor-pointer w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                    <TbMessageFilled className="w-7 h-7" />
                </button>
            </div>
            <div className="w-full px-2"> 
                <button className="cursor-pointer w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                    <IoNotificationsSharp className="w-7 h-7" />
                </button>
            </div>
            <div className="w-full px-2"> 
                <button onClick={()=>navigate('/create-post')}  className="cursor-pointer w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                    <IoMdCreate className="w-7 h-7" />
                </button>
            </div>
            <div className="w-full px-2"> 
                <button onClick={()=>navigate(`/profile/:${user?._id}`)} className="cursor-pointer w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                    <FaUserCircle className="w-7 h-7" />
                </button>
            </div>
        </div>
        <div className="w-full px-2 mt-auto mb-6">
            <button className="cursor-pointer w-full px-4 py-2 rounded-lg text-gray-300 text-lg hover:bg-purple-700 hover:text-white transition-all">
                <CgDetailsMore className="w-7 h-7" />
            </button>
        </div>
              
    </div>
  )
}

export default Sidebar1
