import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginApi } from '../../apis/authAPI';
import { useNavigate } from 'react-router-dom';
import { IoEyeSharp,IoEyeOffSharp  } from "react-icons/io5";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const {user} = useSelector((state) => state.profile);
    // console.log(user);
    const [formData,setFormData] = useState({
        identifier:"",
        password:""
    })

    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(user);
        dispatch(loginApi(formData.identifier,formData.password,navigate));

    }

    
  return (
    <form onSubmit={handleOnSubmit}>
        <div className='flex-col justify-between space-y-3'>
        <div className="mx-3 flex-col items-center ">
                <input
                    required
                    type="text"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleOnChange}
                    placeholder="Phone Number, Username, or Email"
                    className="w-full mt-2 bg-black/60 text-white px-3 py-2.5 rounded-lg placeholder-white/50 placeholder:text-[1rem] border-transparent focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
            </div>
            <div className="mx-3 relative">
                <input
                    required
                    type={showPassword==true?"text":"password"}
                    name="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="Password"
                    className="w-full bg-black/60 text-white pr-10 py-2.5 pl-3 rounded-lg placeholder-white/50 placeholder:text-[1rem] border-transparent focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2">
                    {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                </button>
            </div>            
        </div>
        <div className="mx-3">
            <button
                type="submit"
                className="w-full mx-auto mt-4 font-sans cursor-pointer bg-gradient-to-br from-violet-950 to-purple-600 text-white py-2 rounded-4xl text-lg font-semibold hover:brightness-80"
            >
                Log in to continue
            </button>
        </div>       
      
    </form>
  )
}

export default LoginForm
