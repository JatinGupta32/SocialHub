import React, { useState,useEffect } from 'react'
import * as Switch from "@radix-ui/react-switch";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

const CreatePostForm = () => {
    const [imageFile,setImageFile] = useState("");
    const [musicFile,setMusicFile] = useState("");
    const [isOn,setIsOn] = useState(false);
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
        // console.log("File selected:", file.name); 
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            console.log("Base64 Generated"); // ✅ Debug log for FileReader
            setImageFile(reader.result);
        };
        
        // console.log("string",imageFile);
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

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setIsOn(false);
        setMusicFile("");
        console.log(formData);
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
                Create
              </button>
            </div>
            
          </div>
          <div className="bg-white/10 h-10/12 mt-7 pt-10 backdrop-blur-lg rounded-2xl shadow-lg px-33 flex flex-col items-center border border-white/20">
            <form onSubmit={handleOnSubmit} className='flex gap-x-13 h-full w-full'>
                <div className="flex flex-col w-2/5 space-y-6 h-[72vh] overflow-y-auto custom-scrollbar">
                    <div className='flex items-center justify-center gap-4'>
                    <label className="w-75 h-100 flex flex-col border-2 ml-8 rounded-2xl border-dashed p-4 border-gray-400 items-center justify-center cursor-pointer hover:border-purple-500 transition">
                        <input
                            type="file"
                            required
                            name="photos"
                            accept='.jpg,.jpeg,.png'
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        {imageFile ? (
                            <img src={imageFile} alt="Selected" className="w-75 h-100 absolute z-2 object-cover rounded-2xl" />
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
                    {/* <div className='w-90 h-[1px] bg-slate-400/50 '></div>             */}
                    <div className="grid grid-cols-3 w-full gap-y-4">
                        {formData.photos.map((photo, index) => (
                            <img key={index} src={photo} alt={`Uploaded ${index}`} className="w-24 h-32 object-cover rounded-md" />
                        ))}
                    </div>
                </div>
                <div className='flex-col items-center w-3/5 h-[72vh] space-y-5 overflow-y-auto custom-scrollbar1 pr-10'>
                    <div>
                        <label className='block'>
                            <p className='pb-2 text-lg font-medium'>Caption</p>
                            <textarea
                                type='textarea'
                                name='caption'  
                                value={formData.caption}
                                onChange={handleOnChange}
                                placeholder='Write a caption...'
                                className='px-4 w-full py-3 h-36 rounded-xl border border-slate-300'
                            />
                        </label>
                    </div>
                    <div>                        
                        <p className='py-2 text-lg font-medium'>Upload a Music file</p>
                        <div className='w-full px-5 py-3 rounded-2xl border-1 mb-4 border-slate-300 cursor-pointer'>
                            {musicFile ? musicFile.name : "No file chosen"}
                        </div>
                        <label className='w-full px-5 py-2 bg-purple-600 rounded-2xl hover:brightness-75 cursor-pointer text-center text-white'>
                            Choose File
                            <input
                                type='file'
                                name='music'
                                accept='.mp3'
                                onChange={(e)=>{
                                    setFormData((prev) => ({ ...prev, music: e.target.files[0]}));
                                    setMusicFile(e.target.files[0]);
                                }}
                                className='hidden' // Hides the default file input
                            />
                        </label>
                    </div>
                    <div className=''>
                        <label className='block'>
                            <p className='py-2 text-lg font-medium'>Location</p>
                            <input
                                type='text'
                                name='location'
                                value={formData.location}
                                onChange={handleOnChange}
                                placeholder='Add a location'
                                className='px-4 w-full py-3 rounded-xl border border-slate-300 '
                                />
                        </label>
                    </div>
                    <div className=''>
                        <label className='block'>
                            <p className='py-2 text-lg font-medium'>Tag People</p>
                            <input
                                type='text'
                                name='tagPeople'
                                value={formData.tagPeople}
                                onChange={handleOnChange}
                                placeholder='Add People'
                                className='px-4 w-full py-3 rounded-xl border border-slate-300'
                                />
                        </label>
                    </div>
                    <div className='flex items-center gap-4 my-6'>
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
                        <div className='text-lg'>Allow people to comment</div>
                    </div>
                    <div className='flex items-center gap-5'>
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
                                <p className='text-lg'>Private</p>
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
                                <p className='text-lg'>Public</p>
                            </label>
                        </div>
                    </div>
                </div>
            </form>
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