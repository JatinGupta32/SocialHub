import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Background from "../components/Auth/background";
import logo from '../assets/logo1.png';
import { FcGoogle } from "react-icons/fc";
import Sidebar from "../components/Sidebar";
import SocialPosts from "../components/SocialPosts";
import { useSelector } from "react-redux";

const Home = () => {
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
    useEffect(()=>{
      if(!token){
        navigate('/');
      }
    },[])
    return (
        <div className="w-full min-h-screen flex ">
            <Sidebar />
            <div className="ml-[16.67%] w-5/6 flex">
                <div className="flex-1 w-1/2 min-h-screen overflow-hidden flex flex-col">
                    <SocialPosts />
                </div>
                <div className="overflow-hidden w-1/3 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center border-l border-gray-700 shadow-lg">
                </div>
            </div>
            
        </div>
    )
}

export default Home;
