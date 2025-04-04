import React, { useState,useEffect,useRef } from 'react'
import * as Switch from "@radix-ui/react-switch";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { MdEmojiEmotions } from "react-icons/md";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { editPostApi } from '../../apis/postAPI';

const EditPostForm = () => {
    const navigate = useNavigate();
    const [imageFile,setImageFile] = useState("");
    const [musicFile,setMusicFile] = useState("");
    const dispatch = useDispatch();
    const [isOn,setIsOn] = useState(false);
    const pickerRef = useRef(null)
    const textAreaRef = useRef(null)
    const {user} = useSelector((state)=> state.profile);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const {currentSelectedPost} = useSelector((state)=>state.post);

    useEffect(()=>{
        // if(!currentSelectedPost) navigate('/')
        setQuery(currentSelectedPost?.location);
        setIsOn(currentSelectedPost?.commentAllowed)
        console.log("currentSelectedPost: ",currentSelectedPost);
    },[])
  
    const fetchLocations = async (input) => {
      if (input.length < 2) return;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${input}`
      );
      const data = await response.json();
      setSuggestions(data);
    };
  
    const handleSelect = (location) => {
        const parts = location.display_name.split(",");
        const conciseName = parts.slice(0, 2).join(", "); // Example: "New York, USA"
    
        // Update input field with short name
        setQuery(conciseName);
    
        // Store only the concise location in formData
        setFormData((prev) => ({
            ...prev,
            location: conciseName, // Store short version
        }));
    
        // Clear suggestions after selection
        setSuggestions([]);
        // onSelect({
        //     address: location.display_name,
        //     lat: location.lat,
        //     lng: location.lon,
        // });
    }; 
    
    const [formData, setFormData] = useState({
        'photos': currentSelectedPost?.photos || [],
        'caption': currentSelectedPost?.caption,
        'music': currentSelectedPost?.music,
        'location': currentSelectedPost?.location,
        'tagPeople': currentSelectedPost?.tagPeople,
        'commentAllowed': currentSelectedPost?.commentAllowed,    
        'privacyStatus': currentSelectedPost?.privacyStatus
    })

    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
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
            };
        };
    };
    
    const handleAddImage = (e) => {
        e.preventDefault();
        if (!imageFile) {
            console.warn("No image selected!"); 
            return;
        }
        setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, imageFile],
        }));
        setTimeout(() => setImageFile(""), 100);
    };

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    
    const addEmoji = (emoji) => {
        setFormData({ ...formData, caption: formData.caption + emoji.native });
    };
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        if (formData.photos.length === 0) {
            toast.error("📸 Add at least one photo to continue.", {
                style: { fontSize: "20px"} 
            });
            return; 
        }
        setIsOn(false);
        setMusicFile("");
        console.log(formData);
        dispatch(editPostApi(formData,currentSelectedPost._id,navigate));
        setFormData({
            'photos': [],
            'caption': '',
            'music': '',
            'location': '',
            'tagPeople': '',
            'commentAllowed': false,   
            'privacyStatus': "private"
        })      
    }

    const handleOnReset = () => {
        setImageFile("");
        setIsOn(false);
        setMusicFile("");
        setFormData({
            'photos': [],
            'caption': '',
            'music': '',
            'location': '',
            'tagPeople': '',
            'commentAllowed': false,   
            'privacyStatus': "private"
        })   
    }

    const handleUpload = async(e) => {
        e.preventDefault();
        if (!musicFile) return alert("Please select a file first");

        const Data = new FormData();
        Data.append("file", musicFile);
        Data.append("upload_preset", "SocialHub"); 
        try {
            // Upload file directly to Cloudinary
            const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/dlbesblaa/auto/upload`, Data);
      
            const cloudinaryUrl = cloudinaryResponse.data.secure_url;
            setFormData((prev)=>({
                ...prev,
                music: cloudinaryUrl,
            }))
            toast.success("Music upload succesfully")
            console.log("Cloudinary URL:", cloudinaryUrl);
          } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload file");
          }
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
              Create new post
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
            <form onSubmit={handleOnSubmit} className='flex gap-x-12 h-full w-full'>
                <div className="flex flex-col w-2/5 space-y-6 h-[72vh] overflow-y-auto custom-scrollbar">
                    <div className='flex items-center justify-center gap-4 mt-1'>
                    <label className="w-75 h-100 flex flex-col border-2 hover:border-0 bg-[#18181b] border-gray-600  ml-8 rounded-2xl p-4 items-center justify-center cursor-pointer shadow-md hover:ring-2 hover:ring-[#8B5CF6] transition duration-300 border-dashed">
                        <input
                            type="file"
                            required
                            name="photos"
                            accept='.jpg,.jpeg,.png'
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        {imageFile ? (
                            <img src={imageFile} alt="Selected" className="w-75 h-100 absolute z-2 object-cover rounded-2xl " />
                        ) : (
                            <>
                                <FaCloudUploadAlt className="text-3xl text-gray-600 mb-3" />
                                <p className="text-gray-500">Choose a file or drag and drop it here</p>
                            </>
                        )}
                    </label> 
                    {/* Add Image Button */}
                    <button onClick={handleAddImage}>
                        <IoIosAddCircle className="hover:brightness-70 cursor-pointer text-purple-400" size={40} />
                    </button>
                    </div>
                    <div className="grid grid-cols-3 w-full gap-y-4">
                        {formData?.photos?.map((photo, index) => (
                            <img key={index} src={photo} alt={`Uploaded ${index}`} className="w-24 h-32 object-cover rounded-md" />
                        ))}
                    </div>
                </div>
                <div className='flex-col items-center w-3/5 h-[72vh] space-y-5 overflow-y-auto overflow-x-hidden custom-scrollbar1 pr-10'>
                    <div>
                        <label className='block ml-1'>
                            <p className='pb-2 text-lg font-medium font-[Segoe_UI]'>Caption</p>
                            <textarea
                                type='textarea'
                                ref={textAreaRef}
                                name='caption'
                                value={formData.caption}
                                onChange={handleOnChange}
                                placeholder='Write a caption...'
                                className='px-4 w-full overflow-y-auto custom-scrollbar py-3 h-36 text-gray-300 bg-[#18181b] border border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none shadow-md hover:border-[#8B5CF6] transition duration-300'
                            />
                            <div className='relative inline-block mt-1'>
                                <button 
                                    onClick={(e) => { e.preventDefault();
                                                    setShowEmojiPicker(!showEmojiPicker)
                                                    }}
                                    className="mt-1 px-1.5 py-1.5 cursor-pointer rounded-full border border-gray-200 bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg"
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
                    <div className='w-full flex-col ml-1'>                        
                        <p className='py-2 text-lg font-medium font-[Segoe_UI]'>Upload a Music file</p>
                        <div className='w-full px-5 py-3 mb-4 cursor-pointer text-gray-300 bg-[#18181b] border border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none shadow-md hover:border-[#8B5CF6] transition duration-300'>
                            {musicFile ? musicFile.name : "No file chosen"}
                        </div>
                        <div className='w-full flex justify-between'>
                            <label className='px-5 py-2 bg-purple-600 rounded-3xl hover:brightness-75 cursor-pointer text-center text-white'>
                                Choose File
                                <input
                                    type='file'
                                    name='music'
                                    accept='.mp3'
                                    onChange={(e)=>{
                                        setMusicFile(e.target.files[0]);
                                    }}
                                    className='hidden' // Hides the default file input
                                />
                            </label>
                            <button onClick={handleUpload} className='translate-x-8 mx-8 px-5 py-2 bg-purple-600 rounded-3xl hover:brightness-75 cursor-pointer text-center text-white'>Upload</button>
                        </div>
                    </div>
                    <div className='relative inline-block w-full ml-1'>
                        <div className="pb-2 text-lg font-medium font-[Segoe_UI]">Location</div>
                        <input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                fetchLocations(e.target.value);
                            }}
                            placeholder="Enter location"
                            className='w-full bg-[#18181b] px-4 py-3 text-gray-300  border border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none shadow-md hover:border-[#8B5CF6] transition duration-300'
                        />
                        {suggestions.length > 0 && (
                            <ul className='absolute z-50 bg-[#1f1f3a] text-gray-300'>
                            {suggestions.map((location) => {
                              // Extract city and country from display_name
                              const parts = location.display_name.split(",");
                              const conciseName = parts.slice(0, 2).join(", "); // Example: "New York, USA"
                          
                              return (
                                <li
                                  key={location.place_id}
                                  className='cursor-pointer hover:bg-blue-300 px-4 py-1 hover:font-semibold font-[Segoe_UI] text-gray-200 hover:text-[#18181b]'
                                  onClick={() => handleSelect(location)}
                                >
                                  {conciseName}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                    </div>
                    <div className=''>
                        <label className='block ml-1'>
                            <p className='py-2 text-lg font-medium font-[Segoe_UI]'>Tag People</p>
                            <input
                                type='text'
                                name='tagPeople'
                                value={formData.tagPeople}
                                onChange={handleOnChange}
                                placeholder='Add People'
                                className='px-4 w-full py-3 text-gray-300 bg-[#18181b] border border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none shadow-md hover:border-[#8B5CF6] transition duration-300'
                                />
                        </label>
                    </div>
                    <div className='flex items-center gap-4 my-6 ml-1'>
                        <Switch.Root
                            className={`w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-300 ${
                                isOn ? "bg-purple-600" : "bg-gray-500"
                            }`}
                            checked={isOn}
                            onCheckedChange={()=>{
                                setFormData((prev) => ({ ...prev, commentAllowed: !isOn }));
                                setIsOn(!isOn);
                            }}
                            >
                            <Switch.Thumb className={`block w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                                isOn ? "translate-x-5" : "translate-x-0"
                            }`}/> 
                        </Switch.Root>
                        <div className='text-lg font-[Segoe_UI]'>Allow people to comment</div>
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
        
  )
}

export default EditPostForm
