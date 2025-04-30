import React, { useState,useEffect,useRef } from 'react'
import * as Switch from "@radix-ui/react-switch";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { MdEmojiEmotions } from "react-icons/md";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createPostApi } from '../../apis/postAPI';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const CreatePostForm = () => {
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
        'photos': [],
        'caption': '',
        'music': '',
        'location': '',
        'tagPeople': '',
        'commentAllowed': isOn,    
        'privacyStatus': "private"
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
        dispatch(createPostApi(formData,navigate));
        setFormData({
            // 'username': user.username,
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
    // min-h-[calc(100vh-3.5rem)]
    return (
        <div className='w-[95%] h-screen bg-gradient-to-b text-amber-50 from-gray-900 to-black flex-col justify-between'>
          <div className='h-[12%] flex justify-between items-center py-3 border-b-1 border-white/20'>
            <div className='text-3xl font-sans font-semibold '>
              Create new post
            </div>
            <div className='gap-x-5 flex'>
              <button onClick={handleOnReset} className='py-2 font-sans px-5 cursor-pointer text-white text-xl bg-purple-600 hover:brightness-70 rounded-4xl font-semibold transition-all'>
                Reset
              </button>
              <button onClick={handleOnSubmit} className='py-2 font-sans px-5 cursor-pointer text-white text-xl bg-purple-600 hover:brightness-70 font-semibold rounded-4xl transition-all'>
                Create
              </button>
            </div>
    
          </div>
          <div className='h-[88%] w-full flex justify-center items-center'>
          <div className="bg-white/10 h-[90%] w-[99%] px-20 py-7 backdrop-blur-lg rounded-2xl overflow-y-hidden shadow-lg flex flex-col items-center border border-white/20">
            <form onSubmit={handleOnSubmit} className='flex gap-x-8 h-full w-full'>
                <div className="flex flex-col w-[40%] pt-3 space-y-[2rem] overflow-y-auto custom-scrollbar scroll-smooth">
                    <div className='flex items-center justify-center gap-4 mx-auto'>
                        <label className="w-[17rem] h-[22rem] flex flex-col border-2 overflow-hidden hover:border-0 bg-[#18181b] border-gray-600 rounded-2xl items-center justify-center cursor-pointer shadow-md hover:ring-2 hover:ring-[#8B5CF6] transition duration-300 border-dashed">
                            <input
                                type="file"
                                required
                                name="photos"
                                accept='.jpg,.jpeg,.png'
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            {imageFile ? (
                                <img src={imageFile} alt="Selected" className="w-[17rem] h-[22rem] object-cover rounded-2xl " />
                            ) : (
                                <div className='p-4 '>
                                    <FaCloudUploadAlt className="text-3xl mx-auto text-gray-600 mb-3" />
                                    <p className="text-gray-500 text-center">Choose a file or drag and drop it here</p>
                                </div>
                            )}
                        </label> 
                        {/* Add Image Button */}
                        <button onClick={handleAddImage}>
                            <IoIosAddCircle className="hover:brightness-70 cursor-pointer text-purple-400" size={40} />
                        </button>
                    </div>
                    <div className="grid grid-cols-3 w-full gap-5 pr-[3rem]">
                        {formData.photos.map((photo, index) => (
                            <img key={index} src={photo} alt={`Uploaded ${index}`} className="w-[7rem] h-[9rem] object-cover rounded-md" />
                        ))}
                    </div>
                </div>
                <div className='flex-col items-center w-[60%] space-y-5 overflow-y-auto overflow-x-hidden custom-scrollbar1 pr-[2.5rem]'>
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
                                className='px-4 resize-none w-full text-base overflow-y-auto custom-scrollbar py-3 h-[9rem] text-gray-300 bg-[#18181b] border border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-[#8B5CF6] focus:outline-none shadow-md hover:border-[#8B5CF6] transition duration-300'
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
                    <div className='w-full flex-col ml-1'>                        
                        <p className='pb-2 text-lg font-medium font-[Segoe_UI]'>Upload a Music file</p>
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
                            <ul className='absolute z-50 bg-[#1f1f3a] text-gray-300 rounded-md'>
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
                            <p className='pb-2 text-lg font-medium font-[Segoe_UI]'>Tag People</p>
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
                            className={`w-[2.6rem] h-[1.5rem] rounded-full relative cursor-pointer transition-colors duration-300 ${
                                isOn ? "bg-purple-600" : "bg-gray-500"
                            }`}
                            checked={isOn}
                            onCheckedChange={()=>{
                                setFormData((prev) => ({ ...prev, commentAllowed: !isOn }));
                                setIsOn(!isOn);
                            }}
                            >
                            <Switch.Thumb className={`block w-[1.5rem] h-[1.5rem] bg-white rounded-full transition-transform duration-300 ${
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
          

    </div>
        
  )
}

export default CreatePostForm



// const url = URL.createObjectURL(file);
// img.src = url;

// If editing is needed
// const reader = new FileReader();
// reader.onload = () => {
// const img = new Image();
// img.src = reader.result;
// img.onload = () => {
//     canvas.width = img.width / 2;
//     canvas.height = img.height / 2;
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
// };
// };
// reader.readAsDataURL(file);

