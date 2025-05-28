import React,{ useState }  from 'react'
import { IoMdBookmark } from "react-icons/io";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import {motion} from 'framer-motion'
import PostModal from '../Profile/PostModal'
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa";


const PostSection = ({User,user}) => {
  const [hovered1,setHovered1] = useState(false);
  const [hovered2,setHovered2] = useState(false);
  const [hovered3,setHovered3] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activePost, setActivePost] = useState(null);
  const [hoverPost,setHoverPost] = useState(1);

  if (user._id!==User._id && (User?.privacyStatus === "private" && !user.following.some(f => f._id === User._id))) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black border-l border-white/20 flex justify-center items-center px-4">
        <div className="w-fit flex flex-col items-center justify-center text-center gap-4 p-8 bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-600/30 animate-fade-in">
          
          <FaUserLock size={60} className="text-purple-500 drop-shadow-glow animate-pulse" />

          <h2 className="text-2xl font-bold text-white font-[Segoe_UI]">This Account is Private</h2>
          
          <p className="text-md text-gray-400 font-[Segoe_UI]">Follow to see their photos and videos.</p>

          <button className="mt-4 px-5 py-1.5 bg-purple-600 text-white font-semibold text-lg font-[Segoe_UI] cursor-pointer rounded-full hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
            Follow
          </button>

        </div>
      </div>
    )
  }

  return (
    <div className=' min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-900 to-black border-l border-white/20 flex-col justify-between px-8 py-4'>
        <div className='h-12 flex justify-center items-center gap-8 border-b-1 border-white/20'>
          <div onMouseEnter={() => setHovered1(true)} onMouseLeave={() => setHovered1(false)} className="relative w-fit">
            <motion.div animate={{ color: hovered1?"#9333ea":"#ffffff"}} transition={{ duration: 0.3, ease: "easeInOut" }} className="cursor-pointer px-1 py-2 flex items-center gap-1 text-lg">
              <BsFillGrid3X3GapFill size={22} /> Posts            
            </motion.div>
            <motion.div animate={{width: hovered1 ? "100%" : "0%", opacity: hovered1 ? 1 : 0 }} transition={{duration: 0.3}} className="absolute bottom-0 left-0 bg-purple-500 h-1 rounded-full"></motion.div>
          </div>

          <div onMouseEnter={() => setHovered2(true)} onMouseLeave={() => setHovered2(false)} className="relative w-fit">
            <motion.div animate={{ color: hovered2?"#9333ea":"#ffffff"}} transition={{ duration: 0.3, ease: "easeInOut" }} className="cursor-pointer px-1 py-2 flex items-center gap-1 text-lg">
              <IoMdBookmark size={22} /> Saved            
            </motion.div>
            <motion.div animate={{width: hovered2 ? "100%" : "0%", opacity: hovered2 ? 1 : 0 }} transition={{duration: 0.3}} className="absolute bottom-0 left-0 bg-purple-500 h-1 rounded-full"></motion.div>
          </div>
          
          <div onMouseEnter={() => setHovered3(true)} onMouseLeave={() => setHovered3(false)} className="relative w-fit">
            <motion.div animate={{ color: hovered3?"#9333ea":"#ffffff"}} transition={{ duration: 0.3, ease: "easeInOut" }} className="cursor-pointer px-1 py-2 flex items-center gap-1 text-lg">
              <MdOutlinePersonAddAlt1 size={22} /> Tagged            
            </motion.div>
            <motion.div animate={{width: hovered3 ? "100%" : "0%", opacity: hovered3 ? 1 : 0 }} transition={{duration: 0.3}} className="absolute bottom-0 left-0 bg-purple-500 h-1 rounded-full"></motion.div>
          </div>
            
        </div>
        {
          User?.posts?.length===0 ? 
          <div className='flex justify-center items-center min-h-screen'>
            <div className="w-fit flex items-center justify-center text-center gap-4 py-7 px-10 bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-600/30 animate-fade-in">
              <h2 className="text-xl font-semibold text-white/80 font-[Segoe_UI]">No Posts yet.</h2>
              
            </div>
          </div> :
          
        <div className='grid grid-cols-3 my-8 gap-4'>
        {
          
          User?.posts?.map((post, i) => (
              <div key={i} 
                className='relative cursor-pointer transition-all duration-300 brightness-100 hover:brightness-50'
                onClick={() => {setActivePost(i); setSelectedPost(post)}} 
                onMouseEnter={()=>setHoverPost(i)}
                onMouseLeave={()=>setHoverPost(null)}>
                
                <img 
                  src={post.photos[0]} 
                  key={i}
                  
                  alt={`Photo ${i}`}                
                  className={`w-full h-[350px] object-cover rounded-lg cursor-pointer ${hoverPost==i ? `brightness-60` : `brightness-100`}`} 
                />
                {hoverPost===i && 
                  <div className='absolute inset-0 flex items-center justify-center gap-6 text-white font-semibold text-lg opacity-0 hover:opacity-100 transition-opacity duration-300'>
                    <div className='flex items-center gap-2'><FaHeart/> <span>{post.likes.length}</span></div>
                    <div className='flex items-center gap-2'><FaComment/> <span> {post.comments.length}</span></div>
                  </div>
                }
              </div>
          ))
        }
            
        </div>
        }

        {selectedPost && (
          <PostModal Post={selectedPost} activePost={activePost} user={user} profileUserid={User._id} setActivePost={setActivePost} selectedPost={selectedPost} setSelectedPost={setSelectedPost} onClose={() =>{setActivePost(null); setSelectedPost(null)}} />
        )}

    </div>
  )
}

export default PostSection