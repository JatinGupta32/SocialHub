import React, { useEffect, useState } from 'react'
import './App.css'
import { Routes,Route, Navigate, useNavigate } from 'react-router-dom'
import Home from "../src/pages/Home";
import Signup from "../src/pages/Signup"; 
import Login from "./pages/Login"; 
import Otp from './pages/Otp'
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetailsApi } from './apis/profileAPI';
import EditProfile from './pages/EditProfile';
import EditPost from './pages/EditPost';
import { setToken } from './slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state)=>state.auth)

  useEffect(()=>{
    setToken(localStorage.getItem('token'));
    console.log(token);
  },[])

  const isAuthenticated = !!token;

  return (
    <div className='flex min-h-[100vh] min-w-[100vw] flex-col'>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} />
        <Route path="/otp-verify" element={isAuthenticated ? <Navigate to="/home" /> : <Otp />} />

        {/* Protected routes */}
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/edit-post" element={<EditPost />} />
          </>
        ) : (
          // Catch all routes and redirect to login
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </div>
  )
}

export default App
