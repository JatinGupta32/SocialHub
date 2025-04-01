import React,{ useEffect, useState }  from 'react'
import { IoMdBookmark } from "react-icons/io";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import {motion} from 'framer-motion'
import PostModal from '../Profile/PostModal'
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa";

const PostSection = ({User}) => {
  const [hovered1,setHovered1] = useState(false);
  const [hovered2,setHovered2] = useState(false);
  const [hovered3,setHovered3] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [activePost, setActivePost] = useState(null);
  const {user} = useSelector((state)=>state.profile);

  // useEffect(() => {
  //     console.log("UserDetails:", user);
  // }, [user]);

  // useEffect(()=>{selecedPost: ',selectedPost);
  // },[selectedPost]
  //   console.log(');
  const [hoverPost,setHoverPost] = useState(1);

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
            
            {/* <div className='cursor-pointer px-1 py-2 flex items-center gap-1 text-lg hover:border-b-1 hover:border-purple-500 hover:text-purple-500'><IoMdBookmark size={22}/>Saved</div>
            <div className='cursor-pointer px-1 py-2 flex items-center gap-1 text-lg hover:border-b-1 hover:border-purple-500 hover:text-purple-500'><MdOutlinePersonAddAlt1 size={22}/>Tagged</div> */}
        </div>
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

        {selectedPost && (
          <PostModal Post={selectedPost} activePost={activePost} user={User} setActivePost={setActivePost} selectedPost={selectedPost} setSelectedPost={setSelectedPost} onClose={() =>{setActivePost(null); setSelectedPost(null)}} />
        )}

    </div>
  )
}

export default PostSection


{/* <div className='bg-purple-200 h-75 rounded-lg cursor-pointer'>
    <img src={Photo1} alt='Photo1' className='object-cover'></img>
</div> */}