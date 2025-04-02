import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Background from "../components/Auth/background";
import logo from '../assets/logo1.png';
import { FcGoogle } from "react-icons/fc";
import Sidebar from "../components/Sidebar";
import SocialPosts from "../components/Post/SocialPosts";
import { useDispatch, useSelector } from "react-redux";
import { getSocialPostsApi } from "../apis/postAPI";
import RightSidebar from "../components/RightSidebar";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    useEffect(()=>{
      if(!token){
        navigate('/');
      }
    },[])
    useEffect(()=>{
      dispatch(getSocialPostsApi())
    },[])


    return (
      <div className="w-full min-h-screen flex overflow-x-hidden scrollbar-hide">
          <div className="w-1/6">
            <Sidebar/> 
          </div>
          <div className="h-screen w-7/12 ">
            <SocialPosts />
          </div>
          <div className="w-1/4 h-screen overflow-y-scroll custom-scrollbar bg-gradient-to-b from-gray-900 to-black flex flex-col items-center border-l border-gray-700 shadow-lg">
            <RightSidebar/>
          </div>
      </div>
  )
  
}

export default Home;
