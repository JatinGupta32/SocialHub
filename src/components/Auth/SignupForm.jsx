import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { setSignUpData } from '../../slices/authSlice';
import { sendOtpApi } from '../../apis/authAPI';
import { IoEyeSharp,IoEyeOffSharp  } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData,setFormData] = useState({
        username: "",
        fullname: "",
        identifier: "",
        password: "",
        confirmPassword:"",
    })

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const {username,fullname,identifier,password,confirmPassword} = formData;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(formData.password!==formData.confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        console.log(formData);
        dispatch(setSignUpData(formData));        
        dispatch(sendOtpApi(formData.identifier, formData.username, navigate));
        setFormData({
            username: "",
            fullname: "",
            identifier: "",
            password: "",
            confirmPassword:"",
        });       

    }

  return (
    <form  onSubmit={handleOnSubmit}>
        <div className='flex-col justify-between space-y-2'>
            <div className="mx-3 flex-col items-center">
                <input
                    required
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleOnChange}
                    placeholder="Username"
                    className="w-full mt-2 bg-black/60 text-white px-3 py-2.5 rounded-lg placeholder-white/50 placeholder:text-[1rem] border-transparent focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
            </div>
            <div className="mx-3 flex-col items-center">
                <input
                    required
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleOnChange}
                    placeholder="Fullname"
                    className="w-full bg-black/60 text-white px-3 py-2.5 rounded-lg placeholder-white/50 placeholder:text-[1rem] border-transparent focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
            </div>
            <div className="mx-3 flex-col items-center">
                <input
                    required
                    type='text'
                    name='identifier'
                    value={formData.identifier}
                    onChange={handleOnChange}
                    placeholder='Mobile Number or Email'
                    className='w-full bg-black/60 text-white px-3 py-2.5 rounded-lg placeholder-white/50 placeholder:text-[1rem] border-transparent focus:outline-none focus:ring-1 focus:ring-purple-500'
                />
            </div>
            <div className='w-full flex justify-between space-x-5'>
                <div className="flex-1 relative">
                    <input
                        required
                        type={showPassword==true?"text":"password"}
                        name="password"
                        value={formData.password}
                        onChange={handleOnChange}
                        placeholder="Password"
                        className="w-full bg-black/60 text-white ml-3 pr-10 py-2.5 pl-3 rounded-lg placeholder-white/50 placeholder:text-[1rem] border-transparent focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer right-0.5 top-1/2 -translate-y-1/2">
                        {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                    </button>
                </div>
                <div className="flex-1 mr-3 relative">
                    <input
                        required
                        type={showConfirmPassword==true?"text":"password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleOnChange}
                        placeholder="Password"
                        className="w-full bg-black/60 text-white pl-3 py-2.5 pr-10 rounded-lg placeholder-white/50 placeholder:text-[1rem] border-transparent focus:outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute cursor-pointer right-3.5 top-1/2 -translate-y-1/2">
                        {showConfirmPassword ? <IoEyeSharp/> : <IoEyeOffSharp />}
                    </button>
                </div>
            </div>
        </div>
        <div className="mx-3 flex flex-col">
            {/* Create Account Button */}
            <button
                type="submit"
                className="w-full mx-auto mt-4 font-sans cursor-pointer bg-gradient-to-br from-violet-950 to-purple-600 text-white py-2 rounded-4xl text-lg font-semibold hover:brightness-80"
            >
                Create Account
            </button>

            <div className='flex justify-center items-center my-5'>
                <div className='h-[1px] w-1/2 bg-slate-400/50'></div>
                <p className='px-3'>or</p>
                <div className='h-[1px] w-1/2 bg-slate-400/50'></div>
            </div>
            

            {/* Continue with Google Button (Now Aligned) */}
            <button className="flex items-center font-sans justify-center gap-2 w-fit mx-auto px-8 mb-3 bg-gradient-to-br from-violet-950 to-purple-600 text-white py-2 cursor-pointer rounded-4xl text-md hover:brightness-80">
                <FcGoogle className="text-lg" /> 
                Continue with Google
            </button>
        </div>
            
    </form>
  )
}

export default SignupForm
