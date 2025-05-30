import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Common/Sidebar";
import SocialPosts from "../components/Post/SocialPosts";
import { useDispatch, useSelector } from "react-redux";
import { getSocialPostsApi } from "../apis/postAPI";
import RightSidebar from "../components/Common/RightSidebar";
import Spinner from "./Spinner";
import Loader from "../components/Common/Loader";
import NotificationBar from "../components/Common/NotificationBar";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {token,loading} = useSelector((state) => state.auth);
    const {notificationBar} = useSelector((state) => state.profile);

    useEffect(()=>{
      if(!token) navigate('/');
    },[])

    useEffect(()=>{
      dispatch(getSocialPostsApi())
    },[dispatch])

    return (
      // loading ? <Spinner/> : 
      <div className="w-full min-h-[100dvh] flex overflow-x-hidden scrollbar-hide">
          <div className="w-1/6">
            <Sidebar/> 
          </div>
          <div className="h-screen w-7/12 ">
            <SocialPosts />
          </div>
          <div className="w-1/4 h-screen flex-col items-center">
            <RightSidebar/>
          </div>
          {
            notificationBar && (
              <NotificationBar />
            )
          }
      </div>
  )
  
}

export default Home;
