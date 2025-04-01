import React, { useState } from 'react'
import Photo from '../../assets/profile.png';
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { FiBookmark } from "react-icons/fi";
import { LuForward } from "react-icons/lu";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { MdEmojiEmotions } from "react-icons/md";

const SocialPost = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const[comment,setComment] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const bio = `I am so glad to share with you guys some photos from my recent trip to the New-York. 
                 This city looks amazing, the buildings, nature, people all are beautiful, I highly 
                 recommend to visit this cool place! Also, I would like to know what is your favorite 
                 place here or what you would like to visit? I am so glad to share with you guys some photos from my recent trip to the New-York. 
                 This city looks amazing, the buildings, nature, people all are beautiful. `.trim();


    const addEmoji = (emoji) => {
          setComment(comment + emoji.native);
      };
    
      const handleOnComment = () => {
        // dispatch(addCommentOnPostApi(post._id,comment)).then(setPost).catch(console.error);
        // setComment('');
      }

    return (
        <div className='bg-black/10 h-fit backdrop-blur-lg w-14/15 rounded-xl mx-auto shadow-lg p-6 border border-white/20 transition-all'>
            <div className='h-fit flex items-center justify-between'>
                <div className='flex gap-x-2 items-center'>
                    <img src={Photo} className='w-10 h-10 rounded-full object-cover cursor-pointer' alt="Profile"/>
                    <div className='flex-col'>
                        <div><span className='text-md cursor-pointer font-serif'>Jatin Gupta . </span> 2d</div>
                        <div className='opacity-60 text-sm'>Ayodhya, Uttar Pradesh</div>
                    </div>
                </div>
                <HiDotsHorizontal size={26} className='cursor-pointer'/>
            </div>

            <div className='space-y-5 h-fit w-full py-4 flex flex-col justify-between items-center '>
                <div className='font-sans text-md'>
                    <p>
                        {isExpanded ? bio : `${bio.slice(0, 300)}...`}
                        <span 
                            className="text-blue-500 cursor-pointer ml-1 font-semibold hover:brightness-75" 
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? " less" : " more"}
                        </span>
                    </p>
                </div>

                {/* Post Image */}
                <div>
                    <img src={Photo} className='cursor-pointer w-65 h-80 object-cover rounded-xl mx-auto' alt="Post" />
                </div>
            </div>
            <div className='flex items-center justify-between py-4 border-y-1 border-white/20 px-3'>
                <div className='flex gap-4'>
                    <FaRegHeart size={25} className='cursor-pointer'/>
                    <FaRegComment size={25} className='cursor-pointer'/>
                    <LuSend size={25} className='cursor-pointer'/>
                </div>
                <div className='flex gap-2'>
                    <LuForward size={25} className='cursor-pointer'/>
                    <FiBookmark size={25} className='cursor-pointer'/>
                </div>
            </div>
            <div className='py-4 flex justify-between items-center text-md font-sans'>
                <p className='cursor-pointer'>10 Likes</p>
                <div className='cursor-pointer'>45 Comments</div>
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
                                    <div className="absolute translate-y-[-33.5vw]">
                                        <Picker data={data} onEmojiSelect={addEmoji} theme="dark"/>
                                    </div>
                                )}
                            </div>
                            {/* <FaRegFaceSmile size={25}  className="cursor-pointer"/> */}
                            <input 
                                type="text"
                                name="comment"
                                value={comment}
                                onChange={(e)=>setComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="w-full placeholder:text-sm text-md h-[3vw] outline-none"
                            />
                            <button onClick={handleOnComment} className="text-purple-500 hover:text-white cursor-pointer font-semibold text-md">Post</button>
                        </label>
                        
                      </div>
        </div>
    );
}

export default SocialPost;