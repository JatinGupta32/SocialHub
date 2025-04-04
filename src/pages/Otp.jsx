import React, { useState,useEffect } from 'react';
import Background from '../components/Auth/Background';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupApi } from '../apis/authAPI';

const Otp = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signUpData,token} = useSelector((state) => state.auth);
    // useEffect(()=>{
    //   if(!token){
    //     navigate('/');
    //   }
    // },[])
    const handleOnClick = async (e) => {
        e.preventDefault();
        const {
            username,
            fullname,
            identifier,
            password,
            confirmPassword,
        } = signUpData
        dispatch(signupApi(username, fullname, identifier, password, confirmPassword, otp, navigate));
              
    }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-800 backdrop-blur-lg z-1">
      <Background />
      <div className="relative flex-col items-center w-100 p-6 bg-slate-800/60 justify-center backdrop-blur-xs rounded-2xl shadow-lg">
        <h2 className="text-white text-center text-3xl font-semibold font-sans mt-3">Verify Email ✨</h2>
        <p className='text-gray-300 text-lg text-center mt-5 mb-5'>Check your inbox! We've sent a secret code. Enter it below to continue your journey. 🚀</p>
        <OTPInput
            value={otp}
            onChange={(otpValue) => setOtp(otpValue)}
            numInputs={6}
            containerStyle="flex justify-between"
            renderInput={(props) => (
                <input
                    {...props}
                    className="aspect-square text-center text-4xl font-[Segoe_UI] font-semibold border border-gray-500 rounded bg-gray-900 text-white focus:border-yellow-500 outline-none"
                    style={{
                        width: "3rem",  // Increase width manually
                        height: "4.5rem", // Make it square
                        // minWidth: "20px", // Prevent shrinking
                    }}
                />
            )}
        />
        <div className="flex flex-col">
        <button onClick={handleOnClick} className="w-full py-1.5 px-3 rounded-2xl text-lg mt-7 mb-3 cursor-pointer bg-gradient-to-br from-violet-950 to-purple-600 text-white hover:brightness-80 ">
          Verify OTP
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default Otp;

