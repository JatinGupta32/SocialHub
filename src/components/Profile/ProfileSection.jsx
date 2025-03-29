import React from "react";
import { FaCheck } from "react-icons/fa";
import { FiMail, FiMoreHorizontal } from "react-icons/fi";
import profilephoto from "../../assets/profile.png";
import Photo1 from '../../assets/Profile Photos/Photo1.jpeg';
import Photo2 from '../../assets/Profile Photos/Photo2.jpeg';
import Photo3 from '../../assets/Profile Photos/Photo3.jpeg';
import Photo4 from '../../assets/Profile Photos/Photo4.jpeg';
import Photo5 from '../../assets/Profile Photos/Photo5.jpeg';
import Photo6 from '../../assets/Profile Photos/Photo6.jpeg';
import Photo7 from '../../assets/Profile Photos/Photo7.jpeg';
import Photo8 from '../../assets/Profile Photos/Photo8.jpeg';
import Photo9 from '../../assets/Profile Photos/Photo9.jpeg';
import { RiUserFollowFill } from "react-icons/ri";
import { GrLinkNext } from "react-icons/gr";


const ProfileSection = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">

        <div className="bg-white/10 h-fit backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col items-center border border-white/20">
          {/* Profile Image */}
          <img
            src={profilephoto}
            alt="Profile"
            className="w-27 h-27 cursor-pointer rounded-xl object-cover shadow-md border-4 border-purple-500"
          />

          {/* Name & Username */}
          <div className="text-2xl font-bold text-white mt-3">Jatin Gupta</div>
          <div className="text-gray-400 text-sm">@Jatinb32</div>

          {/* Stats */}
          <div className="flex justify-center gap-5 my-4 text-gray-300 text-sm">
            <div>
              <span className="font-bold text-white">1092</span> Posts
            </div>
            <div className="cursor-pointer">
              <span className="font-bold text-white">22k</span> Followers
            </div>
            <div className="cursor-pointer">
              <span className="font-bold text-white">22k</span> Following
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-2">
            {/* <button className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-purple-600 transition">
              <FaCheck className="mr-1" /> Follow
            </button> */}
            <button className="flex items-center bg-purple-500 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-purple-700 transition">
               <RiUserFollowFill className="mr-1"/>Follow
            </button>
            <button className="p-2 bg-white/20 cursor-pointer rounded-full shadow-md hover:bg-white/30 transition">
              <FiMail size={18} className="text-white" />
            </button>
            <button className="p-2 bg-white/20 cursor-pointer rounded-full shadow-md hover:bg-white/30 transition">
              <FiMoreHorizontal size={18} className="text-white" />
            </button>
          </div>

          {/* About Section */}
          <div className="w-full mt-6 text-left">
            <h3 className="text-gray-300 font-bold text-sm">ABOUT</h3>
            <p className="text-gray-400 text-sm leading-relaxed mt-1">
            {/* 👨‍💻 Tech Enthusiast | Full Stack Developer | Problem Solver <br/>
            Passionate about building scalable web applications and solving complex coding challenges. 🚀 */}
            <br/>Balancing life between tech, workouts, and exploring new places🌍........
            </p>
          </div>

          {/* Friends List */}
          <div className="w-full mt-5">
            <h3 className="text-gray-300 font-bold text-sm">Followers</h3>
            <div className="grid grid-cols-6 gap-3 mt-3">
                <img src={Photo1} alt="Photo1" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo2} alt="Photo2" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo3} alt="Photo3" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo4} alt="Photo4" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo5} alt="Photo5" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo6} alt="Photo6" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo7} alt="Photo7" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo8} alt="Photo8" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                {/* <img src={Photo9} alt="Photo9" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo1} alt="Photo1" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo2} alt="Photo2" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo3} alt="Photo3" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo4} alt="Photo4" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo5} alt="Photo5" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo6} alt="Photo6" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo7} alt="Photo7" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo8} alt="Photo8" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo9} alt="Photo9" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo1} alt="Photo1" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo2} alt="Photo2" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo3} alt="Photo3" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo4} alt="Photo4" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo5} alt="Photo5" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo6} alt="Photo6" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo7} alt="Photo7" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo8} alt="Photo8" className="w-12 h-12 cursor-pointer rounded-full object-cover" />
                <img src={Photo9} alt="Photo9" className="w-12 h-12 cursor-pointer rounded-full object-cover" /> */}

                <button className="w-12 h-12 flex justify-center items-center bg-white/20 cursor-pointer rounded-full shadow-md hover:bg-white/30 transition">
                    <GrLinkNext size={18} className="text-white" />
                </button>
            </div>
            </div>

        </div>
    </div>
  );
};
GrLinkNext
export default ProfileSection;
