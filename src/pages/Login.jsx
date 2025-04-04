import React from 'react'
import Background from '../components/Auth/Background';
import LoginForm from '../components/Auth/LoginForm';
import logo from '../assets/logo1.png';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [showBird, setShowBird] = useState(false);
  return (
    
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-slate-900 to-purple-800 backdrop-blur-lg z-1">
      <Background />
      <motion.div
          initial={{ x: -900, y: -455}} // Start position
          animate={{ x: 0, y: -150,  rotate: [0, -10, 10, -10, 10, 0]}} // Moves right & shakes
          transition={{ duration: 3.5, ease: "easeInOut", repeat: 0 }}
          className="absolute w-fit"
        >
          <img src={logo} className='w-20 h-5'/>
      </motion.div>
      <motion.div
          initial={{ x: 900, y: -455}} // Start position
          animate={{ x: 0, y: -150,  rotate: [0, -10, 10, -10, 10, 0] }} // Moves right & shakes
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
          Welcome to SocialHub
        </h1>
        <LoginForm />
        <div className='flex justify-center items-center my-6 px-4'>
            <div className='h-[1px] w-1/2 bg-slate-400/50'></div>
            <p className='px-3'>or</p>
            <div className='h-[1px] w-1/2 bg-slate-400/50'></div>
        </div> 
        <div className='flex justify-center'>
          <div className=''>Don't have an account? 
            <span onClick={() => navigate('/signup')} className='text-purple-400 cursor-pointer hover:brightness-70'> Sign up</span>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Login

