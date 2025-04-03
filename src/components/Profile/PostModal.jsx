import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { FiBookmark } from "react-icons/fi";
import { useState,useEffect, useRef } from "react";
import { FaCircleChevronRight,FaCircleChevronLeft } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { MdEmojiEmotions } from "react-icons/md";
import { addCommentOnPostApi, getPostDetailsApi,updateLikeOnPostApi } from "../../apis/postAPI";
import { FiVolume2 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ActionModal from "../Common/ActionModal";

const PostModal = ({ Post, activePost, setActivePost, user, selectedPost, setSelectedPost, onClose }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const[activePhoto,setActivePhoto] = useState(0);
  const[post,setPost] = useState(Post);
  const[comment,setComment] = useState('');
  const pickerRef = useRef(null)
  const textAreaRef = useRef(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [action, setAction] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    
    if (!selectedPost?.music) {
      stopAudio();
      return;
    }

    // useEffect(()=>{
    //         dispatch(getUserApi())
    //       },[])
  
    // Reset and Load New Audio
    audio.src = selectedPost.music;
    audio.load(); // Ensure it loads properly
    setIsPlaying(false);
  
    // Ensure playback starts when the audio is ready
    const handleLoadedData = () => {
      audio.muted = true;
      audio.play()
        .then(() => {
          audio.muted = false;
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false); // Autoplay failed
        });
    };
  
    audio.addEventListener("loadeddata", handleLoadedData);
  
    return () => {
      audio.removeEventListener("loadeddata", handleLoadedData);
      stopAudio();
    };
  }, [selectedPost]);

  // Toggle Play/Pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!selectedPost?.music) return; // No music, no toggle

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log("Playback failed, user interaction needed"));
    }
  };

  // Stop and reset audio
  const stopAudio = () => {
    if (audioRef.current) { // ✅ Check if audioRef.current exists
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    dispatch(getPostDetailsApi(Post._id)).then(setPost).catch(console.error);
  }, [dispatch, Post._id]);
        
  const addEmoji = (emoji) => {
      setComment(comment + emoji.native);
  };

  const handleOnComment = () => {
    dispatch(addCommentOnPostApi(post._id,comment)).then(setPost).catch(console.error);
    setComment('');
  }

  const handleOnLike = (e) => {
    dispatch(updateLikeOnPostApi(post._id)).then(res=>setPost(res)).catch(console.error);
  }

  useEffect(()=>{
      const handleClickOutside= (event) => {
          if(pickerRef.current && !pickerRef.current.contains(event.target) && 
              textAreaRef.current && !textAreaRef.current.contains(event.target)){
                  setTimeout(() => {
                      setShowEmojiPicker(false);
                  }, 100);
              }
      };
      document.addEventListener('mousedown',handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  },[])

  return (
    <div
      className="fixed inset-0 rounded-2xl bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
        {activePost < user.posts.length - 1 && (
        <FaCircleChevronRight
          onClick={(e) => {
            e.stopPropagation();
            setActivePost((prevActive) => {
              const newActive = prevActive + 1;
              setSelectedPost(user.posts[newActive]); // Update the selected post
              return newActive;
            });
          }}
          size={33}
          className={`absolute z-11 translate-x-[47vw] translate-y-[-1vw] hover:brightness-75 cursor-pointer ${
            action ? "hidden" : ""
          }`}
        />
      )}

      {activePost > 0 && (
        <FaCircleChevronLeft
          onClick={(e) => {
            e.stopPropagation();
            setActivePost((prevActive) => {
              const newActive = prevActive - 1;
              setSelectedPost(user.posts[newActive]); // Update the selected post
              return newActive;
            });
          }}
          size={33}
          className={`absolute z-11 translate-x-[47vw] translate-y-[-1vw] hover:brightness-75 cursor-pointer ${
            action ? "hidden" : ""
          }`}
        />
      )}
      <div 
        className=" flex w-[80vw] h-[94vh] bg-black rounded-lg "
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Left Section (Image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="w-4/7 cursor-pointer flex items-center justify-center border-r border-white/20 bg-black"
        >
          <img src={post.photos[activePhoto]} alt="Post" className="rounded-lg w-fit max-h-full object-cover cursor-pointer" />
        </motion.div>
        {activePhoto < post.photos.length-1 && <FaCircleChevronRight onClick={()=>setActivePhoto(activePhoto+1)} size={24} className={`absolute z-10 opacity-60 translate-x-[43.5vw] translate-y-[25vw] hover:opacity-90 cursor-pointer ${
            action ? "hidden" : ""
          }`}/>}
        {activePhoto > 0 && <FaCircleChevronLeft onClick={()=>setActivePhoto(activePhoto-1)} size={24} className={`absolute z-10 opacity-60 translate-x-[1vw] translate-y-[25vw] hover:opacity-90 cursor-pointer ${
            action ? "hidden" : ""
          }`}/>}


        {/* Right Section (Extra Content) */}
        <div className="w-3/7 flex-col pt-5 px-5 font-sans">
          <button
            onClick={togglePlay}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            {isPlaying ? <FiVolume2 size={24} /> : <FiVolumeX size={24} />}
          </button>

          {/* Hidden Audio Element */}
          <audio ref={audioRef} src={post.music} />
          <div className="flex w-full items-center gap-3 border-b border-white/20 pb-3">
            <img src={post.user.image ? post.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${post.user.fullname}`} className="w-9 h-9 rounded-full object-cover cursor-pointer"></img>
            <div>
              <div className="font-semibold text-sm cursor-pointer hover:brightness-50">{post.user.username}</div>
              <p className="text-white/90 text-xs">{post.location}</p>
            </div>
            <HiDotsHorizontal onClick={()=>setAction(1)} size={23} className="ml-auto cursor-pointer"></HiDotsHorizontal>
            
          </div>
          <div className="h-[39vw] border-b border-white/20 overflow-y-scroll custom-scrollbar">
            <div className="flex w-full items-center space-x-4 pt-3 pb-2 ">
                <img src={post.user.image ? post.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${post.user.fullname}`} className="w-9 h-9 mb-auto rounded-full object-cover cursor-pointer"></img>
                <div className="text-sm w-fit">
                      <span className="font-[Segoe_UI] font-bold text-md cursor-pointer hover:brightness-50">{post?.user?.username}</span>
                      <span>&nbsp;</span>
                      {post.caption}
                    </div>
                
            </div>
            
            {
              post.comments.map((comment,i)=>(
                <div className="flex w-full items-center space-x-4 py-2">
                    <img onClick={()=>{setSelectedPost(null); navigate(`/profile/:${comment?.user?._id}`)}} src={comment?.user?.image ? comment?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${comment?.user?.fullname}`} className="w-9 h-9 mb-auto rounded-full object-cover cursor-pointer"></img>
                    <div className="text-sm w-fit">
                      <span onClick={()=>{setSelectedPost(null); navigate(`/profile/:${comment?.user?._id}`)}} className="font-[Segoe_UI] font-bold text-md cursor-pointer hover:brightness-50">{comment?.user?.username}</span>
                      <span>&nbsp;</span>
                      {comment?.statement}
                    </div>
                </div>
              ))
            }
          </div>
          <div className="w-full h-[2vw] py-6 flex justify-between items-center">
            <div className="gap-4 flex">
                {
                  post.likes.some(like => like._id === user?._id) ?  
                  <FaHeart size={23} onClick={handleOnLike} className="cursor-pointer text-red-500"/> : 
                  <FaRegHeart size={23} onClick={handleOnLike} className="cursor-pointer"/>
                }
                <FaRegComment size={23} className="cursor-pointer"/>
                <LuSend size={23} className="cursor-pointer"/>
            </div>
            <FiBookmark className="w-11 h-7 translate-x-2 cursor-pointer"/>
          </div>
          <div className="flex-col space-y-1 border-b border-white/20 pb-4">
            {
              (
                <div className="flex text-sm gap-2 items-center ">
                  {
                    post.likes.length>0 ? 
                       (
                        <div className="flex gap-1 ">
                          <img src={post.likes[0]?.image ? post.likes[0]?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${post.likes[0]?.fullname}`} className="w-5 h-5 mb-auto rounded-full object-cover cursor-pointer"></img>
                          <div>
                            <span>Liked by</span>
                            <span onClick={()=>{setSelectedPost(null); navigate(`/profile/:${post.likes[1]?._id}`)}} className="font-[Segoe_UI] font-semibold cursor-pointer"> {post.likes[0]?.username} </span>
                            {
                              post?.likes.length>1 ? <span>and {post?.likes.length-1} {post?.likes.length>2 ? "others" : "other"}</span> : ""
                            }                          
                          </div>
                          
                        </div>                        
                       ) :                 
                      <div>Be the first to like this</div>
                  }

                </div>                  
              )
            }
            <p className="text-white/60 text-xs">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="h-full">
            <label className="flex items-center gap-4">
                <div className='relative inline-block '>
                    <button 
                        onClick={(e) => { e.preventDefault();
                                        setShowEmojiPicker(!showEmojiPicker)
                                        }}
                        className="mt-1 px-1 py-1 cursor-pointer rounded-full border border-gray-200 bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg"
                    >
                        <MdEmojiEmotions size={20}/>
                    </button>
                    {showEmojiPicker && (
                        <div ref={pickerRef} className="absolute translate-y-[-33.5vw]">
                            <Picker data={data} onEmojiSelect={addEmoji} theme="dark"/>
                        </div>
                    )}
                </div>
                <input 
                    type="text"
                    name="comment"
                    ref={textAreaRef}
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full placeholder:text-sm placeholder:font-[Segoe_UI] placeholder:font-semibold text-sm h-[3vw] outline-none"
                />
                <button onClick={handleOnComment} className="text-purple-500 hover:text-white cursor-pointer font-semibold text-md">Post</button>
            </label>
            
          </div>
        </div>
      </div>
      {
        action && <ActionModal ></ActionModal>
      }
      
    </div>
  );
};

export default PostModal;