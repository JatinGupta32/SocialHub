import React, { useEffect, useRef, useState } from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { FiBookmark } from "react-icons/fi";
import { LuForward } from "react-icons/lu";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { MdEmojiEmotions } from "react-icons/md";
import { addCommentOnPostApi,getSocialPostsApi,updateLikeOnPostApi } from "../../apis/postAPI";
import { useDispatch, useSelector } from 'react-redux';
import PostModalSocial from './PostModalSocial';
// import PostModalSocial from './PostModalSocial';

const SocialPost = ({post}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.profile)
    const [isExpanded, setIsExpanded] = useState(false);
    const[comment,setComment] = useState('');
    const [Post, setPost] = useState(post);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const pickerRef = useRef(null)
    const textAreaRef = useRef(null)
    const [selectedPost, setSelectedPost] = useState(null);
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    
    useEffect(()=>{
        setPost(post);
    },[post])

    const addEmoji = (emoji) => {
        setComment(comment + emoji.native);
    };
    
    const handleOnComment = () => {
        if (!comment.trim()) return;
    
        // Optimistically update the UI
        const newComment = { _id: Date.now(), user: { username: user.username }, text: comment }; 
        setPost(prev => ({ ...prev, comments: [...prev.comments, newComment] }));
        
        setComment('');
    
        // Dispatch API call
        dispatch(addCommentOnPostApi(Post._id, comment));
    };

    const handleOnLike = () => {
        const hasLiked = Post.likes.some(like => like._id === user._id);
        
        // Optimistically update the UI
        const updatedLikes = hasLiked
            ? Post.likes.filter(like => like._id !== user._id) // Remove like
            : [...Post.likes, { _id: user._id }]; // Add like
        
        setPost(prev => ({ ...prev, likes: updatedLikes }));
    
        // Dispatch API call
        dispatch(updateLikeOnPostApi(Post?._id));
    };
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


    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
        scrollRef.current.style.scrollBehavior = "auto"; // Disable smooth scrolling while dragging
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.1; // Adjust sensitivity
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        scrollRef.current.style.scrollBehavior = "smooth"; // Re-enable smooth scrolling
    };

    return (
        <div className='h-fit overflow-x-hidden bg-black/10 backdrop-blur-lg w-14/15 rounded-xl mx-auto shadow-lg p-6 border border-white/20 transition-all'>
            <div className='h-fit flex items-center justify-between'>
                <div className='flex gap-x-2 items-center'>
                    <img onClick={()=>navigate(`/profile/:${post?.user?._id}`)} src={Post?.user?.image} className='w-10 h-10 rounded-full object-cover cursor-pointer' alt="Profile"/>
                    <div className='flex-col '>
                        <div><span  onClick={()=>navigate(`/profile/:${post?.user?._id}`)} className='font-[Segoe_UI] font-semibold text-md cursor-pointer hover:brightness-70'>{Post?.user?.username}  </span ><span className='text-md font-[Segoe_UI] font-normal opacity-70'>· 2d</span></div>
                        <div className='opacity-80 text-sm font-[Segoe_UI] font-normal'>{Post.location}</div>
                    </div>
                </div>
                <HiDotsHorizontal size={26} className='hover:brightness-60 cursor-pointer'/>
            </div>

            <div className='space-y-5 h-fit w-full py-4 flex flex-col justify-between items-center '>
                <div className='font-sans text-md'>
                    <p>
                        {isExpanded ? Post.caption.trim() : `${Post.caption.slice(0, 300)}...`}
                        <span 
                            className="text-blue-500 cursor-pointer ml-1 font-semibold hover:brightness-75" 
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? " less" : " more"}
                        </span>
                    </p>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div
                        ref={scrollRef}
                        className="flex gap-3 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
                        style={{
                            scrollBehavior: "smooth",
                            whiteSpace: "nowrap",
                            display: "flex",
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseUp}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                    >
                        {Post?.photos?.map((photo, i) => (
                            <img
                                key={i}
                                src={photo}
                                className="cursor-pointer w-65 h-80 object-cover rounded-xl mx-auto snap-center"
                                alt="Post"
                                draggable="false"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between py-4 border-y-1 border-white/20 px-3'>
                <div className='flex gap-4'>
                    {
                      Post?.likes.some(like => like?._id === user?._id) ?  
                      <FaHeart size={25} onClick={handleOnLike} className="cursor-pointer text-red-500"/> : 
                      <FaRegHeart size={25} onClick={handleOnLike} className="hover:brightness-60 cursor-pointer"/>
                    }
                    <FaRegComment onClick={()=>setSelectedPost(Post)} size={25} className='cursor-pointer hover:brightness-60'/>
                    <LuSend size={25} className='cursor-pointer hover:brightness-60'/>
                </div>
                <div className='flex gap-2'>
                    <LuForward size={25} className='cursor-pointer hover:brightness-60'/>
                    <FiBookmark size={25} className='cursor-pointer hover:brightness-60'/>
                </div>
            </div>
            <div className='py-4 flex justify-between items-center text-md font-sans'>
                {Post?.likes.length===0 ? <p className='cursor-pointer hover:brightness-60'>No Likes</p> : 
                (Post?.likes.length===1 ? <p onClick={()=>navigate('/')} className='hover:brightness-60 cursor-pointer'>1 Like</p> : 
                <p className='hover:brightness-60 cursor-pointer'>{Post?.likes.length} Likes</p>)}
                <div onClick={()=>setSelectedPost(Post)} className='hover:brightness-60 cursor-pointer'>{Post?.comments.length==0 ? "No comments yet." : `View all ${Post?.comments.length} Comments`}</div>
            </div>
            <div className="h-fit border-1 border-white/40 px-3 py-1 rounded-xl">
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
                    {/* <FaRegFaceSmile size={25}  className="cursor-pointer"/> */}
                    <input 
                        type="text"
                        name="comment"
                        value={comment}
                        ref={textAreaRef}
                        onChange={(e)=>setComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full placeholder:text-sm text-md h-[3vw] outline-none"
                    />
                    <button onClick={handleOnComment} className="text-purple-500 hover:text-white cursor-pointer font-semibold text-md">Post</button>
                </label>
            </div>

            {/* Modal */}
            {selectedPost && (
                <PostModalSocial Post={selectedPost} user={user} setSelectedPost={setSelectedPost} onClose={() =>{setSelectedPost(null)}} />
            )}
        </div>
    );
}

export default SocialPost;

