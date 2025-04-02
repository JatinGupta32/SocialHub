import React, { useEffect, useState } from 'react'
import './App.css'
import { Routes,Route, Navigate, useNavigate } from 'react-router-dom'
import Home from "../src/pages/Home";
import Signup from "../src/pages/Signup"; 
import Login from "./pages/Login"; 
import Otp from './pages/Otp'
import CreatePost from './pages/CreatePost';
import Profile from './pages/Profile';
import { useDispatch } from 'react-redux';
import { getUserDetailsApi } from './apis/profileAPI';
import EditProfile from './pages/EditProfile';

function App() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const token = localStorage.getItem('token');

  // useEffect(()=>{
  //   setToken(localStorage.getItem('token'));
  //   console.log()
  // },[])

  return (
    <div className='flex min-h-screen w-screen flex-col'>
      <Routes>
        {/* <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/dashboard" element={localStorage.getItem('token') ? <Dashboard /> : <Navigate to="/signup" />} /> */}

        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/otp-verify" element={<Otp/>}/>
        <Route path="/home" element={<Home/>}/>


        {/* Profile and Posts */}
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/profile/:userId" element={<Profile/>}/>
        <Route path="/edit-profile" element={<EditProfile/>}/>

      </Routes>
    </div>
  )
}

export default App


  // useEffect(()=>{
  //   if(localStorage.getItem('token')){
  //     const token = localStorage.getItem('token');
  //     dispatch(getUserDetailsApi(token,navigate));
  //   }
  // },[])