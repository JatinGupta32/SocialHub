import { motion } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { FiBookmark } from "react-icons/fi";
import { FaRegFaceSmile } from "react-icons/fa6";

const PostModal = ({ Photo, onClose }) => {
  return (
    <div
      className="fixed inset-0 rounded-2xl bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className=" flex w-[80vw] h-[94vh] bg-black rounded-lg "
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Left Section (Image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="w-4/7 cursor-pointer flex items-center justify-center border-r border-white/20 bg-white/10"
        >
          <img src={Photo} alt="Post" className="rounded-lg w-fit max-h-full object-cover cursor-pointer" />
        </motion.div>

        {/* Right Section (Extra Content) */}
        <div className="w-3/7 flex-col pt-5 px-5 font-sans">
          <div className="flex w-full items-center gap-3 border-b border-white/20 pb-3">
            <img src={Photo} className="w-9 h-9 rounded-full object-cover cursor-pointer"></img>
            <div>JatinGupta</div>
          </div>
          <div className="h-[39.5vw] border-b border-white/20 overflow-y-scroll custom-scrollbar">
            <div className="flex w-full items-center space-x-4 py-3 ">
                <img src={Photo} className="w-9 h-9 mb-auto rounded-full object-cover cursor-pointer"></img>
                <div className="text-sm w-fit">✍🏼To be an artist, you need to exist in a world of silence. ✨🔥❤️
                    My favourite beautiful actress 😍 @kiaraaliaadvani 😄<br/>
                    •<br/>
                    •<br/>
                    Follow for more @jet_creatives<br/>
                    Artist @jatin_._17<br/>
                    •<br/>
                    •<br/>
                    •<br/>
                    •<br/>
                    #kiaraadvani #pencildrawing #bollywood #drawing
                    #artwork #realism #realsticdrawing #portraitdrawing
                    #art #instaqood #artoftheday #graphitedrawing #sketch #mystaedtler #beautiful #kiaraadvani❤ #instablackandwhite #instalove #sketchoftheday
                    #artistportrait #sketchartist#kiaraadvani #pencildrawing #bollywood #drawing
                    #artwork #realism #realsticdrawing #portraitdrawing
                    #art #instaqood #artoftheday #graphitedrawing #sketch #mystaedtler #beautiful #kiaraadvani❤ #instablackandwhite #instalove #sketchoftheday
                    #artistportrait #sketchartist
                    •<br/>
                    •<br/>
                    •<br/>
                    •<br/>
                    •<br/>
                    •<br/>
                    #kiaraadvani #pencildrawing #bollywood #drawing
                    #artwork #realism #realsticdrawing #portraitdrawing
                    #art #instaqood #artoftheday #graphitedrawing #sketch #mystaedtler #beautiful #kiaraadvani❤ #instablackandwhite #instalove #sketchoftheday
                    #artistportrait #sketchartist</div>
            </div>
            <div className="flex w-full items-center space-x-4 py-3">
                <img src={Photo} className="w-9 h-9 mb-auto rounded-full object-cover cursor-pointer"></img>
                <div className="text-sm w-fit">✍🏼To be an artist, you need to exist in a world of silence. ✨🔥❤️
                    Hi My name is Jatin Gupta
                </div>
            </div>
          </div>
          <div className="w-full h-[2vw] py-6 flex justify-between items-center">
            <div className="gap-4 flex">
                <FaRegHeart size={23} className="cursor-pointer"/>
                <FaRegComment size={23} className="cursor-pointer"/>
                <LuSend size={23} className="cursor-pointer"/>
            </div>
            <FiBookmark className="w-11 h-7 translate-x-2 cursor-pointer"/>
          </div>
          <div className="flex-col space-y-1 border-b border-white/20 pb-3">
            <div className="text-sm flex gap-2">
                <img src={Photo} className="w-5 h-5 mb-auto rounded-full object-cover cursor-pointer"></img>
                Liked by jyotpratap18 and 102 other
            </div>
            <p className="text-white/60 text-xs">January 10 2025</p>
          </div>
          <div className="">
            <label className="flex items-center gap-4">
                <FaRegFaceSmile size={25}  className="cursor-pointer"/>
                <input 
                    type="text"
                    name="comment"
                    placeholder="Add a comment..."
                    className="w-full placeholder:text-sm text-md h-[3vw] outline-none"
                />
                <button className="text-purple-500 hover:text-white cursor-pointer font-semibold text-md">Post</button>
            </label>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;


