import React, { useState,useEffect,useRef } from 'react'
// import * as Switch from "@radix-ui/react-switch";
import { FaCloudUploadAlt } from "react-icons/fa";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { MdEmojiEmotions } from "react-icons/md";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editProfileApi, getUserApi} from '../../apis/profileAPI';

const EditProfileForm = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state)=> state.profile);
    const [imageFile,setImageFile] = useState(user?.image);
    const dispatch = useDispatch();
    const pickerRef = useRef(null)
    const textAreaRef = useRef(null)
    const [formData, setFormData] = useState({});

    useEffect(() => {
        dispatch(getUserApi()).then(res=>{
            setFormData({
                'fullname': user?.fullname || "",
                'username': user?.username || "",
                'image': user?.image || "",
                'bio': user?.additionalDetails?.bio || "",
                'gender': user?.additionalDetails?.gender || "",
                'dateOfBirth': user?.additionalDetails?.dateOfBirth || ""
            });
        }).catch((err)=>{}); // Fetch user on mount
    }, []);
    
    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // console.log(file);
        if (!file) return;
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const maxWidth = 800; // Adjust as needed
                const maxHeight = 800;

                let { width, height } = img;
                if (width > maxWidth || height > maxHeight) {
                    const scaleFactor = Math.min(maxWidth / width, maxHeight / height);
                    width *= scaleFactor;
                    height *= scaleFactor;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7); // Adjust quality (0.7 means 70%)
                setImageFile(resizedBase64);
                if (!resizedBase64) {
                    console.warn("No image selected!"); 
                    return;
                }
                setFormData((prev) => ({
                    ...prev,
                    image: resizedBase64,
                }));
            };
        };
    };

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    
    const addEmoji = (emoji) => {
        setFormData({ ...formData, bio: formData.bio + emoji.native });
    };
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        if (!formData?.image) {
            toast.error("📸 Add a photo to continue.", {
                style: { fontSize: "20px"} 
            });
            return; 
        }
        console.log(formData);
        dispatch(editProfileApi(formData,navigate));   
    }

    const handleOnReset = () => {
        setImageFile("");
        setFormData({
            'fullname': user?.fullname,
            'username': user?.username,
            'image': null,
            'bio': null,
            'gender': null,    
            'dateOfBirth': null
        })   
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
    <div className='w-18/19 pt-6 px-10 min-h-screen bg-gradient-to-b text-amber-50 from-gray-900 to-black flex-col '>
              <div className='h-1/12 flex justify-between items-center py-10 border-b-1 border-white/20'>
                <div className='text-3xl font-sans font-semibold'>
                  Edit Profile
                </div>
                <div className='gap-x-5 flex'>
                  <button onClick={handleOnReset} className='py-2.5 font-sans px-6 cursor-pointer text-white text-xl bg-purple-600 hover:brightness-70 rounded-4xl font-semibold transition-all'>
                    Reset
                  </button>
                  <button onClick={handleOnSubmit} className='py-2.5 font-sans px-6 cursor-pointer text-white text-xl bg-purple-600 hover:brightness-70 font-semibold rounded-4xl transition-all'>
                    Update
                  </button>
                </div>
                
              </div>
              <div className="bg-white/10 h-10/12 mt-7 pt-10 backdrop-blur-lg rounded-2xl shadow-lg px-33 flex flex-col items-center border border-white/20">
                <form onSubmit={handleOnSubmit} className='flex gap-x-13 h-full w-full'>
                    <div className="flex flex-col justify-center w-2/5 space-y-6 h-[72vh] overflow-y-auto custom-scrollbar items-center">
                            <label className="flex flex-col space-y-7 ml-8 text-gray-300 items-center justify-center cursor-pointer ">
                                <input
                                    type="file"
                                    required
                                    name="photos"
                                    accept='.jpg,.jpeg,.png'
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                {imageFile ? (
                                    <img src={imageFile || ""} alt="Selected" className="border w-70 h-90 z-2 object-cover rounded-4xl hover:ring-2 hover:ring-[#8B5CF6]"/>
                                ) : (
                                    <div className=' border bg-[#18181b] border-gray-600 rounded-4xl w-70 h-90 flex flex-col justify-center items-center shadow-md hover:ring-2 hover:ring-[#8B5CF6] transition duration-300 border-dashed'>
                                        <FaCloudUploadAlt className="text-3xl text-gray-600 mb-3" />
                                        <p className="mx-auto w-55 align-supertext-gray-500">Choose a file or drag and drop it here</p>
                                    </div>
                                )}
                                <p className='px-5 py-2 text-lg font-sans text-white bg-purple-600 hover:brightness-70 rounded-xl font-semibold transition-all'>Change Profile Picture</p> 
                            </label>

                    </div>
                    <div className='flex-col items-center w-3/5 h-[72vh] space-y-5 overflow-y-auto custom-scrollbar1 pr-10'>
                        <div className='ml-1'>
                            <label className='block'>
                                <p className='py-2 text-lg font-medium font-[Segoe_UI]'>Name</p>
                                <input
                                    type='text'
                                    name='fullname'
                                    value={formData.fullname || ""}
                                    onChange={handleOnChange}
                                    placeholder='Enter your name'
                                    className='px-4 w-full py-3 text-gray-300 bg-[#18181b] border border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none shadow-md hover:border-[#8B5CF6] transition duration-300'
                                    />
                            </label>
                        </div>
                        <div className='ml-1'>
                            <label className='block'>
                                <p className='py-2 text-lg font-medium font-[Segoe_UI]'>Username</p>
                                <input
                                    type='text'
                                    name='username'
                                    value={formData.username || ""}
                                    onChange={handleOnChange}
                                    placeholder='Enter your Username'
                                    className='px-4 w-full py-3 text-gray-300 bg-[#18181b] border border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none shadow-md hover:border-[#8B5CF6] transition duration-300'
                                    />
                            </label>
                        </div>
                        <div>
                            <label className='block ml-1'>
                                <p className='pb-2 text-lg font-medium font-[Segoe_UI]'>Bio</p>
                                <textarea
                                    type='textarea'
                                    ref={textAreaRef}
                                    name='bio'
                                    value={formData.bio || ""}
                                    onChange={handleOnChange}
                                    placeholder='Write a Bio...'
                                    className='px-4 w-full overflow-y-auto custom-scrollbar py-3 h-36 text-gray-300 bg-[#18181b] border border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none shadow-md hover:border-[#8B5CF6] transition duration-300'
                                />
                                <div className='relative inline-block mt-1'>
                                    <button 
                                        onClick={(e) => { e.preventDefault();
                                                        setShowEmojiPicker(!showEmojiPicker)
                                                        }}
                                        className="px-2.5 py-2 cursor-pointer rounded-full border border-gray-700 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white 
                                                   hover:from-[#A78BFA] hover:to-[#818CF8] transition-all duration-300 shadow-md hover:shadow-[0_0_15px_#A78BFA]"
                                    >
                                        <MdEmojiEmotions size={25}/>
                                    </button>
                                    {showEmojiPicker && (
                                        <div ref={pickerRef} className="absolute mt-2 left-12 translate-y-[-11%] z-2 bg-gray-800 shadow-xl rounded-lg p-2">
                                            <Picker data={data} onEmojiSelect={addEmoji} theme="dark"/>
                                        </div>
                                    )}
                                </div>
                            </label>
                        </div>

                        <div className="relative inline-block w-full ml-1">
                            <div className="pb-2 text-lg font-medium font-[Segoe_UI]">Gender</div>
                            <div className="relative">
                                <select
                                    name="gender"
                                    value={formData.gender || ""}
                                    onChange={handleOnChange}
                                    className="w-full bg-[#18181b] px-4 py-3 text-gray-300  border border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none shadow-md hover:border-[#8B5CF6] transition duration-300"
                                >
                                <option value="" className="bg-[#1E1E2E] text-gray-300">Select an option</option>
                                <option value="Female" className="bg-[#1E1E2E] text-gray-300">Female</option>
                                <option value="Male" className="bg-[#1E1E2E] text-gray-300">Male</option>
                                <option value="Custom" className="bg-[#1E1E2E] text-gray-300">Custom</option>
                                <option value="Prefer not to say" className="bg-[#1E1E2E] text-gray-300">Prefer not to say</option>
                                </select>

                                {/* Custom Dropdown Arrow */}
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-400 transition-transform transform group-hover:rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4" />
                                </svg>
                                </div>
                            </div>
                        </div>

                        <div className="relative inline-block w-full ml-1 mb-3">
                        <div className="pb-2 text-lg font-medium font-[Segoe_UI]">Date of Birth</div>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={formData?.dateOfBirth || ""}
                                    name="dateOfBirth"
                                    onChange={handleOnChange}
                                    className="w-full px-4 py-3 text-gray-300 bg-[#18181b] border border-gray-600 rounded-xl focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none shadow-md hover:border-[#8B5CF6] transition duration-300 appearance-none"
                                />

                                {/* Calendar Icon */}
                                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-400 transition-transform transform group-hover:scale-110"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v4m4-4v4m4-4v4m-9 4h10M3 6h18M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                                </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
    
        </div>
  )
}

export default EditProfileForm
