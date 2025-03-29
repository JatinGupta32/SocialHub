import React,{ useState }  from 'react'
import { IoMdBookmark } from "react-icons/io";
import { MdOutlinePersonAddAlt1 } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import Photo1 from '../../assets/Profile Photos/Photo1.jpeg';
import Photo2 from '../../assets/Profile Photos/Photo2.jpeg';
import Photo3 from '../../assets/Profile Photos/Photo3.jpeg';
import Photo4 from '../../assets/Profile Photos/Photo4.jpeg';
import Photo5 from '../../assets/Profile Photos/Photo5.jpeg';
import Photo6 from '../../assets/Profile Photos/Photo6.jpeg';
import Photo7 from '../../assets/Profile Photos/Photo7.jpeg';
import Photo8 from '../../assets/Profile Photos/Photo8.jpeg';
import Photo9 from '../../assets/Profile Photos/Photo9.jpeg';
import {motion} from 'framer-motion'

const PostSection = () => {
  const [hovered1,setHovered1] = useState(false);
  const [hovered2,setHovered2] = useState(false);
  const [hovered3,setHovered3] = useState(false);
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
        <div className='grid grid-cols-3 my-8 gap-5'>
            <img src={Photo1} alt='Photo1' className='w-full h-[350px] object-cover rounded-lg cursor-pointer'></img>
            <img src={Photo2} alt='Photo2' className='w-full h-[350px] object-cover rounded-lg cursor-pointer'></img>
            <img src={Photo3} alt='Photo3' className='w-full h-[350px] object-cover rounded-lg cursor-pointer'></img>
            <img src={Photo4} alt='Photo4' className='w-full h-[350px] object-cover rounded-lg cursor-pointerr'></img>
            <img src={Photo5} alt='Photo5' className='w-full h-[350px] object-cover rounded-lg cursor-pointer'></img>
            <img src={Photo6} alt='Photo6' className='w-full h-[350px] object-cover rounded-lg cursor-pointer'></img>
            <img src={Photo7} alt='Photo7' className='w-full h-[350px] object-cover rounded-lg cursor-pointerr'></img>
            <img src={Photo8} alt='Photo8' className='w-full h-[350px] object-cover rounded-lg cursor-pointer'></img>
            <img src={Photo9} alt='Photo9' className='w-full h-[350px] object-cover rounded-lg cursor-pointer'></img>
            <img src={Photo6} alt='Photo6' className='w-full h-[350px] object-cover rounded-lg cursor-pointer'></img>
        </div>
    </div>
  )
}

export default PostSection


{/* <div className='bg-purple-200 h-75 rounded-lg cursor-pointer'>
    <img src={Photo1} alt='Photo1' className='object-cover'></img>
</div> */}