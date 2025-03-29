import React, { useState } from 'react';
import SignupForm from '../components/Auth/SignupForm';
import Background from '../components/Auth/background';
import logo from '../assets/logo1.png';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-800 backdrop-blur-lg z-1">
      <Background/>
      <motion.div
          initial={{ x: -800, y: -410}} // Start position
          animate={{ x: 0, y: -230,  rotate: [0, -10, 10, -10, 10, 0]}} // Moves right & shakes
          transition={{ duration: 3.5, ease: "easeInOut", repeat: 0 }}
          className="absolute w-fit"
        >
          <img src={logo} className='w-20 h-5'/>
      </motion.div>
      <motion.div
          initial={{ x: 800, y: -410}} // Start position
          animate={{ x: 0, y: -230,  rotate: [0, -10, 10, -10, 10, 0] }} // Moves right & shakes
          transition={{ duration: 4, ease: "easeInOut", repeat: 0 }}
          className="absolute w-fit"
        >
          <img src={logo} className='w-20 h-5'/>
      </motion.div>
      <div className="relative flex-col items-center w-100 p-4 bg-slate-800/60 justify-center backdrop-blur-xs rounded-2xl shadow-lg ">
        <div className="flex justify-center mt-6">
          <motion.img
            src={logo}
            alt="Logo"
            className="w-30 h-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 2, ease: "easeIn" }}
          />
        </div>
        <h1 className="text-white text-center text-2xl font-semibold font-sans mt-4 mb-5">
        Get started with SocialHub
        </h1>
        <SignupForm/>
        <div className='flex justify-center mt-2 py-2'>
          <div className=''>Have an account? 
            <span onClick={()=>(navigate('/'))} className='text-purple-400 cursor-pointer hover:brightness-70'> Login</span>
          </div>  
        </div>
      </div>
    </div>

  );
};

export default Signup;
