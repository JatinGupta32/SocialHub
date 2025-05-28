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
    const [imageFile,setImageFile] = useState(null);
    const dispatch = useDispatch();
    const pickerRef = useRef(null)
    const textAreaRef = useRef(null)
    const [formData, setFormData] = useState({});
    const [selectedImage, setSelectedImage] = useState(user?.image);

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
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        let imageUrl = await convertToBase64(file);
        // if (file) {
        //     setImageFile(file);
            
            setSelectedImage(imageUrl); // For preview
        // }
        // const file = e.target.files[0];
        // // console.log(file);
        // if (!file) return;
        
        // const reader = new FileReader();
        // reader.readAsDataURL(file);
        
        // reader.onload = () => {
        //     const img = new Image();
        //     img.src = reader.result;

        //     img.onload = () => {
        //         const canvas = document.createElement("canvas");
        //         const ctx = canvas.getContext("2d");

        //         const maxWidth = 800; // Adjust as needed
        //         const maxHeight = 800;

        //         let { width, height } = img;
        //         if (width > maxWidth || height > maxHeight) {
        //             const scaleFactor = Math.min(maxWidth / width, maxHeight / height);
        //             width *= scaleFactor;
        //             height *= scaleFactor;
        //         }

        //         canvas.width = width;
        //         canvas.height = height;
        //         ctx.drawImage(img, 0, 0, width, height);

        //         const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7); // Adjust quality (0.7 means 70%)
        //         setImageFile(resizedBase64);
        //         if (!resizedBase64) {
        //             console.warn("No image selected!"); 
        //             return;
        //         }
        
                // setFormData((prev) => ({
                //     ...prev,
                //     image: resizedBase64,
                // }));
                setFormData((prev) => ({
                    ...prev,
                    image: imageUrl,
                }));
                
            // };
        // };

    };

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    
    const addEmoji = (emoji) => {
        setFormData({ ...formData, bio: formData.bio + emoji.native });
    };
    
    const handleOnSubmit = (e) => {
        e.preventDefault();        
        // if (!formData?.image) {
        //     if(!selectedImage){
        //         toast.error("📸 Add a photo to continue.", {
        //             style: { fontSize: "20px"} 
        //         });
        //         return; 
        //     }
        //     else{
                
        //     } 
        // }
        console.log("formData: ",formData);
        dispatch(editProfileApi(formData,navigate));   
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

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
    <div className='w-[95%] h-screen bg-gradient-to-b text-amber-50 from-gray-900 to-black flex-col justify-between'>
              <div className='h-[12%] flex justify-between items-center py-3 border-b-1 border-white/20'>
                <div className='text-3xl font-sans font-semibold'>
                  Edit Profile
                </div>
                <div className='gap-x-5 flex'>
                  <button onClick={handleOnReset} className='py-2 font-sans px-5 cursor-pointer text-white text-xl bg-purple-600 hover:brightness-70 rounded-4xl font-semibold transition-all'>
                    Reset
                  </button>
                  <button onClick={handleOnSubmit} className='py-2 font-sans px-5 cursor-pointer text-white text-xl bg-purple-600 hover:brightness-70 font-semibold rounded-4xl transition-all'>
                    Update
                  </button>
                </div>
                
              </div>
              <div className='h-[88%] w-full flex justify-center items-center'>
                <div className="bg-white/10 h-[90%] w-[99%] px-20 py-7 backdrop-blur-lg rounded-2xl overflow-y-hidden shadow-lg flex flex-col items-center border border-white/20">
                    <form onSubmit={handleOnSubmit} className='flex gap-x-8 h-full w-full'>
                        <div className="flex flex-col w-[40%] ">
                                <label className=" flex flex-col space-y-7 mx-auto my-auto text-gray-300 items-center justify-center overflow-y-auto cursor-pointer custom-scrollbar ">
                                    <input
                                        type="file"
                                        required
                                        name="photos"
                                        accept='.jpg,.jpeg,.png'
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                    {selectedImage ? (
                                        <div className="w-[16rem] h-[22rem] rounded-2xl overflow-hidden hover:border-2 shadow-md hover:border-[#8B5CF6] transition duration-300">
                                            <img
                                                src={selectedImage}
                                                alt="Selected"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="p-4 w-[16rem] h-[22rem] flex flex-col justify-center items-center bg-[#18181b] border-2 border-dashed border-gray-600 rounded-2xl shadow-md hover:border-[#8B5CF6] transition duration-300">
                                            <FaCloudUploadAlt className="text-3xl text-gray-600 mb-3" />
                                            <p className="text-gray-500 text-center">Choose a file or drag and drop it here</p>
                                        </div>
                                    )}
                                    <p className='px-4 py-1.5 text-lg font-sans text-white bg-purple-600 hover:brightness-70 rounded-xl font-semibold transition-all'>Change Profile Picture</p> 
                                </label>

                        </div>
                        <div className='flex-col items-center w-[60%] space-y-5 overflow-y-auto custom-scrollbar1 pr-[2.5rem]'>
                            <div className='ml-1'>
                                <label className='block'>
                                    <p className='pb-2 text-lg font-medium font-[Segoe_UI]'>Name</p>
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
                                    <p className='pb-2 text-lg font-medium font-[Segoe_UI]'>Username</p>
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
                                        className='resize-none px-4 w-full overflow-y-auto custom-scrollbar py-3 h-[9rem] text-gray-300 bg-[#18181b] border border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none shadow-md hover:border-[#8B5CF6] transition duration-300'
                                    />
                                    <div className='relative inline-block mt-1'>
                                        <button 
                                            onClick={(e) => { e.preventDefault();
                                                            setShowEmojiPicker(!showEmojiPicker)
                                                            }}
                                            className="px-1.5 py-1.5 cursor-pointer rounded-full border border-gray-700 bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
                                                    hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-[0_0_11px_#A78BFA]"
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
                                        className="w-full bg-[#18181b] px-4 py-3 text-gray-300 border border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none shadow-md hover:border-[#8B5CF6] transition duration-300"
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

                            <div className="relative inline-block w-full ml-1 ">
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
                            <div className='flex items-center gap-5 ml-1'>
                                <div className='flex items-center gap-2'>
                                    <input
                                        type='radio'
                                        name='privacyStatus'
                                        value="private"
                                        checked={formData.privacyStatus==="private"}
                                        onChange={handleOnChange}
                                        className='accent-purple-600 w-5 h-5 cursor-pointer'
                                        />
                                    <label>
                                        <p className='text-lg font-[Segoe_UI]'>Private</p>
                                    </label>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <input
                                        type='radio'
                                        name='privacyStatus'
                                        value="public"
                                        checked={formData.privacyStatus==="public"}
                                        onChange={handleOnChange}
                                        className='accent-purple-600 w-5 h-5 cursor-pointer'
                                        />
                                    <label>
                                        <p className='text-lg font-[Segoe_UI]'>Public</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
              </div>
              
    
        </div>
  )
}

export default EditProfileForm
